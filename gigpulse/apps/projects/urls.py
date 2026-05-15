from __future__ import annotations

from rest_framework.routers import DefaultRouter

from .views import ProjectCategoryViewSet, ProjectViewSet

router = DefaultRouter()
router.register("project-categories", ProjectCategoryViewSet, basename="project-category")
router.register("projects", ProjectViewSet, basename="project")

urlpatterns = router.urls
