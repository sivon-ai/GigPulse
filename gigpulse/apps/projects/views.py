from __future__ import annotations

from django.db import connection, models
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from apps.core.permissions import IsClient, IsOwnerOrReadOnly

from .filters import ProjectFilter
from .models import Project, ProjectAttachment, ProjectCategory, ProjectStatus, ProjectVisibility
from .serializers import (
	ProjectAttachmentCreateSerializer,
	ProjectAttachmentSerializer,
	ProjectCategorySerializer,
	ProjectReadSerializer,
	ProjectWriteSerializer,
)


class ProjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
	permission_classes = [permissions.AllowAny]
	serializer_class = ProjectCategorySerializer
	queryset = ProjectCategory.objects.filter(is_active=True)
	lookup_field = "slug"


class ProjectViewSet(viewsets.ModelViewSet):
	filterset_class = ProjectFilter
	ordering_fields = ("created_at", "budget_min", "budget_max", "proposal_count")
	ordering = ("-created_at",)
	search_fields = ("title", "description")

	queryset = (
		Project.objects.select_related("owner", "category")
		.prefetch_related("required_skills", "attachments")
		.all()
	)

	def get_queryset(self):
		qs = super().get_queryset()

		user = self.request.user
		if not user.is_authenticated:
			qs = qs.filter(status=ProjectStatus.OPEN, visibility=ProjectVisibility.PUBLIC)
		else:
			qs = qs.filter(
				models.Q(status=ProjectStatus.OPEN, visibility=ProjectVisibility.PUBLIC)
				| models.Q(owner=user)
			)

		q = (self.request.query_params.get("q") or "").strip()
		if q and connection.vendor == "postgresql":
			from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector

			vector = SearchVector("title", weight="A") + SearchVector("description", weight="B")
			query = SearchQuery(q)
			qs = qs.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.05).order_by(
				"-rank", "-created_at"
			)

		return qs

	def get_serializer_class(self):
		if self.action in ("create", "update", "partial_update"):
			return ProjectWriteSerializer
		return ProjectReadSerializer

	def get_permissions(self):
		if self.action in ("list", "retrieve"):
			return [permissions.AllowAny()]
		if self.action == "create":
			return [permissions.IsAuthenticated(), IsClient()]
		if self.action in ("update", "partial_update", "destroy"):
			return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
		if self.action == "attachments":
			return [permissions.IsAuthenticated()]
		return super().get_permissions()

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

	@action(
		detail=True,
		methods=["get", "post"],
		url_path="attachments",
		parser_classes=[MultiPartParser, FormParser],
	)
	def attachments(self, request, pk=None):
		project = self.get_object()

		if request.method == "GET":
			data = ProjectAttachmentSerializer(project.attachments.all(), many=True).data
			return Response(data)

		if project.owner != request.user:
			return Response(status=status.HTTP_403_FORBIDDEN)

		serializer = ProjectAttachmentCreateSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		attachment = ProjectAttachment.objects.create(project=project, file=serializer.validated_data["file"])
		return Response(ProjectAttachmentSerializer(attachment).data, status=status.HTTP_201_CREATED)
