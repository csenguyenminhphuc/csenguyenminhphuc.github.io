document.addEventListener('DOMContentLoaded', async () => {
  const STORAGE_KEY = 'site_lang_toggle';
  const BASE_URL = window.__SITE_BASEURL__ || '';
  let isSwitching = false;

  function revealPage() {
    document.documentElement.classList.remove('lang-pending');
  }

  function ensureLanguageToggle() {
    const topbar = document.getElementById('topbar');
    if (!topbar) {
      return null;
    }

    let toggle = document.getElementById('lang-toggle-topbar');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'lang-toggle-topbar';
      toggle.type = 'button';
      toggle.className = 'btn btn-link';
      toggle.setAttribute('aria-label', 'Language Toggle');
      toggle.innerHTML = '<i class="fa-solid fa-language"></i>';

      const searchBox = document.getElementById('search');
      if (searchBox && searchBox.parentNode === topbar) {
        topbar.insertBefore(toggle, searchBox);
      } else {
        const searchTrigger = document.getElementById('search-trigger');
        if (searchTrigger && searchTrigger.parentNode === topbar) {
          topbar.insertBefore(toggle, searchTrigger);
        } else {
          topbar.appendChild(toggle);
        }
      }
    }

    return toggle;
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

    const toggle = ensureLanguageToggle();
    if (!toggle) {
      revealPage();
      return;
    }

    renderAll();
    revealPage();

    toggle.addEventListener('click', async () => {
      if (isSwitching) {
        return;
      }

      isSwitching = true;
      const nextLang = i18next.language === 'vi' ? 'en' : 'vi';

      try {
        await i18next.changeLanguage(nextLang);
        localStorage.setItem(STORAGE_KEY, nextLang);
        renderAll();
      } finally {
        isSwitching = false;
      }
    });
  } catch (error) {
    revealPage();
  }
});
