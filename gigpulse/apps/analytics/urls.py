from __future__ import annotations

from rest_framework.routers import DefaultRouter

from .views import MarketMetricViewSet

router = DefaultRouter()
router.register("metrics", MarketMetricViewSet, basename="metric")

urlpatterns = router.urls
