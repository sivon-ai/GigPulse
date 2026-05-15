from __future__ import annotations

from rest_framework.routers import DefaultRouter

from .views import CertificateViewSet, PortfolioItemViewSet, WorkHistoryViewSet

router = DefaultRouter()
router.register("portfolio-items", PortfolioItemViewSet, basename="portfolio-item")
router.register("work-history", WorkHistoryViewSet, basename="work-history")
router.register("certificates", CertificateViewSet, basename="certificate")

urlpatterns = router.urls
