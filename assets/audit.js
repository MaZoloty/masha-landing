// Диагностика записи: денежный расчёт, оценка 0–3 и итог.
// Прогрессивное улучшение: контент читается и без JavaScript.

function ymGoal(goal) {
  if (typeof ym !== 'undefined') ym(109430856, 'reachGoal', goal);
}

const MAX_SCORE = 36;

const items = Array.from(document.querySelectorAll('.audit-item'));
const scoreTrack = document.getElementById('scoreTrack');
const resultBtn = document.getElementById('resultBtn');
const resultSection = document.getElementById('result');
const resultScore = document.getElementById('resultScore');
const answeredCount = document.getElementById('answeredCount');
const moneyInputs = {
  weeklyBookings: document.getElementById('weeklyBookings'),
  averageCheck: document.getElementById('averageCheck'),
  weeklyNoShows: document.getElementById('weeklyNoShows'),
  dormantClients: document.getElementById('dormantClients'),
};
const noShowUnit = document.getElementById('noShowUnit');
const lossTotal = document.getElementById('lossTotal');
const lossStatus = document.getElementById('lossStatus');
const lossBreakdown = document.getElementById('lossBreakdown');
const noShowLoss = document.getElementById('noShowLoss');
const dormantLoss = document.getElementById('dormantLoss');
const resultMoney = document.getElementById('resultMoney');
const resultLoss = document.getElementById('resultLoss');

let auditStarted = false;
let moneyStarted = false;

function numberValue(input) {
  return input ? Math.max(0, Number(input.value) || 0) : 0;
}

function rubles(value) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(value)) + ' ₽';
}

function calculateLoss() {
  const weeklyBookings = numberValue(moneyInputs.weeklyBookings);
  const averageCheck = numberValue(moneyInputs.averageCheck);
  const rawNoShows = numberValue(moneyInputs.weeklyNoShows);
  const dormantClients = numberValue(moneyInputs.dormantClients);
  const noShowsArePercent = noShowUnit && noShowUnit.value === 'percent';
  const weeklyNoShows = noShowsArePercent
    ? weeklyBookings * rawNoShows / 100
    : rawNoShows;
  const noShowNeedsBookings = noShowsArePercent && rawNoShows > 0 && !weeklyBookings;

  if (!averageCheck || (!weeklyNoShows && !dormantClients)) {
    if (lossTotal) lossTotal.textContent = '—';
    if (lossBreakdown) lossBreakdown.hidden = true;
    if (resultMoney) resultMoney.hidden = true;
    if (lossStatus) {
      lossStatus.textContent = noShowNeedsBookings
        ? 'Чтобы посчитать неявки в процентах, добавьте количество записей в неделю.'
        : averageCheck
          ? 'Добавьте неявки или спящую базу — покажу ориентир по деньгам.'
          : 'Введите средний чек и хотя бы одну из двух цифр: неявки или спящую базу.';
    }
    return;
  }

  const noShowMonthly = weeklyNoShows * averageCheck * 4;
  const dormantMonthly = dormantClients * averageCheck * .05;
  const total = noShowMonthly + dormantMonthly;
  const noShowRate = weeklyBookings > 0 && weeklyNoShows > 0
    ? Math.min(100, Math.round((weeklyNoShows / weeklyBookings) * 100))
    : null;

  if (lossTotal) lossTotal.textContent = '≈ ' + rubles(total);
  if (noShowLoss) noShowLoss.textContent = rubles(noShowMonthly);
  if (dormantLoss) dormantLoss.textContent = rubles(dormantMonthly);
  if (lossBreakdown) lossBreakdown.hidden = false;
  if (lossStatus) {
    lossStatus.textContent = noShowRate === null
      ? 'Сумма складывается из пустых окон и консервативной доли возврата из спящей базы.'
      : 'Неявки — примерно ' + noShowRate + '% от ваших записей за неделю. Это стоит проверить первой.';
  }
  if (resultLoss) resultLoss.textContent = '≈ ' + rubles(total) + ' / месяц';
  if (resultMoney) resultMoney.hidden = false;
}

function currentScore() {
  return items.reduce((sum, item) => {
    return sum + Number(item.dataset.score || 0);
  }, 0);
}

function updateScore() {
  const total = currentScore();
  const answered = items.filter(item => item.dataset.score !== undefined).length;
  if (scoreTrack) scoreTrack.style.transform = 'scaleX(' + (answered / items.length) + ')';
  if (answeredCount) answeredCount.textContent = String(answered);
  if (resultBtn) resultBtn.disabled = answered < items.length;
  if (resultSection && !resultSection.hidden) renderResult(total, false);
}

function tierFor(total) {
  if (total <= 12) return 'low';
  if (total <= 24) return 'mid';
  return 'high';
}

function renderResult(total, scroll) {
  if (!resultSection) return;
  calculateLoss();
  resultSection.hidden = false;
  if (resultScore) resultScore.textContent = String(total);
  const active = tierFor(total);
  resultSection.querySelectorAll('.audit-tier').forEach(tier => {
    tier.classList.toggle('is-active', tier.dataset.tier === active);
  });
  if (scroll) resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

items.forEach(item => {
  item.querySelectorAll('[data-score]').forEach(button => button.addEventListener('click', () => {
    if (!auditStarted) {
      auditStarted = true;
      ymGoal('audit_start');
    }
    item.dataset.score = button.dataset.score;
    item.querySelectorAll('[data-score]').forEach(option => {
      const selected = option === button;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    item.classList.add('is-touched');
    updateScore();
  }));
  item.querySelectorAll('[data-score]').forEach(button => button.setAttribute('aria-pressed', 'false'));
});

Object.values(moneyInputs).forEach(input => {
  if (!input) return;
  input.addEventListener('input', () => {
    if (!moneyStarted) {
      moneyStarted = true;
      ymGoal('audit_money_start');
    }
    calculateLoss();
  });
});

if (noShowUnit) noShowUnit.addEventListener('change', calculateLoss);

calculateLoss();

if (resultBtn) {
  resultBtn.addEventListener('click', () => {
    renderResult(currentScore(), true);
    ymGoal('audit_result');
  });
}

// Плавный скролл к денежной прикидке с кнопки hero
const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', event => {
    const calculator = document.getElementById('loss-calculator');
    if (!calculator) return;
    event.preventDefault();
    calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ── Спокойное появление секций (как на главной) ──
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const revealTargets = [
    ...document.querySelectorAll('.audit-hero__copy > *, .audit-hero__gauge, .audit-steps__list > li'),
    ...document.querySelectorAll('.audit-money__head, .audit-money__layout, .audit-checklist__head, .audit-item, .audit-form-wrap, .audit-next__panel, .audit-footer__who'),
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
