document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('typed-name');
  const aboutBody = document.querySelector('.cyber-about-body');

  const defaultName = 'NGUYEN MINH PHUC';
  let activeTimer = null;
  let isTyping = false;

  const getNameText = () => {
    if (typeof i18next !== 'undefined' && typeof i18next.t === 'function') {
      const translated = i18next.t('home.fullName');
      if (translated && translated !== 'home.fullName') {
        return translated;
      }
    }

    return defaultName;
  };

  const typeName = (text) => {
    if (!nameEl) {
      return;
    }

    if (activeTimer) {
      window.clearTimeout(activeTimer);
      activeTimer = null;
    }

    isTyping = true;
    let index = 0;

    const step = () => {
      nameEl.textContent = text.slice(0, index);
      index += 1;

      if (index <= text.length) {
        activeTimer = window.setTimeout(step, 90);
      } else {
        isTyping = false;
        activeTimer = null;
      }
    };

    step();
  };

  if (nameEl) {
    window.setTimeout(() => {
      typeName(getNameText());
    }, 500);
  }

  if (typeof i18next !== 'undefined' && typeof i18next.on === 'function') {
    i18next.on('languageChanged', () => {
      const nextText = getNameText();

      if (nameEl) {
        if (isTyping) {
          nameEl.textContent = nextText;
          isTyping = false;
          if (activeTimer) {
            window.clearTimeout(activeTimer);
            activeTimer = null;
          }
        } else {
          typeName(nextText);
        }
      }
    });
  }

  if (aboutBody && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(aboutBody);
  } else if (aboutBody) {
    aboutBody.classList.add('visible');
  }
});
