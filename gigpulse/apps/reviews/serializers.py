from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.proposals.models import Contract

from .models import Review

User = get_user_model()


class ReviewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "full_name", "avatar", "role", "verification_status")
        read_only_fields = fields


class ReviewReadSerializer(serializers.ModelSerializer):
    review_from = ReviewUserSerializer(read_only=True)
    review_to = ReviewUserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ("id", "contract", "review_from", "review_to", "rating", "comment", "created_at")
        read_only_fields = fields


class ReviewCreateSerializer(serializers.Serializer):
    contract_id = serializers.IntegerField()
    rating = serializers.IntegerField(min_value=1, max_value=5)
    comment = serializers.CharField(allow_blank=True, required=False)

    def validate_contract_id(self, value: int):
        if not Contract.objects.filter(id=value).exists():
            raise serializers.ValidationError("Contract not found.")
        return value
