# Traducciones (EN / ES)

Cada idioma es una página HTML estática con su propia URL, para que Google y los
asistentes de IA indexen las dos:

| Idioma | URL | Archivo |
|---|---|---|
| Inglés (fuente) | `https://navilyrics.com/` | `index.html` |
| Español | `https://navilyrics.com/es/` | `es/index.html` (**generado**) |

## Cómo funciona

- `index.html` está escrito en inglés. Todo texto traducible lleva `data-i18n="clave"`
  (o `data-i18n-attr="atributo:clave"` para atributos).
- `translations.json` tiene los textos de ambos idiomas: `{ "en": {...}, "es": {...} }`.
  Las claves `meta.*` son el `<title>`, la description y Open Graph de cada idioma.
- `npm run build` ejecuta `scripts/build-i18n.mjs`, que toma `index.html`, reemplaza
  cada `data-i18n` por el texto en español y ajusta `lang`, canonical, Open Graph,
  el selector EN/ES y el demo del hero. El resultado es `es/index.html`.
- Si falta una clave en español, el build falla y dice cuál.
- Ambas páginas se enlazan con `<link rel="alternate" hreflang>` y en `sitemap.xml`.

## Flujo para cambiar texto

1. Edita `index.html` (inglés) y/o `translations.json` (ambos idiomas).
2. Si agregas un texto nuevo: ponle `data-i18n="seccion.clave"` y agrega la clave en
   `en` y `es` dentro de `translations.json`.
3. `npm run build`
4. Commit de todo, incluido `es/index.html` y `assets/site.css`.

**Nunca edites `es/index.html` a mano**: se sobrescribe en cada build.

## Selector de idioma

- EN/ES son enlaces normales a `/` y `/es/`. La elección se guarda en
  `localStorage` (`navi-language`).
- No hay redirección automática por idioma del navegador (Google la desaconseja porque
  oculta páginas al crawler). En su lugar, si el navegador está en el otro idioma, aparece
  un aviso discreto abajo ("¿Prefieres leer en español?"). Al cerrarlo, no vuelve a salir.
- Las claves `langSuggest.*` van invertidas a propósito: `en.langSuggest` es el texto que
  se muestra en la página inglesa, así que está en español (y viceversa).

## Páginas de contenido (guías, about, changelog, privacidad, 404)

No se editan en HTML: se generan con `scripts/build-pages.mjs` desde `src/pages/`:

| Archivo | Qué contiene |
|---|---|
| `src/pages/routes.mjs` | URL de cada página en inglés y español |
| `src/pages/layout.mjs` | `<head>` (SEO, hreflang, Open Graph), navegación, footer, aviso de idioma |
| `src/pages/platforms.mjs` | Contenido de las guías de Spotify, YouTube Music y Apple Music |
| `src/pages/about.mjs`, `changelog.mjs`, `privacy.mjs` | Contenido de esas páginas |

- `npm run build` genera `*.html`, `es/*.html`, `404.html` y `sitemap.xml`.
- **Nueva versión de la extensión:** agrégala arriba de `RELEASES` en `changelog.mjs`
  y actualiza `softwareVersion` en el JSON-LD de `index.html`.
- **Cambiaste el contenido de una página:** actualiza su fecha en `LASTMOD`
  (`scripts/build-pages.mjs`) para que el sitemap lo refleje.
- Todo lo que dicen las guías sale del código de la extensión (adapters, atajos,
  límites de caché). Si cambia el comportamiento de la extensión, revisa estos textos.
