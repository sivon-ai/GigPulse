from __future__ import annotations

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.core.permissions import IsFreelancer

from .models import Certificate, PortfolioItem, WorkHistory
from .serializers import CertificateSerializer, PortfolioItemSerializer, WorkHistorySerializer

User = get_user_model()


class _OwnedViewSet(viewsets.ModelViewSet):
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		model = getattr(self, "queryset").model
		if self.action == "public":
			username = self.kwargs.get("username")
			user = get_object_or_404(User, username=username)
			return model.objects.filter(user=user, is_public=True)
		return model.objects.filter(user=self.request.user)

	def get_permissions(self):
		if self.action in ("create", "update", "partial_update", "destroy"):
			return [permissions.IsAuthenticated(), IsFreelancer()]
		if self.action == "public":
			return [permissions.AllowAny()]
		return super().get_permissions()

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)


class PortfolioItemViewSet(_OwnedViewSet):
	serializer_class = PortfolioItemSerializer
	queryset = PortfolioItem.objects.all()
	ordering_fields = ("created_at",)
	ordering = ("-created_at",)

	@action(detail=False, methods=["get"], url_path=r"public/(?P<username>[^/.]+)")
	def public(self, request, username=None):
		qs = self.get_queryset().order_by("-created_at")
		return Response(self.get_serializer(qs, many=True).data)


class WorkHistoryViewSet(_OwnedViewSet):
	serializer_class = WorkHistorySerializer
	queryset = WorkHistory.objects.all()
	ordering_fields = ("start_date",)
	ordering = ("-start_date",)

	@action(detail=False, methods=["get"], url_path=r"public/(?P<username>[^/.]+)")
	def public(self, request, username=None):
		qs = self.get_queryset().order_by("-start_date")
		return Response(self.get_serializer(qs, many=True).data)


class CertificateViewSet(_OwnedViewSet):
	serializer_class = CertificateSerializer
	queryset = Certificate.objects.all()
	ordering_fields = ("created_at",)
	ordering = ("-created_at",)

	@action(detail=False, methods=["get"], url_path=r"public/(?P<username>[^/.]+)")
	def public(self, request, username=None):
		qs = self.get_queryset().order_by("-created_at")
		return Response(self.get_serializer(qs, many=True).data)
