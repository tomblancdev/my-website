import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _
from wagtail.users.apps import WagtailUsersAppConfig


class UsersConfig(AppConfig):
    name = "my_website.users"
    verbose_name = _("Users")

    def ready(self):
        with contextlib.suppress(ImportError):
            import my_website.users.signals  # noqa: F401


class CustomWagtailUsersAppConfig(WagtailUsersAppConfig):
    user_viewset = "my_website.users.viewsets.UserViewSet"
