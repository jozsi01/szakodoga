FROM nginx:stable-alpine
EXPOSE 8080
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html/

