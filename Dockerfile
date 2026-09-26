FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Páginas: index.html se edita a mano; el resto (y es/, assets/site.css, sitemap.xml)
# lo genera `npm run build` y se versiona, así el VPS no necesita Node.
COPY *.html robots.txt sitemap.xml /usr/share/nginx/html/
COPY es/ /usr/share/nginx/html/es/
COPY assets/ /usr/share/nginx/html/assets/
COPY skins/ /usr/share/nginx/html/skins/
