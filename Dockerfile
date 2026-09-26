FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html privacy-policy.html i18n.js translations.json /usr/share/nginx/html/
