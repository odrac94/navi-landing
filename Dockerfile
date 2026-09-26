FROM nginx:stable-alpine

COPY index.html privacy-policy.html i18n.js translations.json /usr/share/nginx/html/
