import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const source = await readFile(new URL('../dist/horizontal/visual-effects.js', import.meta.url), 'utf8');
function mount({observerSupported = true} = {}) {
  const window = new EventTarget();
  const document = new EventTarget();
  let motion = true, panel = false;
  const root = {dataset: {}, classList: {contains: () => motion}};
  document.documentElement = root;
  document.hidden = false;
  document.querySelector = selector => selector === '.opening' ? {} : panel;
  let callback, disconnects = 0, observations = 0;
  class IntersectionObserver {
    constructor(fn) { callback = fn; }
    observe() { observations++; }
    disconnect() { disconnects++; }
  }
  if (observerSupported) window.IntersectionObserver = IntersectionObserver;
  vm.runInNewContext(source, {window, document, IntersectionObserver, AbortController});
  return {window, document, root,
    visible(value) { callback([{isIntersecting: value}]); },
    motion(value) {motion = value; window.dispatchEvent(new Event('horizontal-motion-change'));},
    panel(value) {panel = value; window.dispatchEvent(new Event('horizontal-panel-change'));},
    get disconnects() {return disconnects;}, get observations() {return observations;}
  };
}
test('gradient pauses outside the opening, with hidden tab, paused motion or open dialog', () => {
  const app = mount();
  app.visible(true);
  assert.equal(app.root.dataset.ambientRunning, 'true');
  app.panel(true);
  assert.equal(app.root.dataset.ambientRunning, 'false');
  app.panel(false);
  assert.equal(app.root.dataset.ambientRunning, 'true');
  app.document.hidden = true;
  app.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(app.root.dataset.ambientRunning, 'false');
  app.document.hidden = false;
  app.motion(false);
  assert.equal(app.root.dataset.ambientRunning, 'false');
  app.motion(true);
  assert.equal(app.root.dataset.ambientRunning, 'true');
  app.visible(false);
  assert.equal(app.root.dataset.ambientRunning, 'false');
});
test('navigation disconnects observers and removes event listeners', () => {
  const app = mount();
  app.visible(true);
  app.window.dispatchEvent(new Event('pagehide'));
  assert.equal(app.disconnects, 1);
  assert.equal(app.root.dataset.ambientRunning, 'false');
  app.motion(true);
  assert.equal(app.root.dataset.ambientRunning, 'false');
});
test('back-forward cache restores observation', () => {
  const app = mount();
  for (const name of ['pagehide', 'pageshow']) {
    const event = new Event(name);
    event.persisted = true;
    app.window.dispatchEvent(event);
  }
  assert.equal(app.observations, 2);
  app.visible(true);
  assert.equal(app.root.dataset.ambientRunning, 'true');
});
test('missing IntersectionObserver keeps the static fallback', () => {
  const app = mount({observerSupported: false});
  assert.equal(app.observations, 0);
  app.motion(true);
  assert.equal(app.root.dataset.ambientRunning, 'false');
});
