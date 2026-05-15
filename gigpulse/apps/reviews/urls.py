from __future__ import annotations

from rest_framework.routers import DefaultRouter

from .views import ReviewViewSet

router = DefaultRouter()
router.register("reviews", ReviewViewSet, basename="review")

urlpatterns = router.urls
