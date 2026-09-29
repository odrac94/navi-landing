// Consentimiento de cookies + Google Analytics 4 (modo básico de Consent Mode).
// gtag.js NO se carga hasta que el visitante acepta: sin consentimiento no hay
// cookies ni peticiones a Google. Cubre opt-in (GDPR UE/EEE, UK, Suiza, LGPD Brasil)
// y opt-out (CCPA/CPRA y leyes estatales de EE. UU. vía Global Privacy Control).
// Cualquier elemento con [data-consent-open] reabre el banner para cambiar la elección.
(function () {
  'use strict';

  var GA_ID = 'G-DLXLZS96L7';
  var KEY = 'navi-consent';
  var VERSION = 1; // subir si cambia lo que se pide: vuelve a preguntar a todos
  var MAX_AGE = 1000 * 60 * 60 * 24 * 365; // se vuelve a preguntar tras 12 meses

  var lang = (document.documentElement.lang || 'en').slice(0, 2) === 'es' ? 'es' : 'en';
  var TEXT = {
    en: {
      title: 'Cookies & analytics',
      body: 'With your permission we use Google Analytics to count visits and see which pages are useful. It sets cookies and sends usage data to Google. No ads, and the extension never uses it.',
      privacy: 'Privacy policy',
      privacyHref: '/privacy-policy',
      reject: 'Reject',
      accept: 'Accept',
      gpc: 'Your browser sends a Global Privacy Control signal, so analytics stays off unless you accept here.',
    },
    es: {
      title: 'Cookies y estadísticas',
      body: 'Con tu permiso usamos Google Analytics para contar visitas y ver qué páginas son útiles. Guarda cookies y envía datos de uso a Google. Sin anuncios, y la extensión nunca lo usa.',
      privacy: 'Política de privacidad',
      privacyHref: '/es/politica-de-privacidad',
      reject: 'Rechazar',
      accept: 'Aceptar',
      gpc: 'Tu navegador envía la señal Global Privacy Control, así que las estadísticas siguen desactivadas salvo que aceptes aquí.',
    },
  }[lang];

  var gpc = navigator.globalPrivacyControl === true;

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && c.v === VERSION && Date.now() - c.ts < MAX_AGE) return c.analytics;
    } catch (e) {}
    return null;
  }

  function save(analytics) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: analytics, ts: Date.now() }));
    } catch (e) {}
  }

  var loaded = false;
  function loadAnalytics() {
    window['ga-disable-' + GA_ID] = false;
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Solo estadísticas: nada de publicidad ni señales de anuncios.
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('js', new Date());
    gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Al retirar el consentimiento: parar GA y borrar sus cookies (_ga, _ga_*).
  function stopAnalytics() {
    window['ga-disable-' + GA_ID] = true;
    if (window.gtag) gtag('consent', 'update', { analytics_storage: 'denied' });
    var host = location.hostname;
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var banner = null;
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text) n.textContent = text;
    return n;
  }

  function choose(analytics) {
    save(analytics);
    if (analytics === 'granted') loadAnalytics();
    else stopAnalytics();
    hide();
  }

  function show() {
    if (!banner) {
      banner = el('section', { class: 'consent-banner', role: 'region', 'aria-labelledby': 'consent-title', lang: lang });
      var p = el('p', { class: 'consent-body' }, TEXT.body + ' ');
      p.appendChild(el('a', { href: TEXT.privacyHref }, TEXT.privacy));
      var actions = el('div', { class: 'consent-actions' });
      // Mismo tamaño y peso para ambos botones: rechazar debe ser tan fácil como aceptar.
      var reject = el('button', { type: 'button', class: 'consent-btn' }, TEXT.reject);
      var accept = el('button', { type: 'button', class: 'consent-btn' }, TEXT.accept);
      reject.addEventListener('click', function () { choose('denied'); });
      accept.addEventListener('click', function () { choose('granted'); });
      actions.appendChild(reject);
      actions.appendChild(accept);
      banner.appendChild(el('h2', { id: 'consent-title', class: 'consent-title' }, TEXT.title));
      banner.appendChild(p);
      if (gpc) banner.appendChild(el('p', { class: 'consent-note' }, TEXT.gpc));
      banner.appendChild(actions);
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }

  function hide() {
    if (banner) banner.hidden = true;
  }

  function init() {
    var choice = read();
    if (choice === 'granted') loadAnalytics();
    // GPC cuenta como rechazo (opt-out legal en California, Colorado, etc.): sin banner.
    else if (choice === null && !gpc) show();

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-consent-open]');
      if (!t) return;
      e.preventDefault();
      show();
      banner.querySelector('button').focus();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
