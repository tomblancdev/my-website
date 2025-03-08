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
