FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html privacy-policy.html i18n.js translations.json robots.txt sitemap.xml /usr/share/nginx/html/
# assets/ se genera con `npm run build` y se versiona (el VPS no necesita Node)
COPY assets/ /usr/share/nginx/html/assets/
COPY skins/ /usr/share/nginx/html/skins/
