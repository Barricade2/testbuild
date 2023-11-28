from django.apps import AppConfig


class MainConfig(AppConfig):
    name = 'app.main' # full path to app
    label = 'main' # unique name for project
    verbose_name = 'MainApp' # for administratation, human-readable
