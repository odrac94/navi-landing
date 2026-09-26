// /changelog y /es/novedades. Fuente: historial de git de extension-letras
// (commits de versión). Fechas = cuándo se terminó cada versión.
// Al publicar una versión nueva: agregarla ARRIBA y actualizar softwareVersion
// en el JSON-LD de index.html.
import { ROUTES, SITE } from './routes.mjs';
import { ctaButton, escape } from './layout.mjs';

export const RELEASES = [
  {
    version: '1.6.4', date: '2026-07-06',
    en: [
      'The lyrics cache now keeps up to 400 songs (was 120), so songs you replay load instantly.',
      'Clearer error messages inside the floating window, with a hint about what to do next.',
      'The font size you chose is applied again when you reopen the floating window.',
      'The search status now updates step by step while lyrics are loading.',
      'Fixed: the thumbs-down button walks through the available versions in order without freezing, and the version counter resets on every new song.',
      'Fixed: lyrics search right after starting the browser is retried instead of failing.',
      'Fixed: the title-only fallback search no longer matches unrelated songs.',
    ],
    es: [
      'La caché de letras ahora guarda hasta 400 canciones (antes 120), así que las que repites cargan al instante.',
      'Mensajes de error más claros dentro de la ventana flotante, con una pista de qué hacer.',
      'El tamaño de letra que elegiste se vuelve a aplicar al reabrir la ventana flotante.',
      'El estado de búsqueda se actualiza paso a paso mientras carga la letra.',
      'Corregido: el botón de pulgar abajo recorre las versiones disponibles en orden sin congelarse, y el contador de versiones se reinicia en cada canción nueva.',
      'Corregido: la búsqueda de letras justo después de abrir el navegador se reintenta en vez de fallar.',
      'Corregido: la búsqueda de respaldo solo por título ya no encuentra canciones que no tienen nada que ver.',
    ],
  },
  {
    version: '1.6.3', date: '2026-07-01',
    en: ['New Chrome Web Store title and description.', 'Fixed: the floating window no longer closes if a step fails right after opening it.'],
    es: ['Nuevo título y descripción en la Chrome Web Store.', 'Corregido: la ventana flotante ya no se cierra si falla un paso justo después de abrirla.'],
  },
  {
    version: '1.6.1', date: '2026-06-28',
    en: ['If the full search finds nothing, Navi tries again with the song title only.', 'Tidier popup layout.', 'The visual “How it works” guide now includes an Apple Music button.'],
    es: ['Si la búsqueda completa no encuentra nada, Navi vuelve a intentar solo con el título.', 'Popup más ordenado.', 'La guía visual “Cómo funciona” ahora incluye un botón de Apple Music.'],
  },
  {
    version: '1.6.0', date: '2026-06-27',
    en: [
      '<strong>Apple Music support</strong> on music.apple.com.',
      'A “Show lyrics” button appears on music pages to open the floating window in one click.',
      'Redesigned popup: two columns, adapts to the page you are on, keyboard accessible and respects reduced motion.',
      'New visual “How it works” guide.',
      '“Try again” button when lyrics fail to load, and a bigger lyrics cache.',
      'Step-by-step help to enable the floating window in Opera.',
      'Fixed: album art stuck on the previous song, ad overlay size in the retro skins, and lyrics searched during YouTube Music ads.',
    ],
    es: [
      '<strong>Compatibilidad con Apple Music</strong> en music.apple.com.',
      'Aparece un botón “Ver letra” en las páginas de música para abrir la ventana flotante con un clic.',
      'Popup rediseñado: dos columnas, se adapta a la página en la que estás, accesible con teclado y respeta el movimiento reducido.',
      'Nueva guía visual “Cómo funciona”.',
      'Botón “Reintentar” cuando la letra no carga, y una caché de letras más grande.',
      'Ayuda paso a paso para activar la ventana flotante en Opera.',
      'Corregido: la carátula se quedaba en la canción anterior, el tamaño del aviso de anuncios en las skins retro y la búsqueda de letras durante anuncios de YouTube Music.',
    ],
  },
  {
    version: '1.5.0', date: '2026-06-14',
    en: [
      '<strong>Skins</strong>: complete redesigns of the floating window. CRT Amber, Y2K Webcore, E-Ink Paper, ASCII / BBS and Arcade Operator.',
      'New Bubblegum Pink color theme.',
      'Instrumental parts now show a marker instead of an empty line; each skin has its own.',
      'Fixed: a crash when changing songs.',
    ],
    es: [
      '<strong>Skins</strong>: rediseños completos de la ventana flotante. CRT Amber, Y2K Webcore, E-Ink Paper, ASCII / BBS y Arcade Operator.',
      'Nuevo tema de color Bubblegum Pink.',
      'Las partes instrumentales ahora muestran un marcador en vez de una línea vacía; cada skin tiene el suyo.',
      'Corregido: un error al cambiar de canción.',
    ],
  },
  {
    version: '1.4.5', date: '2026-06-07',
    en: ['More reliable translations, with a fallback when the main translation service fails.'],
    es: ['Traducciones más confiables, con un respaldo cuando falla el servicio de traducción principal.'],
  },
  {
    version: '1.4.4', date: '2026-06-06',
    en: ['Longer wait for slow lyrics responses, so fewer searches fail.'],
    es: ['Más tiempo de espera para respuestas lentas de letras, así fallan menos búsquedas.'],
  },
  {
    version: '1.4.3', date: '2026-06-04',
    en: ['Fixed an error when a lyrics search was cancelled.'],
    es: ['Corregido un error al cancelar una búsqueda de letras.'],
  },
  {
    version: '1.4.2', date: '2026-06-03',
    en: [
      'Lighter extension: the icon font is 240 KB smaller.',
      'Lyrics files with unusual timestamp formats are now read correctly.',
      'Accessibility labels on every button of the floating window.',
      'Security fix for how plain lyrics are displayed.',
    ],
    es: [
      'Extensión más liviana: la fuente de íconos pesa 240 KB menos.',
      'Ahora se leen bien los archivos de letras con formatos de tiempo poco comunes.',
      'Etiquetas de accesibilidad en todos los botones de la ventana flotante.',
      'Corrección de seguridad en cómo se muestran las letras sin sincronizar.',
    ],
  },
  {
    version: '1.4.0', date: '2026-06-01',
    en: [
      '<strong>Color themes</strong>: Navi, Spotify, Apple Music, AMOLED, Sunset and Forest, plus an adaptive theme that takes its color from the album art.',
      '<strong>Keyboard shortcuts</strong> in the floating window: space, arrows, T, D, comma and period.',
      'Your translation preference is kept from one song to the next.',
      'Faster loading and smoother scrolling.',
    ],
    es: [
      '<strong>Temas de color</strong>: Navi, Spotify, Apple Music, AMOLED, Sunset y Forest, más un tema adaptativo que toma el color de la carátula.',
      '<strong>Atajos de teclado</strong> en la ventana flotante: espacio, flechas, T, D, coma y punto.',
      'Tu preferencia de traducción se mantiene de una canción a otra.',
      'Carga más rápida y desplazamiento más fluido.',
    ],
  },
  {
    version: '1.3.0', date: '2026-04-29',
    en: ['<strong>Real-time lyric translation</strong>, shown under each line.', 'Fixed: cycling through lyric versions with the thumbs-down button.'],
    es: ['<strong>Traducción de letras en tiempo real</strong>, debajo de cada línea.', 'Corregido: recorrer las versiones de la letra con el botón de pulgar abajo.'],
  },
  {
    version: '1.2.0', date: '2026-03-02',
    en: [
      'YouTube Music and <strong>Spotify</strong> support.',
      'Synchronized lyrics in a floating Picture-in-Picture window, with click-to-seek, font size and sync controls.',
      'Several lyric versions per song, with a thumbs-down button to switch to the next one.',
      'Ad detection with a fairy animation while ads play.',
      'Local lyrics cache and an English/Spanish interface.',
    ],
    es: [
      'Compatibilidad con YouTube Music y <strong>Spotify</strong>.',
      'Letras sincronizadas en una ventana flotante Picture-in-Picture, con salto al hacer clic, tamaño de letra y controles de sincronía.',
      'Varias versiones de letra por canción, con un botón de pulgar abajo para pasar a la siguiente.',
      'Detección de anuncios con una animación de hada mientras suenan.',
      'Caché local de letras e interfaz en inglés y español.',
    ],
  },
];

const fmtDate = (iso, lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

const T = {
  en: {
    title: 'Navi Lyrics Changelog — What’s New in Each Version',
    description: 'Every Navi Lyrics release: Apple Music support, retro skins, color themes, lyric translation, fixes and improvements, from v1.2.0 to the latest version.',
    breadcrumb: 'Changelog',
    h1: 'Changelog',
    lead: 'What changed in each version of Navi Lyrics. Dates are when each version was finished; the Chrome Web Store can take a few days to roll it out.',
    latest: 'Latest',
  },
  es: {
    title: 'Novedades de Navi Lyrics — Qué cambió en cada versión',
    description: 'Todas las versiones de Navi Lyrics: Apple Music, skins retro, temas de color, traducción de letras y correcciones, desde la v1.2.0 hasta la más reciente.',
    breadcrumb: 'Novedades',
    h1: 'Novedades',
    lead: 'Qué cambió en cada versión de Navi Lyrics. Las fechas son cuando se terminó cada versión; la Chrome Web Store puede tardar unos días en distribuirla.',
    latest: 'Última',
  },
};

export const changelogMeta = (lang) => T[lang];

export const changelogBody = (lang) => {
  const t = T[lang];
  return `            <header class="max-w-3xl mx-auto">
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">${t.h1}</h1>
                <p class="text-base sm:text-lg text-gray-300 leading-relaxed">${escape(t.lead)}</p>
            </header>

            <div class="max-w-3xl mx-auto mt-10 flex flex-col gap-4">
${RELEASES.map((r, i) => `                <article id="v${r.version}" class="glass-panel rounded-2xl p-6 sm:p-8 prose-navi">
                    <h2 class="!mb-1 flex flex-wrap items-center gap-3">v${r.version}${i === 0 ? ` <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/20">${t.latest}</span>` : ''}</h2>
                    <p class="!mt-0 text-sm !text-gray-500"><time datetime="${r.date}">${fmtDate(r.date, lang)}</time></p>
                    <ul>
${r[lang].map((item) => `                        <li>${item}</li>`).join('\n')}
                    </ul>
                </article>`).join('\n')}
            </div>

            <div class="max-w-3xl mx-auto mt-10 text-center">${ctaButton(lang)}</div>`;
};

export const changelogJsonLd = (lang) => [
  {
    '@type': 'WebPage',
    '@id': `${SITE}${ROUTES.changelog[lang]}#webpage`,
    url: SITE + ROUTES.changelog[lang],
    name: T[lang].title,
    description: T[lang].description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#app` },
    dateModified: RELEASES[0].date,
  },
];
