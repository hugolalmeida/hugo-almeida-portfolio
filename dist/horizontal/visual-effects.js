// No GPU context or animation loop: CSS owns the gradient. This controller only
// lets it run while the opening is visible and the visitor permits motion.
(() => {
  const root = document.documentElement;
  const opening = document.querySelector('.opening');
  if (!opening) return;
  const events = new AbortController();
  let visible = false;
  let observer;
  function update() {
    root.dataset.ambientRunning = String(visible && !document.hidden &&
      root.classList.contains('motion-enabled') && !document.querySelector('dialog[open]'));
  }
  function start() {
    if (!('IntersectionObserver' in window)) return; // Keep static artwork.
    observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      update();
    }, {threshold: 0});
    observer.observe(opening);
  }
  document.addEventListener('visibilitychange', update, {signal: events.signal});
  window.addEventListener('horizontal-motion-change', update, {signal: events.signal});
  window.addEventListener('horizontal-panel-change', update, {signal: events.signal});
  window.addEventListener('pagehide', event => {
    observer?.disconnect();
    root.dataset.ambientRunning = 'false';
    if (!event.persisted) events.abort();
  }, {signal: events.signal});
  window.addEventListener('pageshow', event => { if (event.persisted) start(); }, {signal: events.signal});
  start();
})();
