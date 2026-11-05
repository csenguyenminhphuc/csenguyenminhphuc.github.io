// Neon click effect: ripple ring + spark burst at the pointer position.
(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const COLORS = ['#00f0ff', '#a855f7', '#ff2bd6', '#3b82f6'];
  const SPARK_COUNT = 10;

  const style = document.createElement('style');
  style.textContent = `
    .click-fx-ring, .click-fx-spark {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
    .click-fx-ring {
      width: 10px;
      height: 10px;
      border: 2px solid var(--fx-color);
      box-shadow: 0 0 10px var(--fx-color), inset 0 0 6px var(--fx-color);
      animation: click-fx-ring 0.55s ease-out forwards;
    }
    .click-fx-spark {
      width: 6px;
      height: 6px;
      background: var(--fx-color);
      box-shadow: 0 0 8px var(--fx-color);
      animation: click-fx-spark 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
    }
    @keyframes click-fx-ring {
      from { width: 10px; height: 10px; opacity: 1; }
      to { width: 70px; height: 70px; opacity: 0; }
    }
    @keyframes click-fx-spark {
      from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      to {
        transform: translate(calc(-50% + var(--fx-dx)), calc(-50% + var(--fx-dy))) scale(0.2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  const spawn = (className, x, y, color, extra) => {
    const el = document.createElement('span');
    el.className = className;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--fx-color', color);
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => el.style.setProperty(k, v));
    }
    el.addEventListener('animationend', () => el.remove(), { once: true });
    document.body.appendChild(el);
  };

  document.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) {
      return;
    }

    const { clientX: x, clientY: y } = event;
    const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    spawn('click-fx-ring', x, y, baseColor);

    for (let i = 0; i < SPARK_COUNT; i += 1) {
      const angle = (Math.PI * 2 * i) / SPARK_COUNT + Math.random() * 0.4;
      const distance = 28 + Math.random() * 26;
      spawn('click-fx-spark', x, y, COLORS[i % COLORS.length], {
        '--fx-dx': `${Math.cos(angle) * distance}px`,
        '--fx-dy': `${Math.sin(angle) * distance}px`
      });
    }
  }, { passive: true });
})();
