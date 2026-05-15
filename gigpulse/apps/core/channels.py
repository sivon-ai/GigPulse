from __future__ import annotations

from urllib.parse import parse_qs

from asgiref.sync import sync_to_async
from channels.auth import AuthMiddlewareStack
from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken


@sync_to_async
def _get_user(user_id: int):
    User = get_user_model()
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        scope = dict(scope)

        token = None

        headers = dict(scope.get("headers", []))
        auth_header = headers.get(b"authorization")
        if auth_header:
            try:
                value = auth_header.decode("utf-8")
                if value.lower().startswith("bearer "):
                    token = value.split(" ", 1)[1].strip()
            except Exception:
                token = None

        if token is None:
            qs = parse_qs(scope.get("query_string", b"").decode("utf-8"))
            token = qs.get("token", [None])[0]

        if token:
            try:
                access = AccessToken(token)
                user_id = access.get("user_id")
                scope["user"] = await _get_user(int(user_id)) if user_id else AnonymousUser()
            except (TokenError, ValueError, TypeError):
                scope["user"] = AnonymousUser()
        else:
            scope.setdefault("user", AnonymousUser())

        return await super().__call__(scope, receive, send)


def JWTAuthMiddlewareStack(inner):
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))
