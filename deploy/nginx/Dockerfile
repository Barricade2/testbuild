FROM nginx:alpine
# ex: docker build --build-arg NAME_APP=gamovibased .
ARG NAME_APP
WORKDIR /$NAME_APP

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf.template /etc/nginx/templates/default.conf.template