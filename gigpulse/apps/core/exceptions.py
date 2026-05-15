from __future__ import annotations

from typing import Any

from rest_framework.views import exception_handler


def drf_exception_handler(exc: Exception, context: dict[str, Any]):
    """Normalize DRF errors into a predictable envelope.

    This avoids frontend conditionals across many error shapes.
    """

    response = exception_handler(exc, context)
    if response is None:
        return None

    data = response.data

    response.data = {
        "status_code": response.status_code,
        "errors": data,
    }
    return response
