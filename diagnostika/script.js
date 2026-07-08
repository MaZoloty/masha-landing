const leaks = [
  {
    id: 'entry',
    title: 'Точка входа непонятна',
    area: 'До записи',
    question: 'Клиенту сложно быстро понять услуги, цены, мастеров и куда нажать, чтобы записаться.',
    formula: ({ score, avgCheck, monthlyLeads }) => score / 3 * monthlyLeads * 0.06 * avgCheck,
    preview: 'Сначала смотрим путь клиента: сайт, соцсети, карты, YClients или Dikidi. Задача - убрать лишние шаги до записи.'
  },
  {
    id: 'noShow',
    title: 'Отмены и неявки',
    area: 'Расписание',
    question: 'Есть пустые окна из-за поздних отмен, неявок или слабых напоминаний.',
    formula: ({ score, avgCheck, cancellations }) => score / 3 * cancellations * avgCheck,
    preview: 'Проверяем напоминания, запасные каналы, подтверждение записи и сценарий возврата после отмены.'
  },
  {
    id: 'sleeping',
    title: 'Спящие клиенты',
    area: 'База',
    question: 'В базе есть люди, которые давно не были, но с ними нет регулярной работы.',
    formula: ({ score, avgCheck, sleepingClients }) => score / 3 * sleepingClients * 0.12 * avgCheck,
    preview: 'Базу нужно делить по давности визита: 30, 60, 90 дней. Одно сообщение всем подряд обычно работает слабо.'
  },
  {
    id: 'sameOffer',
    title: 'Один оффер на всех',
    area: 'Возврат',
    question: 'Клиенты с разной историей получают одинаковые сообщения и предложения.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.03 * avgCheck,
    preview: 'Сегменты по услуге, давности визита и поведению помогают писать не всем одинаково, а по ситуации клиента.'
  },
  {
    id: 'reviews',
    title: 'Отзывы не собираются системно',
    area: 'Доверие',
    question: 'Отзывы зависят от ручной просьбы администратора, а негатив не видно вовремя.',
    formula: ({ score, avgCheck, monthlyLeads }) => score / 3 * monthlyLeads * 0.02 * avgCheck,
    preview: 'Нужен сценарий после визита: довольных мягко вести к отзыву, недовольных - сначала в личный контакт.'
  },
  {
    id: 'messengers',
    title: 'Заявки из мессенджеров теряются',
    area: 'Входящие',
    question: 'Обращения приходят из разных каналов, и часть из них не доходит до записи.',
    formula: ({ score, avgCheck, lostRequests }) => score / 3 * lostRequests * 0.65 * avgCheck,
    preview: 'Проверяем единое окно, скорость ответа, шаблоны, статусы и контроль: был ли ответ, дошёл ли человек до записи.'
  },
  {
    id: 'afterVisit',
    title: 'После визита тишина',
    area: 'Повторная запись',
    question: 'После услуги клиенту не приходит понятное касание, рекомендация или повод записаться снова.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.05 * avgCheck,
    preview: 'После визита нужна не рассылка ради рассылки, а цепочка: забота, рекомендация, повторная запись, отзыв.'
  },
  {
    id: 'birthday',
    title: 'Дни рождения не используются',
    area: 'Лояльность',
    question: 'Личные даты клиентов не собираются или не используются для мягкого возврата.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.015 * avgCheck,
    preview: 'День рождения - нормальный повод вернуться, если предложение персональное и не выглядит как массовый спам.'
  },
  {
    id: 'cancelReturn',
    title: 'Клиент отменил и выпал',
    area: 'Возврат',
    question: 'После отмены клиент не получает ссылку на новое время, а администратор не видит задачу вернуть его.',
    formula: ({ score, avgCheck, cancellations }) => score / 3 * cancellations * 0.45 * avgCheck,
    preview: 'Отмена не всегда потеря. Нужен короткий сценарий: новое время, задача администратору, сегмент сорвавшейся записи.'
  },
  {
    id: 'upsell',
    title: 'Нет допродаж',
    area: 'Средний чек',
    question: 'Смежные услуги и рекомендации не предлагаются по истории клиента.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.04 * avgCheck,
    preview: 'Допродажа лучше работает не как давление, а как уместная рекомендация по услуге, истории и следующему шагу.'
  },
  {
    id: 'messagesCost',
    title: 'Рассылки дорогие и нестабильные',
    area: 'Уведомления',
    question: 'SMS, push или мессенджеры работают дорого, нестабильно или без понятной проверки доставки.',
    formula: ({ score, monthlyBookings }) => score / 3 * monthlyBookings * 28,
    preview: 'Смотрим каскад: если один канал не сработал, сообщение уходит в другой, а сбой становится виден.'
  },
  {
    id: 'analytics',
    title: 'Нет аналитики',
    area: 'Управление',
    question: 'Непонятно, где реально теряются деньги: в заявках, отменах, базе, повторных визитах или администраторах.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.025 * avgCheck,
    preview: 'Без цифр бизнес чинит по ощущениям. Минимум - видеть заявки, записи, отмены, повторные визиты и спящих клиентов.'
  }
];

const moneyInputs = ['avgCheck', 'monthlyBookings', 'monthlyLeads', 'lostRequests', 'cancellations', 'sleepingClients'];
const questionList = document.getElementById('questionList');
const topLeaks = document.getElementById('topLeaks');
const form = document.getElementById('diagnosticForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

function formatMoney(value) {
  const rounded = Math.max(0, Math.round(value / 1000) * 1000);
  return new Intl.NumberFormat('ru-RU').format(rounded) + ' ₽';
}

function ymGoal(goal) {
  if (typeof ym !== 'undefined') ym(109430856, 'reachGoal', goal);
}

function getInputNumber(id) {
  const value = Number(document.getElementById(id).value);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function getState() {
  const base = Object.fromEntries(moneyInputs.map(id => [id, getInputNumber(id)]));
  const items = leaks.map(item => {
    const score = Number(document.getElementById(`score-${item.id}`).value);
    const monthlyLoss = item.formula({ ...base, score });
    return { ...item, score, monthlyLoss };
  });
  const totalScore = items.reduce((sum, item) => sum + item.score, 0);
  const totalMoney = items.reduce((sum, item) => sum + item.monthlyLoss, 0);
  return { ...base, items, totalScore, totalMoney };
}

function riskLabel(totalScore) {
  if (totalScore <= 9) return 'Низкий риск: система в целом держится, но отдельные места всё равно стоит проверить.';
  if (totalScore <= 21) return 'Средний риск: деньги могут теряться не в одном месте, а в нескольких небольших разрывах.';
  return 'Высокий риск: запись, возврат и база требуют системного разбора. Начинать лучше с самых дорогих утечек.';
}

function renderQuestions() {
  questionList.innerHTML = leaks.map((item, index) => `
    <article class="question">
      <div>
        <div class="question__meta">
          <span class="tag">${String(index + 1).padStart(2, '0')}</span>
          <span class="tag">${item.area}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.question}</p>
      </div>
      <div class="slider-wrap">
        <div class="slider-top">
          <span>Оценка</span>
          <span class="score-value" id="value-${item.id}">0</span>
        </div>
        <input id="score-${item.id}" type="range" min="0" max="3" step="1" value="0" aria-label="${item.title}" />
        <div class="money-hint" id="loss-${item.id}">0 ₽ в месяц</div>
      </div>
    </article>
  `).join('');
}

function renderTop(items) {
  const active = items
    .filter(item => item.score > 0)
    .sort((a, b) => (b.score * b.monthlyLoss) - (a.score * a.monthlyLoss))
    .slice(0, 3);

  const list = active.length ? active : leaks.slice(0, 3).map(item => ({ ...item, score: 0, monthlyLoss: 0 }));

  topLeaks.innerHTML = list.map((item, index) => `
    <article class="leak-card">
      <span class="leak-card__num">${index + 1}</span>
      <h3>${item.title}</h3>
      <p><strong>${formatMoney(item.monthlyLoss)}</strong> - примерный порядок потерь в месяц.</p>
      <p>${item.preview}</p>
    </article>
  `).join('');
}

function update() {
  const state = getState();
  const riskPercent = Math.min(100, Math.round(state.totalScore / 36 * 100));
  const activeCount = state.items.filter(item => item.score >= 2).length;

  document.getElementById('heroScore').textContent = state.totalScore;
  document.getElementById('heroMoney').textContent = formatMoney(state.totalMoney);
  document.getElementById('totalScore').textContent = `${state.totalScore} / 36`;
  document.getElementById('totalMoney').textContent = formatMoney(state.totalMoney);
  document.getElementById('topCount').textContent = activeCount;
  document.getElementById('riskBar').style.width = `${riskPercent}%`;
  document.getElementById('riskText').textContent = riskLabel(state.totalScore);

  state.items.forEach(item => {
    document.getElementById(`value-${item.id}`).textContent = item.score;
    document.getElementById(`loss-${item.id}`).textContent = `${formatMoney(item.monthlyLoss)} в месяц`;
  });

  renderTop(state.items);
}

function resultSummary() {
  const state = getState();
  const top = state.items
    .filter(item => item.score > 0)
    .sort((a, b) => b.monthlyLoss - a.monthlyLoss)
    .slice(0, 3)
    .map(item => `${item.title}: ${item.score}/3, ${formatMoney(item.monthlyLoss)}`)
    .join('; ');

  return `Результат диагностики: ${state.totalScore}/36, примерные потери ${formatMoney(state.totalMoney)} в месяц. Топ-3: ${top || 'пока не отмечены'}.`;
}

async function submitForm(event) {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const business = String(data.get('business') || '').trim();
  const link = String(data.get('link') || '').trim();
  const contact = String(data.get('contact') || '').trim();
  const consent = document.getElementById('consent').checked;

  if (!name || !business || !link || !contact) {
    formNote.textContent = 'Заполните имя, бизнес, ссылку и контакт.';
    formNote.className = 'form-note form-note--error';
    return;
  }

  if (!consent) {
    formNote.textContent = 'Нужно согласие на обработку персональных данных.';
    formNote.className = 'form-note form-note--error';
    return;
  }

  const payload = {
    name,
    business,
    link,
    contact,
    goal: 'Разбор 3 утечек после диагностики и карты решений',
    timeline: 'После прохождения диагностики на сайте',
    problem: `${resultSummary()}\n\nКомментарий: ${String(data.get('comment') || '').trim() || '-'}`
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляю...';
  formNote.textContent = '';
  formNote.className = 'form-note';

  try {
    const response = await fetch('/api/send-telegram.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.ok) throw new Error('send failed');

    ymGoal('diagnostic_submit');
    form.reset();
    formNote.textContent = 'Результат отправлен. Я отвечу в Telegram или по указанному контакту.';
    formNote.className = 'form-note form-note--success';
    submitBtn.textContent = 'Отправлено';
  } catch {
    formNote.textContent = 'Не получилось отправить форму. Напишите мне напрямую в Telegram: @masha_zoloty.';
    formNote.className = 'form-note form-note--error';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить результат';
  }
}

renderQuestions();
document.querySelectorAll('input').forEach(input => input.addEventListener('input', update));
document.querySelectorAll('a[href="#diagnostic"]').forEach(link => {
  link.addEventListener('click', () => ymGoal('diagnostic_start'));
});
document.querySelectorAll('[data-goal]').forEach(element => {
  element.addEventListener('click', () => ymGoal(element.dataset.goal));
});
form.addEventListener('submit', submitForm);
update();
