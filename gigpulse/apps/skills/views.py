from __future__ import annotations

from rest_framework import permissions, viewsets

from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
	permission_classes = [permissions.AllowAny]
	serializer_class = SkillSerializer
	queryset = Skill.objects.filter(is_active=True)
	lookup_field = "slug"
	search_fields = ("name", "slug")
	ordering_fields = ("name",)
	ordering = ("name",)
