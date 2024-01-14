FROM python:3.10.9-slim as base
# ex: docker build --build-arg WORK_DIR=/src --build-arg NAME_APP=gamovibased --build-arg DJ_PROJ=config .
ARG NAME_APP
ARG WORK_DIR
ARG DJ_PROJ

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1 \
    NAME_APP="gamovibased" \
    WORK_DIR="/src" \
    DJ_PROJ="config" \
    EXTERNAL_WEB_PORT="80"\
    INTERNAL_WEB_PORT="80"
    # make poetry install to this location
    #POETRY_HOME="/gamovibased/poetry" \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    #POETRY_VIRTUALENVS_IN_PROJECT=true \
    #VENV_PATH="/gamovibased/.venv"

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:/root/.poetry/bin:/root/.local/bin/:$PATH"

WORKDIR /$NAME_APP
#WORKDIR /gamovibased
# /usr/src/gamovibased

#RUN echo "IS_DEPLOY=1" > /$NAME_APP/IS_DEPLOY2.txt

#FROM scratch  AS export-stage
#COPY --from=base /gamovibased/IS_DEPLOY2.txt /data/IS_DEPLOY2.txt/

FROM base as builder
WORKDIR /$NAME_APP
ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.6.1

#RUN apk add --no-cache gcc libffi-dev musl-dev postgresql-dev
RUN apt-get update && \
    apt-get -y install libpq-dev gcc  &&  \
    apt-get -y install gettext &&  \
    pip install --no-cache-dir --upgrade pip && \
    pip install "poetry==$POETRY_VERSION"
    #curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python --version $POETRY_VERSION

COPY pyproject.toml poetry.lock /${NAME_APP}/
COPY ./deploy/entrypoint.sh /${NAME_APP}/deploy/entrypoint.sh
COPY ./deploy/gunicorn/gunicorn.sh /${NAME_APP}/deploy/gunicorn/gunicorn.sh
COPY . /${NAME_APP}
# COPY . .

RUN poetry config virtualenvs.in-project false && \
    #poetry config virtualenvs.create false && \
    poetry install --only=main --no-interaction --no-ansi --no-root && \
    chmod +x /${NAME_APP}/deploy/entrypoint.sh && \
    chmod +x /${NAME_APP}/deploy/gunicorn/gunicorn.sh && \
    echo "IS_DEPLOY=1" > /$NAME_APP/IS_DEPLOY.txt

Run . $(poetry env info --path)/bin/activate && \
    python /${NAME_APP}/${WORK_DIR}/manage.py makemigrations --no-input && \
    python /${NAME_APP}/${WORK_DIR}/manage.py migrate --no-input && \
    python /${NAME_APP}/${WORK_DIR}/manage.py collectstatic --noinput --clear &&  \
    python /${NAME_APP}/${WORK_DIR}/manage.py makemessages -l ru &&  \
    python /${NAME_APP}/${WORK_DIR}/manage.py compilemessages &&
#RUN poetry build && /venv/bin/pip install dist/*.whl
#    source $VENV_PATH/bin/poetry
#FROM base as final
#COPY --from=builder /$NAME_APP /$NAME_APP
#WORKDIR /$NAME_APP

ENTRYPOINT sh /${NAME_APP}/deploy/entrypoint.sh
#CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]