"""
This is a django-split-settings main file.
Default environment is `developement`.
To change settings file:
set var in env os.
'export DJANGO_ENV=${DJANGO_ENV}' in sh script
`DJANGO_ENV=production python manage.py runserver`
"""

from split_settings.tools import include, optional

from config.settings.components import ENV
print(ENV)
base_settings = [
    'components/base.py',       # standard django settings
    # 'components/database.py',
    # 'components/cache.py',
    # 'components/email.py',
    # 'components/tracking.py',
    # 'components/*.py'
    'environments/{0}.py'.format(ENV),
    optional('environments/local.py'),
]

include(*base_settings)