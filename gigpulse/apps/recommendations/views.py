from __future__ import annotations

from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .utils import generate_recommendations
from apps.projects.serializers import ProjectReadSerializer
from apps.projects.models import Project


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def recommended_projects(request):
	user = request.user
	ids = generate_recommendations(user.id)
	qs = Project.objects.filter(id__in=ids)
	serializer = ProjectReadSerializer(qs, many=True)
	return Response(serializer.data)
