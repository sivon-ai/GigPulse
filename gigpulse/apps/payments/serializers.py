from __future__ import annotations

from rest_framework import serializers

from .models import PaymentTransaction, Payout


class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = ("id", "payer", "amount", "currency", "provider", "provider_id", "status", "metadata", "created_at")
        read_only_fields = ("id", "status", "provider_id", "created_at")


class PayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payout
        fields = ("id", "recipient", "amount", "currency", "provider", "provider_id", "processed", "created_at", "processed_at")
        read_only_fields = ("id", "processed", "created_at", "processed_at")
