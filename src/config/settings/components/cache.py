from config.settings.components import BASE_DIR

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': BASE_DIR / 'res/cache/djcache',
    }
}