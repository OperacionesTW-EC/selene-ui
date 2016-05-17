FROM nginx
COPY ./dist /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/assets
COPY ./assets /usr/share/nginx/html/assets
