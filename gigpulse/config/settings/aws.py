from __future__ import annotations

from django.core.exceptions import ImproperlyConfigured

from .production import *  # noqa: F403

AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME", default="")  # noqa: F405
if not AWS_STORAGE_BUCKET_NAME:
    raise ImproperlyConfigured("AWS_STORAGE_BUCKET_NAME is required when using aws settings.")

AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME", default="us-east-1")  # noqa: F405
AWS_S3_CUSTOM_DOMAIN = env(
    "AWS_S3_CUSTOM_DOMAIN",
    default=f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com",
)  # noqa: F405

AWS_DEFAULT_ACL = None
AWS_QUERYSTRING_AUTH = env.bool("AWS_QUERYSTRING_AUTH", default=False)  # noqa: F405
AWS_S3_FILE_OVERWRITE = False

AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": env(
        "AWS_S3_CACHE_CONTROL",
        default="max-age=86400",
    )
}

AWS_LOCATION = env("AWS_LOCATION", default="")  # noqa: F405

STORAGES = {
    "default": {"BACKEND": "apps.core.storages.MediaStorage"},
    "staticfiles": {"BACKEND": "apps.core.storages.StaticStorage"},
}

STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}static/"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}media/"
