"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponseNotFound
from django.contrib import admin
from django.urls import include, path, re_path
from apps.core.views import spa_index
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("api/v1/auth/", include("apps.users.urls")),
    path("api/v1/", include("apps.skills.urls")),
    path("api/v1/", include("apps.projects.urls")),
    path("api/v1/", include("apps.proposals.urls")),
    path("api/v1/", include("apps.portfolio.urls")),
    path("api/v1/", include("apps.reviews.urls")),
    path("api/v1/", include("apps.notifications.urls")),
    path("api/v1/", include("apps.analytics.urls")),
    path("api/v1/", include("apps.recommendations.urls")),
    path("api/v1/", include("apps.payments.urls")),
]

SPA_SKIP_PREFIXES = ("api/", "admin/", "static/", "media/")


def spa_or_404(request, *args, **kwargs):
    path = request.path.lstrip("/")
    if path and path.startswith(SPA_SKIP_PREFIXES):
        return HttpResponseNotFound()
    return spa_index(request)


# Serve React SPA at root and catch-all for client-side routing.
urlpatterns += [
    path("", spa_or_404, name="home"),
    re_path(r"^(?:.*)/?$", spa_or_404, name="spa-catchall"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
