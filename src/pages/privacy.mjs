// /privacy-policy y /es/politica-de-privacidad.
// Datos verificados contra extension-letras (src/shared/cache.js, translator.js,
// themes.js, popup.js) y la infraestructura del sitio (nginx + Traefik, Google Analytics 4).
import { ROUTES, SITE } from './routes.mjs';

const UPDATED = '2026-09-28';

const block = (title, html) => `                <section class="glass-panel rounded-2xl p-6 sm:p-8 prose-navi">
                    <h2 class="!text-primary">${title}</h2>
${html}
                </section>`;

const ext = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;

const CONTENT = {
  en: {
    title: 'Privacy Policy — Navi Lyrics',
    description: 'Navi Lyrics does not collect personal data. What the extension stores locally, which services it contacts (LRCLIB, Google Translate) and how this website works.',
    breadcrumb: 'Privacy policy',
    h1: 'Privacy <span class="text-primary neon-text-glow">Policy</span>',
    lead: 'Your privacy is important to us. This policy explains how the Navi Lyrics extension and the navilyrics.com website handle your information.',
    updated: 'Last updated: September 28, 2026',
    sections: [
      ['No personal data collection', `                    <p><strong>Navi Lyrics does not collect, store or share any personal user data.</strong> The extension is designed to work without tracking or monitoring your activity, and it has no account system.</p>`],
      ['What the extension stores locally', `                    <p>Navi Lyrics uses your browser’s local storage (<code>chrome.storage.local</code>) to remember your preferences and cache content for fast and offline access. Everything in this list stays on your device and is never transmitted anywhere:</p>
                    <ul>
                        <li><strong>Preferences:</strong> font size, time offset, translation language, color theme and skin.</li>
                        <li><strong>Lyrics cache:</strong> synchronized and plain lyrics of songs you viewed recently (the oldest are removed after 400 songs).</li>
                        <li><strong>Translation cache:</strong> translations you already requested, by language and song (the oldest are removed after 50).</li>
                        <li><strong>Search results cache:</strong> alternative lyric versions for the multi-version feature (kept 30 minutes, 30 entries at most).</li>
                        <li><strong>Hidden versions:</strong> IDs of lyric versions you marked as wrong with the thumbs-down button.</li>
                    </ul>
                    <p>No account is created and no identifier links this data to you. You can delete it at any time by removing the extension or clearing your browser data.</p>`],
      ['Data sent to external services', `                    <p>The extension contacts external services only while you use it on a supported music page, and only with the data each one needs.</p>
                    <h3>1. LRCLIB (lyrics)</h3>
                    <ul>
                        <li><strong>Sent:</strong> song title, artist, album name (when available) and duration.</li>
                        <li><strong>When:</strong> automatically, when the floating window needs lyrics for a new song.</li>
                        <li><strong>Why:</strong> to find synchronized or plain lyrics for that song.</li>
                    </ul>
                    <h3>2. Google Translate (translation)</h3>
                    <ul>
                        <li><strong>Sent:</strong> the lyric text (without timestamps) and the target language you chose.</li>
                        <li><strong>When:</strong> only when you press the translate button.</li>
                        <li><strong>Endpoint:</strong> Google Translate’s public client endpoint (<code>translate.googleapis.com</code>).</li>
                    </ul>
                    <h3>3. Album art (adaptive theme only)</h3>
                    <ul>
                        <li><strong>Loaded:</strong> the cover image of the current song, from the image servers of Spotify (<code>i.scdn.co</code>), YouTube (<code>lh3.googleusercontent.com</code>) or Apple Music (<code>mzstatic.com</code>), only when you use the “Adaptive” color theme.</li>
                        <li><strong>Processed:</strong> drawn into a 32×32 canvas on your device to extract its dominant color.</li>
                        <li><strong>Not transmitted:</strong> the image and the color stay on your device and are never uploaded.</li>
                    </ul>
                    <p>We don’t operate any server for the extension, so these requests are not logged, stored or analyzed by us.</p>`],
      ['This website (navilyrics.com)', `                    <ul>
                        <li><strong>Google Analytics:</strong> only if you accept it in the cookie banner, we use Google Analytics 4 to count visits and understand which pages are useful (pages viewed, referrer, approximate country, device and browser). It then sets first-party cookies (<code>_ga</code>, <code>_ga_*</code>, kept up to 2 years) and sends this data to Google, which processes it under its ${ext('https://policies.google.com/privacy', 'privacy policy')}. Until you accept, Google Analytics is not loaded at all. Google signals and ad features are disabled, and we don’t send it any personal data.</li>
                        <li><strong>Your choice:</strong> you can accept or reject, and change your mind at any time with the “Cookie settings” link in the footer; rejecting deletes the analytics cookies. Your choice is saved in <code>localStorage</code> and we ask again after 12 months. If your browser sends a Global Privacy Control signal, we treat it as a rejection. Legal basis (GDPR/LGPD): your consent.</li>
                        <li><strong>No ads.</strong> Fonts, styles and images are served from navilyrics.com itself; Google Analytics is the only third party the site loads.</li>
                        <li><strong>Language choice:</strong> if you switch between English and Spanish, the choice is saved in your browser’s <code>localStorage</code> so we don’t suggest the other language again.</li>
                        <li><strong>Server logs:</strong> like most web servers, ours keeps standard access logs (IP address, requested page, date and browser user agent) for security and troubleshooting. They are rotated automatically and are not used to identify or profile visitors.</li>
                    </ul>`],
      ['Third-party services', `                    <ul>
                        <li>${ext('https://lrclib.net/', 'LRCLIB')}: public lyrics database.</li>
                        <li>${ext('https://policies.google.com/privacy', 'Google Translate')}: public translation endpoint, used only when you request a translation.</li>
                        <li>Image servers of Spotify, YouTube and Apple Music: only with the adaptive theme, as described above.</li>
                        <li>${ext('https://policies.google.com/privacy', 'Google Analytics')}: visit statistics for navilyrics.com (not used by the extension).</li>
                        <li>The Chrome Web Store, where you install the extension, is run by Google under its own privacy policy.</li>
                    </ul>
                    <p>Navi Lyrics is not affiliated with Spotify, YouTube Music, Apple Music, LRCLIB or Google, and we don’t control their privacy practices. Please check their policies for how they handle requests from your browser.</p>`],
      ['Security', `                    <p>Since Navi Lyrics doesn’t collect personal data or store it on external servers, the privacy risk is minimal. We still recommend keeping your browser up to date and reviewing the permissions of your extensions from time to time.</p>`],
      ['Changes to this policy', `                    <p>We may update this policy. Significant changes will be reflected in the date at the bottom of this page.</p>`],
      ['Contact', `                    <ul>
                        <li>X (Twitter): ${ext('https://x.com/navilyrics_', '@navilyrics_')}</li>
                        <li>GitHub: ${ext('https://github.com/odrac94/navi-landing', 'odrac94/navi-landing')}</li>
                    </ul>`],
    ],
  },
  es: {
    title: 'Política de privacidad — Navi Lyrics',
    description: 'Navi Lyrics no recopila datos personales. Qué guarda la extensión en tu equipo, qué servicios contacta (LRCLIB, Google Translate) y cómo funciona este sitio.',
    breadcrumb: 'Política de privacidad',
    h1: 'Política de <span class="text-primary neon-text-glow">privacidad</span>',
    lead: 'Tu privacidad nos importa. Esta política explica cómo la extensión Navi Lyrics y el sitio navilyrics.com manejan tu información.',
    updated: 'Última actualización: 28 de septiembre de 2026',
    sections: [
      ['No recopilamos datos personales', `                    <p><strong>Navi Lyrics no recopila, almacena ni comparte datos personales.</strong> La extensión está diseñada para funcionar sin rastrear ni monitorear tu actividad, y no tiene sistema de cuentas.</p>`],
      ['Qué guarda la extensión en tu equipo', `                    <p>Navi Lyrics usa el almacenamiento local de tu navegador (<code>chrome.storage.local</code>) para recordar tus preferencias y guardar contenido en caché para un acceso rápido y sin conexión. Todo lo de esta lista se queda en tu dispositivo y nunca se envía a ningún lado:</p>
                    <ul>
                        <li><strong>Preferencias:</strong> tamaño de letra, ajuste de sincronía, idioma de traducción, tema de color y skin.</li>
                        <li><strong>Caché de letras:</strong> letras sincronizadas y sin sincronizar de las canciones que viste recientemente (se borran las más antiguas después de 400 canciones).</li>
                        <li><strong>Caché de traducciones:</strong> traducciones que ya pediste, por idioma y canción (se borran las más antiguas después de 50).</li>
                        <li><strong>Caché de resultados de búsqueda:</strong> versiones alternativas de letras para la función de varias versiones (se guardan 30 minutos, 30 como máximo).</li>
                        <li><strong>Versiones ocultas:</strong> identificadores de las versiones de letra que marcaste como incorrectas con el botón de pulgar abajo.</li>
                    </ul>
                    <p>No se crea ninguna cuenta ni hay un identificador que vincule estos datos contigo. Puedes borrarlos cuando quieras desinstalando la extensión o limpiando los datos de tu navegador.</p>`],
      ['Datos que se envían a servicios externos', `                    <p>La extensión contacta servicios externos solo mientras la usas en una página de música compatible, y solo con los datos que cada uno necesita.</p>
                    <h3>1. LRCLIB (letras)</h3>
                    <ul>
                        <li><strong>Se envía:</strong> título de la canción, artista, nombre del álbum (cuando está disponible) y duración.</li>
                        <li><strong>Cuándo:</strong> automáticamente, cuando la ventana flotante necesita la letra de una canción nueva.</li>
                        <li><strong>Para qué:</strong> encontrar la letra sincronizada o sin sincronizar de esa canción.</li>
                    </ul>
                    <h3>2. Google Translate (traducción)</h3>
                    <ul>
                        <li><strong>Se envía:</strong> el texto de la letra (sin marcas de tiempo) y el idioma de destino que elegiste.</li>
                        <li><strong>Cuándo:</strong> solo cuando presionas el botón de traducir.</li>
                        <li><strong>Servicio:</strong> el endpoint público de Google Translate (<code>translate.googleapis.com</code>).</li>
                    </ul>
                    <h3>3. Carátulas (solo tema adaptativo)</h3>
                    <ul>
                        <li><strong>Se carga:</strong> la portada de la canción actual, desde los servidores de imágenes de Spotify (<code>i.scdn.co</code>), YouTube (<code>lh3.googleusercontent.com</code>) o Apple Music (<code>mzstatic.com</code>), solo cuando usas el tema de color “Adaptativo”.</li>
                        <li><strong>Se procesa:</strong> se dibuja en un canvas de 32×32 en tu dispositivo para obtener su color dominante.</li>
                        <li><strong>No se envía:</strong> la imagen y el color se quedan en tu dispositivo y nunca se suben a ningún lado.</li>
                    </ul>
                    <p>No operamos ningún servidor para la extensión, así que no registramos, guardamos ni analizamos estas peticiones.</p>`],
      ['Este sitio web (navilyrics.com)', `                    <ul>
                        <li><strong>Google Analytics:</strong> solo si lo aceptas en el banner de cookies, usamos Google Analytics 4 para contar visitas y saber qué páginas son útiles (páginas vistas, sitio de procedencia, país aproximado, dispositivo y navegador). Entonces guarda cookies propias (<code>_ga</code>, <code>_ga_*</code>, hasta 2 años) y envía estos datos a Google, que los trata según su ${ext('https://policies.google.com/privacy?hl=es', 'política de privacidad')}. Mientras no aceptes, Google Analytics no se carga. Las señales de Google y las funciones publicitarias están desactivadas, y no le enviamos datos personales.</li>
                        <li><strong>Tu elección:</strong> puedes aceptar o rechazar, y cambiar de opinión cuando quieras con el enlace “Configurar cookies” del pie de página; al rechazar se borran las cookies de estadísticas. Tu elección se guarda en <code>localStorage</code> y te volvemos a preguntar a los 12 meses. Si tu navegador envía la señal Global Privacy Control, la tratamos como un rechazo. Base legal (RGPD/LGPD): tu consentimiento.</li>
                        <li><strong>Sin anuncios.</strong> Las fuentes, estilos e imágenes se sirven desde el propio navilyrics.com; Google Analytics es el único tercero que carga el sitio.</li>
                        <li><strong>Idioma elegido:</strong> si cambias entre inglés y español, la elección se guarda en el <code>localStorage</code> de tu navegador para no sugerirte el otro idioma de nuevo.</li>
                        <li><strong>Registros del servidor:</strong> como la mayoría de los servidores web, el nuestro guarda registros de acceso estándar (dirección IP, página solicitada, fecha y agente de usuario del navegador) por seguridad y para resolver problemas. Se rotan automáticamente y no se usan para identificar ni perfilar a los visitantes.</li>
                    </ul>`],
      ['Servicios de terceros', `                    <ul>
                        <li>${ext('https://lrclib.net/', 'LRCLIB')}: base de datos pública de letras.</li>
                        <li>${ext('https://policies.google.com/privacy', 'Google Translate')}: endpoint público de traducción, solo cuando pides una traducción.</li>
                        <li>Servidores de imágenes de Spotify, YouTube y Apple Music: solo con el tema adaptativo, como se describe arriba.</li>
                        <li>${ext('https://policies.google.com/privacy?hl=es', 'Google Analytics')}: estadísticas de visitas de navilyrics.com (la extensión no lo usa).</li>
                        <li>La Chrome Web Store, donde instalas la extensión, la opera Google con su propia política de privacidad.</li>
                    </ul>
                    <p>Navi Lyrics no está afiliado a Spotify, YouTube Music, Apple Music, LRCLIB ni Google, y no controlamos sus prácticas de privacidad. Consulta sus políticas para saber cómo manejan las peticiones de tu navegador.</p>`],
      ['Seguridad', `                    <p>Como Navi Lyrics no recopila datos personales ni los guarda en servidores externos, el riesgo para tu privacidad es mínimo. Aun así, te recomendamos mantener tu navegador actualizado y revisar de vez en cuando los permisos de tus extensiones.</p>`],
      ['Cambios a esta política', `                    <p>Podemos actualizar esta política. Los cambios importantes se reflejarán en la fecha al final de esta página.</p>`],
      ['Contacto', `                    <ul>
                        <li>X (Twitter): ${ext('https://x.com/navilyrics_', '@navilyrics_')}</li>
                        <li>GitHub: ${ext('https://github.com/odrac94/navi-landing', 'odrac94/navi-landing')}</li>
                    </ul>`],
    ],
  },
};

export const privacyMeta = (lang) => CONTENT[lang];

export const privacyBody = (lang) => {
  const c = CONTENT[lang];
  return `            <header class="max-w-3xl mx-auto">
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">${c.h1}</h1>
                <p class="text-base sm:text-lg text-gray-300 leading-relaxed">${c.lead}</p>
            </header>

            <div class="max-w-3xl mx-auto mt-10 flex flex-col gap-4">
${c.sections.map(([title, html]) => block(title, html)).join('\n')}
                <p class="text-center text-sm text-gray-500 mt-6"><time datetime="${UPDATED}">${c.updated}</time></p>
            </div>`;
};

export const privacyJsonLd = (lang) => [
  {
    '@type': 'WebPage',
    '@id': `${SITE}${ROUTES.privacy[lang]}#webpage`,
    url: SITE + ROUTES.privacy[lang],
    name: CONTENT[lang].title,
    description: CONTENT[lang].description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    dateModified: UPDATED,
  },
];
