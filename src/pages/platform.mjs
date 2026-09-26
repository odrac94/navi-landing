// Plantilla de las guías por plataforma (Spotify, YouTube Music, Apple Music).
// El contenido de cada una vive en platforms.mjs; aquí solo la estructura.
import { CWS_URL, ROUTES, SITE } from './routes.mjs';
import { cards, ctaButton, escape, faq, related, section } from './layout.mjs';

const T = {
  en: {
    howTo: (p) => `How to get floating lyrics on ${p}`,
    features: (p) => `What Navi Lyrics does on ${p}`,
    goodToKnow: 'Good to know',
    troubleshooting: 'Troubleshooting',
    faq: 'Questions about',
    related: 'Other guides',
    demoTitle: 'Navi Lyrics live preview',
    demoCaption: 'Live preview of the floating window (demo song).',
    open: (p) => `Open ${p}`,
    labels: { spotify: 'Spotify', youtubeMusic: 'YouTube Music', appleMusic: 'Apple Music', about: 'About Navi Lyrics', changelog: 'Changelog' },
  },
  es: {
    howTo: (p) => `Cómo tener letras flotantes en ${p}`,
    features: (p) => `Qué hace Navi Lyrics en ${p}`,
    goodToKnow: 'Lo que debes saber',
    troubleshooting: 'Solución de problemas',
    faq: 'Preguntas sobre',
    related: 'Otras guías',
    demoTitle: 'Vista en vivo de Navi Lyrics',
    demoCaption: 'Vista en vivo de la ventana flotante (canción de demostración).',
    open: (p) => `Abrir ${p}`,
    labels: { spotify: 'Spotify', youtubeMusic: 'YouTube Music', appleMusic: 'Apple Music', about: 'Acerca de Navi Lyrics', changelog: 'Novedades' },
  },
};

/**
 * @param {'en'|'es'} lang
 * @param {object} d  contenido de la plataforma en ese idioma (ver platforms.mjs)
 */
export function platformBody(lang, id, d) {
  const t = T[lang];
  const others = ['spotify', 'youtubeMusic', 'appleMusic'].filter((x) => x !== id);

  return `            <header class="max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                <div class="lg:col-span-7">
                    <p class="text-xs uppercase tracking-widest text-primary mb-3">${escape(d.eyebrow)}</p>
                    <h1 class="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">${d.h1}</h1>
                    <p class="text-base sm:text-lg text-gray-300 leading-relaxed">${d.lead}</p>
                    <div class="mt-8 flex flex-col sm:flex-row gap-3">
                        ${ctaButton(lang)}
                        <a class="glass-panel inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium text-white hover:bg-white/10 transition-colors" href="${d.siteUrl}" target="_blank" rel="noopener nofollow">
                            <span class="material-icons mr-2 text-gray-400" aria-hidden="true">open_in_new</span>${escape(t.open(d.siteName))}
                        </a>
                    </div>
                </div>
                <figure class="lg:col-span-5 mt-10 lg:mt-0 mx-auto w-full max-w-[400px]">
                    <div class="rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/60 bg-black">
                        <iframe src="/skins/demo.html?skin=navi&amp;theme=${d.demoTheme}&amp;lang=${lang}" title="${escape(t.demoTitle)}" class="block w-full h-[460px] border-0" loading="lazy"></iframe>
                    </div>
                    <figcaption class="mt-3 text-center text-xs text-gray-500">${escape(t.demoCaption)}</figcaption>
                </figure>
            </header>

${section('how-to', escape(t.howTo(d.siteName)), `                    <ol>
${d.steps.map((s) => `                        <li>${s}</li>`).join('\n')}
                    </ol>`)}

${cards('features', escape(t.features(d.siteName)), d.features)}

${section('good-to-know', escape(t.goodToKnow), `                    <ul>
${d.limits.map((s) => `                        <li>${s}</li>`).join('\n')}
                    </ul>`)}

${section('troubleshooting', escape(t.troubleshooting), d.troubleshooting.map((x) => `                    <h3>${x.title}</h3>
                    <p>${x.text}</p>`).join('\n'))}

${faq(`${escape(t.faq)} ${escape(d.siteName)}`, d.faq)}

${related(lang, escape(t.related), [...others, 'about', 'changelog'], t.labels)}`;
}

/** JSON-LD de la guía: WebPage sobre la app */
export const platformJsonLd = (lang, id, d) => [
  {
    '@type': 'WebPage',
    '@id': `${SITE}${ROUTES[id][lang]}#webpage`,
    url: SITE + ROUTES[id][lang],
    name: d.title,
    description: d.description,
    inLanguage: lang,
    about: { '@id': `${SITE}/#app` },
    isPartOf: { '@id': `${SITE}/#website` },
    potentialAction: { '@type': 'InstallAction', target: CWS_URL },
  },
];
