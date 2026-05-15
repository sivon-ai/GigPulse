from __future__ import annotations

from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    actor = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ("id", "recipient", "actor", "verb", "description", "link", "data", "level", "unread", "created_at")
        read_only_fields = ("id", "recipient", "actor", "created_at")

    def get_actor(self, obj):
        if obj.actor:
            return {"id": obj.actor.id, "username": getattr(obj.actor, "username", None)}
        return None
