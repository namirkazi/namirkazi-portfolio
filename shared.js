/* shared.js */

// ── NAV HAMBURGER ────────────────────────
const toggle = document.querySelector('.nav-toggle');
const drawer = document.getElementById('navDrawer');

if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── ACTIVE NAV LINK ──────────────────────
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── SCROLL REVEAL ────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal, .stagger').forEach(el => {
  revealObserver.observe(el);
});

// ── CURSOR GLOW (desktop only) ───────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:320px; height:320px;
    border-radius:50%; pointer-events:none; z-index:0;
    background: radial-gradient(circle, rgba(74,222,128,0.045) 0%, transparent 70%);
    transform: translate(-50%,-50%);
    transition: left 0.12s ease, top 0.12s ease;
    left:-999px; top:-999px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── PAGE TRANSITION ──────────────────────
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || a.target === '_blank') return;
  a.addEventListener('click', e => {
    e.preventDefault();
    document.body.style.transition = 'opacity 0.18s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { location.href = href; }, 180);
  });
});

// fade in on load
document.body.style.opacity = '0';
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
  });
});
