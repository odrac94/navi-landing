// Layout común de las páginas generadas (todo menos la home).
import { CWS_URL, ROUTES, SITE } from './routes.mjs';

const UI = {
  en: {
    ogLocale: 'en_US',
    otherOgLocale: 'es_MX',
    navFaq: 'FAQ',
    getExtension: 'Get Extension',
    addChrome: 'Add to Chrome',
    footerGuides: 'Guides',
    footerProject: 'Navi Lyrics',
    linkSpotify: 'Floating lyrics for Spotify',
    linkYoutubeMusic: 'Floating lyrics for YouTube Music',
    linkAppleMusic: 'Floating lyrics for Apple Music',
    linkAbout: 'About',
    linkChangelog: 'Changelog',
    linkPrivacy: 'Privacy policy',
    linkStore: 'Chrome Web Store',
    linkCoffee: 'Support the project',
    copyright: '© 2026 Navi Lyrics by Ivan Delfin. Not affiliated with Spotify, YouTube or Apple.',
    poweredBy: 'Lyrics graciously powered by',
    home: 'Home',
    suggestText: '¿Prefieres leer en español?',
    suggestCta: 'Ver en español',
    suggestClose: 'Cerrar',
    skipLink: 'Skip to content',
  },
  es: {
    ogLocale: 'es_MX',
    otherOgLocale: 'en_US',
    navFaq: 'Preguntas',
    getExtension: 'Obtener extensión',
    addChrome: 'Agregar a Chrome',
    footerGuides: 'Guías',
    footerProject: 'Navi Lyrics',
    linkSpotify: 'Letras flotantes para Spotify',
    linkYoutubeMusic: 'Letras flotantes para YouTube Music',
    linkAppleMusic: 'Letras flotantes para Apple Music',
    linkAbout: 'Acerca de',
    linkChangelog: 'Novedades',
    linkPrivacy: 'Política de privacidad',
    linkStore: 'Chrome Web Store',
    linkCoffee: 'Apoya el proyecto',
    copyright: '© 2026 Navi Lyrics, por Ivan Delfin. Sin afiliación con Spotify, YouTube ni Apple.',
    poweredBy: 'Letras gracias a la increíble',
    home: 'Inicio',
    suggestText: 'Prefer to read in English?',
    suggestCta: 'View in English',
    suggestClose: 'Close',
    skipLink: 'Saltar al contenido',
  },
};

export const ui = (lang) => UI[lang];

export const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const other = (lang) => (lang === 'en' ? 'es' : 'en');

/** Botón principal "Agregar a Chrome" */
export const ctaButton = (lang) => `<a class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-bold text-black bg-primary hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(13,242,242,0.4)] hover:shadow-[0_0_30px_rgba(13,242,242,0.6)]" href="${CWS_URL}" target="_blank" rel="noopener">
                    <span class="material-icons mr-2" aria-hidden="true">add_to_queue</span>${escape(UI[lang].addChrome)}
                </a>`;

/**
 * @param {object} p
 * @param {'en'|'es'} p.lang
 * @param {string} p.id          clave de ROUTES
 * @param {string} p.title       <title> y og:title
 * @param {string} p.description meta description
 * @param {string} p.body        HTML de <main>
 * @param {object[]} [p.jsonLd]  nodos extra para el @graph
 * @param {string} [p.breadcrumb] nombre corto de la página para BreadcrumbList
 * @param {boolean} [p.noindex]
 */
export function renderPage({ lang, id, title, description, body, jsonLd = [], breadcrumb, noindex = false }) {
  const t = UI[lang];
  const route = ROUTES[id] ?? ROUTES.home; // la 404 no tiene ruta propia
  const url = SITE + route[lang];
  const otherLang = other(lang);
  const home = ROUTES.home[lang];

  const graph = [
    ...(breadcrumb
      ? [{
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t.home, item: SITE + home },
            { '@type': 'ListItem', position: 2, name: breadcrumb, item: url },
          ],
        }]
      : []),
    ...jsonLd,
  ];

  const alternates = noindex ? '' : `
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="${SITE}${route.en}" />
    <link rel="alternate" hreflang="es" href="${SITE}${route.es}" />
    <link rel="alternate" hreflang="x-default" href="${SITE}${route.en}" />`;

  const navLink = (target, label) => {
    const current = target === id;
    return `<a class="${current ? 'text-primary' : 'text-gray-300 hover:text-primary'} px-3 py-2 rounded-md text-sm font-medium transition-colors" href="${ROUTES[target][lang]}"${current ? ' aria-current="page"' : ''}>${label}</a>`;
  };
  const footerLink = (target, label) =>
    `<li><a class="text-gray-400 hover:text-primary transition-colors" href="${ROUTES[target][lang]}">${escape(label)}</a></li>`;

  return `<!DOCTYPE html>
<!-- GENERADO por scripts/build-pages.mjs (src/pages/). No editar a mano. -->
<html class="dark overflow-x-hidden" lang="${lang}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />${noindex ? '\n    <meta name="robots" content="noindex" />' : ''}${alternates}
    <meta name="theme-color" content="#0a192f" />
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/icon-96.png" />
    <link rel="icon" type="image/png" sizes="48x48" href="/assets/icon-48.png" />
    <link rel="apple-touch-icon" href="/assets/icon-128.png" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Navi Lyrics" />
    <meta property="og:locale" content="${t.ogLocale}" />
    <meta property="og:locale:alternate" content="${t.otherOgLocale}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:image" content="${SITE}/assets/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@navilyrics_" />
${graph.length ? `
    <script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 4).replace(/^/gm, '    ')}
    </script>
` : ''}
    <link href="/assets/site.css" rel="stylesheet" />
</head>

<body class="bg-hero-gradient min-h-screen text-white font-display overflow-x-hidden selection:bg-primary selection:text-black">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-black">${escape(t.skipLink)}</a>

    <div class="relative w-full overflow-x-hidden">
        <div class="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
            <div class="absolute top-0 left-0 w-full h-full bg-cyber-grid cyber-grid-bg opacity-20"></div>
            <div class="blob bg-primary w-96 h-96 rounded-full top-[-100px] left-[-100px] opacity-20"></div>
            <div class="blob bg-purple-600 w-80 h-80 rounded-full bottom-0 right-0 opacity-20"></div>
        </div>

        <nav class="fixed inset-x-0 z-50 top-0">
            <div class="glass-panel mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-white/5 rounded-2xl mt-2 sm:mt-4">
                <div class="flex h-16 items-center justify-between gap-3">
                    <a class="flex-shrink-0 group" href="${home}">
                        <span class="text-2xl font-bold tracking-tighter text-white group-hover:text-primary transition-colors">Navi <span class="text-xl">Lyrics</span></span>
                    </a>
                    <div class="hidden lg:flex items-baseline gap-2">
                        ${navLink('spotify', 'Spotify')}
                        ${navLink('youtubeMusic', 'YouTube Music')}
                        ${navLink('appleMusic', 'Apple Music')}
                        <a class="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors" href="${home}#faq">${escape(t.navFaq)}</a>
                    </div>
                    <div class="lang-switch flex gap-2 items-center">
                        <a href="${route.en}" hreflang="en" lang="en" data-lang="en"${lang === 'en' ? ' aria-current="page"' : ''}>EN</a>
                        <a href="${route.es}" hreflang="es" lang="es" data-lang="es"${lang === 'es' ? ' aria-current="page"' : ''}>ES</a>
                    </div>
                    <a class="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-primary/30 rounded-lg text-sm font-medium text-primary bg-primary/10 hover:bg-primary hover:text-black transition-all duration-300 neon-glow" href="${CWS_URL}" target="_blank" rel="noopener">${escape(t.getExtension)}</a>
                </div>
            </div>
        </nav>

        <main id="main" class="relative z-10 pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
${body}
        </main>

        <footer class="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div class="max-w-5xl mx-auto py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                    <div>
                        <p class="text-xs uppercase tracking-widest text-gray-500 mb-3">${escape(t.footerGuides)}</p>
                        <ul class="space-y-2">
                            ${footerLink('spotify', t.linkSpotify)}
                            ${footerLink('youtubeMusic', t.linkYoutubeMusic)}
                            ${footerLink('appleMusic', t.linkAppleMusic)}
                        </ul>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-widest text-gray-500 mb-3">${escape(t.footerProject)}</p>
                        <ul class="space-y-2">
                            ${footerLink('about', t.linkAbout)}
                            ${footerLink('changelog', t.linkChangelog)}
                            ${footerLink('privacy', t.linkPrivacy)}
                            <li><a class="text-gray-400 hover:text-primary transition-colors" href="${CWS_URL}" target="_blank" rel="noopener">${escape(t.linkStore)}</a></li>
                            <li><a class="text-gray-400 hover:text-primary transition-colors" href="https://buymeacoffee.com/ivandelfin" target="_blank" rel="noopener">${escape(t.linkCoffee)}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="mt-8 pt-6 border-t border-white/5 text-xs text-gray-500 font-mono text-center space-y-2">
                    <p>
                        <a class="hover:text-primary transition-colors" href="https://x.com/navilyrics_" target="_blank" rel="noopener">X</a> ·
                        <a class="hover:text-primary transition-colors" href="https://www.instagram.com/navilyrics__/" target="_blank" rel="noopener">Instagram</a> ·
                        <a class="hover:text-primary transition-colors" href="https://github.com/odrac94/navi-landing" target="_blank" rel="noopener">GitHub</a>
                    </p>
                    <p>${escape(t.copyright)}</p>
                    <p>${escape(t.poweredBy)} <a class="text-primary hover:text-white underline decoration-primary/30 underline-offset-2" href="https://lrclib.net/" target="_blank" rel="noopener">LRCLIB</a>.</p>
                </div>
            </div>
        </footer>
    </div>
${noindex ? '' : `
    <div id="lang-suggest" class="fixed bottom-4 inset-x-0 z-50 px-3" hidden>
        <div class="glass-panel mx-auto w-fit max-w-full rounded-xl px-4 py-3 flex items-center gap-3 text-sm shadow-2xl" lang="${otherLang}">
            <span class="text-gray-300">${escape(t.suggestText)}</span>
            <a href="${route[otherLang]}" hreflang="${otherLang}" data-lang="${otherLang}" class="font-bold text-primary hover:text-white transition-colors whitespace-nowrap">${escape(t.suggestCta)}</a>
            <button type="button" id="lang-suggest-close" class="text-gray-400 hover:text-white transition-colors flex" aria-label="${escape(t.suggestClose)}">
                <span class="material-icons text-lg" aria-hidden="true">close</span>
            </button>
        </div>
    </div>`}

    <script>
        (function () {
            var page = document.documentElement.lang;
            var other = page === 'es' ? 'en' : 'es';
            var save = function (l) { try { localStorage.setItem('navi-language', l); } catch (e) {} };
            var stored = null;
            try { stored = localStorage.getItem('navi-language'); } catch (e) {}
            document.querySelectorAll('a[data-lang]').forEach(function (a) {
                a.addEventListener('click', function () { save(a.getAttribute('data-lang')); });
            });
            var box = document.getElementById('lang-suggest');
            if (!box) return;
            var browser = ((navigator.languages && navigator.languages[0]) || navigator.language || '').slice(0, 2).toLowerCase();
            if (stored === page || (stored !== other && browser !== other)) return;
            box.hidden = false;
            document.getElementById('lang-suggest-close').addEventListener('click', function () {
                box.hidden = true;
                save(page);
            });
        })();
    </script>
</body>

</html>
`;
}

// ---------- Bloques reutilizables para el contenido ----------

/** Sección con título y HTML libre en estilo prosa */
export const section = (id, title, html) => `            <section id="${id}" class="max-w-3xl mx-auto mt-10 sm:mt-14">
                <div class="glass-panel rounded-2xl p-6 sm:p-8 prose-navi">
                    <h2>${title}</h2>
${html}
                </div>
            </section>`;

/** Rejilla de tarjetas: [{ icon, title, text }] */
export const cards = (id, title, items) => `            <section id="${id}" class="max-w-5xl mx-auto mt-10 sm:mt-14">
                <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">${title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
${items.map((c) => `                    <div class="glass-panel rounded-2xl p-6">
                        <div class="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                            <span class="material-icons text-primary text-xl" aria-hidden="true">${c.icon}</span>
                        </div>
                        <h3 class="text-lg font-bold text-white mb-2">${c.title}</h3>
                        <p class="text-sm sm:text-base text-gray-400 leading-relaxed">${c.text}</p>
                    </div>`).join('\n')}
                </div>
            </section>`;

/** Preguntas frecuentes con <details>: [{ q, a }] */
export const faq = (title, items) => `            <section id="faq" class="max-w-3xl mx-auto mt-10 sm:mt-14">
                <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">${title}</h2>
                <div class="flex flex-col gap-3">
${items.map((it) => `                    <details class="faq-item glass-panel rounded-xl group">
                        <summary class="flex items-center justify-between gap-4 cursor-pointer list-none p-4 sm:p-5">
                            <h3 class="text-base sm:text-lg font-bold text-white">${it.q}</h3>
                            <span class="material-icons text-primary transition-transform duration-300 group-open:rotate-45" aria-hidden="true">add</span>
                        </summary>
                        <p class="px-4 sm:px-5 pb-4 sm:pb-5 -mt-1 text-sm sm:text-base text-gray-400 leading-relaxed">${it.a}</p>
                    </details>`).join('\n')}
                </div>
            </section>`;

/** Enlaces a otras guías al final de la página */
export const related = (lang, title, ids, labels) => `            <section class="max-w-3xl mx-auto mt-10 sm:mt-14 text-center">
                <h2 class="text-xs uppercase tracking-widest text-gray-500 mb-4">${title}</h2>
                <div class="flex flex-wrap justify-center gap-3">
${ids.map((i) => `                    <a class="glass-panel rounded-full px-4 py-2 text-sm text-gray-300 hover:text-primary hover:border-primary/50 transition-colors" href="${ROUTES[i][lang]}">${labels[i]}</a>`).join('\n')}
                </div>
            </section>`;
