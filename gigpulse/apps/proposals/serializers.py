from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.projects.models import Project

from .models import (
    Contract,
    Milestone,
    Proposal,
    ProposalNegotiationMessage,
    ProposalStatus,
)

User = get_user_model()


class ProposalFreelancerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "full_name", "avatar", "role", "verification_status")
        read_only_fields = fields


class ProposalProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("id", "title")
        read_only_fields = fields


class ProposalReadSerializer(serializers.ModelSerializer):
    project = ProposalProjectSerializer(read_only=True)
    freelancer = ProposalFreelancerSerializer(read_only=True)

    class Meta:
        model = Proposal
        fields = (
            "id",
            "project",
            "freelancer",
            "cover_letter",
            "bid_amount",
            "estimated_timeline_days",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


class ProposalCreateSerializer(serializers.ModelSerializer):
    project_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Proposal
        fields = ("project_id", "cover_letter", "bid_amount", "estimated_timeline_days")

    def validate_project_id(self, value: int):
        try:
            Project.objects.get(id=value)
        except Project.DoesNotExist:
            raise serializers.ValidationError("Project not found.")
        return value


class ProposalUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ("cover_letter", "bid_amount", "estimated_timeline_days")


class ProposalSetStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=ProposalStatus.choices)


class ProposalNegotiationMessageSerializer(serializers.ModelSerializer):
    sender = ProposalFreelancerSerializer(read_only=True)

    class Meta:
        model = ProposalNegotiationMessage
        fields = (
            "id",
            "sender",
            "message",
            "proposed_bid_amount",
            "proposed_timeline_days",
            "created_at",
        )
        read_only_fields = ("id", "sender", "created_at")


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = (
            "id",
            "title",
            "description",
            "amount",
            "due_date",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class ContractSerializer(serializers.ModelSerializer):
    project = ProposalProjectSerializer(read_only=True)
    client = ProposalFreelancerSerializer(read_only=True)
    freelancer = ProposalFreelancerSerializer(read_only=True)
    milestones = MilestoneSerializer(many=True, read_only=True)

    class Meta:
        model = Contract
        fields = (
            "id",
            "project",
            "proposal",
            "client",
            "freelancer",
            "agreed_amount",
            "status",
            "started_at",
            "completed_at",
            "milestones",
        )
        read_only_fields = fields
