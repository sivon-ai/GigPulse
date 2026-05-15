from __future__ import annotations

import logging
import time

request_logger = logging.getLogger("gigpulse.request")


class RequestLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.monotonic()
        response = self.get_response(request)
        elapsed_ms = (time.monotonic() - start) * 1000

        request_logger.info(
            "%s %s %s %.2fms",
            request.method,
            request.get_full_path(),
            getattr(response, "status_code", "-"),
            elapsed_ms,
        )

        return response
