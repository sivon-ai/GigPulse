from __future__ import annotations

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import MarketMetric
from .serializers import MarketMetricSerializer


class MarketMetricViewSet(viewsets.ReadOnlyModelViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = MarketMetricSerializer
	queryset = MarketMetric.objects.all()
	ordering = ("-date",)

	@action(detail=False, methods=["get"], url_path="latest")
	def latest(self, request):
		qs = self.get_queryset().order_by("-date")[:30]
		return Response(self.get_serializer(qs, many=True).data)
