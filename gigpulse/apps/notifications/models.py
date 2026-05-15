from __future__ import annotations

from django.conf import settings
from django.db import models


class NotificationLevel(models.TextChoices):
	INFO = "info", "Info"
	SUCCESS = "success", "Success"
	WARNING = "warning", "Warning"
	ERROR = "error", "Error"


class Notification(models.Model):
	recipient = models.ForeignKey(
		settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications"
	)
	actor = models.ForeignKey(
		settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="notifications_sent"
	)

	verb = models.CharField(max_length=200)
	description = models.TextField(blank=True)
	link = models.CharField(max_length=512, blank=True)
	data = models.JSONField(default=dict, blank=True)

	level = models.CharField(max_length=16, choices=NotificationLevel.choices, default=NotificationLevel.INFO)
	unread = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)
		indexes = [models.Index(fields=["recipient", "unread"]), models.Index(fields=["created_at"])]

	def __str__(self) -> str:
		return f"Notification to {self.recipient_id}: {self.verb}"
