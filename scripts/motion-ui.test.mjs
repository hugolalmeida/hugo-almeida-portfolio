import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const source = await readFile(new URL('../dist/horizontal/motion-ui.js', import.meta.url), 'utf8');
const flush = async () => {for (let i = 0; i < 8; i++) await Promise.resolve();};
class Element extends EventTarget {
  constructor(tag = 'div') {
    super(); this.tagName = tag.toUpperCase(); this.nodeType = 1;
    this.dataset = {}; this.attrs = new Map(); this.children = []; this.isConnected = true;
    const classes = new Set();
    this.classList = {add: value => classes.add(value), remove: value => classes.delete(value), contains: value => classes.has(value)};
  }
  matches(selector) {return this.tagName === 'IMG' && selector.includes('img');}
  querySelectorAll() {return [];}
  append(node) {node.parentElement = this; this.children.push(node);}
  remove() {this.isConnected = false; this.parentElement.children = this.parentElement.children.filter(child => child !== this);}
  setAttribute(key, value) {this.attrs.set(key, value);}
  getAttribute(key) {return this.attrs.get(key) ?? null;}
  removeAttribute(key) {this.attrs.delete(key);}
}
function mount({cached = false, broken = false} = {}) {
  const document = new EventTarget(), window = new EventTarget();
  const root = new Element(), host = new Element(), image = new Element('img'), body = new Element();
  image.complete = cached; image.naturalWidth = broken ? 0 : 100;
  image.setAttribute('src', 'assets/test.png'); host.append(image);
  body.querySelectorAll = () => [image];
  document.documentElement = root; document.body = body;
  document.createElement = tag => new Element(tag);
  document.querySelectorAll = () => [];
  let observer, observations = 0, disconnects = 0;
  class MutationObserver {
    constructor(callback) {this.callback = callback; observer = this;}
    observe() {observations++;}
    disconnect() {disconnects++;}
  }
  const properties = new Map([['--motion-enter', '0.32s'], ['--carousel-interval', '6000ms']]);
  vm.runInNewContext(source, {window, document, MutationObserver, AbortController, Event,
    getComputedStyle: () => ({getPropertyValue: key => properties.get(key) || ''})});
  return {root, host, image, document, window, observer, motion: window.portfolioMotion,
    get observations() {return observations;}, get disconnects() {return disconnects;}};
}
test('media exposes loading, success and failure states without delaying content', async () => {
  const app = mount();
  assert.equal(app.image.loading, 'lazy');
  assert.equal(app.host.dataset.mediaState, 'loading');
  assert.equal(app.host.getAttribute('aria-busy'), 'true');
  app.image.dispatchEvent(new Event('load')); await flush();
  assert.equal(app.host.dataset.mediaState, 'ready');
  assert.equal(app.host.getAttribute('aria-busy'), 'false');
  app.image.dispatchEvent(new Event('error'));
  assert.equal(app.host.dataset.mediaState, 'error');
  assert.equal(app.host.children[1].getAttribute('role'), 'status');
});
test('cached and broken images settle immediately', async () => {
  const ready = mount({cached: true}); await flush();
  assert.equal(ready.host.dataset.mediaState, 'ready');
  const failed = mount({cached: true, broken: true});
  assert.equal(failed.host.dataset.mediaState, 'error');
});
test('a stale decode cannot dismiss the skeleton for a newer source', async () => {
  const app = mount();
  let resolveDecode;
  app.image.decode = () => new Promise(resolve => {resolveDecode = resolve;});
  app.image.dispatchEvent(new Event('load'));
  app.observer.callback([{type: 'attributes', target: app.image}]);
  resolveDecode(); await flush();
  assert.equal(app.host.dataset.mediaState, 'loading');
  app.image.decode = () => Promise.resolve();
  app.image.dispatchEvent(new Event('load')); await flush();
  assert.equal(app.host.dataset.mediaState, 'ready');
});
test('detaching a gallery removes its state and listeners', () => {
  const app = mount(); app.image.isConnected = false;
  app.observer.callback([]);
  assert.equal(app.host.children.length, 1);
  assert.equal(app.host.getAttribute('aria-busy'), null);
  app.image.dispatchEvent(new Event('error'));
  assert.equal(app.host.dataset.mediaState, undefined);
});
test('keyboard interactions and disabled effects skip animation', async () => {
  const app = mount(); let count = 0;
  const element = {animate() {count++; return {finished: Promise.resolve()};}};
  await app.motion.enter(element); assert.equal(count, 0);
  app.root.classList.add('motion-enabled');
  await app.motion.enter(element); assert.equal(count, 1);
  app.document.dispatchEvent(new Event('keydown'));
  await app.motion.enter(element); assert.equal(count, 1);
  app.document.dispatchEvent(new Event('pointerdown'));
  await app.motion.enter(element); assert.equal(count, 2);
});
test('dialog closing is idempotent and works without animation support', async () => {
  const app = mount(); let closes = 0;
  const dialog = {open: true, close() {closes++; this.open = false;}};
  await Promise.all([app.motion.close(dialog), app.motion.close(dialog)]);
  assert.equal(closes, 1);
});
test('pagehide releases resources; back-forward cache restores media observation', () => {
  const app = mount();
  const hide = new Event('pagehide'); hide.persisted = true; app.window.dispatchEvent(hide);
  assert.equal(app.disconnects, 1); assert.equal(app.host.children.length, 1);
  const show = new Event('pageshow'); show.persisted = true; app.window.dispatchEvent(show);
  assert.equal(app.observations, 2); assert.equal(app.host.dataset.mediaState, 'loading');
});
test('timings are read from the shared CSS tokens', () => {
  const app = mount();
  assert.equal(app.motion.settings.enter, 320);
  assert.equal(app.motion.settings.interval, 6000);
});
