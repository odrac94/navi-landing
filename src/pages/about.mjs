// /about y /es/acerca-de
import { CWS_URL, SITE, ROUTES } from './routes.mjs';
import { ctaButton, section } from './layout.mjs';

const links = (lang) => {
  const t = lang === 'en'
    ? { store: 'Chrome Web Store', x: 'X (Twitter)', ig: 'Instagram', coffee: 'Buy Me a Coffee', gh: 'GitHub (website source code)' }
    : { store: 'Chrome Web Store', x: 'X (Twitter)', ig: 'Instagram', coffee: 'Buy Me a Coffee', gh: 'GitHub (código de este sitio web)' };
  return `                    <ul>
                        <li><a href="${CWS_URL}" target="_blank" rel="noopener">${t.store}</a></li>
                        <li><a href="https://x.com/navilyrics_" target="_blank" rel="noopener">${t.x}</a>: @navilyrics_</li>
                        <li><a href="https://www.instagram.com/navilyrics__/" target="_blank" rel="noopener">${t.ig}</a>: @navilyrics__</li>
                        <li><a href="https://buymeacoffee.com/ivandelfin" target="_blank" rel="noopener">${t.coffee}</a></li>
                        <li><a href="https://github.com/odrac94/navi-landing" target="_blank" rel="noopener">${t.gh}</a></li>
                    </ul>`;
};

export const ABOUT = {
  en: {
    title: 'About Navi Lyrics — Floating Lyrics Chrome Extension',
    description: 'Navi Lyrics is an independent Chrome extension by Ivan Delfin, from Tijuana, Mexico, that keeps synchronized lyrics in a floating window.',
    breadcrumb: 'About',
    body: (lang) => `            <header class="max-w-3xl mx-auto">
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">About <span class="text-primary neon-text-glow">Navi Lyrics</span></h1>
                <p class="text-base sm:text-lg text-gray-300 leading-relaxed">Navi Lyrics is an independent Chrome extension made by <strong class="text-white">Ivan Delfin</strong> in Tijuana, Mexico. It does one thing: it keeps the lyrics of the song you are listening to visible in a small floating window, while you do something else.</p>
            </header>

${section('what', 'What it does', `                    <p>Navi works with the web players of <a href="${ROUTES.spotify[lang]}">Spotify</a>, <a href="${ROUTES.youtubeMusic[lang]}">YouTube Music</a> and <a href="${ROUTES.appleMusic[lang]}">Apple Music</a>. It detects the song that is playing, finds its synchronized lyrics and shows them line by line in a Picture-in-Picture window that stays on top of your other windows and apps.</p>
                    <p>On top of that it can translate lyrics into 12 languages, lets you jump to any line with a click, adjust the sync, pick color themes and retro skins, and control playback from the keyboard.</p>`)}

${section('how', 'How it works', `                    <ul>
                        <li><strong>Picture-in-Picture:</strong> the floating window uses Chrome’s Document Picture-in-Picture API, the same technology that keeps a video on top of other apps.</li>
                        <li><strong>Lyrics:</strong> they come from <a href="https://lrclib.net/" target="_blank" rel="noopener">LRCLIB</a>, a free, community-built lyrics database.</li>
                        <li><strong>Translation:</strong> only when you press the translate button, the lyric text is sent to Google Translate.</li>
                        <li><strong>No servers, no accounts:</strong> Navi has no backend. Preferences and cached lyrics stay in your browser. Details in the <a href="${ROUTES.privacy[lang]}">privacy policy</a>.</li>
                    </ul>`)}

${section('history', 'A short history', `                    <ul>
                        <li><strong>March 2026 · v1.2.0:</strong> YouTube Music and Spotify, synchronized lyrics in a floating window, ad detection and an English/Spanish interface.</li>
                        <li><strong>April 2026 · v1.3.0:</strong> real-time lyric translation.</li>
                        <li><strong>June 2026 · v1.4.0:</strong> color themes, adaptive theme and keyboard shortcuts.</li>
                        <li><strong>June 2026 · v1.5.0:</strong> retro skins: CRT Amber, Y2K, E-Ink, ASCII and Arcade.</li>
                        <li><strong>June 2026 · v1.6.0:</strong> Apple Music support.</li>
                    </ul>
                    <p>Every change is in the <a href="${ROUTES.changelog[lang]}">changelog</a>.</p>`)}

${section('contact', 'Links and contact', `                    <p>Navi Lyrics is free. If it keeps you company while you work, you can support it with a coffee.</p>
${links(lang)}
                    <p>Navi Lyrics is not affiliated with Spotify, YouTube, Google, Apple or LRCLIB.</p>`)}

            <div class="max-w-3xl mx-auto mt-10 text-center">${ctaButton(lang)}</div>`,
  },
  es: {
    title: 'Acerca de Navi Lyrics — Extensión de letras flotantes',
    description: 'Navi Lyrics es una extensión independiente para Chrome, hecha por Ivan Delfin en Tijuana, México, que mantiene la letra sincronizada en una ventana flotante.',
    breadcrumb: 'Acerca de',
    body: (lang) => `            <header class="max-w-3xl mx-auto">
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">Acerca de <span class="text-primary neon-text-glow">Navi Lyrics</span></h1>
                <p class="text-base sm:text-lg text-gray-300 leading-relaxed">Navi Lyrics es una extensión independiente para Chrome hecha por <strong class="text-white">Ivan Delfin</strong> en Tijuana, México. Hace una sola cosa: mantiene visible la letra de la canción que estás escuchando en una pequeña ventana flotante, mientras haces otra cosa.</p>
            </header>

${section('what', 'Qué hace', `                    <p>Navi funciona con los reproductores web de <a href="${ROUTES.spotify[lang]}">Spotify</a>, <a href="${ROUTES.youtubeMusic[lang]}">YouTube Music</a> y <a href="${ROUTES.appleMusic[lang]}">Apple Music</a>. Detecta la canción que suena, busca su letra sincronizada y la muestra línea por línea en una ventana Picture-in-Picture que se queda encima de tus otras ventanas y apps.</p>
                    <p>Además puede traducir la letra a 12 idiomas, te deja saltar a cualquier línea con un clic, ajustar la sincronía, elegir temas de color y skins retro, y controlar la reproducción con el teclado.</p>`)}

${section('how', 'Cómo funciona', `                    <ul>
                        <li><strong>Picture-in-Picture:</strong> la ventana flotante usa la API Document Picture-in-Picture de Chrome, la misma tecnología que mantiene un video encima de otras apps.</li>
                        <li><strong>Letras:</strong> vienen de <a href="https://lrclib.net/" target="_blank" rel="noopener">LRCLIB</a>, una base de datos de letras gratuita y construida por la comunidad.</li>
                        <li><strong>Traducción:</strong> solo cuando presionas el botón de traducir, el texto de la letra se envía a Google Translate.</li>
                        <li><strong>Sin servidores ni cuentas:</strong> Navi no tiene backend. Las preferencias y las letras en caché se quedan en tu navegador. Detalles en la <a href="${ROUTES.privacy[lang]}">política de privacidad</a>.</li>
                    </ul>`)}

${section('history', 'Una breve historia', `                    <ul>
                        <li><strong>Marzo 2026 · v1.2.0:</strong> YouTube Music y Spotify, letras sincronizadas en una ventana flotante, detección de anuncios e interfaz en inglés y español.</li>
                        <li><strong>Abril 2026 · v1.3.0:</strong> traducción de letras en tiempo real.</li>
                        <li><strong>Junio 2026 · v1.4.0:</strong> temas de color, tema adaptativo y atajos de teclado.</li>
                        <li><strong>Junio 2026 · v1.5.0:</strong> skins retro: CRT Amber, Y2K, E-Ink, ASCII y Arcade.</li>
                        <li><strong>Junio 2026 · v1.6.0:</strong> compatibilidad con Apple Music.</li>
                    </ul>
                    <p>Todos los cambios están en las <a href="${ROUTES.changelog[lang]}">novedades</a>.</p>`)}

${section('contact', 'Enlaces y contacto', `                    <p>Navi Lyrics es gratis. Si te acompaña mientras trabajas, puedes apoyarlo con un café.</p>
${links(lang)}
                    <p>Navi Lyrics no está afiliado a Spotify, YouTube, Google, Apple ni LRCLIB.</p>`)}

            <div class="max-w-3xl mx-auto mt-10 text-center">${ctaButton(lang)}</div>`,
  },
};

export const aboutJsonLd = (lang, d) => [
  {
    '@type': 'AboutPage',
    '@id': `${SITE}${ROUTES.about[lang]}#webpage`,
    url: SITE + ROUTES.about[lang],
    name: d.title,
    description: d.description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: { '@id': `${SITE}/#app` },
    about: { '@id': `${SITE}/#author` },
  },
];
