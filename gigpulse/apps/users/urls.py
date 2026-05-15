from __future__ import annotations

from django.urls import path
from .views import CookieTokenRefreshView

from .views import (
    LoginView,
    LogoutView,
    MeView,
    PasswordChangeView,
    PasswordForgotView,
    PasswordResetConfirmView,
    PublicProfileView,
    RegisterView,
    VerifyEmailConfirmView,
    VerifyEmailRequestView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
    path("verify-email/request/", VerifyEmailRequestView.as_view(), name="verify_email_request"),
    path("verify-email/confirm/", VerifyEmailConfirmView.as_view(), name="verify_email_confirm"),
    path("password/forgot/", PasswordForgotView.as_view(), name="password_forgot"),
    path("password/reset/", PasswordResetConfirmView.as_view(), name="password_reset"),
    path("password/change/", PasswordChangeView.as_view(), name="password_change"),
    path("profiles/<slug:username>/", PublicProfileView.as_view(), name="public_profile"),
]
