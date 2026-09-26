// Genera es/index.html a partir de index.html (inglés, la fuente) y translations.json.
// Cada idioma queda como HTML estático en su propia URL (/ y /es/) para que
// Google y los asistentes de IA indexen ambos; hreflang los enlaza entre sí.
//
// Uso: node scripts/build-i18n.mjs   (lo corre `npm run build`)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://navilyrics.com';
const translations = JSON.parse(readFileSync(join(root, 'translations.json'), 'utf8'));
const source = readFileSync(join(root, 'index.html'), 'utf8');

const LOCALES = {
  es: { path: '/es/', ogLocale: 'es_MX', otherPath: '/', otherLang: 'en', otherOgLocale: 'en_US' },
};

for (const [lang, cfg] of Object.entries(LOCALES)) {
  const dict = translations[lang];
  const missing = [];
  const t = (key) => {
    const value = key.split('.').reduce((o, k) => o?.[k], dict);
    if (typeof value !== 'string') missing.push(key);
    return value;
  };

  const { document } = parseHTML(source);
  const $ = (sel) => document.querySelector(sel);
  const setAttr = (sel, attr, value) => {
    const el = $(sel);
    if (!el) throw new Error(`${lang}: no existe ${sel}`);
    el.setAttribute(attr, value);
  };

  document.documentElement.setAttribute('lang', lang);

  // Texto visible
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const value = t(el.getAttribute('data-i18n'));
    if (value !== undefined) el.textContent = value;
  }
  for (const el of document.querySelectorAll('[data-i18n-attr]')) {
    for (const pair of el.getAttribute('data-i18n-attr').split('|')) {
      const [attr, key] = pair.split(':');
      const value = t(key);
      if (value !== undefined) el.setAttribute(attr, value);
    }
  }

  // <head>
  $('title').textContent = t('meta.title');
  setAttr('meta[name="description"]', 'content', t('meta.description'));
  setAttr('link[rel="canonical"]', 'href', SITE + cfg.path);
  setAttr('meta[property="og:url"]', 'content', SITE + cfg.path);
  setAttr('meta[property="og:title"]', 'content', t('meta.title'));
  setAttr('meta[property="og:description"]', 'content', t('meta.ogDescription'));
  setAttr('meta[property="og:image:alt"]', 'content', t('meta.ogImageAlt'));
  setAttr('meta[property="og:locale"]', 'content', cfg.ogLocale);
  setAttr('meta[property="og:locale:alternate"]', 'content', cfg.otherOgLocale);

  // Selector EN/ES: marcar el idioma actual
  for (const a of document.querySelectorAll('#language-switcher a[data-lang]')) {
    const current = a.getAttribute('data-lang') === lang;
    a.setAttribute('class', current ? 'active' : 'inactive');
    if (current) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }

  // Aviso de idioma: aquí sugiere el otro idioma
  const suggest = $('#lang-suggest > div');
  suggest.setAttribute('lang', cfg.otherLang);
  const cta = $('#lang-suggest a[data-lang]');
  cta.setAttribute('href', cfg.otherPath);
  cta.setAttribute('hreflang', cfg.otherLang);
  cta.setAttribute('data-lang', cfg.otherLang);

  // Demo del hero en el idioma de la página desde el primer render
  const frame = $('#skin-demo');
  frame.setAttribute('src', `${frame.getAttribute('src')}&lang=${lang}`);

  if (missing.length) {
    console.error(`Faltan traducciones (${lang}):\n  ${[...new Set(missing)].join('\n  ')}`);
    process.exit(1);
  }

  const out = join(root, lang, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  const html = document.toString().replace(
    '<!DOCTYPE html>',
    `<!DOCTYPE html>\n<!-- GENERADO por scripts/build-i18n.mjs desde index.html + translations.json. No editar a mano. -->`,
  );
  writeFileSync(out, html);
  console.log(`${lang}/index.html generado`);
}
