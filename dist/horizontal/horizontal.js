const gallery = document.querySelector('.gallery');
const scenes = [...document.querySelectorAll('.scene')];
const stops = [...document.querySelectorAll('.stops a')];
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const horizontal = matchMedia('(min-width:901px) and (min-height:601px)');
const motionQuery = new URLSearchParams(location.search).get('motion');
// This experimental version starts with motion enabled by the author's choice.
let motionPreference = ['on', 'off'].includes(motionQuery) ? motionQuery : window.horizontalPreferences?.motion || 'on';
const t = value => window.horizontalPreferences?.translate(value) || value;
const reduced = {get matches() {return motionPreference === 'off';}};
const motionToggle = document.querySelector('#motion-toggle');
const motionReplay = document.querySelector('#motion-replay');
let replayAnimations = [];
let current = 0;
let pendingFrame = false;
let wheelLastEvent = -Infinity;
let wheelLockedUntil = 0;
let sceneObserver;

function updateMotionControls() {
  document.documentElement.classList.toggle('motion-enabled', !reduced.matches);
  document.documentElement.classList.toggle('motion-paused', reduced.matches);
  motionToggle.textContent = t(reduced.matches ? 'Ativar efeitos' : 'Pausar efeitos');
  motionToggle.setAttribute('aria-pressed', String(!reduced.matches));
  motionToggle.title = t('Ativar ou pausar animações nesta página');
  motionReplay.disabled = reduced.matches;
  window.dispatchEvent?.(new Event('horizontal-motion-change'));
}

function replayEntrance() {
  if (reduced.matches) return;
  replayAnimations.forEach(animation => animation.cancel());
  replayAnimations = [];
  const scene = scenes[current];
  scene.classList.add('is-visible');
  scene.querySelectorAll('.reveal').forEach((element, i) => {
    if (!element.animate) return;
    replayAnimations.push(element.animate([
      {opacity: 0, transform: 'translate3d(0,28px,0)'},
      {opacity: 1, transform: 'translate3d(0,0,0)'}
    ], {duration: 1100, delay: Math.min(i * 135, 810), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'}));
  });
}

updateMotionControls();
motionToggle.addEventListener('click', () => {
  motionPreference = reduced.matches ? 'on' : 'off';
  window.horizontalPreferences?.saveMotion(motionPreference);
  const url = new URL(location.href);
  url.searchParams.set('motion', motionPreference);
  history.replaceState(null, '', url);
  cancelWheel();
  replayAnimations.forEach(animation => animation.cancel());
  updateMotionControls();
  observeScenes();
  scheduleMeasure();
  replayEntrance();
});
motionReplay.addEventListener('click', replayEntrance);

document.querySelector('#scene-total').textContent = String(scenes.length).padStart(2, '0');

function cancelWheel() {
  wheelLastEvent = -Infinity;
  wheelLockedUntil = 0;
}

function observeScenes() {
  sceneObserver?.disconnect();
  if (!('IntersectionObserver' in window) || reduced.matches) {
    document.documentElement.classList.remove('motion-ready');
    return;
  }
  document.documentElement.classList.add('motion-ready');
  const threshold = horizontal.matches ? 0.72 : 0.08;
  sceneObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Start on arrival; reset only after leaving, so small scroll reversals
      // do not interrupt the sequence or cause the content to flicker.
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) entry.target.classList.add('is-visible');
      else if (!entry.isIntersecting || entry.intersectionRatio <= (horizontal.matches ? 0.12 : 0.02)) entry.target.classList.remove('is-visible');
    });
  }, {root: horizontal.matches ? gallery : null, threshold: [horizontal.matches ? 0.12 : 0.02, threshold]});
  scenes.forEach(scene => sceneObserver.observe(scene));
}

scenes.forEach(scene => {
  const elements = scene.querySelectorAll('.scene-top,.opening-body>.eyebrow,h1,.opening-bottom,.opening-foot,.libby-heading>*,.catalog,.project-foot,.operation-copy>*,.operation-figure,.projects h2,.project-list article,.project-instruction,.portrait,.about-copy>*,.learning-heading>*,.tool-strip,.certificate-carousel,.all-certificates,.trajectory-heading>*,.career-line li,.contact-body>*,.contact-foot');
  elements.forEach((element, i) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', Math.min(i * 135, 810) + 'ms');
  });
});
observeScenes();

function setCurrent(index) {
  current = index;
  document.querySelector('#current-number').textContent = String(index + 1).padStart(2, '0');
  document.querySelector('#current-label').textContent = t(scenes[index].dataset.label);
  stops.forEach((stop, i) => i === index ? stop.setAttribute('aria-current', 'step') : stop.removeAttribute('aria-current'));
  previous.disabled = index === 0;
  next.disabled = index === scenes.length - 1;
}

function measure() {
  pendingFrame = false;
  const middle = horizontal.matches ? gallery.clientWidth / 2 : innerHeight / 2;
  let closest = 0;
  let distance = Infinity;
  scenes.forEach((scene, i) => {
    const bounds = scene.getBoundingClientRect();
    const center = horizontal.matches ? bounds.left + bounds.width / 2 : bounds.top + bounds.height / 2;
    const travel = horizontal.matches && !reduced.matches ? Math.max(-1, Math.min(1, (center - middle) / gallery.clientWidth)) : 0;
    scene.style.setProperty('--depth', (-travel * 45).toFixed(2) + 'px');
    if (Math.abs(center - middle) < distance) { closest = i; distance = Math.abs(center - middle); }
  });
  const range = horizontal.matches ? gallery.scrollWidth - gallery.clientWidth : document.documentElement.scrollHeight - innerHeight;
  const position = horizontal.matches ? gallery.scrollLeft : scrollY;
  document.documentElement.style.setProperty('--progress', range > 0 ? Math.max(0, Math.min(1, position / range)) : 0);
  if (closest !== current) setCurrent(closest);
}

function scheduleMeasure() {
  if (!pendingFrame) { pendingFrame = true; requestAnimationFrame(measure); }
}

function goTo(index, focus = true) {
  cancelWheel();
  const scene = scenes[Math.max(0, Math.min(index, scenes.length - 1))];
  if (focus) scene.focus({preventScroll: true});
  const behavior = reduced.matches ? 'instant' : 'smooth';
  if (horizontal.matches) gallery.scrollTo({left: scene.offsetLeft, behavior});
  else window.scrollTo({top: scrollY + scene.getBoundingClientRect().top, behavior});
  wheelLockedUntil = performance.now() + (reduced.matches ? 300 : 850);
}

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const index = scenes.findIndex(scene => '#' + scene.id === link.getAttribute('href'));
  if (index < 0) return;
  event.preventDefault();
  history.replaceState(null, '', '#' + scenes[index].id);
  goTo(index);
}));

// One wheel/trackpad gesture advances one whole scene. Ignore momentum until
// the transition finishes and the previous gesture has been quiet for 180 ms.
gallery.addEventListener('wheel', event => {
  if (!horizontal.matches || event.ctrlKey || document.querySelector('dialog[open]')) return;
  const inner = event.target?.closest?.('[data-native-scroll]');
  if (inner && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
    const canReadMore = event.deltaY > 0 ? inner.scrollTop + inner.clientHeight < inner.scrollHeight - 1 : inner.scrollTop > 1;
    if (canReadMore) return;
  }
  event.preventDefault();
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (!delta) return;
  const now = performance.now();
  const continuingGesture = now - wheelLastEvent < 180;
  wheelLastEvent = now;
  if (continuingGesture || now < wheelLockedUntil) return;
  const index = Math.max(0, Math.min(scenes.length - 1, current + Math.sign(delta)));
  if (index === current) return;
  goTo(index, false);
  wheelLastEvent = now;
}, {passive: false});
gallery.addEventListener('pointerdown', cancelWheel);

previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
document.addEventListener('keydown', event => {
  if (!horizontal.matches || document.querySelector('dialog[open]') || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('button,a,input,textarea,select')) return;
  const moves = {ArrowRight: current + 1, ArrowDown: current + 1, PageDown: current + 1, ArrowLeft: current - 1, ArrowUp: current - 1, PageUp: current - 1, Home: 0, End: scenes.length - 1};
  if (event.key in moves) { event.preventDefault(); goTo(moves[event.key]); }
});
gallery.addEventListener('scroll', scheduleMeasure, {passive: true});
window.addEventListener('scroll', scheduleMeasure, {passive: true});
window.addEventListener('resize', scheduleMeasure);
horizontal.addEventListener('change', () => { gallery.scrollLeft = 0; goTo(current, false); observeScenes(); });

document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  cancelWheel();
  const dialog = document.getElementById(button.dataset.dialog);
  if (!dialog || dialog.open) return;
  dialog.addEventListener('close', () => button.focus({preventScroll: true}), {once: true});
  dialog.showModal();
  window.dispatchEvent?.(new Event('horizontal-panel-change'));
  dialog.scrollTop = 0;
}));
document.querySelectorAll('.detail-dialog').forEach(dialog => {
  // Close only a click on the backdrop, outside the dialog's own rectangle.
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

const shots = {
  executions: {file: 'libby-executions-redacted.png', label: 'EXECUÇÕES', alt: 'Histórico de execuções da Libby com contatos e identificadores ocultados', caption: 'Histórico, estados e registros. Contatos e identificadores foram ocultados nesta captura.'},
  dashboard: {file: 'libby-dashboard-metrics.png', label: 'DASHBOARD', alt: 'Dashboard da Libby com os indicadores históricos do momento da captura', caption: 'Uma visão da atividade e das falhas. Os números são um registro histórico do momento da captura.'}
};
document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => {
  const shot = shots[button.dataset.screen];
  document.querySelectorAll('[data-screen]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const image = document.querySelector('#operation-image');
  image.src = '../assets/' + shot.file;
  image.alt = t(shot.alt);
  if (!reduced.matches) image.animate?.([{opacity: 0.25, transform: 'translateY(6px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 350, easing: 'ease-out'});
  document.querySelector('#screen-full').href = image.src;
  document.querySelector('#screen-label').textContent = t('LIBBY / ' + shot.label);
  document.querySelector('#screen-caption').textContent = t(shot.caption);
}));
window.addEventListener('horizontal-language-change', () => {
  updateMotionControls();
  setCurrent(current);
  const key = document.querySelector('[data-screen][aria-pressed="true"]')?.dataset.screen || 'executions';
  const shot = shots[key];
  document.querySelector('#operation-image').alt = t(shot.alt);
  document.querySelector('#screen-label').textContent = t('LIBBY / ' + shot.label);
  document.querySelector('#screen-caption').textContent = t(shot.caption);
  scheduleMeasure();
});
window.addEventListener('load', () => {
  const index = scenes.findIndex(scene => '#' + scene.id === location.hash);
  if (index >= 0) goTo(index, false);
  scheduleMeasure();
});
