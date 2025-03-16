from django.utils.translation import gettext_lazy as _

MIDDLEWARE = [
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
]

TEMPLATES_OPTIONS_context_processors = [
    "wagtail.contrib.settings.context_processors.settings",
]

THIRD_PARTY_APPS = [
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    # "wagtail.users",
    # "wagtail.locales",
    "wagtail_localize",
    "wagtail_localize.locales",  # This replaces "wagtail.locales"
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail.admin",
    "wagtail.contrib.settings",
    "wagtail",
    "taggit",
    "modelcluster",
]

WAGTAILADMIN_BASE_URL = "cms-admin"
WAGTAIL_SITE_NAME = "My Site"

WAGTAIL_I18N_ENABLED = True
WAGTAIL_CONTENT_LANGUAGES = [
    ("en", _("English")),
    ("fr", _("French")),
]
