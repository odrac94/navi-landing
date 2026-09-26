// Demo del hero: monta una skin REAL de la extensión (pip*.html + styles*.css,
// copiadas con scripts/sync-skins.mjs) y la anima con una canción de ejemplo.
// Replica lo mínimo de content.entry.js: mismos IDs, clases .line/.active,
// .line-original/.line-translation, btn-translate-active, --font-size.
//
// La página padre controla skin, idioma y visibilidad vía postMessage:
//   { type: 'navi-demo', skin?, lang?, visible?, theme? }
(() => {
  // Espejo de SKINS en extension-letras/src/shared/skins.js
  const SKINS = {
    navi: { html: 'pip.html', css: 'styles.css', bodyClass: '' },
    'crt-amber': { html: 'pip.crt-amber.html', css: 'styles.crt-amber.css', bodyClass: 'crt' },
    y2k: { html: 'pip.y2k.html', css: 'styles.y2k.css', bodyClass: 'y2k' },
    eink: { html: 'pip.eink.html', css: 'styles.eink.css', bodyClass: 'eink' },
    ascii: { html: 'pip.ascii.html', css: 'styles.ascii.css', bodyClass: 'ascii' },
    arcade: { html: 'pip.arcade.html', css: 'styles.arcade.css', bodyClass: 'arcade' },
  };

  // Solo las claves __MSG_*__ que usan los pip*.html (de _locales/*/messages.json)
  const MESSAGES = {
    en: {
      adPlaying: 'Ad playing...', decreaseFontSize: 'Decrease font size', increaseFontSize: 'Increase font size',
      loading: 'Loading...', markAsWrongLyrics: 'Mark as wrong lyrics', next: 'Next', playPause: 'Play/Pause',
      previous: 'Previous', searchingLyrics: 'Searching lyrics...', syncEarlier: 'Sync earlier',
      syncLater: 'Sync later', translateLyrics: 'Translate lyrics',
    },
    es: {
      adPlaying: 'Anuncio en reproducción...', decreaseFontSize: 'Reducir tamaño de fuente',
      increaseFontSize: 'Aumentar tamaño de fuente', loading: 'Cargando...', markAsWrongLyrics: 'Marcar como letra incorrecta',
      next: 'Siguiente', playPause: 'Reproducir/Pausar', previous: 'Anterior', searchingLyrics: 'Buscando letra...',
      syncEarlier: 'Sincronizar antes', syncLater: 'Sincronizar después', translateLyrics: 'Traducir letra',
    },
  };

  // Canción y banda ficticias (letra original para el demo)
  const SONG = {
    title: 'Spreadsheet Serenade',
    artist: 'The Pivot Tables',
    album: 'Ctrl+Alt+Chorus',
    year: '2026',
    art: 'cover.svg',
  };

  // text vacío = línea instrumental. La 2ª columna es la "traducción" del botón traducir.
  const LINE_SECONDS = 3.2;
  const LYRICS = [
    ['Monday morning, coffee number three', 'Lunes temprano, café número tres'],
    ['Excel is frozen, and so is my soul', 'Excel se congeló, y mi alma también'],
    ["I'm belting ballads in cell B12", 'Canto baladas en la celda B12'],
    ["Nobody hears me, I'm on mute (I hope)", 'Nadie me oye, estoy en mute (eso espero)'],
    ['', ''],
    ['Oh pivot table, turn around', 'Oh, tabla dinámica, date la vuelta'],
    ['Every VLOOKUP lets me down', 'Cada BUSCARV me decepciona'],
    ['This meeting could have been an email', 'Esta reunión pudo haber sido un correo'],
    ["But I'm the karaoke hero of cubicle nine", 'Pero soy el héroe karaoke del cubículo nueve'],
    ['(Wait... was I unmuted the whole time?)', '(Espera... ¿tuve el micro abierto todo este tiempo?)'],
  ].map(([text, es], i) => ({ time: i * LINE_SECONDS, text, es }));

  // Espejo de THEMES en extension-letras/src/shared/themes.js (solo aplican a la skin Navi).
  // 'adaptive' en la extensión sale de la carátula; aquí va fijo al color de cover.svg.
  const THEMED_VAR_KEYS = [
    '--accent-rgb', '--accent-hex', '--accent-dark',
    '--bg-base', '--bg-gradient-start', '--bg-gradient-end', '--bg-overlay-rgb',
    '--navi-primary', '--navi-primary-dark', '--navi-bg-dark',
    '--glass-surface', '--glass-border',
  ];
  const palette = (rgb, hex, dark, base, start, end, overlay, extra = {}) => ({
    '--accent-rgb': rgb, '--accent-hex': hex, '--accent-dark': dark,
    '--bg-base': base, '--bg-gradient-start': start, '--bg-gradient-end': end, '--bg-overlay-rgb': overlay,
    '--navi-primary': hex, '--navi-primary-dark': dark, '--navi-bg-dark': base, ...extra,
  });
  const THEMES = {
    navi: null,
    spotify: palette('29, 185, 84', '#1DB954', '#169c44', '#121212', '#191414', '#000000', '25, 20, 20'),
    apple: palette('250, 36, 60', '#FA243C', '#cc1d30', '#1a1a1a', '#2a0a0f', '#000000', '26, 5, 10'),
    amoled: palette('255, 255, 255', '#ffffff', '#cccccc', '#000000', '#000000', '#000000', '0, 0, 0', {
      '--glass-surface': 'rgba(255, 255, 255, 0.04)', '--glass-border': 'rgba(255, 255, 255, 0.08)',
    }),
    sunset: palette('249, 115, 22', '#f97316', '#c2410c', '#1c0a14', '#3d1a0d', '#0d0610', '61, 26, 13'),
    forest: palette('16, 185, 129', '#10b981', '#047857', '#0a1a14', '#0a2818', '#000000', '10, 40, 24'),
    bubblegum: palette('255, 92, 184', '#ff5cb8', '#e23d97', '#1b0a16', '#3a1029', '#0c0408', '58, 16, 41'),
    adaptive: {
      '--accent-rgb': '255, 92, 138', '--accent-hex': '#ff5c8a', '--accent-dark': '#b24060',
      '--navi-primary': '#ff5c8a', '--navi-primary-dark': '#b24060',
    },
  };
  const DURATION = LYRICS.length * LINE_SECONDS;

  const params = new URLSearchParams(location.search);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    skin: SKINS[params.get('skin')] ? params.get('skin') : 'navi',
    lang: MESSAGES[params.get('lang')] ? params.get('lang') : 'en',
    theme: 'navi',
    time: LYRICS[2].time, // arranca en el estribillo, como el mockup anterior
    playing: !reduceMotion,
    visible: true,
    translated: false,
    fontDelta: 0,
    offset: 0,
    version: 1,
    activeIndex: -1,
  };

  let mountSeq = 0;
  let glitchTimer = null;
  const $ = (id) => document.getElementById(id);

  const fmt = (s) => {
    const t = Math.max(0, Math.floor(s));
    return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  };

  async function mount(skinId) {
    const seq = ++mountSeq;
    const skin = SKINS[skinId];
    const msgs = MESSAGES[state.lang];

    const res = await fetch(skin.html);
    const html = (await res.text()).replace(/__MSG_(\w+)__/g, (_, k) => msgs[k] ?? '');
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Esperar a que cargue el CSS nuevo antes de cambiar el DOM (sin flash sin estilos)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = skin.css;
    link.dataset.skin = skinId;
    await new Promise((resolve) => {
      link.onload = link.onerror = resolve;
      document.head.appendChild(link);
    });
    if (seq !== mountSeq) { link.remove(); return; }

    document.body.classList.add('demo-swapping');
    await new Promise((r) => setTimeout(r, document.body.childElementCount ? 180 : 0));
    if (seq !== mountSeq) { link.remove(); return; }

    document.querySelectorAll('link[data-skin]').forEach((l) => { if (l !== link) l.remove(); });
    document.documentElement.style.removeProperty('--font-size');
    // Contenido del pip*.html propio (mismo origen), igual que hace la extensión
    document.body.innerHTML = doc.body.innerHTML;
    document.body.className = [skin.bodyClass, 'demo-swapping'].filter(Boolean).join(' ');
    state.skin = skinId;
    state.activeIndex = -1;

    wire();
    renderLines();
    applyTheme();
    applyFont();
    render(true);
    scheduleGlitch();
    requestAnimationFrame(() => document.body.classList.remove('demo-swapping'));
  }

  function wire() {
    $('song-title').textContent = SONG.title;
    $('song-artist').textContent = SONG.artist;
    $('song-album').textContent = SONG.album;
    $('song-year').textContent = SONG.year;
    const art = $('album-thumbnail');
    if (art) { art.src = SONG.art; art.style.opacity = '1'; }
    if ($('total-time')) $('total-time').textContent = fmt(DURATION);
    $('offset-value').textContent = `${state.offset}s`;
    $('version-badge').textContent = `${state.version}/20`;
    $('btn-translate')?.classList.toggle('btn-translate-active', state.translated);

    const skeleton = $('skeleton-loading');
    if (skeleton) skeleton.style.display = 'none';

    on('btn-play', () => { state.playing = !state.playing; renderPlay(); });
    on('btn-prev', () => seekLine(Math.max(0, currentIndex() - 1)));
    on('btn-next', () => seekLine((currentIndex() + 1) % LYRICS.length));
    on('btn-font-minus', () => { state.fontDelta = Math.max(-4, state.fontDelta - 2); applyFont(); });
    on('btn-font-plus', () => { state.fontDelta = Math.min(12, state.fontDelta + 2); applyFont(); });
    on('btn-offset-slow', () => setOffset(-0.5));
    on('btn-offset-fast', () => setOffset(0.5));
    on('btn-translate', () => {
      state.translated = !state.translated;
      $('btn-translate').classList.toggle('btn-translate-active', state.translated);
      state.activeIndex = -1;
      renderLines();
      render(true);
    });
    on('btn-dislike', () => {
      const btn = $('btn-dislike');
      state.version = (state.version % 20) + 1;
      $('version-badge').textContent = `${state.version}/20`;
      btn.classList.add('btn-dislike-cycle');
      setTimeout(() => btn.classList.remove('btn-dislike-cycle'), 600);
    });
    renderPlay();
  }

  function on(id, fn) { $(id)?.addEventListener('click', fn); }

  function setOffset(delta) {
    state.offset = Math.round((state.offset + delta) * 10) / 10;
    $('offset-value').textContent = `${state.offset > 0 ? '+' : ''}${state.offset}s`;
  }

  function applyFont() {
    const root = document.documentElement;
    root.style.removeProperty('--font-size');
    const base = parseFloat(getComputedStyle(root).getPropertyValue('--font-size')) || 16;
    if (state.fontDelta) root.style.setProperty('--font-size', `${base + state.fontDelta}px`);
  }

  function applyTheme() {
    const root = document.documentElement;
    THEMED_VAR_KEYS.forEach((k) => root.style.removeProperty(k));
    const vars = state.skin === 'navi' ? THEMES[state.theme] : null;
    if (vars) Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }

  function renderPlay() {
    const btn = $('btn-play');
    if (!btn) return;
    btn.querySelector('.play-icon').style.display = state.playing ? 'none' : 'block';
    btn.querySelector('.pause-icon').style.display = state.playing ? 'block' : 'none';
  }

  function renderLines() {
    const container = $('lyrics-container');
    container.querySelectorAll('.line').forEach((el) => el.remove());
    LYRICS.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'line';
      if (!line.text) div.classList.add('line-instrumental');
      div.dataset.index = index;
      if (state.translated) {
        const orig = document.createElement('span');
        orig.className = 'line-original';
        orig.textContent = line.text || ' ';
        div.appendChild(orig);
        if (line.es) {
          const tr = document.createElement('span');
          tr.className = 'line-translation';
          tr.textContent = line.es;
          div.appendChild(tr);
        }
      } else {
        div.textContent = line.text || ' ';
      }
      div.style.cursor = 'pointer';
      div.addEventListener('click', () => seekLine(index));
      container.appendChild(div);
    });
  }

  function currentIndex() {
    return Math.min(LYRICS.length - 1, Math.floor(state.time / LINE_SECONDS));
  }

  function seekLine(index) {
    state.time = LYRICS[index].time;
    render();
  }

  // Centrar la línea activa moviendo SOLO el scroll del contenedor
  // (scrollIntoView también desplazaría la página que contiene el iframe).
  function centerLine(line, instant) {
    const container = $('lyrics-container');
    const c = container.getBoundingClientRect();
    const l = line.getBoundingClientRect();
    const top = container.scrollTop + (l.top + l.height / 2) - (c.top + c.height / 2);
    container.scrollTo({ top, behavior: instant || reduceMotion ? 'auto' : 'smooth' });
  }

  function render(instant = false) {
    const bar = $('progress-bar');
    if (bar) bar.style.width = `${(state.time / DURATION) * 100}%`;
    if ($('current-time')) $('current-time').textContent = fmt(state.time);

    const index = currentIndex();
    if (index === state.activeIndex && !instant) return;
    const lines = $('lyrics-container').querySelectorAll('.line');
    lines.forEach((el, i) => el.classList.toggle('active', i === index));
    state.activeIndex = index;
    if (lines[index]) centerLine(lines[index], instant);
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    if (state.playing && state.visible && $('lyrics-container')) {
      state.time = (state.time + dt) % DURATION;
      render();
    }
    requestAnimationFrame(tick);
  }

  // Parpadeo aleatorio de la skin CRT (como scheduleCrtGlitch en la extensión)
  const GLITCH_SELECTOR = '#song-title, #song-artist, #song-album, #song-year, .toolbar-btn, .controls button, #offset-value, #version-badge, .crt-time, .crt-sync-label, .crt-now';
  function scheduleGlitch() {
    clearTimeout(glitchTimer);
    if (state.skin !== 'crt-amber' || reduceMotion) return;
    glitchTimer = setTimeout(() => {
      const els = [...document.querySelectorAll(GLITCH_SELECTOR)].filter((el) => el.offsetParent);
      const el = els[Math.floor(Math.random() * els.length)];
      if (el && state.visible) {
        el.classList.add('crt-glitch-burst');
        setTimeout(() => el.classList.remove('crt-glitch-burst'), 500);
      }
      scheduleGlitch();
    }, 2200 + Math.random() * 4300);
  }

  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin || event.data?.type !== 'navi-demo') return;
    const { skin, lang, visible, theme } = event.data;
    if (typeof visible === 'boolean') state.visible = visible;
    if (theme in THEMES && theme !== state.theme) { state.theme = theme; applyTheme(); }
    const langChanged = MESSAGES[lang] && lang !== state.lang;
    if (langChanged) state.lang = lang;
    if ((SKINS[skin] && skin !== state.skin) || langChanged) mount(SKINS[skin] ? skin : state.skin);
  });

  mount(state.skin);
  requestAnimationFrame(tick);
})();
