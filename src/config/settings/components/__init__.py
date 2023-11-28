from os import environ as os_environ
from pathlib import Path

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent.parent

env = environ.Env()
environ.Env.read_env(env_file = BASE_DIR / "config/.env")

os_environ.setdefault('DJANGO_ENV', env("DJANGO_ENV"))
ENV = os_environ.get('DJANGO_ENV')