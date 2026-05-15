from __future__ import annotations

from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


def _join_location(prefix: str | None, suffix: str) -> str:
    prefix = (prefix or "").strip("/")
    if not prefix:
        return suffix
    return f"{prefix}/{suffix}"


class StaticStorage(S3Boto3Storage):
    location = _join_location(getattr(settings, "AWS_LOCATION", ""), "static")
    default_acl = None


class MediaStorage(S3Boto3Storage):
    location = _join_location(getattr(settings, "AWS_LOCATION", ""), "media")
    default_acl = None
    file_overwrite = False
