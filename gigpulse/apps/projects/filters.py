from __future__ import annotations

import django_filters

from apps.skills.models import Skill

from .models import Project, ProjectCategory


class ProjectFilter(django_filters.FilterSet):
    category = django_filters.ModelChoiceFilter(
        field_name="category",
        to_field_name="slug",
        queryset=ProjectCategory.objects.filter(is_active=True),
    )
    required_skills = django_filters.ModelMultipleChoiceFilter(
        field_name="required_skills",
        to_field_name="slug",
        queryset=Skill.objects.filter(is_active=True),
        conjoined=False,
    )

    budget_min = django_filters.NumberFilter(field_name="budget_min", lookup_expr="gte")
    budget_max = django_filters.NumberFilter(field_name="budget_max", lookup_expr="lte")

    class Meta:
        model = Project
        fields = (
            "category",
            "required_skills",
            "status",
            "urgency_level",
            "experience_level",
            "visibility",
            "is_featured",
        )
