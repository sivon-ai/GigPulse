from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.skills.models import Skill

from .models import Project, ProjectAttachment, ProjectCategory

User = get_user_model()


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ("id", "name", "slug")


class ProjectOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "full_name", "avatar", "role", "verification_status")
        read_only_fields = fields


class ProjectAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAttachment
        fields = ("id", "file", "original_name", "created_at")
        read_only_fields = fields


class ProjectAttachmentCreateSerializer(serializers.Serializer):
    file = serializers.FileField()


class ProjectReadSerializer(serializers.ModelSerializer):
    owner = ProjectOwnerSerializer(read_only=True)
    category = ProjectCategorySerializer(read_only=True)
    required_skills = serializers.SlugRelatedField(many=True, slug_field="slug", read_only=True)
    attachments = ProjectAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "owner",
            "title",
            "description",
            "category",
            "required_skills",
            "budget_min",
            "budget_max",
            "duration",
            "experience_level",
            "visibility",
            "urgency_level",
            "status",
            "proposal_count",
            "is_featured",
            "ai_tags",
            "attachments",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


class ProjectWriteSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="slug",
        queryset=ProjectCategory.objects.filter(is_active=True),
        required=False,
        allow_null=True,
    )
    required_skills = serializers.SlugRelatedField(
        many=True,
        slug_field="slug",
        queryset=Skill.objects.filter(is_active=True),
        required=False,
    )

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "description",
            "category",
            "required_skills",
            "budget_min",
            "budget_max",
            "duration",
            "experience_level",
            "visibility",
            "urgency_level",
            "status",
            "is_featured",
            "ai_tags",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, attrs):
        budget_min = attrs.get("budget_min")
        budget_max = attrs.get("budget_max")
        if budget_min is not None and budget_max is not None and budget_min > budget_max:
            raise serializers.ValidationError({"budget_max": "Must be >= budget_min."})
        return attrs
