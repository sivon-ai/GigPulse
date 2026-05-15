from __future__ import annotations

from typing import List

from django.contrib.auth import get_user_model
from django.db.models import Count

from apps.skills.models import Skill
from apps.projects.models import Project

User = get_user_model()


def generate_recommendations(user_id: int) -> List[int]:
    """Simple heuristic: recommend top projects matching user's skills."""
    user = User.objects.filter(id=user_id).first()
    if not user:
        return []

    skills = list(user.skills.all())
    if not skills:
        # fallback: recommend recent open projects
        qs = Project.objects.filter(status="open").order_by("-created_at")[:10]
        return [p.id for p in qs]

    skill_slugs = [s.slug for s in skills]
    qs = (
        Project.objects.filter(required_skills__slug__in=skill_slugs, status="open")
        .annotate(matches=Count("required_skills"))
        .order_by("-matches", "-created_at")
        .distinct()[:20]
    )
    return [p.id for p in qs]
