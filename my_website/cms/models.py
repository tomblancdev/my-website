from django.db import models
from django.utils import timezone
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel
from wagtail.blocks import RichTextBlock
from wagtail.contrib.settings.models import BaseGenericSetting
from wagtail.contrib.settings.models import BaseSiteSetting
from wagtail.contrib.settings.models import register_setting
from wagtail.fields import StreamField
from wagtail.models import Page

from my_website.cms.blocks import LastPostsBlock


@register_setting(icon="globe")
class SocialMediaSettings(BaseGenericSetting):
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    email = models.EmailField(blank=True)

    panels = [
        FieldPanel("email"),
        FieldPanel("github"),
        FieldPanel("linkedin"),
    ]

    class Meta:
        verbose_name = "Social Media"


@register_setting(icon="pilcrow")
class CopyRightSettings(BaseSiteSetting):
    year = models.IntegerField(default=timezone.now().year)
    company = models.CharField(max_length=255)

    panels = [
        FieldPanel("year"),
        FieldPanel("company"),
    ]

    class Meta:
        verbose_name = "Copy Right"


@register_setting(icon="pilcrow")
class CompanyInfoSettings(BaseSiteSetting):
    company_name = models.CharField(max_length=255, blank=True)
    picture = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    quote = models.CharField(max_length=255, blank=True)

    panels = [
        FieldPanel("company_name"),
        FieldPanel("quote"),
        FieldPanel("picture"),
    ]


class HomePage(Page):
    body = StreamField(
        [("last_posts", LastPostsBlock())],
        blank=True,
        block_counts={"last_posts": {"max_num": 1}},
    )

    content_panels = [*Page.content_panels, FieldPanel("body")]

    template = "cms/pages/home_page.html"


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        "cms.BlogPage",
        related_name="tagged_items",
        on_delete=models.CASCADE,
    )


class BlogPage(Page):
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    body = StreamField(
        [
            (
                "rich_text",
                RichTextBlock(
                    icon="edit",
                    template="cms/blocks/rich_text_block.html",
                    label="Rich Text",
                    features=[
                        "h3",
                        "h4",
                        "h5",
                        "h6",
                        "bold",
                        "italic",
                        "link",
                        "ol",
                        "ul",
                        "hr",
                        "code",
                        "superscript",
                        "subscript",
                        "strikethrough",
                        "blockquote",
                        "image",
                    ],
                ),
            ),
        ],
        blank=True,
    )

    content_panels = [*Page.content_panels, FieldPanel("image"), FieldPanel("body")]

    promote_panels = [*Page.promote_panels, FieldPanel("tags")]

    parent_page_types = ["cms.HomePage"]
    template = "cms/pages/blog_page.html"
