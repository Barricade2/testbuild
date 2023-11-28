import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from config.settings.components import env

#sentry monitoring
sentry_sdk.init(
    dsn=env("SENTRY_DSN"),
    integrations=[DjangoIntegration()],
    send_default_pii=True,
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
    environment= env("DJANGO_ENV") or "development"
)