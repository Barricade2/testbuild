FROM nginx
# ex: docker build --build-arg NAME_APP=gamovibased .

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf.template /etc/nginx/templates/default.conf.template