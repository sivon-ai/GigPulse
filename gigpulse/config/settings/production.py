from __future__ import annotations

from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa: F403

DEBUG = False
DJANGO_ENV = "production"

if SECRET_KEY == "dev-insecure-change-me":  # noqa: F405
    raise ImproperlyConfigured("DJANGO_SECRET_KEY must be set in production.")

# Production assumes Redis is available (ElastiCache)
USE_REDIS = env.bool("DJANGO_USE_REDIS", default=True)  # noqa: F405
CACHES, CHANNEL_LAYERS = build_caches_and_channels(  # noqa: F405
    use_redis=USE_REDIS,
    redis_url=REDIS_URL,  # noqa: F405
)

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = False  # noqa: F405

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = env.int("SECURE_HSTS_SECONDS", default=31536000)  # noqa: F405
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)  # noqa: F405
SECURE_HSTS_PRELOAD = env.bool("SECURE_HSTS_PRELOAD", default=True)  # noqa: F405

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "same-origin"
X_FRAME_OPTIONS = "DENY"
