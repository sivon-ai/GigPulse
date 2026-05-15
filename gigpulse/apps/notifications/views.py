from __future__ import annotations

from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = NotificationSerializer
	queryset = Notification.objects.select_related("actor", "recipient").all()
	http_method_names = ["get", "post", "patch", "head", "options"]

	def get_queryset(self):
		return self.queryset.filter(recipient=self.request.user)

	def perform_create(self, serializer):
		# Internal creation should set recipient explicitly.
		serializer.save()

	@action(detail=False, methods=["get"], url_path="unread-count")
	def unread_count(self, request):
		count = Notification.objects.filter(recipient=request.user, unread=True).count()
		return Response({"unread": count})

	@action(detail=True, methods=["post"], url_path="mark-read")
	def mark_read(self, request, pk=None):
		notif = get_object_or_404(Notification, pk=pk, recipient=request.user)
		notif.unread = False
		notif.save(update_fields=["unread"])
		return Response(NotificationSerializer(notif).data)
