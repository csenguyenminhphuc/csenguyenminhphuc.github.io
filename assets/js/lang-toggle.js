document.addEventListener('DOMContentLoaded', async () => {
  const STORAGE_KEY = 'site_lang_toggle';
  const BASE_URL = window.__SITE_BASEURL__ || '';
  let langPicker = null;
  let isSwitching = false;

  function revealPage() {
    document.documentElement.classList.remove('lang-pending');
  }

  function ensureLanguagePicker() {
    const topbar = document.getElementById('topbar');
    if (!topbar) {
      return null;
    }

    let wrapper = document.getElementById('lang-picker-topbar');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'lang-picker-topbar';

      const toggle = document.createElement('button');
      toggle.id = 'lang-toggle-topbar';
      toggle.type = 'button';
      toggle.className = 'btn btn-link';
      toggle.setAttribute('aria-label', 'Language Toggle');
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fa-solid fa-earth-americas fa-fw"></i>';

      const menu = document.createElement('div');
      menu.id = 'lang-menu-topbar';
      menu.setAttribute('role', 'menu');

      const enOption = document.createElement('button');
      enOption.type = 'button';
      enOption.className = 'lang-option';
      enOption.dataset.lang = 'en';
      enOption.textContent = 'EN';

      const viOption = document.createElement('button');
      viOption.type = 'button';
      viOption.className = 'lang-option';
      viOption.dataset.lang = 'vi';
      viOption.textContent = 'VN';

      menu.appendChild(enOption);
      menu.appendChild(viOption);

      wrapper.appendChild(toggle);
      wrapper.appendChild(menu);

      const searchBox = document.getElementById('search');
      if (searchBox && searchBox.parentNode === topbar) {
        topbar.insertBefore(wrapper, searchBox);
      } else {
        const searchTrigger = document.getElementById('search-trigger');
        if (searchTrigger && searchTrigger.parentNode === topbar) {
          topbar.insertBefore(wrapper, searchTrigger);
        } else {
          topbar.appendChild(wrapper);
        }
      }

      toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const opening = !wrapper.classList.contains('open');
        wrapper.classList.toggle('open', opening);
        toggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
      });

      menu.addEventListener('click', async (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }

        const nextLang = target.dataset.lang;
        if (!nextLang || isSwitching || nextLang === i18next.language) {
          wrapper.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          return;
        }

        isSwitching = true;
        try {
          await i18next.changeLanguage(nextLang);
          localStorage.setItem(STORAGE_KEY, nextLang);
          renderAll();
        } finally {
          isSwitching = false;
          wrapper.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('click', () => {
        wrapper.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          wrapper.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    return wrapper;
  }

  function syncLanguagePicker() {
    if (!langPicker) {
      return;
    }

    const options = langPicker.querySelectorAll('.lang-option');
    options.forEach((option) => {
      option.classList.toggle('active', option.dataset.lang === i18next.language);
    });
  }

  function translateDataI18n() {
    const applyLabelColonFormatting = (el, text) => {
      const idx = text.indexOf(':');
      if (idx === -1) {
        el.textContent = text;
        return;
      }

      const label = text.slice(0, idx + 1);
      const rest = text.slice(idx + 1);

      el.textContent = '';
      const strong = document.createElement('strong');
      strong.textContent = label;
      el.appendChild(strong);
      el.appendChild(document.createTextNode(rest));
    };

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const translated = i18next.t(key);
        if (el.getAttribute('data-i18n-split') === 'label-colon') {
          applyLabelColonFormatting(el, translated);
        } else {
          el.textContent = translated;
        }
      }
    });
  }

  function setHtmlLang() {
    document.documentElement.setAttribute('lang', i18next.language === 'vi' ? 'vi' : 'en');
  }

  function buildFallbackContentsFromHeadings() {
    const section = document.getElementById('fallback-contents');
    const list = document.getElementById('fallback-contents-list');
    if (!section || !list) return;

    const headings = Array.from(document.querySelectorAll('main .content h2[id], main .content h3[id], main .content h4[id]'));

    list.innerHTML = '';

    if (headings.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';

    headings.forEach((heading) => {
      const item = document.createElement('li');
      const link = document.createElement('a');

      let label = heading.querySelector('.me-2')?.textContent || heading.textContent || '';
      label = label.replace('#', '').trim();

      link.href = `#${heading.id}`;
      link.textContent = label;

      const level = Number(heading.tagName.replace('H', ''));
      if (level === 3) item.style.paddingLeft = '0.9rem';
      if (level === 4) item.style.paddingLeft = '1.8rem';

      item.className = 'mb-1';
      item.appendChild(link);
      list.appendChild(item);
    });
  }

  function renderAll() {
    translateDataI18n();
    setHtmlLang();
    buildFallbackContentsFromHeadings();
    syncLanguagePicker();
  }

  try {
    const [enRes, viRes] = await Promise.all([
      fetch(`${BASE_URL}/assets/i18n/en.json`).then((res) => res.json()),
      fetch(`${BASE_URL}/assets/i18n/vi.json`).then((res) => res.json())
    ]);

    await i18next.init({
      lng: localStorage.getItem(STORAGE_KEY) === 'vi' ? 'vi' : 'en',
      fallbackLng: 'en',
      resources: {
        en: { translation: enRes },
        vi: { translation: viRes }
      }
    });

    langPicker = ensureLanguagePicker();
    if (!langPicker) {
      revealPage();
      return;
    }

    renderAll();
    revealPage();
  } catch (error) {
    revealPage();
  }
});
