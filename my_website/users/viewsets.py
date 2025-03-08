from wagtail.users.views.users import UserViewSet as WagtailUserViewSet

from my_website.users.forms import CustomUserCreationForm
from my_website.users.forms import CustomUserEditForm


class UserViewSet(WagtailUserViewSet):
    def get_form_class(self, for_update=False):  # noqa: FBT002
        if for_update:
            return CustomUserEditForm
        return CustomUserCreationForm
