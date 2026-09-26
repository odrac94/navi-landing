// Contenido de las guías por plataforma. Todo lo que se afirma aquí sale del
// código de la extensión (extension-letras/src/adapters/*, content.entry.js,
// manifest.json, _locales). Si cambia el comportamiento, actualizar aquí.
import { CWS_URL } from './routes.mjs';

const kbd = (k) => `<kbd>${k}</kbd>`;

// Bloques que se repiten entre plataformas
const shared = {
  en: {
    steps: (site, url) => [
      `Install <a href="${CWS_URL}" target="_blank" rel="noopener">Navi Lyrics from the Chrome Web Store</a>. It's free and needs no account.`,
      `Open <a href="${url}" target="_blank" rel="noopener nofollow">${site}</a> in Chrome, Edge or Brave and play a song.`,
      'Click the <strong>Show lyrics</strong> button that appears on the page, or click the Navi icon in the toolbar and press <strong>Float Lyrics</strong>.',
      'Drag the floating window wherever you want and resize it. It stays on top of your other windows, even outside the browser.',
    ],
    translate: {
      icon: 'g_translate',
      title: 'Lyric translation',
      text: 'Press the translate button (or the T key) to see each line translated underneath, in 12 languages: English, Spanish, Portuguese, French, German, Italian, Russian, Japanese, Korean, Chinese, Arabic and Hindi.',
    },
    keyboard: {
      icon: 'keyboard',
      title: 'Controls and shortcuts',
      text: `Play/pause, previous and next from the floating window, or with the keyboard: ${kbd('Space')}, ${kbd('←')} ${kbd('→')}. ${kbd('↑')} ${kbd('↓')} change the font size, ${kbd(',')} ${kbd('.')} adjust the sync.`,
    },
    seek: {
      icon: 'ads_click',
      title: 'Click a line to jump there',
      text: 'Click any line of the lyrics and the song jumps to that moment. Handy to repeat a verse or skip to the chorus.',
    },
    troubleshooting: [
      {
        title: 'The lyrics are a little early or late',
        text: 'Use the sync buttons (⏪ ⏩) or the <kbd>,</kbd> and <kbd>.</kbd> keys. Each press moves the lyrics 0.5 seconds, up to 30 seconds either way, and the adjustment applies to the current song only.',
      },
      {
        title: 'The lyrics belong to another version of the song',
        text: 'Press the thumbs-down button (or <kbd>D</kbd>). Navi hides that version and loads the next one it found; the counter (for example <strong>2/5</strong>) shows which version you are on.',
      },
      {
        title: 'The floating window does not open',
        text: 'Use an up-to-date Chrome, Edge or Brave. In Opera, enable the flag <code>opera://flags/#new-auto-pip-for-documents</code> first. Some "cleaner" extensions (such as Click&amp;Clean) close new windows automatically; disable them for the music site if the window keeps closing.',
      },
      {
        title: 'No lyrics were found',
        text: 'Lyrics come from LRCLIB, a community database. Very new or niche songs may not be there yet. Navi also tries a broader search, shows plain (unsynchronized) lyrics when that is all that exists, and offers a <strong>Try again</strong> button.',
      },
    ],
    lrclibFaq: {
      q: 'Where do the lyrics come from?',
      a: 'From <a class="text-primary underline" href="https://lrclib.net/" target="_blank" rel="noopener">LRCLIB</a>, a free, community-built database of synchronized lyrics. Navi searches it by song title, artist and duration.',
    },
  },
  es: {
    steps: (site, url) => [
      `Instala <a href="${CWS_URL}" target="_blank" rel="noopener">Navi Lyrics desde la Chrome Web Store</a>. Es gratis y no necesita cuenta.`,
      `Abre <a href="${url}" target="_blank" rel="noopener nofollow">${site}</a> en Chrome, Edge o Brave y reproduce una canción.`,
      'Haz clic en el botón <strong>Ver letra</strong> que aparece en la página, o en el ícono de Navi en la barra de herramientas y luego en <strong>Letras flotantes</strong>.',
      'Arrastra la ventana flotante adonde quieras y cámbiale el tamaño. Se queda encima de tus otras ventanas, incluso fuera del navegador.',
    ],
    translate: {
      icon: 'g_translate',
      title: 'Traducción de letras',
      text: 'Presiona el botón de traducir (o la tecla T) para ver cada línea traducida debajo, en 12 idiomas: inglés, español, portugués, francés, alemán, italiano, ruso, japonés, coreano, chino, árabe e hindi.',
    },
    keyboard: {
      icon: 'keyboard',
      title: 'Controles y atajos',
      text: `Reproducir/pausar, anterior y siguiente desde la ventana flotante, o con el teclado: ${kbd('Espacio')}, ${kbd('←')} ${kbd('→')}. ${kbd('↑')} ${kbd('↓')} cambian el tamaño de letra y ${kbd(',')} ${kbd('.')} ajustan la sincronía.`,
    },
    seek: {
      icon: 'ads_click',
      title: 'Haz clic en una línea para saltar ahí',
      text: 'Haz clic en cualquier línea de la letra y la canción salta a ese momento. Útil para repetir una estrofa o ir directo al coro.',
    },
    troubleshooting: [
      {
        title: 'La letra va un poco adelantada o atrasada',
        text: 'Usa los botones de sincronía (⏪ ⏩) o las teclas <kbd>,</kbd> y <kbd>.</kbd>. Cada pulsación mueve la letra 0.5 segundos, hasta 30 segundos hacia cualquier lado, y el ajuste aplica solo a la canción actual.',
      },
      {
        title: 'La letra es de otra versión de la canción',
        text: 'Presiona el botón de pulgar abajo (o <kbd>D</kbd>). Navi oculta esa versión y carga la siguiente que encontró; el contador (por ejemplo <strong>2/5</strong>) indica en qué versión estás.',
      },
      {
        title: 'La ventana flotante no se abre',
        text: 'Usa Chrome, Edge o Brave actualizados. En Opera, primero activa el flag <code>opera://flags/#new-auto-pip-for-documents</code>. Algunas extensiones de "limpieza" (como Click&amp;Clean) cierran las ventanas nuevas automáticamente; desactívalas para el sitio de música si la ventana se sigue cerrando.',
      },
      {
        title: 'No encontró la letra',
        text: 'Las letras vienen de LRCLIB, una base de datos comunitaria. Canciones muy nuevas o poco conocidas quizá todavía no estén. Navi también intenta una búsqueda más amplia, muestra la letra sin sincronizar cuando es lo único que existe y ofrece un botón de <strong>Reintentar</strong>.',
      },
    ],
    lrclibFaq: {
      q: '¿De dónde salen las letras?',
      a: 'De <a class="text-primary underline" href="https://lrclib.net/" target="_blank" rel="noopener">LRCLIB</a>, una base de datos gratuita de letras sincronizadas, construida por la comunidad. Navi la consulta con el título, el artista y la duración de la canción.',
    },
  },
};

const ads = {
  en: (site) => ({
    icon: 'auto_fix_high',
    title: 'Ad detection',
    text: `When ${site} plays an ad, Navi pauses the lyrics and shows a small fairy animation instead of searching for lyrics that don't exist. The lyrics come back as soon as the music does.`,
  }),
  es: (site) => ({
    icon: 'auto_fix_high',
    title: 'Detección de anuncios',
    text: `Cuando ${site} reproduce un anuncio, Navi pausa la letra y muestra una pequeña animación de hada en vez de buscar una letra que no existe. La letra vuelve en cuanto vuelve la música.`,
  }),
};

export const PLATFORMS = {
  spotify: {
    en: {
      title: 'Floating Lyrics for Spotify Web — Navi Lyrics',
      description: 'See synchronized Spotify lyrics in a floating, always-on-top window while you work. Free Chrome extension for the Spotify web player, with translation.',
      breadcrumb: 'Spotify floating lyrics',
      eyebrow: 'Spotify Web · Chrome extension',
      h1: 'Floating lyrics for <span class="text-primary neon-text-glow">Spotify</span> Web',
      lead: 'Navi Lyrics is a free Chrome extension that shows the lyrics of the song playing on <strong>open.spotify.com</strong> in a small Picture-in-Picture window. The window stays on top of your other apps, so you can follow the song line by line while you work, study or browse.',
      siteName: 'Spotify Web',
      siteUrl: 'https://open.spotify.com/',
      demoTheme: 'spotify',
      steps: shared.en.steps('open.spotify.com', 'https://open.spotify.com/'),
      features: [
        { icon: 'sync', title: 'Synchronized line by line', text: 'Navi reads the playback position from the Spotify player and highlights the current line, scrolling smoothly between seconds.' },
        shared.en.seek,
        shared.en.keyboard,
        ads.en('Spotify Free'),
        shared.en.translate,
        { icon: 'palette', title: 'A Spotify-green theme', text: 'Pick the Spotify color theme to match the player, or any of the other themes, the adaptive theme that takes its color from the album art, and five retro skins.' },
      ],
      limits: [
        'Navi works with the <strong>Spotify web player</strong>. The Spotify desktop and mobile apps are not supported, because Chrome extensions only run inside the browser.',
        'The Spotify web player does not show the album name or release year in its player bar, so for Spotify songs the floating window shows the title, artist and album art. Lyrics are matched by title, artist and duration.',
        'Navi does not use Spotify’s own lyrics: it gets them from LRCLIB, so the catalog can differ from what you see inside Spotify.',
      ],
      troubleshooting: shared.en.troubleshooting,
      faq: [
        { q: 'Does Navi Lyrics work with the Spotify desktop app?', a: 'No. Navi is a Chrome extension, so it works with the Spotify web player at open.spotify.com. Playback in the desktop app is not visible to browser extensions.' },
        { q: 'Do I need Spotify Premium?', a: 'No. Navi works on the web player with free and Premium accounts. On Spotify Free it detects ads and pauses the lyrics until the music comes back.' },
        shared.en.lrclibFaq,
      ],
    },
    es: {
      title: 'Letras flotantes para Spotify Web — Navi Lyrics',
      description: 'Ve la letra sincronizada de Spotify en una ventana flotante siempre visible mientras trabajas. Extensión gratis de Chrome para Spotify Web, con traducción.',
      breadcrumb: 'Letras flotantes para Spotify',
      eyebrow: 'Spotify Web · Extensión de Chrome',
      h1: 'Letras flotantes para <span class="text-primary neon-text-glow">Spotify</span> Web',
      lead: 'Navi Lyrics es una extensión gratuita para Chrome que muestra la letra de la canción que suena en <strong>open.spotify.com</strong> en una pequeña ventana Picture-in-Picture. La ventana se queda encima de tus otras apps, así que puedes seguir la canción línea por línea mientras trabajas, estudias o navegas.',
      siteName: 'Spotify Web',
      siteUrl: 'https://open.spotify.com/',
      demoTheme: 'spotify',
      steps: shared.es.steps('open.spotify.com', 'https://open.spotify.com/'),
      features: [
        { icon: 'sync', title: 'Sincronizada línea por línea', text: 'Navi lee la posición de reproducción del reproductor de Spotify y resalta la línea actual, con un desplazamiento suave entre segundos.' },
        shared.es.seek,
        shared.es.keyboard,
        ads.es('Spotify Free'),
        shared.es.translate,
        { icon: 'palette', title: 'Un tema verde Spotify', text: 'Elige el tema de color Spotify para que combine con el reproductor, o cualquiera de los otros temas, el tema adaptativo que toma el color de la carátula y cinco skins retro.' },
      ],
      limits: [
        'Navi funciona con el <strong>reproductor web de Spotify</strong>. Las apps de escritorio y móvil de Spotify no son compatibles, porque las extensiones de Chrome solo funcionan dentro del navegador.',
        'El reproductor web de Spotify no muestra el nombre del álbum ni el año en su barra, así que para canciones de Spotify la ventana flotante muestra título, artista y carátula. La letra se busca por título, artista y duración.',
        'Navi no usa las letras propias de Spotify: las obtiene de LRCLIB, así que el catálogo puede ser distinto al que ves dentro de Spotify.',
      ],
      troubleshooting: shared.es.troubleshooting,
      faq: [
        { q: '¿Navi Lyrics funciona con la app de escritorio de Spotify?', a: 'No. Navi es una extensión de Chrome, así que funciona con el reproductor web en open.spotify.com. Lo que suena en la app de escritorio no es visible para las extensiones del navegador.' },
        { q: '¿Necesito Spotify Premium?', a: 'No. Navi funciona en el reproductor web con cuentas gratuitas y Premium. En Spotify Free detecta los anuncios y pausa la letra hasta que vuelve la música.' },
        shared.es.lrclibFaq,
      ],
    },
  },

  youtubeMusic: {
    en: {
      title: 'Floating Lyrics for YouTube Music — Navi Lyrics',
      description: 'Keep synchronized YouTube Music lyrics in a floating, always-on-top window over any app. Free Chrome extension with real-time translation and themes.',
      breadcrumb: 'YouTube Music floating lyrics',
      eyebrow: 'YouTube Music · Chrome extension',
      h1: 'Floating lyrics for <span class="text-primary neon-text-glow">YouTube Music</span>',
      lead: 'Navi Lyrics is a free Chrome extension that takes the lyrics of the song playing on <strong>music.youtube.com</strong> out of the tab and into a floating Picture-in-Picture window. It stays on top of your other windows, so the lyrics keep scrolling while you do something else.',
      siteName: 'YouTube Music',
      siteUrl: 'https://music.youtube.com/',
      demoTheme: 'navi',
      steps: shared.en.steps('music.youtube.com', 'https://music.youtube.com/'),
      features: [
        { icon: 'album', title: 'Full song details', text: 'YouTube Music shows the artist, album and year of each song, so the floating window displays all of them next to the album art.' },
        shared.en.seek,
        shared.en.keyboard,
        ads.en('YouTube Music'),
        { ...shared.en.translate, text: `Listening to K-pop, J-pop or music in another language? ${shared.en.translate.text}` },
        { icon: 'palette', title: 'Themes and retro skins', text: 'Seven color themes, an adaptive theme that takes its color from the album art, and five retro skins: CRT Amber, Y2K, E-Ink, ASCII and Arcade.' },
      ],
      limits: [
        'Navi works on <strong>music.youtube.com</strong>. Regular videos on youtube.com are not supported, and neither are the YouTube Music mobile apps.',
        'YouTube Music has its own Lyrics tab, but it lives inside the YouTube Music page. Navi puts the lyrics in a separate window you can keep on top of other apps.',
        'Lyrics come from LRCLIB, not from YouTube Music, so availability can differ from the Lyrics tab.',
      ],
      troubleshooting: shared.en.troubleshooting,
      faq: [
        { q: 'Does Navi Lyrics work on regular YouTube (youtube.com)?', a: 'No. Navi works on YouTube Music (music.youtube.com), where songs have proper title, artist and duration information to find the right lyrics.' },
        { q: 'Do I need YouTube Premium?', a: 'No. Navi works with or without Premium. Without Premium, it detects YouTube Music ads, pauses the lyrics and resumes when the song starts.' },
        shared.en.lrclibFaq,
      ],
    },
    es: {
      title: 'Letras flotantes para YouTube Music — Navi Lyrics',
      description: 'Ten la letra sincronizada de YouTube Music en una ventana flotante siempre visible sobre cualquier app. Extensión gratis de Chrome con traducción y temas.',
      breadcrumb: 'Letras flotantes para YouTube Music',
      eyebrow: 'YouTube Music · Extensión de Chrome',
      h1: 'Letras flotantes para <span class="text-primary neon-text-glow">YouTube Music</span>',
      lead: 'Navi Lyrics es una extensión gratuita para Chrome que saca la letra de la canción que suena en <strong>music.youtube.com</strong> de la pestaña y la pone en una ventana flotante Picture-in-Picture. Se queda encima de tus otras ventanas, así que la letra sigue avanzando mientras haces otra cosa.',
      siteName: 'YouTube Music',
      siteUrl: 'https://music.youtube.com/',
      demoTheme: 'navi',
      steps: shared.es.steps('music.youtube.com', 'https://music.youtube.com/'),
      features: [
        { icon: 'album', title: 'Todos los datos de la canción', text: 'YouTube Music muestra el artista, el álbum y el año de cada canción, así que la ventana flotante los muestra todos junto a la carátula.' },
        shared.es.seek,
        shared.es.keyboard,
        ads.es('YouTube Music'),
        { ...shared.es.translate, text: `¿Escuchas K-pop, J-pop o música en otro idioma? ${shared.es.translate.text}` },
        { icon: 'palette', title: 'Temas y skins retro', text: 'Siete temas de color, un tema adaptativo que toma el color de la carátula y cinco skins retro: CRT Amber, Y2K, E-Ink, ASCII y Arcade.' },
      ],
      limits: [
        'Navi funciona en <strong>music.youtube.com</strong>. Los videos normales de youtube.com no son compatibles, y tampoco las apps móviles de YouTube Music.',
        'YouTube Music tiene su propia pestaña de Letra, pero vive dentro de la página de YouTube Music. Navi pone la letra en una ventana aparte que puedes dejar encima de otras apps.',
        'Las letras vienen de LRCLIB, no de YouTube Music, así que la disponibilidad puede ser distinta a la de la pestaña Letra.',
      ],
      troubleshooting: shared.es.troubleshooting,
      faq: [
        { q: '¿Navi Lyrics funciona en YouTube normal (youtube.com)?', a: 'No. Navi funciona en YouTube Music (music.youtube.com), donde las canciones tienen título, artista y duración para encontrar la letra correcta.' },
        { q: '¿Necesito YouTube Premium?', a: 'No. Navi funciona con o sin Premium. Sin Premium, detecta los anuncios de YouTube Music, pausa la letra y la retoma cuando empieza la canción.' },
        shared.es.lrclibFaq,
      ],
    },
  },

  appleMusic: {
    en: {
      title: 'Floating Lyrics for Apple Music on the Web — Navi Lyrics',
      description: 'Synchronized Apple Music lyrics in a floating, always-on-top window for music.apple.com. Free Chrome extension with translation, themes and retro skins.',
      breadcrumb: 'Apple Music floating lyrics',
      eyebrow: 'Apple Music web · Chrome extension',
      h1: 'Floating lyrics for <span class="text-primary neon-text-glow">Apple Music</span> on the web',
      lead: 'Since version 1.6.0, Navi Lyrics supports the Apple Music web player. Play a song on <strong>music.apple.com</strong> and its lyrics appear in a floating Picture-in-Picture window that stays on top of your other apps.',
      siteName: 'Apple Music',
      siteUrl: 'https://music.apple.com/',
      demoTheme: 'apple',
      steps: shared.en.steps('music.apple.com', 'https://music.apple.com/'),
      features: [
        { icon: 'graphic_eq', title: 'Precise timing', text: 'Navi reads the time straight from Apple Music’s audio player, so the sync is accurate and works in any interface language.' },
        shared.en.seek,
        shared.en.keyboard,
        { icon: 'image', title: 'Sharp album art', text: 'The floating window shows the album cover in higher resolution than the player bar. With the adaptive theme, its dominant color tints the window.' },
        shared.en.translate,
        { icon: 'palette', title: 'An Apple Music red theme', text: 'Pick the Apple Music color theme, or any of the other themes and five retro skins: CRT Amber, Y2K, E-Ink, ASCII and Arcade.' },
      ],
      limits: [
        'Navi works with the <strong>Apple Music web player</strong> at music.apple.com. The Music app on macOS, the Apple Music app for Windows and iTunes are not supported.',
        'Playing full songs on music.apple.com requires signing in with an Apple Music subscription. That is an Apple requirement, not a Navi one.',
        'Apple Music has no ads, so the fairy animation used on Spotify and YouTube Music never shows up here.',
      ],
      troubleshooting: shared.en.troubleshooting,
      faq: [
        { q: 'Does Navi Lyrics work with the Apple Music app on Mac or Windows?', a: 'No. Navi is a Chrome extension and works with the Apple Music web player at music.apple.com.' },
        { q: 'Since when does Navi support Apple Music?', a: 'Apple Music support arrived in version 1.6.0, in June 2026. See the changelog for what changed since then.' },
        shared.en.lrclibFaq,
      ],
    },
    es: {
      title: 'Letras flotantes para Apple Music en la web — Navi Lyrics',
      description: 'Letras sincronizadas de Apple Music en una ventana flotante siempre visible para music.apple.com. Extensión gratis de Chrome con traducción y temas.',
      breadcrumb: 'Letras flotantes para Apple Music',
      eyebrow: 'Apple Music web · Extensión de Chrome',
      h1: 'Letras flotantes para <span class="text-primary neon-text-glow">Apple Music</span> en la web',
      lead: 'Desde la versión 1.6.0, Navi Lyrics es compatible con el reproductor web de Apple Music. Reproduce una canción en <strong>music.apple.com</strong> y su letra aparece en una ventana flotante Picture-in-Picture que se queda encima de tus otras apps.',
      siteName: 'Apple Music',
      siteUrl: 'https://music.apple.com/',
      demoTheme: 'apple',
      steps: shared.es.steps('music.apple.com', 'https://music.apple.com/'),
      features: [
        { icon: 'graphic_eq', title: 'Sincronía precisa', text: 'Navi lee el tiempo directamente del reproductor de audio de Apple Music, así que la sincronía es exacta y funciona con la interfaz en cualquier idioma.' },
        shared.es.seek,
        shared.es.keyboard,
        { icon: 'image', title: 'Carátula nítida', text: 'La ventana flotante muestra la portada del álbum en mayor resolución que la barra del reproductor. Con el tema adaptativo, su color dominante tiñe la ventana.' },
        shared.es.translate,
        { icon: 'palette', title: 'Un tema rojo Apple Music', text: 'Elige el tema de color Apple Music, o cualquiera de los otros temas y cinco skins retro: CRT Amber, Y2K, E-Ink, ASCII y Arcade.' },
      ],
      limits: [
        'Navi funciona con el <strong>reproductor web de Apple Music</strong> en music.apple.com. La app Música de macOS, la app de Apple Music para Windows e iTunes no son compatibles.',
        'Para reproducir canciones completas en music.apple.com necesitas iniciar sesión con una suscripción a Apple Music. Es un requisito de Apple, no de Navi.',
        'Apple Music no tiene anuncios, así que la animación del hada que se usa en Spotify y YouTube Music nunca aparece aquí.',
      ],
      troubleshooting: shared.es.troubleshooting,
      faq: [
        { q: '¿Navi Lyrics funciona con la app de Apple Music en Mac o Windows?', a: 'No. Navi es una extensión de Chrome y funciona con el reproductor web de Apple Music en music.apple.com.' },
        { q: '¿Desde cuándo Navi es compatible con Apple Music?', a: 'La compatibilidad con Apple Music llegó en la versión 1.6.0, en junio de 2026. Consulta las novedades para ver qué cambió desde entonces.' },
        shared.es.lrclibFaq,
      ],
    },
  },
};
