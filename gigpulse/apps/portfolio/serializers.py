from __future__ import annotations

from rest_framework import serializers

from .models import Certificate, PortfolioItem, WorkHistory


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = (
            "id",
            "title",
            "description",
            "link_url",
            "attachment",
            "tags",
            "is_public",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class WorkHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkHistory
        fields = (
            "id",
            "company",
            "title",
            "start_date",
            "end_date",
            "description",
            "is_public",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = (
            "id",
            "name",
            "issuer",
            "issue_date",
            "expiry_date",
            "credential_url",
            "attachment",
            "is_public",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
