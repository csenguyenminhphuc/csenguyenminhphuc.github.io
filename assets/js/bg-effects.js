// Constellation background: drifting neon nodes linked by lines, reacting to the cursor.
// Applied on every page: reuses the homepage `.cyber-particles` container when present,
// otherwise creates one and populates it with floating neon particles.
(() => {
  let host = document.querySelector('.cyber-particles');
  if (!host) {
    host = document.createElement('div');
    host.className = 'cyber-particles';
    host.setAttribute('aria-hidden', 'true');
  }
  if (!host.querySelector('.particle')) {
    const classes = [
      ...Array(10).fill('particle'),
      ...Array(4).fill('particle p-purple'),
      ...Array(3).fill('particle p-pink'),
      ...Array(3).fill('particle p-blue'),
      ...Array(4).fill('particle p-diamond'),
      ...Array(3).fill('particle p-ring'),
      ...Array(4).fill('particle p-dash'),
      ...Array(3).fill('particle p-star'),
      ...Array(4).fill('particle p-flicker'),
      ...Array(3).fill('particle p-blob'),
      ...Array(3).fill('particle p-zigzag')
    ];
    const frag = document.createDocumentFragment();
    classes.forEach((cls) => {
      const span = document.createElement('span');
      span.className = cls;
      frag.appendChild(span);
    });
    host.appendChild(frag);
  }
  document.body.prepend(host);

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLORS = [
    [0, 255, 200],   // neon cyan
    [123, 47, 247],  // neon purple
    [255, 45, 149],  // neon pink
    [0, 180, 255]    // neon blue
  ];
  const LINK_DIST = 150;
  const MOUSE_DIST = 200;

  const canvas = document.createElement('canvas');
  canvas.className = 'cyber-constellation';
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let isLight = false;
  let rafId = null;
  const mouse = { x: -9999, y: -9999, active: false };

  const detectLightMode = () => {
    const bg = getComputedStyle(document.body).backgroundColor.match(/\d+/g);
    if (!bg) {
      isLight = false;
      return;
    }
    const [r, g, b] = bg.map(Number);
    isLight = (0.299 * r + 0.587 * g + 0.114 * b) > 150;
  };

  const createNodes = () => {
    const count = Math.max(28, Math.min(120, Math.round((width * height) / 12000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.3 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: Math.random() * Math.PI * 2
    }));
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    detectLightMode();
    createNodes();
  };

  const rgba = (c, a) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

  const draw = (time) => {
    ctx.clearRect(0, 0, width, height);
    const strength = isLight ? 0.75 : 1;

    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];

      if (!reduceMotion) {
        n.x += n.vx;
        n.y += n.vy;

        // Gentle pull toward the cursor.
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST && dist > 1) {
            n.x += (dx / dist) * 0.25;
            n.y += (dy / dist) * 0.25;
          }
        }

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Links between nearby nodes.
      for (let j = i + 1; j < nodes.length; j += 1) {
        const m = nodes[j];
        const dist = Math.hypot(n.x - m.x, n.y - m.y);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.5 * strength;
          const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
          grad.addColorStop(0, rgba(n.color, alpha));
          grad.addColorStop(1, rgba(m.color, alpha));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }

      // Links to the cursor.
      if (mouse.active) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (dist < MOUSE_DIST) {
          ctx.strokeStyle = rgba(n.color, (1 - dist / MOUSE_DIST) * 0.8 * strength);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Twinkling glowing node.
      const twinkle = reduceMotion ? 0.8 : 0.75 + 0.25 * Math.sin(time / 700 + n.phase);
      ctx.shadowBlur = 16;
      ctx.shadowColor = rgba(n.color, 0.9 * strength);
      ctx.fillStyle = rgba(n.color, twinkle * strength);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  };

  const loop = (time) => {
    draw(time);
    rafId = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (reduceMotion) {
      draw(0);
      return;
    }
    if (rafId === null) {
      rafId = window.requestAnimationFrame(loop);
    }
  };

  const stop = () => {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      if (reduceMotion) draw(0);
    }, 150);
  });

  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    mouse.active = false;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  // Re-check theme when the light/dark toggle changes the page.
  new MutationObserver(detectLightMode).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-mode', 'class']
  });

  resize();
  start();
})();
