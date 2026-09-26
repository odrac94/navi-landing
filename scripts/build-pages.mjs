// Genera las páginas de contenido (guías por plataforma, about, changelog,
// privacidad y 404) en inglés y español, más sitemap.xml.
// La home (index.html / es/index.html) la maneja build-i18n.mjs.
//
// Uso: node scripts/build-pages.mjs   (lo corre `npm run build`)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, SITE, fileFor } from '../src/pages/routes.mjs';
import { renderPage } from '../src/pages/layout.mjs';
import { PLATFORMS } from '../src/pages/platforms.mjs';
import { platformBody, platformJsonLd } from '../src/pages/platform.mjs';
import { ABOUT, aboutJsonLd } from '../src/pages/about.mjs';
import { RELEASES, changelogBody, changelogJsonLd, changelogMeta } from '../src/pages/changelog.mjs';
import { privacyBody, privacyJsonLd, privacyMeta } from '../src/pages/privacy.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'es'];

// Fecha de última modificación de cada página (para el sitemap). Actualizar al
// cambiar el contenido de una página; changelog usa la fecha de la última versión.
const LASTMOD = {
  home: '2026-09-26',
  spotify: '2026-09-26',
  youtubeMusic: '2026-09-26',
  appleMusic: '2026-09-26',
  about: '2026-09-26',
  changelog: RELEASES[0].date,
  privacy: '2026-09-26',
};

const pages = [];
for (const lang of LANGS) {
  for (const [id, data] of Object.entries(PLATFORMS)) {
    const d = data[lang];
    pages.push({
      id, lang,
      html: renderPage({ lang, id, title: d.title, description: d.description, breadcrumb: d.breadcrumb, body: platformBody(lang, id, d), jsonLd: platformJsonLd(lang, id, d) }),
    });
  }

  const a = ABOUT[lang];
  pages.push({ id: 'about', lang, html: renderPage({ lang, id: 'about', title: a.title, description: a.description, breadcrumb: a.breadcrumb, body: a.body(lang), jsonLd: aboutJsonLd(lang, a) }) });

  const c = changelogMeta(lang);
  pages.push({ id: 'changelog', lang, html: renderPage({ lang, id: 'changelog', title: c.title, description: c.description, breadcrumb: c.breadcrumb, body: changelogBody(lang), jsonLd: changelogJsonLd(lang) }) });

  const p = privacyMeta(lang);
  pages.push({ id: 'privacy', lang, html: renderPage({ lang, id: 'privacy', title: p.title, description: p.description, breadcrumb: p.breadcrumb, body: privacyBody(lang), jsonLd: privacyJsonLd(lang) }) });
}

for (const { id, lang, html } of pages) {
  const out = join(root, fileFor(ROUTES[id][lang]));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

// 404 (bilingüe, noindex). nginx la sirve con `error_page 404`.
writeFileSync(join(root, '404.html'), renderPage({
  lang: 'en',
  id: '404',
  title: 'Page not found — Navi Lyrics',
  description: 'This page does not exist.',
  noindex: true,
  body: `            <div class="max-w-xl mx-auto text-center py-12">
                <p class="text-7xl sm:text-8xl font-bold text-primary neon-text-glow mb-6">404</p>
                <h1 class="text-2xl sm:text-3xl font-bold mb-3">This page skipped a beat</h1>
                <p class="text-gray-400 mb-1">The page you are looking for doesn’t exist or has moved.</p>
                <p class="text-gray-500 mb-8" lang="es">La página que buscas no existe o cambió de lugar.</p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <a class="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-black bg-primary hover:bg-white transition-colors" href="/">Go to the home page</a>
                    <a class="glass-panel inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white hover:bg-white/10 transition-colors" href="/es/" lang="es" hreflang="es">Ir al inicio en español</a>
                </div>
            </div>`,
}));

// sitemap.xml con alternativas hreflang
const urlEntry = (id, lang) => `    <url>
        <loc>${SITE}${ROUTES[id][lang]}</loc>
        <lastmod>${LASTMOD[id]}</lastmod>
        <xhtml:link rel="alternate" hreflang="en" href="${SITE}${ROUTES[id].en}"/>
        <xhtml:link rel="alternate" hreflang="es" href="${SITE}${ROUTES[id].es}"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${ROUTES[id].en}"/>
    </url>`;

writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERADO por scripts/build-pages.mjs. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.keys(ROUTES).flatMap((id) => LANGS.map((lang) => urlEntry(id, lang))).join('\n')}
</urlset>
`);

console.log(`${pages.length} páginas + 404.html + sitemap.xml (${Object.keys(ROUTES).length * LANGS.length} URLs)`);
