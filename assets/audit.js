// Диагностика записи: слайдеры, живой балл, результат, форма гайда.
// Прогрессивное улучшение: контент читается и без JavaScript.

function ymGoal(goal) {
  if (typeof ym !== 'undefined') ym(109430856, 'reachGoal', goal);
}

const MAX_SCORE = 120;

const items = Array.from(document.querySelectorAll('.audit-item'));
const scoreValue = document.getElementById('scoreValue');
const scoreTrack = document.getElementById('scoreTrack');
const resultBtn = document.getElementById('resultBtn');
const resultSection = document.getElementById('result');
const resultScore = document.getElementById('resultScore');
const scoreInput = document.getElementById('gscore');

let auditStarted = false;

function currentScore() {
  return items.reduce((sum, item) => {
    const range = item.querySelector('input[type="range"]');
    return sum + (range ? Number(range.value) : 0);
  }, 0);
}

function paintRange(range) {
  const percent = (Number(range.value) / Number(range.max)) * 100;
  range.style.setProperty('--fill', percent + '%');
}

function updateScore() {
  const total = currentScore();
  if (scoreValue) scoreValue.textContent = String(total);
  if (scoreTrack) scoreTrack.style.transform = 'scaleX(' + (total / MAX_SCORE) + ')';
  if (scoreInput && !scoreInput.dataset.userEdited) scoreInput.value = total > 0 ? String(total) : '';
  if (resultSection && !resultSection.hidden) renderResult(total, false);
}

function tierFor(total) {
  if (total <= 40) return 'low';
  if (total <= 70) return 'mid';
  return 'high';
}

function renderResult(total, scroll) {
  if (!resultSection) return;
  resultSection.hidden = false;
  if (resultScore) resultScore.textContent = String(total);
  const active = tierFor(total);
  resultSection.querySelectorAll('.audit-tier').forEach(tier => {
    tier.classList.toggle('is-active', tier.dataset.tier === active);
  });
  if (scroll) resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

items.forEach(item => {
  const range = item.querySelector('input[type="range"]');
  const output = item.querySelector('output');
  if (!range) return;
  paintRange(range);
  range.addEventListener('input', () => {
    if (!auditStarted) {
      auditStarted = true;
      ymGoal('audit_start');
    }
    if (output) output.textContent = range.value;
    item.classList.add('is-touched');
    paintRange(range);
    updateScore();
  });
});

if (resultBtn) {
  resultBtn.addEventListener('click', () => {
    renderResult(currentScore(), true);
    ymGoal('audit_result');
  });
}

if (scoreInput) {
  scoreInput.addEventListener('input', () => {
    scoreInput.dataset.userEdited = '1';
  });
}

// Плавный скролл к самопроверке с кнопки hero
const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', event => {
    const checklist = document.getElementById('checklist');
    if (!checklist) return;
    event.preventDefault();
    checklist.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ── Переключатель канала доставки гайда ──
const channelInputs = Array.from(document.querySelectorAll('input[name="channel"]'));
const contactInput = document.getElementById('gcontact');
const contactLabel = document.getElementById('contactLabel');

function applyChannel() {
  const selected = channelInputs.find(input => input.checked);
  if (!selected || !contactInput || !contactLabel) return;
  if (selected.value === 'Email') {
    contactLabel.textContent = 'Email';
    contactInput.placeholder = 'you@example.com';
    contactInput.setAttribute('inputmode', 'email');
  } else {
    contactLabel.textContent = 'Telegram';
    contactInput.placeholder = '@username или телефон';
    contactInput.setAttribute('inputmode', 'text');
  }
}

channelInputs.forEach(input => input.addEventListener('change', applyChannel));
applyChannel();

// ── Форма гайда ──
const guideForm = document.getElementById('guideForm');
const guideSubmit = document.getElementById('guideSubmit');
const guideNote = document.getElementById('guideNote');
const defaultNote = guideNote ? guideNote.textContent : '';

function setNote(text, state) {
  if (!guideNote) return;
  guideNote.textContent = text;
  guideNote.className = 'audit-form__note' + (state ? ' is-' + state : '');
}

if (guideForm) {
  guideForm.addEventListener('submit', async event => {
    event.preventDefault();

    const name = guideForm.name.value.trim();
    const contact = guideForm.contact.value.trim();
    const consent = document.getElementById('gconsent');
    const channel = (channelInputs.find(input => input.checked) || {}).value || 'Telegram';
    const score = guideForm.score.value.trim();

    if (!name || !contact) {
      setNote('Пожалуйста, заполните имя и контакт.', 'error');
      return;
    }
    if (!consent || !consent.checked) {
      setNote('Пожалуйста, дайте согласие на обработку данных.', 'error');
      return;
    }

    guideSubmit.disabled = true;
    guideSubmit.textContent = 'Отправляю...';
    setNote(defaultNote, '');

    try {
      const res = await fetch('/api/send-telegram.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'guide', name, channel, contact, score }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok) {
        ymGoal('audit_guide_submit');
        guideForm.reset();
        applyChannel();
        if (scoreInput) delete scoreInput.dataset.userEdited;
        updateScore();
        guideSubmit.textContent = 'Отправлено';
        setNote('Готово! Отправлю гайд в ближайшее время: смотрите ' + (channel === 'Email' ? 'почту' : 'Telegram') + '.', 'success');
      } else {
        throw new Error('server error');
      }
    } catch (err) {
      guideSubmit.disabled = false;
      guideSubmit.textContent = 'Забрать гайд';
      setNote('Что-то пошло не так. Напишите мне напрямую: t.me/masha_zoloty', 'error');
    }
  });
}

// ── Спокойное появление секций (как на главной) ──
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const revealTargets = [
    ...document.querySelectorAll('.audit-hero__copy > *, .audit-hero__gauge, .audit-steps__list > li'),
    ...document.querySelectorAll('.audit-checklist__head, .audit-item, .audit-form-wrap, .audit-next__panel, .audit-footer__who'),
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
    }, { threshold: 0.12 });

    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-revealed'));
  }
}
