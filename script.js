// ── Аккордеоны пакетов ──
document.querySelectorAll('.accordion-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('is-open', !isOpen);
  });
});

// ── FAQ ──
document.querySelectorAll('.faq-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // закрыть все остальные
    document.querySelectorAll('.faq-toggle').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('is-open');
      }
    });

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
    const contact = form.contact.value.trim();
    const consent = form.querySelector('#consent');

    if (!name || !business || !contact) {
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
      package: form.package.value.trim(),
      problem: form.problem.value.trim(),
      contact: form.contact.value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляю...';
    formNote.textContent = '';
    formNote.className = 'form-note';

    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        formNote.textContent = 'Заявка отправлена. Отвечу в Telegram в течение 24 часов.';
        formNote.className = 'form-note form-note--success';
        submitBtn.textContent = 'Отправлено';
      } else {
        throw new Error('server error');
      }
    } catch {
      formNote.textContent = 'Что-то пошло не так. Напишите мне напрямую в Telegram.';
      formNote.className = 'form-note form-note--error';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
    }
  });
}
