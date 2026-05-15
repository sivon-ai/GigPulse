from __future__ import annotations

from rest_framework import serializers

from .models import Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "name", "slug", "description")
        read_only_fields = fields
