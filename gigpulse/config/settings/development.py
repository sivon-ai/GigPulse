from __future__ import annotations

from .base import *  # noqa: F403

DEBUG = True
DJANGO_ENV = "development"

ALLOWED_HOSTS = ["*"]

# Prefer local in-memory cache/channels unless explicitly enabled
USE_REDIS = env.bool("DJANGO_USE_REDIS", default=False)  # noqa: F405
CACHES, CHANNEL_LAYERS = build_caches_and_channels(  # noqa: F405
    use_redis=USE_REDIS,
    redis_url=REDIS_URL,  # noqa: F405
)

EMAIL_BACKEND = env(  # noqa: F405
    "EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",
)

CELERY_TASK_ALWAYS_EAGER = env.bool("CELERY_TASK_ALWAYS_EAGER", default=True)  # noqa: F405
