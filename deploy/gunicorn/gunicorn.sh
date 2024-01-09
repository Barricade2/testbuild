#! /bin/bash
# docker-compose.yml
# web:
# command: bash ./docker/django/gunicorn.sh

set -o errexit
set -o nounset
#set -o pipefail # set: Illegal option -o pipefail

# We are using `gunicorn` for production, see:
# http://docs.gunicorn.org/en/stable/configure.html

# Check that $DJANGO_ENV is set to "production",
# fail otherwise, since it may break things:
# settigs.py
# from os import environ
# environ.setdefault("DJANGO_ENV", "production")
# _ENV = environ["DJANGO_ENV"]
echo "DJANGO_ENV is 1"
echo "DJANGO_ENV is $DJANGO_ENV"
if [ "$DJANGO_ENV" != 'production' ]; then
  echo 'Error: DJANGO_ENV is not set to "production".'
  echo 'Application will not start.'
  exit 1
fi

export DJANGO_ENV

# Run python specific scripts:
# Running migrations in startup script might not be the best option, see:
# docs/pages/template/production-checklist.rst
# Получить данные из файла с переменными окружения
export $(grep -v '^#' ${WORK_DIR}/${DJ_PROJ}/.env | xargs)
ls -al /gamovibased
#. /gamovibased/.venv/bin/poetry shell
. $(poetry env info --path)/bin/activate
echo "DJANGO_ENV is 2"

python /${NAME_APP}/${WORK_DIR}/manage.py makemigrations --no-input
python /${NAME_APP}/${WORK_DIR}/manage.py migrate --no-input
python /${NAME_APP}/${WORK_DIR}/manage.py collectstatic --noinput --clear
python /${NAME_APP}/${WORK_DIR}/manage.py makemessages -l ru
python /${NAME_APP}/${WORK_DIR}/manage.py compilemessages
echo "DJANGO_ENV is 3"

# Запустить gunicorn / Run gunicorn
gunicorn --chdir /${NAME_APP}/${WORK_DIR}/ --config python:deploy.gunicorn.gunicorn_config --timeout 120
echo "DJANGO_ENV is 4"

#gunicorn --chdir /${NAME_APP}/${WORK_DIR}/ -c $(pwd)/deploy/gunicorn/gunicorn.conf.py


## Precompress static files with brotli and gzip.
## The list of ignored file types was taken from https://github.com/evansd/whitenoise
#find /var/www/django/static -type f \
#  ! -regex '^.+\.\(jpg\|jpeg\|png\|gif\|webp\|zip\|gz\|tgz\|bz2\|tbz\|xz\|br\|swf\|flv\|woff\|woff2\|3gp\|3gpp\|asf\|avi\|m4v\|mov\|mp4\|mpeg\|mpg\|webm\|wmv\)$' \
#  -exec brotli --force --best {} \+ \
#  -exec gzip --force --keep --best {} \+
#
## Start gunicorn:
## Docs: http://docs.gunicorn.org/en/stable/settings.html
## Make sure it is in sync with `django/ci.sh` check:
## --chdir находится в gunicorn_config
#gunicorn --config python:docker.django.gunicorn_config config.wsgi