# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
#AUTH_USER_MODEL = 'app.profile.Profile'
from config.settings.components import env

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env("DB_NAME"),
        'USER': env("DB_USER"),
        'PASSWORD': env("DB_PASSWORD"),
        'HOST':  env("DB_HOST"),
        'PORT':  env("DB_PORT"),
    }
}