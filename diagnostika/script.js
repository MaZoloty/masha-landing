const leaks = [
  {
    id: 'entry',
    title: 'Точка входа непонятна',
    area: 'До записи',
    question: 'Клиенту сложно быстро понять услуги, цены, мастеров и куда нажать, чтобы записаться.',
    why: 'Если вход в запись неочевиден, часть тёплых обращений не становится заявками, хотя спрос уже был.',
    formula: ({ score, avgCheck, monthlyLeads }) => score / 3 * monthlyLeads * 0.06 * avgCheck,
    checks: ['Сколько кликов от первого касания до записи', 'Понятны ли цены, длительность и результат услуги', 'Есть ли один очевидный способ записаться'],
    preview: 'Сначала смотрим путь клиента: сайт, соцсети, карты, YClients или Dikidi. Задача - убрать лишние шаги до записи.'
  },
  {
    id: 'noShow',
    title: 'Отмены и неявки',
    area: 'Расписание',
    question: 'Есть пустые окна из-за поздних отмен, неявок или слабых напоминаний.',
    why: 'Пустые окна бьют по выручке сразу: время мастера уже занято в расписании, но деньги не приходят.',
    formula: ({ score, avgCheck, cancellations }) => score / 3 * cancellations * avgCheck,
    checks: ['Когда клиент получает напоминание', 'Есть ли подтверждение записи', 'Кто видит риск пустого окна заранее'],
    preview: 'Проверяем напоминания, запасные каналы, подтверждение записи и сценарий возврата после отмены.'
  },
  {
    id: 'sleeping',
    title: 'Спящие клиенты',
    area: 'База',
    question: 'В базе есть люди, которые давно не были, но с ними нет регулярной работы.',
    why: 'Спящая база часто дешевле холодного трафика, но без сегментов она постепенно перестаёт приносить записи.',
    formula: ({ score, avgCheck, sleepingClients }) => score / 3 * sleepingClients * 0.12 * avgCheck,
    checks: ['Есть ли сегменты 30/60/90 дней', 'Понятно ли, кто давно не был', 'Есть ли мягкий сценарий возврата'],
    preview: 'Базу нужно делить по давности визита: 30, 60, 90 дней. Одно сообщение всем подряд обычно работает слабо.'
  },
  {
    id: 'sameOffer',
    title: 'Один оффер на всех',
    area: 'Возврат',
    question: 'Клиенты с разной историей получают одинаковые сообщения и предложения.',
    why: 'Одинаковый оффер снижает отклик: клиент не видит, что предложение связано с его услугой и историей.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.03 * avgCheck,
    checks: ['Разделены ли новые и постоянные клиенты', 'Учитывается ли последняя услуга', 'Есть ли разные поводы для возврата'],
    preview: 'Сегменты по услуге, давности визита и поведению помогают писать не всем одинаково, а по ситуации клиента.'
  },
  {
    id: 'reviews',
    title: 'Отзывы не собираются системно',
    area: 'Доверие',
    question: 'Отзывы зависят от ручной просьбы администратора, а негатив не видно вовремя.',
    why: 'Отзывы влияют на выбор до записи, а необработанный негатив может незаметно портить конверсию из карт и соцсетей.',
    formula: ({ score, avgCheck, monthlyLeads }) => score / 3 * monthlyLeads * 0.02 * avgCheck,
    checks: ['Кому и когда уходит просьба об отзыве', 'Как обрабатывается негатив', 'Есть ли контроль, что отзыв реально попросили'],
    preview: 'Нужен сценарий после визита: довольных мягко вести к отзыву, недовольных - сначала в личный контакт.'
  },
  {
    id: 'messengers',
    title: 'Заявки из мессенджеров теряются',
    area: 'Входящие',
    question: 'Обращения приходят из разных каналов, и часть из них не доходит до записи.',
    why: 'Потерянная заявка уже стоила внимания, рекламы или рекомендации, но не дошла до кассы.',
    formula: ({ score, avgCheck, lostRequests }) => score / 3 * lostRequests * 0.65 * avgCheck,
    checks: ['Где собираются заявки из всех каналов', 'Какая средняя скорость ответа', 'Есть ли статус: ответили, записали, потеряли'],
    preview: 'Проверяем единое окно, скорость ответа, шаблоны, статусы и контроль: был ли ответ, дошёл ли человек до записи.'
  },
  {
    id: 'afterVisit',
    title: 'После визита тишина',
    area: 'Повторная запись',
    question: 'После услуги клиенту не приходит понятное касание, рекомендация или повод записаться снова.',
    why: 'Без следующего шага клиенту проще забыть про повторный визит, даже если услуга понравилась.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.05 * avgCheck,
    checks: ['Есть ли касание после визита', 'Получает ли клиент рекомендацию по сроку', 'Ведёт ли сообщение к повторной записи'],
    preview: 'После визита нужна не рассылка ради рассылки, а цепочка: забота, рекомендация, повторная запись, отзыв.'
  },
  {
    id: 'birthday',
    title: 'Дни рождения не используются',
    area: 'Лояльность',
    question: 'Личные даты клиентов не собираются или не используются для мягкого возврата.',
    why: 'Персональные поводы дают аккуратный контакт без ощущения случайной массовой рассылки.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.015 * avgCheck,
    checks: ['Собирается ли дата рождения', 'Есть ли персональный повод вернуться', 'Не выглядит ли сообщение как массовая акция'],
    preview: 'День рождения - нормальный повод вернуться, если предложение персональное и не выглядит как массовый спам.'
  },
  {
    id: 'cancelReturn',
    title: 'Клиент отменил и выпал',
    area: 'Возврат',
    question: 'После отмены клиент не получает ссылку на новое время, а администратор не видит задачу вернуть его.',
    why: 'Отмена становится потерей только тогда, когда нет быстрого сценария переноса и контроля.',
    formula: ({ score, avgCheck, cancellations }) => score / 3 * cancellations * 0.45 * avgCheck,
    checks: ['Получает ли клиент ссылку на новое время', 'Ставится ли задача администратору', 'Есть ли отдельный сценарий для отменивших'],
    preview: 'Отмена не всегда потеря. Нужен короткий сценарий: новое время, задача администратору, сегмент сорвавшейся записи.'
  },
  {
    id: 'upsell',
    title: 'Нет допродаж',
    area: 'Средний чек',
    question: 'Смежные услуги и рекомендации не предлагаются по истории клиента.',
    why: 'Уместная рекомендация повышает чек без давления, потому что опирается на реальную потребность клиента.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.04 * avgCheck,
    checks: ['Есть ли рекомендации по истории клиента', 'Понимает ли мастер следующий логичный шаг', 'Фиксируются ли допродажи в процессе'],
    preview: 'Допродажа лучше работает не как давление, а как уместная рекомендация по услуге, истории и следующему шагу.'
  },
  {
    id: 'messagesCost',
    title: 'Рассылки дорогие и нестабильные',
    area: 'Уведомления',
    question: 'SMS, push или мессенджеры работают дорого, нестабильно или без понятной проверки доставки.',
    why: 'Если не видно доставку и запасной канал, салон платит за касания, но не управляет результатом.',
    formula: ({ score, monthlyBookings }) => score / 3 * monthlyBookings * 28,
    checks: ['Видно ли, доставлено сообщение или нет', 'Есть ли запасной канал', 'Понимаете ли стоимость касаний в месяц'],
    preview: 'Смотрим каскад: если один канал не сработал, сообщение уходит в другой, а сбой становится виден.'
  },
  {
    id: 'analytics',
    title: 'Нет аналитики',
    area: 'Управление',
    question: 'Непонятно, где реально теряются деньги: в заявках, отменах, базе, повторных визитах или администраторах.',
    why: 'Без аналитики команда чинит то, что громче всего болит, а не то, что дороже всего обходится.',
    formula: ({ score, avgCheck, monthlyBookings }) => score / 3 * monthlyBookings * 0.025 * avgCheck,
    checks: ['Видны ли заявки, записи и отмены в одной логике', 'Считаете ли повторные визиты', 'Понятно ли, какой канал реально даёт запись'],
    preview: 'Без цифр бизнес чинит по ощущениям. Минимум - видеть заявки, записи, отмены, повторные визиты и спящих клиентов.'
  }
];

const scoreLabels = ['0 - спокойно', '1 - иногда', '2 - часто', '3 - болит'];
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
      <div class="question__main">
        <div class="question__meta">
          <span class="question__num">${String(index + 1).padStart(2, '0')}</span>
          <span class="tag">${item.area}</span>
        </div>
        <h3>${item.title}</h3>
        <div class="question__insights">
          <div>
            <span>Проблема</span>
            <p>${item.question}</p>
          </div>
          <div>
            <span>Почему это важно</span>
            <p>${item.why}</p>
          </div>
        </div>
        <div class="check-block">
          <span>Что проверить</span>
          <ul>
            ${item.checks.map(check => `<li>${check}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="slider-wrap">
        <div class="slider-top">
          <span>Оценка</span>
          <span class="score-value" id="value-${item.id}">0</span>
        </div>
        <input id="score-${item.id}" type="hidden" value="0" />
        <div class="score-options" role="radiogroup" aria-label="${item.title}">
          ${scoreLabels.map((label, score) => `
            <button class="score-option" type="button" data-item="${item.id}" data-score="${score}" aria-pressed="${score === 0 ? 'true' : 'false'}">${label}</button>
          `).join('')}
        </div>
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
      <div class="leak-card__head">
        <span class="leak-card__num">${String(index + 1).padStart(2, '0')}</span>
        <div>
          <span class="tag">${item.area}</span>
          <h3>${item.title}</h3>
        </div>
      </div>
      <div class="leak-card__metrics">
        <div>
          <span>Оценка</span>
          <strong>${item.score}/3</strong>
        </div>
        <div>
          <span>Ориентир по деньгам</span>
          <strong>${formatMoney(item.monthlyLoss)}</strong>
        </div>
      </div>
      <p class="leak-card__hint"><span>С чего начать</span>${item.preview}</p>
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
    document.querySelectorAll(`[data-item="${item.id}"]`).forEach(button => {
      const isActive = Number(button.dataset.score) === item.score;
      button.classList.toggle('score-option--active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
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
document.querySelectorAll('.score-option').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById(`score-${button.dataset.item}`).value = button.dataset.score;
    update();
  });
});
document.querySelectorAll('a[href="#diagnostic"]').forEach(link => {
  link.addEventListener('click', () => ymGoal('diagnostic_start'));
});
document.querySelectorAll('[data-goal]').forEach(element => {
  element.addEventListener('click', () => ymGoal(element.dataset.goal));
});
form.addEventListener('submit', submitForm);
update();
