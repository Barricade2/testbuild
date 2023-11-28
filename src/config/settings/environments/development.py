# SECURITY WARNING: don't run with debug turned on in production!
from config.settings.components import env
from config.settings.components.base import (
    INSTALLED_APPS,
    MIDDLEWARE,
)

DEBUG = True
print("dev")
ALLOWED_HOSTS = ['*']

# config django-debug-toolbar
INSTALLED_APPS.append('debug_toolbar')
INSTALLED_APPS.append('django_dump_load_utf8')
INTERNAL_IPS = ['127.0.0.1']
MIDDLEWARE.append('debug_toolbar.middleware.DebugToolbarMiddleware')

# disabled caches
# CACHES = {
#         'default': {
#             'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
#         }
#     }

# config statics
COMPRESS_ENABLED = False
HTML_MINIFY = False
KEEP_COMMENTS_ON_MINIFYING = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

SECURE_HSTS_PRELOAD             = False
SECURE_HSTS_INCLUDE_SUBDOMAINS  = False
# CORS_REPLACE_HTTPS_REFERER      = False
HOST_SCHEME                     = "http://"
SECURE_PROXY_SSL_HEADER         = None
SECURE_SSL_REDIRECT             = False
CSRF_COOKIE_SECURE              = False
SESSION_COOKIE_SECURE           = False
SECURE_HSTS_SECONDS             = None
SECURE_HSTS_INCLUDE_SUBDOMAINS  = False
SECURE_FRAME_DENY               = False

CORS_ALLOWED_ALLOW_ORIGINS = True