from django.utils.translation import gettext as _
from wagtail.blocks import CharBlock
from wagtail.blocks import IntegerBlock
from wagtail.blocks import StructBlock


class LastPostsBlock(StructBlock):
    title = CharBlock(default=_("Last Posts"))
    number_of_posts = IntegerBlock(default=5)

    class Meta:
        template = "cms/blocks/last_posts.html"
        icon = "list-ul"
        label = "Last Posts"

    def get_context(self, value, parent_context=None):
        from wagtail.models import Locale

        from my_website.cms.models import BlogPage

        active_language = Locale.get_active()

        ctx = super().get_context(value, parent_context)
        ctx["posts"] = (
            BlogPage.objects.live()
            .filter(locale=active_language)
            .order_by("-first_published_at")[: value["number_of_posts"]]
        )

        return ctx
