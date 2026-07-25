// ── Метрика: вспомогательная функция ──
function ymGoal(goal) {
  if (typeof ym !== 'undefined') ym(109430856, 'reachGoal', goal);
}

// ── Мобильное боковое меню ──
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
const mobileMenuClose = document.querySelector('.mobile-menu__close');

if (mobileMenu && mobileMenuTrigger && mobileMenuClose) {
  let closeTimer;

  const openMobileMenu = () => {
    if (mobileMenu.open) return;
    window.clearTimeout(closeTimer);
    mobileMenu.classList.remove('is-closing');
    mobileMenu.showModal();
    document.documentElement.classList.add('mobile-menu-open');
    mobileMenuTrigger.setAttribute('aria-expanded', 'true');
    mobileMenuClose.focus({ preventScroll: true });
  };

  const closeMobileMenu = () => {
    if (!mobileMenu.open || mobileMenu.classList.contains('is-closing')) return;
    mobileMenu.classList.add('is-closing');
    document.documentElement.classList.remove('mobile-menu-open');
    mobileMenuTrigger.setAttribute('aria-expanded', 'false');

    const finishClose = () => {
      mobileMenu.close();
      mobileMenu.classList.remove('is-closing');
      mobileMenuTrigger.focus({ preventScroll: true });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose();
      return;
    }

    closeTimer = window.setTimeout(finishClose, 180);
  };

  mobileMenuTrigger.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);

  mobileMenu.addEventListener('cancel', event => {
    event.preventDefault();
    closeMobileMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !mobileMenu.open) return;
    event.preventDefault();
    closeMobileMenu();
  });

  mobileMenu.addEventListener('click', event => {
    if (event.target === mobileMenu) closeMobileMenu();
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// Calm, short entrance motion for the consulting system. It is progressive
// enhancement: content is visible without JavaScript and for reduced motion.
// ── Метрика: клик на hero CTA (диагностика) ──
document.querySelectorAll('.hero a[href="/audit/"].btn').forEach(btn => {
  btn.addEventListener('click', () => ymGoal('hero_click'));
});

// ── Метрика: клики по ступеням лестницы (бывшая цель package_click) ──
document.querySelectorAll('.ladder-step__link').forEach(btn => {
  btn.addEventListener('click', () => ymGoal('package_click'));
});

// One explanatory pass through the client route when the diagnostic appears.
const bridgeVisual = document.querySelector('.bridge-visual');

if (bridgeVisual) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    bridgeVisual.classList.add('is-animated');
  } else {
    const bridgeObserver = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      bridgeVisual.classList.add('is-animated');
      observer.disconnect();
    }, { threshold: 0.45 });

    bridgeObserver.observe(bridgeVisual);
  }
}

// ── Аккордеоны пакетов ──
document.querySelectorAll('.accordion-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('is-open', !isOpen);
  });
});

document.querySelectorAll('[data-telegram-contact]').forEach(link => {
  link.addEventListener('click', () => ymGoal('telegram_click'));
});
