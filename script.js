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

// B2B brief: JavaScript records a real interaction before sending the form,
// then submits in place and explains the next step without a reload.
const b2bForm = document.querySelector('[data-b2b-form]');

if (b2bForm) {
  const status = b2bForm.querySelector('[data-form-status]');
  const submit = b2bForm.querySelector('button[type="submit"]');
  const startedAt = b2bForm.querySelector('[data-form-started-at]');
  const elapsed = b2bForm.querySelector('[data-form-elapsed]');
  const interaction = b2bForm.querySelector('[data-form-interaction]');
  const formOpenedAt = performance.now();

  if (startedAt) startedAt.value = String(Date.now());

  const markRealInteraction = event => {
    if (event.isTrusted && interaction) {
      interaction.value = 'yes';
    }
  };

  b2bForm.addEventListener('input', markRealInteraction, { passive: true });
  b2bForm.addEventListener('pointerdown', markRealInteraction, { passive: true });
  b2bForm.addEventListener('keydown', markRealInteraction, { passive: true });

  b2bForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (elapsed) {
      elapsed.value = String(Math.round(performance.now() - formOpenedAt));
    }
    status.className = 'b2b-form__status';
    status.textContent = 'Отправляю задачу…';
    submit.disabled = true;

    try {
      const response = await fetch(b2bForm.action, {
        method: 'POST',
        body: new FormData(b2bForm),
        headers: { Accept: 'application/json' },
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось отправить форму.');
      }

      b2bForm.reset();
      if (startedAt) startedAt.value = String(Date.now());
      if (interaction) interaction.value = '';
      status.classList.add('is-success');
      status.textContent = 'Задача отправлена. Я изучу процесс и сервисы, затем напишу вам, если смогу помочь.';
      ymGoal('b2b_brief_sent');
    } catch (error) {
      status.classList.add('is-error');
      status.textContent = `${error.message} Можно написать мне напрямую в Telegram: @masha_zoloty.`;
    } finally {
      submit.disabled = false;
    }
  });
}
