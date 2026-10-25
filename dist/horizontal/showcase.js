(() => {
  const t = value => window.horizontalPreferences?.translate(value) || value;
  const scene = document.querySelector('.learning');
  const gallery = document.querySelector('.gallery');
  const carousel = document.querySelector('.certificate-carousel');
  const cards = [...carousel.querySelectorAll('.certificate-item')];
  const pause = document.querySelector('#certificate-pause');
  const tools = document.querySelector('.tool-strip');
  let selected = 0;
  let paused = false;
  let timer;

  function effectsEnabled() {return document.documentElement.classList.contains('motion-enabled');}
  function canRotate() {
    const bounds = scene.getBoundingClientRect();
    const horizontal = matchMedia('(min-width:901px) and (min-height:601px)').matches;
    const active = horizontal ? Math.abs(bounds.left) < innerWidth * 0.25 : bounds.top < innerHeight * 0.65 && bounds.bottom > innerHeight * 0.35;
    const focused = document.activeElement;
    const readingDocument = carousel.contains(focused) && focused?.closest('.certificate-preview,.certificate-link');
    return active && !paused && effectsEnabled() && !document.hidden && !readingDocument && !document.querySelector('dialog[open]');
  }
  function schedule() {
    clearTimeout(timer);
    if (canRotate()) timer = setTimeout(() => {if (canRotate()) show(selected + 1, false); else schedule();}, 6000);
  }
  function show(index, announce = true) {
    selected = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.hidden = i !== selected;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${i + 1} / ${cards.length}`);
    });
    document.querySelector('#certificate-position').textContent = `${String(selected + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (announce) document.querySelector('#certificate-status').textContent = `${selected + 1} / ${cards.length} — ${cards[selected].querySelector('h3').textContent}`;
    schedule();
  }
  function updateControls() {
    const stopped = paused || !effectsEnabled();
    pause.textContent = stopped ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-label', t(stopped ? 'Continuar carrossel de certificados' : 'Pausar carrossel de certificados'));
    pause.title = t(stopped ? 'Continuar carrossel de certificados' : 'Pausar carrossel de certificados');
    pause.setAttribute('aria-pressed', String(stopped));
    // The global effect switch has priority over both automatic carousels.
    pause.disabled = !effectsEnabled();
    tools.classList.toggle('is-paused', !effectsEnabled());
    schedule();
  }
  document.querySelector('#certificate-previous').addEventListener('click', () => show(selected - 1));
  document.querySelector('#certificate-next').addEventListener('click', () => show(selected + 1));
  pause.addEventListener('click', () => {paused = !paused; updateControls();});
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => queueMicrotask(schedule));
  carousel.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation();
    show(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : selected + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let pointerStart;
  let swiped = false;
  carousel.addEventListener('pointerdown', event => {pointerStart = {x: event.clientX, y: event.clientY}; swiped = false;});
  carousel.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {swiped = true; show(selected + (dx < 0 ? 1 : -1));}
  });
  carousel.addEventListener('pointercancel', () => {pointerStart = null;});
  carousel.addEventListener('click', event => {if (swiped) {event.preventDefault(); event.stopPropagation(); swiped = false;}}, true);
  gallery.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  document.addEventListener('visibilitychange', schedule);
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', schedule));
  window.addEventListener('horizontal-motion-change', updateControls);
  window.addEventListener('horizontal-panel-change', schedule);
  window.addEventListener('horizontal-language-change', updateControls);
  show(0, false);
  updateControls();

  const refreshGalleries = [];
  for (const [key, items] of Object.entries(window.horizontalProjectMedia)) {
    if (!items.length) continue;
    const dialog = document.querySelector('#case-' + key);
    if (!dialog) continue;
    const container = document.createElement('section');container.className = 'case-gallery';
    const figure = document.createElement('figure');
    const viewport = document.createElement('div');viewport.className = 'case-media';
    const caption = document.createElement('figcaption');caption.setAttribute('aria-live', 'polite');
    figure.append(viewport, caption);
    const buttons = document.createElement('div');buttons.className = 'case-thumbnails';buttons.setAttribute('role', 'group');
    const note = document.createElement('p');note.className = 'case-note';
    container.append(figure, buttons, note);
    dialog.querySelector('.case-tags').after(container);
    let active = 0;
    function render() {
      const item = items[active];
      viewport.querySelector('video')?.pause();
      viewport.replaceChildren();
      if (item.type === 'video') {
        const video = document.createElement('video');video.src = item.src;video.controls = true;video.playsInline = true;video.preload = 'metadata';
        if (item.poster) video.poster = item.poster;
        video.setAttribute('aria-label', t(item.alt || 'Vídeo de demonstração'));
        viewport.append(video);
      } else {
        const link = document.createElement('a');link.href = item.src;link.target = '_blank';link.rel = 'noopener noreferrer';link.setAttribute('aria-label', t('Ampliar imagem do projeto'));
        const image = document.createElement('img');image.src = item.src;image.alt = t(item.alt);image.loading = 'lazy';
        link.append(image);viewport.append(link);
      }
      caption.textContent = t(item.caption);
      [...buttons.children].forEach((button, i) => {
        button.querySelector('span').textContent = t(items[i].label);
        button.setAttribute('aria-pressed', String(i === active));
      });
      buttons.setAttribute('aria-label', t('Selecionar imagem do projeto'));
      note.textContent = key === 'libby' ? t('Telas reais da Libby, editadas para apresentação. Indicadores históricos.') : key === 'first-site' ? t('Capturas do projeto original fornecidas pelo autor.') : '';
      note.hidden = !note.textContent;
    }
    items.forEach((item, i) => {
      const button = document.createElement('button');button.type = 'button';
      if (item.type === 'image' || item.poster) {
        const thumb = document.createElement('img');thumb.src = item.poster || item.src;thumb.alt = '';thumb.loading = 'lazy';button.append(thumb);
      }
      const label = document.createElement('span');button.append(label);
      button.addEventListener('click', () => {active = i; render();});buttons.append(button);
    });
    dialog.addEventListener('close', () => viewport.querySelector('video')?.pause());
    document.addEventListener('visibilitychange', () => {if (document.hidden) viewport.querySelector('video')?.pause();});
    refreshGalleries.push(render);render();
  }
  window.addEventListener('horizontal-language-change', () => refreshGalleries.forEach(render => render()));
})();
