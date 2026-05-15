from __future__ import annotations

from channels.routing import URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from apps.core.channels import JWTAuthMiddlewareStack
from apps.chat.routing import websocket_urlpatterns as chat_websocket_urlpatterns
from apps.notifications.routing import websocket_urlpatterns as notifications_websocket_urlpatterns

websocket_urlpatterns = chat_websocket_urlpatterns + notifications_websocket_urlpatterns

application = AllowedHostsOriginValidator(
    JWTAuthMiddlewareStack(
        URLRouter(websocket_urlpatterns),
    )
)
