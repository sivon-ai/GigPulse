from __future__ import annotations

from rest_framework import serializers

from .models import MarketMetric


class MarketMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketMetric
        fields = ("id", "date", "name", "value", "data", "created_at")
        read_only_fields = fields
