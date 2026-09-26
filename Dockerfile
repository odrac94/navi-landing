FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html privacy-policy.html robots.txt sitemap.xml /usr/share/nginx/html/
# assets/ y es/ se generan con `npm run build` y se versionan (el VPS no necesita Node)
COPY es/ /usr/share/nginx/html/es/
COPY assets/ /usr/share/nginx/html/assets/
COPY skins/ /usr/share/nginx/html/skins/
