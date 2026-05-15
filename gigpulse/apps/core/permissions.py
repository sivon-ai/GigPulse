from __future__ import annotations

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsFreelancer(BasePermission):
    def has_permission(self, request, view) -> bool:
        user = getattr(request, "user", None)
        return bool(user and user.is_authenticated and getattr(user, "role", None) == "freelancer")


class IsClient(BasePermission):
    def has_permission(self, request, view) -> bool:
        user = getattr(request, "user", None)
        return bool(user and user.is_authenticated and getattr(user, "role", None) == "client")


class IsAdminRole(BasePermission):
    def has_permission(self, request, view) -> bool:
        user = getattr(request, "user", None)
        return bool(user and user.is_authenticated and getattr(user, "role", None) == "admin")


class IsOwnerOrReadOnly(BasePermission):
    """Requires obj.owner == request.user for unsafe methods."""

    owner_field = "owner"

    def has_object_permission(self, request, view, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        owner = getattr(obj, self.owner_field, None)
        return bool(owner and owner == request.user)
