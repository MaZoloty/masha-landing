// ── Метрика: вспомогательная функция ──
function ymGoal(goal) {
  if (typeof ym !== 'undefined') ym(109430856, 'reachGoal', goal);
}

// Calm, short entrance motion for the consulting system. It is progressive
// enhancement: content is visible without JavaScript and for reduced motion.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const revealTargets = [
    ...document.querySelectorAll('.home-header, .home-hero__copy > *, .home-insight, .home-proof-row'),
    ...document.querySelectorAll('.section:not(.legacy-hero) .container > *'),
  ];

  revealTargets.forEach((element, index) => {
    element.dataset.reveal = '';
    element.dataset.revealDelay = String(index % 4);
  });

  document.documentElement.classList.add('motion-ready');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-revealed'));
  }
}

// ── Метрика: клик на hero CTA (диагностика) ──
document.querySelectorAll('.hero a[href="/audit/"].btn').forEach(btn => {
  btn.addEventListener('click', () => ymGoal('hero_click'));
});

// ── Метрика: клики по ступеням лестницы (бывшая цель package_click) ──
document.querySelectorAll('.ladder-step__link').forEach(btn => {
  btn.addEventListener('click', () => ymGoal('package_click'));
});

// ── Аккордеоны пакетов ──
document.querySelectorAll('.accordion-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('is-open', !isOpen);
  });
});

// ── Форма ──
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const business = form.business.value.trim();
    const link = form.link.value.trim();
    const contact = form.contact.value.trim();
    const consent = form.querySelector('#consent');

    if (!name || !business || !link || !contact) {
      formNote.textContent = 'Пожалуйста, заполните все обязательные поля.';
      formNote.className = 'form-note form-note--error';
      return;
    }

    if (!consent.checked) {
      formNote.textContent = 'Пожалуйста, дайте согласие на обработку данных.';
      formNote.className = 'form-note form-note--error';
      return;
    }

    const data = {
      name: form.name.value.trim(),
      business: form.business.value.trim(),
      link: form.link.value.trim(),
      problem: form.problem.value.trim(),
      contact: form.contact.value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляю...';
    formNote.textContent = '';
    formNote.className = 'form-note';

    try {
      const res = await fetch('/api/send-telegram.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await res.json().catch(() => null);
      if (res.ok && responseData?.ok) {
        ymGoal('form_submit');
        form.reset();
        formNote.textContent = 'Заявка на разбор отправлена. Отвечу в Telegram в течение 24 часов.';
        formNote.className = 'form-note form-note--success';
        submitBtn.textContent = 'Отправлено';
      } else {
        throw new Error('server error');
      }
    } catch {
      formNote.textContent = 'Что-то пошло не так. Напишите мне напрямую в Telegram.';
      formNote.className = 'form-note form-note--error';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Оставить заявку на разбор';
    }
  });
}
