// Apply the selected palette before CSS; keep existing visitor preferences.
(() => {
  const storageKey = 'horizontal-preferences';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch {}
  const query = new URLSearchParams(location.search);
  const choose = (key, values, fallback) => values.includes(query.get(key)) ? query.get(key) : values.includes(saved[key]) ? saved[key] : fallback;
  const state = {lang: choose('lang', ['pt', 'en'], 'pt'), theme: choose('theme', ['dark', 'light'], 'dark'), motion: choose('motion', ['on', 'off'], 'on')};
  state.motionOverride = ['on', 'off'].includes(query.get('motion')) || saved.motionOverride === true;
  const root = document.documentElement;
  const textRecords = [];
  const attributeRecords = [];
  const translate = value => state.lang === 'en' ? window.horizontalEnglish[value] || value : value;
  function persist() { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {} }
  function updateURL(key) {
    const url = new URL(location.href);
    url.searchParams.set(key, state[key]);
    history.replaceState(null, '', url);
  }
  function applyTheme() {
    root.dataset.theme = state.theme;
    root.style.colorScheme = state.theme;
    document.querySelector('meta[name="theme-color"]').content = state.theme === 'light' ? '#f4f0ff' : '#110d24';
    const button = document.querySelector('#theme-toggle');
    if (button) {
      const label = translate(state.theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
      button.querySelector('use').setAttribute('href', 'assets/ui-icons.svg#' + (state.theme === 'dark' ? 'sun' : 'moon'));
      button.setAttribute('aria-label', label);
      button.title = label;
      button.setAttribute('aria-pressed', String(state.theme === 'light'));
    }
  }
  function applyLanguage() {
    root.lang = state.lang === 'en' ? 'en' : 'pt-BR';
    for (const {node, original} of textRecords) {
      const key = original.trim();
      node.textContent = key ? original.replace(key, translate(key)) : original;
    }
    for (const {element, attribute, original} of attributeRecords) element.setAttribute(attribute, translate(original));
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === state.lang)));
    document.querySelector('#resume-link').href = 'assets/resume/hugo-almeida-' + state.lang + '.pdf';
    applyTheme();
    window.dispatchEvent(new Event('horizontal-language-change'));
  }
  window.horizontalPreferences = {get language() {return state.lang;}, get motion() {return state.motion;}, get motionOverride() {return state.motionOverride;}, translate,
    saveMotion(value) {state.motion = value; state.motionOverride = true; persist();},
    setLanguage(value) {if (!['pt', 'en'].includes(value)) return; state.lang = value; persist(); updateURL('lang'); applyLanguage();},
    toggleTheme() {state.theme = state.theme === 'dark' ? 'light' : 'dark'; persist(); updateURL('theme'); applyTheme();}
  };
  applyTheme();
  root.lang = state.lang === 'en' ? 'en' : 'pt-BR';
  persist();
  document.addEventListener('DOMContentLoaded', () => {
    const walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, {acceptNode: node => ['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
    for (let node; (node = walker.nextNode());) textRecords.push({node, original: node.textContent});
    document.querySelectorAll('[aria-label],[alt],[title],[data-label],meta[name="description"],meta[property="og:title"],meta[property="og:description"]').forEach(element => {
      for (const attribute of ['aria-label', 'alt', 'title', 'data-label', 'content']) {
        if (element.hasAttribute(attribute)) attributeRecords.push({element, attribute, original: element.getAttribute(attribute)});
      }
    });
    document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => window.horizontalPreferences.setLanguage(button.dataset.language)));
    document.querySelector('#theme-toggle').addEventListener('click', () => window.horizontalPreferences.toggleTheme());
    applyLanguage();
  });
})();
