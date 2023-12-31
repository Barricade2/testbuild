#! /bin/bash
# Dockerfile
# ENTRYPOINT [ "deploy/entrypoint.sh" ]

#cd /${NAME_APP}/${WORK_DIR}/

export $(grep -v '^#' ${WORK_DIR}/${DJ_PROJ}/.env | xargs) # .env.prod for production
export DJANGO_ENV=${DJANGO_ENV} # entrypoint.prod.sh for production
# Запустить скрипт для запуска сервера gunicorn / Run gunicorn script
sh /${NAME_APP}/deploy/gunicorn/gunicorn.sh







# Запустить сервер django
#python manage.py runserver 0.0.0.0:${EXTERNAL_WEB_PORT}

# Путь к `WSGI` приложению находится в gunicorn.conf.py
#gunicorn --chdir /${NAME_APP}/${WORK_DIR}/ -c $(pwd)/deploy/gunicorn/gunicorn.conf.py

