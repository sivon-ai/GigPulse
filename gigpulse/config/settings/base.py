from __future__ import annotations

from datetime import timedelta
from pathlib import Path

import environ
from celery.schedules import crontab

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env(
    DJANGO_DEBUG=(bool, False),
    DJANGO_ALLOWED_HOSTS=(list, []),
    CORS_ALLOWED_ORIGINS=(list, []),
    CSRF_TRUSTED_ORIGINS=(list, []),
)

environ.Env.read_env(BASE_DIR / ".env")

DJANGO_ENV = env("DJANGO_ENV", default="development")

DEBUG = env.bool("DJANGO_DEBUG", default=(DJANGO_ENV != "production"))
SECRET_KEY = env("DJANGO_SECRET_KEY", default="dev-insecure-change-me")

ALLOWED_HOSTS = env.list(
    "DJANGO_ALLOWED_HOSTS",
    default=["localhost", "127.0.0.1"],
)

# Application definition

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "drf_spectacular",
    "corsheaders",
    "django_filters",
    "channels",
    "storages",
]

LOCAL_APPS = [
    "apps.core",
    "apps.users",
    "apps.skills",
    "apps.projects",
    "apps.proposals",
    "apps.portfolio",
    "apps.chat",
    "apps.analytics",
    "apps.recommendations",
    "apps.notifications",
    "apps.payments",
    "apps.reviews",
    "apps.dashboard",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "apps.core.middleware.RequestLogMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# Database

DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default=f"sqlite:///{(BASE_DIR / 'db.sqlite3').as_posix()}",
    ),
}

# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization

LANGUAGE_CODE = "en-us"
TIME_ZONE = env("DJANGO_TIME_ZONE", default="UTC")
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom user model

AUTH_USER_MODEL = "users.User"

# CORS / CSRF

CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS",
    default=["http://localhost:5173", "http://127.0.0.1:5173"],
)
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

# DRF

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_PAGINATION_CLASS": "apps.core.pagination.StandardResultsSetPagination",
    "PAGE_SIZE": env.int("API_PAGE_SIZE", default=20),
    "DEFAULT_FILTER_BACKENDS": (
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ),
    "DEFAULT_THROTTLE_CLASSES": (
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ),
    "DEFAULT_THROTTLE_RATES": {
        "anon": env("API_THROTTLE_ANON", default="60/min"),
        "user": env("API_THROTTLE_USER", default="600/min"),
    },
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "EXCEPTION_HANDLER": "apps.core.exceptions.drf_exception_handler",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "GigPulse API",
    "DESCRIPTION": "Freelancer marketplace + market-demand analytics backend.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

# JWT

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=env.int("JWT_ACCESS_MINUTES", default=15)),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=env.int("JWT_REFRESH_DAYS", default=7)),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "SIGNING_KEY": SECRET_KEY,
}

# Email

DEFAULT_FROM_EMAIL = env("EMAIL_FROM_ADDRESS", default="noreply@gigpulse.local")
EMAIL_BACKEND = env(
    "EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",
)

FRONTEND_BASE_URL = env("FRONTEND_BASE_URL", default="http://localhost:5173")

# Redis / cache / channels

REDIS_URL = env("REDIS_URL", default="redis://127.0.0.1:6379/0")


def build_caches_and_channels(*, use_redis: bool, redis_url: str) -> tuple[dict, dict]:
    if use_redis:
        caches = {
            "default": {
                "BACKEND": "django_redis.cache.RedisCache",
                "LOCATION": redis_url,
                "OPTIONS": {
                    "CLIENT_CLASS": "django_redis.client.DefaultClient",
                },
                "TIMEOUT": env.int("CACHE_DEFAULT_TIMEOUT", default=60),
            }
        }
        channel_layers = {
            "default": {
                "BACKEND": "channels_redis.core.RedisChannelLayer",
                "CONFIG": {"hosts": [redis_url]},
            }
        }
        return caches, channel_layers

    caches = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "gigpulse-locmem",
        }
    }
    channel_layers = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}
    return caches, channel_layers


USE_REDIS = env.bool("DJANGO_USE_REDIS", default=False)
CACHES, CHANNEL_LAYERS = build_caches_and_channels(use_redis=USE_REDIS, redis_url=REDIS_URL)

# Celery

CELERY_BROKER_URL = env("CELERY_BROKER_URL", default=REDIS_URL)
CELERY_RESULT_BACKEND = env("CELERY_RESULT_BACKEND", default=REDIS_URL)
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = TIME_ZONE
CELERY_TASK_ALWAYS_EAGER = env.bool("CELERY_TASK_ALWAYS_EAGER", default=False)
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = env.int("CELERY_TASK_TIME_LIMIT", default=30 * 60)

CELERY_BEAT_SCHEDULE = {
    "analytics-daily-market-metrics": {
        "task": "apps.analytics.tasks.compute_daily_market_metrics",
        "schedule": crontab(hour=2, minute=0),
    }
}

# Storage (local by default; override in aws.py)

STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}
