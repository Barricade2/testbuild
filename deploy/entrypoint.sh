#! /bin/bash
# Dockerfile
# ENTRYPOINT [ "deploy/entrypoint.sh" ]

#cd /${NAME_APP}/${WORK_DIR}/
echo "DJANGO_ENV is 0"

export $(grep -v '^#' /gamovibased/src/config/.env | xargs) # .env.prod for production
# Запустить скрипт для запуска сервера gunicorn / Run gunicorn script
sh /gamovibased/deploy/gunicorn/gunicorn.sh







# Запустить сервер django
#python manage.py runserver 0.0.0.0:${EXTERNAL_WEB_PORT}

# Путь к `WSGI` приложению находится в gunicorn.conf.py
#gunicorn --chdir /${NAME_APP}/${WORK_DIR}/ -c $(pwd)/deploy/gunicorn/gunicorn.conf.py

