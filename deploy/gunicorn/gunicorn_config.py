import multiprocessing
import os.path
import sys
from os import path, environ as os_environ

import environ as dj_environ
#from helpful import read_env_file_and_set_from_venv, isDev, getEnv

# УТОЧНЕНИЯ
# Путь к файлу с переменными окружениями
sys.path.append('/gamovibased/src')
from config.settings.components import BASE_DIR, env

# PATH_ENV = "/".join(__file__.split('/')[:-3])
# # Чтение файла с переменными окружениями и добавление этих данных в ПО  `Python`
# read_env_file_and_set_from_venv(path.join(PATH_ENV, "__env.env"))
# Слушать указанный ip адрес и порт  '<10.130.0.34:8001>'. Но лучше указать UDS сокет 'unix:/run/gunicorn.sock'
# bind = f"0.0.0.0:{getEnv('EXTERNAL_WEB_PORT')}"
#bind = f"unix:{getEnv('WORK_DIR')}/deploy/gunicorn/gunicorn.sock"
bind = f"0.0.0.0:{env('EXTERNAL_WEB_PORT')}"
print(bind)
wsgi_app = '{0}.wsgi:application'.format(env('DJ_PROJ'))

# ПРОИЗВОДИТЕЛЬНОСТЬ
# Количество рабочих процессов для обработки запросов.
# Оптимально установить количество процессов по формуле `2-(4xЯдерЦпу)`
#workers = multiprocessing.cpu_count() * 2 + 1
# Этот параметр используется для ограничения количества заголовков в запросе - предотвратить DDOS-атаку.
#limit_request_fields = 32000
# Ограничьте допустимый размер поля заголовка HTTP-запроса.
#limit_request_field_size = 0
# Максимальное количество одновременных клиентов
#worker_connections = 2000

# ДРУГОЕ
# Авто перезагрузка сервера при изменении файлов проекта `Django`
ROOT_DIR = env('DJ_PROJ')
# reload = isDev()
# Путь для вывода лог данных
#accesslog = BASE_DIR / f"{ROOT_DIR}/gunicorn_ass.log"  # !!! ПРОВЕРИТЬ ПУТИ ЛОГОВ
# Путь для вывода ошибок
#errorlog = BASE_DIR / f"{ROOT_DIR}/gunicorn_err.log"  # !!! ПРОВЕРИТЬ ПУТИ ЛОГОВ