// Shared motion and media states. No dependency, no synthetic loading delay.
(() => {
  const root = document.documentElement;
  const events = new AbortController();
  const active = new Map();
  const animations = new Set();
  let keyboard = false;
  const duration = (property, fallback) => {
    const value = getComputedStyle(root).getPropertyValue(property).trim();
    return value ? parseFloat(value) * (value.endsWith('ms') ? 1 : 1000) : fallback;
  };
  const settings = {
    get enter() {return duration('--motion-enter', 700);},
    get exit() {return duration('--motion-exit', 240);},
    get media() {return duration('--motion-media', 420);},
    get distance() {return getComputedStyle(root).getPropertyValue('--motion-distance').trim() || '18px';},
    get stagger() {return duration('--motion-stagger', 80);},
    get staggerLimit() {return duration('--motion-stagger-limit', 320);},
    get interval() {return duration('--carousel-interval', 6000);},
    get easing() {return getComputedStyle(root).getPropertyValue('--motion-ease').trim() || 'cubic-bezier(.22,.68,0,1)';}
  };
  const enabled = () => root.classList.contains('motion-enabled') && !keyboard;
  const translate = value => window.horizontalPreferences?.translate(value) || value;
  function animate(element, frames, duration = settings.enter) {
    if (!element?.animate || !enabled()) return Promise.resolve();
    const animation = element.animate(frames, {duration, easing: settings.easing});
    animations.add(animation);
    return Promise.resolve(animation.finished).catch(() => {}).finally(() => {
      animations.delete(animation);
    });
  }
  function enter(element) {
    return animate(element, [{opacity: 0, transform: `translateY(${settings.distance})`}, {opacity: 1, transform: 'translateY(0)'}]);
  }
  function leave(element) {
    if (!enabled()) return;
    const parent = element.parentElement;
    parent.querySelectorAll('.motion-snapshot').forEach(node => node.remove());
    const snapshot = element.cloneNode(true);
    snapshot.classList.add('motion-snapshot');
    snapshot.hidden = false; snapshot.inert = true;
    snapshot.setAttribute('aria-hidden', 'true');
    snapshot.querySelectorAll('a,button').forEach(node => node.setAttribute('tabindex', '-1'));
    parent.append(snapshot);
    animate(snapshot, [{opacity: 1}, {opacity: 0}], settings.exit).finally(() => snapshot.remove());
  }
  function track(image) {
    if (image.closest?.('.motion-snapshot')) return;
    if (active.has(image) || !image.matches('.screen img,.portrait img,.certificate-preview img,.case-media img,.case-media video,.case-thumbnails img')) return;
    const video = image.tagName === 'VIDEO';
    const host = image.parentElement;
    const status = document.createElement('span');
    status.className = 'media-status';
    status.setAttribute('aria-hidden', 'true');
    host.classList.add('media-frame');
    host.append(status);
    if (!video) {image.decoding = 'async'; image.loading = 'lazy';}
    const controller = new AbortController();
    let revision = 0;
    const label = () => {
      status.textContent = translate(host.dataset.mediaState === 'error' ? 'Mídia indisponível. Tente recarregar a página.' : 'Carregando mídia…');
    };
    const begin = () => {
      revision++;
      host.dataset.mediaState = 'loading';
      host.setAttribute('aria-busy', 'true');
      status.removeAttribute('role');
      status.setAttribute('aria-hidden', 'true');
      label();
    };
    const finish = async () => {
      const token = revision;
      try { await image.decode?.(); } catch {} // A loaded image is usable even without decode().
      if (token !== revision || !active.has(image) || !image.isConnected) return;
      host.dataset.mediaState = 'ready';
      host.setAttribute('aria-busy', 'false');
      animate(image, [{opacity: 0}, {opacity: 1}], settings.media);
    };
    const fail = () => {
      revision++;
      host.dataset.mediaState = 'error';
      host.setAttribute('aria-busy', 'false');
      status.removeAttribute('aria-hidden');
      status.setAttribute('role', 'status');
      label();
    };
    active.set(image, {begin, label, dispose() {
      revision++; controller.abort(); status.remove();
      host.classList.remove('media-frame');
      delete host.dataset.mediaState; host.removeAttribute('aria-busy');
    }});
    image.addEventListener(video ? 'loadedmetadata' : 'load', finish, {signal: controller.signal});
    image.addEventListener('error', fail, {signal: controller.signal});
    begin();
    if (video && image.readyState >= 1) finish();
    else if (!video && image.complete && image.getAttribute('src')) image.naturalWidth ? finish() : fail();
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches('img,video')) track(node);
    node.querySelectorAll('img,video').forEach(track);
  }
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') {
        active.get(record.target)?.begin();
        // Cached source changes can finish before the observer callback.
        if (record.target.complete) record.target.dispatchEvent(new Event(record.target.naturalWidth ? 'load' : 'error'));
      } else record.addedNodes.forEach(scan);
    }
    for (const [image, state] of active) if (!image.isConnected) {state.dispose(); active.delete(image);}
  });
  function start() {
    scan(document.body);
    observer.observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['src']});
  }
  document.addEventListener('keydown', () => {keyboard = true; root.dataset.input = 'keyboard';}, {capture: true, signal: events.signal});
  document.addEventListener('pointerdown', () => {keyboard = false; root.dataset.input = 'pointer';}, {capture: true, signal: events.signal});
  window.addEventListener('horizontal-language-change', () => active.forEach(state => state.label()), {signal: events.signal});
  window.addEventListener('horizontal-motion-change', () => {
    if (!root.classList.contains('motion-enabled')) animations.forEach(animation => animation.cancel());
  }, {signal: events.signal});
  const closing = new WeakSet();
  async function close(dialog, value = '') {
    if (!dialog.open || closing.has(dialog)) return;
    closing.add(dialog);
    await animate(dialog, [{opacity: 1, transform: 'translateY(0)'}, {opacity: 0, transform: 'translateY(4px)'}], settings.exit);
    dialog.close(value);
    closing.delete(dialog);
  }
  document.querySelectorAll('.detail-dialog').forEach(dialog => {
    dialog.addEventListener('cancel', event => {event.preventDefault(); close(dialog);}, {signal: events.signal});
    dialog.querySelectorAll('form[method=dialog]').forEach(form => form.addEventListener('submit', event => {
      event.preventDefault(); close(dialog, event.submitter?.value || '');
    }, {signal: events.signal}));
    dialog.addEventListener('close', () => window.dispatchEvent(new Event('horizontal-panel-change')), {signal: events.signal});
  });
  window.portfolioMotion = {settings, enabled, enter, leave, animate, close, track};
  window.addEventListener('pagehide', event => {
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    active.forEach(state => state.dispose()); active.clear();
    if (!event.persisted) events.abort();
  }, {signal: events.signal});
  window.addEventListener('pageshow', event => {if (event.persisted) start();}, {signal: events.signal});
  start();
})();
