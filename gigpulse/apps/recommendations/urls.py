from __future__ import annotations

from django.urls import path

from .views import recommended_projects

urlpatterns = [
    path("projects/", recommended_projects, name="recommended-projects"),
]
