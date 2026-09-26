// Rutas de todas las páginas por idioma. Lo usan build-pages.mjs (genera las
// páginas y el sitemap) y build-i18n.mjs (enlaces de la home en /es/).
// Sin .html: nginx sirve /x desde x.html.
export const SITE = 'https://navilyrics.com';
export const CWS_URL = 'https://chromewebstore.google.com/detail/navi-lyrics/pjjcbhbdefbdfcnbdfpholpbpdgbmejp';

export const ROUTES = {
  home: { en: '/', es: '/es/' },
  spotify: { en: '/spotify-floating-lyrics', es: '/es/letras-flotantes-spotify' },
  youtubeMusic: { en: '/youtube-music-floating-lyrics', es: '/es/letras-flotantes-youtube-music' },
  appleMusic: { en: '/apple-music-floating-lyrics', es: '/es/letras-flotantes-apple-music' },
  about: { en: '/about', es: '/es/acerca-de' },
  changelog: { en: '/changelog', es: '/es/novedades' },
  privacy: { en: '/privacy-policy', es: '/es/politica-de-privacidad' },
};

// Ruta pública -> archivo generado (relativo a la raíz del repo)
export const fileFor = (path) => (path.endsWith('/') ? `${path.slice(1)}index.html` : `${path.slice(1)}.html`);
