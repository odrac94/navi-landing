// /support y /es/soporte: formulario de soporte (Formspree) que se rellena con el
// reporte de diagnóstico que la extensión manda en el hash (#r=<base64url>).
// Spec en extension-letras/docs/specs/error-ux-diagnostics.md §5.8–§5.9 y §6:
//  - el hash se decodifica en try/catch, con tope de 4 000 caracteres, y se vuelca
//    con .value (nunca innerHTML);
//  - tras leerlo se quita de la URL con history.replaceState para que el reporte
//    no quede en el historial del navegador ni en Chrome Sync;
//  - el POST va a Formspree (plan gratuito, dominio restringido a navilyrics.com).
import { ROUTES, SITE } from './routes.mjs';
import { escape } from './layout.mjs';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjygzbno';
const MAX_REPORTE = 4000;

const CONTENT = {
  en: {
    title: 'Support — Navi Lyrics',
    description: 'Report a problem with the Navi Lyrics extension. The diagnostic report from the extension fills in automatically; nothing is sent until you press Send.',
    breadcrumb: 'Support',
    h1: 'Navi Lyrics <span class="text-primary neon-text-glow">Support</span>',
    lead: 'Tell us what happened. If you came here from the extension’s “Report a problem” button, the diagnostic report is already filled in below. Nothing is sent until you press Send.',
    labelEmail: 'Your email (optional, so we can reply)',
    labelMessage: 'What happened?',
    placeholderMessage: 'For example: the lyrics window opens and closes right away on YouTube Music.',
    labelReport: 'Diagnostic report',
    noteReport: 'If it’s empty, paste the report you copied from the extension (popup → Report a problem → Copy report). It contains no personal data: no URLs, no account, no lyrics.',
    noteLoaded: 'Loaded from the extension. Review it before sending.',
    send: 'Send',
    sending: 'Sending…',
    ok: 'Received. If you left an email, we’ll reply there.',
    err: 'Couldn’t send. Try again, or reach us on social media.',
    privacyNote: 'The form is processed by Formspree, which delivers it to our inbox. Details in the',
    privacyLink: 'privacy policy',
    socialTitle: 'Other ways to reach us',
  },
  es: {
    title: 'Soporte — Navi Lyrics',
    description: 'Reporta un problema con la extensión Navi Lyrics. El reporte de diagnóstico de la extensión se rellena solo; nada se envía hasta que pulsas Enviar.',
    breadcrumb: 'Soporte',
    h1: 'Soporte de <span class="text-primary neon-text-glow">Navi Lyrics</span>',
    lead: 'Cuéntanos qué pasó. Si llegaste desde el botón “Reportar un problema” de la extensión, el reporte de diagnóstico ya está abajo. Nada se envía hasta que pulses Enviar.',
    labelEmail: 'Tu correo (opcional, para responderte)',
    labelMessage: '¿Qué pasó?',
    placeholderMessage: 'Por ejemplo: la ventana de letras se abre y se cierra enseguida en YouTube Music.',
    labelReport: 'Reporte de diagnóstico',
    noteReport: 'Si está vacío, pega el reporte que copiaste desde la extensión (popup → Reportar un problema → Copiar reporte). No contiene datos personales: ni URLs, ni cuenta, ni letras.',
    noteLoaded: 'Cargado desde la extensión. Revísalo antes de enviar.',
    send: 'Enviar',
    sending: 'Enviando…',
    ok: 'Recibido. Si dejaste un correo, te responderemos ahí.',
    err: 'No se pudo enviar. Inténtalo de nuevo o escríbenos por redes.',
    privacyNote: 'El formulario lo procesa Formspree, que lo entrega a nuestro buzón. Detalles en la',
    privacyLink: 'política de privacidad',
    socialTitle: 'Otras formas de contactarnos',
  },
};

export const supportMeta = (lang) => CONTENT[lang];

const INPUT = 'w-full rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-500 focus:border-primary focus:ring-primary';

export const supportBody = (lang) => {
  const c = CONTENT[lang];
  return `            <header class="max-w-3xl mx-auto">
                <h1 class="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">${c.h1}</h1>
                <p class="text-base sm:text-lg text-gray-300 leading-relaxed">${escape(c.lead)}</p>
            </header>

            <div class="max-w-3xl mx-auto mt-10">
                <form id="support-form" class="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-5" method="POST" action="${FORMSPREE_ENDPOINT}" novalidate>
                    <div>
                        <label class="block text-sm text-gray-400 mb-2" for="email">${escape(c.labelEmail)}</label>
                        <input class="${INPUT}" id="email" name="email" type="email" autocomplete="email" inputmode="email">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-400 mb-2" for="mensaje">${escape(c.labelMessage)}</label>
                        <textarea class="${INPUT} min-h-[120px]" id="mensaje" name="mensaje" required placeholder="${escape(c.placeholderMessage)}"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-400 mb-2" for="reporte">${escape(c.labelReport)}</label>
                        <textarea class="${INPUT} min-h-[220px] font-mono text-xs leading-relaxed" id="reporte" name="reporte" spellcheck="false"></textarea>
                        <p class="text-xs text-gray-500 mt-2" id="nota-reporte" data-loaded="${escape(c.noteLoaded)}">${escape(c.noteReport)}</p>
                    </div>
                    <input type="hidden" name="_subject" value="Navi Lyrics · support">
                    <input type="hidden" name="_language" value="${lang}">
                    <input type="text" name="_gotcha" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">
                    <div>
                        <button type="submit" class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-bold text-black bg-primary hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(13,242,242,0.4)] hover:shadow-[0_0_30px_rgba(13,242,242,0.6)] disabled:opacity-60 disabled:cursor-wait" data-send="${escape(c.send)}" data-sending="${escape(c.sending)}">${escape(c.send)}</button>
                    </div>
                    <p class="rounded-lg bg-primary/10 border border-primary/30 px-4 py-3 text-sm text-gray-200" id="support-ok" role="status" hidden>${escape(c.ok)}</p>
                    <p class="rounded-lg bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-gray-200" id="support-err" role="alert" hidden>${escape(c.err)}</p>
                    <p class="text-xs text-gray-500">${escape(c.privacyNote)} <a class="text-primary hover:text-white underline decoration-primary/30 underline-offset-2" href="${ROUTES.privacy[lang]}">${escape(c.privacyLink)}</a>.</p>
                </form>

                <section class="max-w-3xl mx-auto mt-10 text-center">
                    <h2 class="text-xs uppercase tracking-widest text-gray-500 mb-4">${escape(c.socialTitle)}</h2>
                    <div class="flex flex-wrap justify-center gap-3">
                        <a class="glass-panel rounded-full px-4 py-2 text-sm text-gray-300 hover:text-primary hover:border-primary/50 transition-colors" href="https://www.instagram.com/navilyrics__/" target="_blank" rel="noopener">Instagram · @navilyrics__</a>
                        <a class="glass-panel rounded-full px-4 py-2 text-sm text-gray-300 hover:text-primary hover:border-primary/50 transition-colors" href="https://x.com/navilyrics_" target="_blank" rel="noopener">X · @navilyrics_</a>
                    </div>
                </section>
            </div>

    <script>
        (function () {
            var MAX = ${MAX_REPORTE};
            var reporte = document.getElementById('reporte');
            var nota = document.getElementById('nota-reporte');
            function decodificar(b64url) {
                var b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
                while (b64.length % 4) b64 += '=';
                var bin = atob(b64);
                var bytes = new Uint8Array(bin.length);
                for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
            }
            try {
                var m = /(?:^#|[#&])r=([A-Za-z0-9_-]+)/.exec(location.hash);
                if (m) {
                    var texto = decodificar(m[1]);
                    if (texto.length <= MAX) {
                        reporte.value = texto; // .value, nunca innerHTML
                        nota.textContent = nota.getAttribute('data-loaded');
                    }
                }
            } catch (e) { /* hash malformado: el campo queda vacío */ }
            // El reporte no debe quedar en el historial ni en Chrome Sync
            if (location.hash) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }

            var form = document.getElementById('support-form');
            var ok = document.getElementById('support-ok');
            var err = document.getElementById('support-err');
            var btn = form.querySelector('button[type="submit"]');
            form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                if (!form.reportValidity()) return;
                ok.hidden = true; err.hidden = true;
                btn.disabled = true; btn.textContent = btn.getAttribute('data-sending');
                fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(String(r.status)); ok.hidden = false; form.reset(); })
                    .catch(function () { err.hidden = false; })
                    .then(function () { btn.disabled = false; btn.textContent = btn.getAttribute('data-send'); });
            });
        })();
    </script>`;
};

export const supportJsonLd = (lang) => [
  {
    '@type': 'ContactPage',
    '@id': `${SITE}${ROUTES.support[lang]}#webpage`,
    url: SITE + ROUTES.support[lang],
    name: CONTENT[lang].title,
    description: CONTENT[lang].description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
  },
];
