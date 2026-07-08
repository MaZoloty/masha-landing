const questions = [
  {
    id: "entry",
    tag: "до записи",
    title: "Точка входа непонятна",
    description: "Клиент приходит с конкретным запросом, но попадает в каталог услуг, цен, мастеров и филиалов. Он не всегда уходит потому, что дорого. Часто он просто не понял, что выбрать и где записаться.",
    why: "Эта утечка опасна тем, что клиент уже нашёл вас: через карты, рекламу, сайт, соцсети или рекомендацию. То есть внимание уже получено, но путь до записи оказался слишком длинным или мутным.",
    checks: [
      "понятно ли с первого экрана, что вы делаете и для кого",
      "видно ли цену, длительность и результат услуги без переписки",
      "есть ли один очевидный путь до записи, а не 5 равнозначных кнопок"
    ],
    moneyType: "entry",
    resultHint: "Сначала смотрим путь клиента: сайт, соцсети, карты, YClients или Dikidi. Задача — убрать лишние шаги до записи."
  },
  {
    id: "cancellations",
    tag: "расписание",
    title: "Отмены и неявки съедают расписание",
    description: "Клиент записался, но не дошёл, отменил поздно или не увидел напоминание. В итоге в расписании появляется пустое окно, которое уже сложно продать другому человеку.",
    why: "Пустое окно — самая прямая потеря. Мастер рассчитывал на выручку, время было занято, а другой клиент мог не попасть на это место.",
    checks: [
      "за сколько часов уходит напоминание и в какой канал",
      "есть ли запасной сценарий, если сообщение не дошло",
      "что происходит после отмены: клиенту предлагают другое время или просто снимают запись"
    ],
    moneyType: "cancellations",
    resultHint: "Проверьте напоминания, подтверждение визита, запасные каналы и сценарий возврата после отмены."
  },
  {
    id: "sleeping",
    tag: "база",
    title: "Спящих клиентов никто не возвращает вовремя",
    description: "В базе есть люди, которые уже были у вас и однажды доверились салону. Но если их не трогать 2–3 месяца, они постепенно остывают, забывают или уходят туда, где про них вспомнили раньше.",
    why: "Это один из самых дешёвых источников повторной выручки: клиента не надо знакомить с салоном с нуля. Он уже был, вопрос только в том, есть ли система возврата.",
    checks: [
      "видите ли вы клиентов, которые не были 30, 60 и 90 дней",
      "есть ли отдельные сообщения под разные сроки отсутствия",
      "считаете ли вы, сколько людей вернулось после реактивации"
    ],
    moneyType: "sleeping",
    resultHint: "Начните с тёплого сегмента: клиенты, которые не были 60–90 дней, но раньше приходили больше одного раза."
  },
  {
    id: "segmentation",
    tag: "база",
    title: "Всем спящим уходит один и тот же оффер",
    description: "Клиент, который пропал на 3 недели, и клиент, который не был полгода, находятся в разных состояниях. Одному достаточно мягкого напоминания, другому нужен более сильный повод вернуться.",
    why: "Общее сообщение чаще выглядит как массовая рассылка. А сообщение под ситуацию клиента больше похоже на заботу и даёт выше шанс на отклик.",
    checks: [
      "делите ли вы базу по давности визита",
      "учитываете ли услугу, частоту визитов и сумму клиента",
      "отличаются ли сообщения для новичков, постоянных и давно не бывших"
    ],
    moneyType: "segmentation",
    resultHint: "Разделите хотя бы три группы: новички, постоянные на грани ухода и спящие 60–90 дней."
  },
  {
    id: "reviews",
    tag: "доверие",
    title: "Отзывы собираются случайно",
    description: "Довольные клиенты часто молчат, а недовольные пишут сами. Если сбор отзывов не встроен в процесс, репутация на картах развивается случайно и может срезать часть записей ещё до первого контакта.",
    why: "Новый клиент может выбрать соседний салон не из-за услуги, а из-за свежего негатива сверху или пустой карточки без живых отзывов.",
    checks: [
      "есть ли регулярный запрос отзыва после визита",
      "куда ведёте довольных клиентов: Яндекс, 2ГИС, Google, соцсети",
      "есть ли личный путь для недовольного клиента до публичного отзыва"
    ],
    moneyType: "reviews",
    resultHint: "Сделайте два пути: довольных вести на карты, недовольным дать личный канал для решения вопроса."
  },
  {
    id: "messages",
    tag: "заявки",
    title: "Заявки теряются между мессенджерами",
    description: "Клиент пишет в Telegram, VK, WhatsApp, Direct или с карт, а администратор отвечает из разных приложений. Часть сообщений видят поздно, часть забывают, часть не фиксируют как заявку.",
    why: "Тут часто проблема не в администраторе, а в самой системе. Если каналы разбросаны, контролировать скорость ответа и потерянные обращения почти невозможно.",
    checks: [
      "сколько каналов надо проверять каждый день",
      "видно ли, какие сообщения остались без ответа",
      "фиксируется ли заявка где-то кроме переписки"
    ],
    moneyType: "lostRequests",
    resultHint: "Сначала составьте карту каналов. Потом решайте: регламент, единое окно или автоматизация типовых вопросов."
  },
  {
    id: "afterVisit",
    tag: "повторная запись",
    title: "После визита наступает тишина",
    description: "Клиент может быть доволен, но это не значит, что он сам вспомнит и запишется снова. Без касаний после визита повторная запись держится на памяти клиента и администратора.",
    why: "Самый тёплый момент — сразу после услуги. Если в этот момент нет заботы, рекомендации и понятного повода вернуться, повторная запись легко уходит в случайность.",
    checks: [
      "есть ли сообщение после визита с заботой или рекомендациями",
      "напоминаете ли срок следующего визита",
      "отличаются ли сообщения после разных услуг"
    ],
    moneyType: "afterVisit",
    resultHint: "Выберите одну услугу и соберите цепочку из 2–3 сообщений после визита."
  },
  {
    id: "birthday",
    tag: "повод вернуться",
    title: "Личные даты не используются",
    description: "День рождения — мягкий повод напомнить о себе без давления. Но часто дата не собирается, поле в CRM пустое, а поздравления либо не уходят, либо звучат одинаково для всех.",
    why: "Это не главный источник выручки, но хороший слой заботы и возврата. Особенно если предложение связано с историей клиента, а не одинаковое для всей базы.",
    checks: [
      "у какого процента базы заполнена дата рождения",
      "есть ли понятный повод оставить дату при записи",
      "связано ли поздравление с услугами, на которые человек уже ходил"
    ],
    moneyType: "birthday",
    resultHint: "Если дат мало, первая задача — не поздравления, а нормальный сбор данных."
  },
  {
    id: "cancelReturn",
    tag: "возврат",
    title: "Клиент отменил запись и выпал",
    description: "Отмена не всегда означает отказ. Часто это просто “не сейчас”. Но если после отмены нет сообщения, ссылки на новое время или задачи администратору, готовый клиент превращается в потерянного.",
    why: "Человек уже был достаточно тёплым, чтобы записаться. Его проще вернуть в расписание, чем искать нового клиента с нуля.",
    checks: [
      "предлагается ли другое время сразу после отмены",
      "есть ли напоминание через пару дней, если новой записи нет",
      "видите ли вы клиентов, которые отменили и не вернулись"
    ],
    moneyType: "cancelReturn",
    resultHint: "Добавьте короткий сценарий: ссылка на новую запись, напоминание через пару дней, сегмент “отменил и не вернулся”."
  },
  {
    id: "upsell",
    tag: "чек",
    title: "Смежные услуги не предлагаются в тёплый момент",
    description: "Клиент уже пришёл, доверяет и платит. Но если ему не предложили логичный следующий шаг, смежную услугу, курс или уход, чек остаётся ниже возможного, а момент уходит.",
    why: "Допродажа работает не тогда, когда навязывают, а когда предложение логично продолжает результат услуги. Но для этого нужно заранее понимать, что с чем связано.",
    checks: [
      "есть ли у основных услуг понятная пара для следующего шага",
      "знают ли мастера и администраторы, что предлагать",
      "уходит ли рекомендация после визита, если на месте не предложили"
    ],
    moneyType: "upsell",
    resultHint: "Начните с 3 главных услуг и пропишите к каждой одну естественную допродажу."
  },
  {
    id: "messagingCost",
    tag: "расходы",
    title: "Рассылки стоят дорого, а контроля мало",
    description: "Салон платит за SMS, сторонние сервисы и интеграции, но не всегда видит, что реально дошло, где был сбой и какой канал можно удешевить без потери качества.",
    why: "Проблема не только в стоимости. Если вы не видите доставку и сбои, то узнаёте о проблеме уже по пустым окнам или жалобам клиентов.",
    checks: [
      "сколько в месяц уходит на сообщения, сервисы и интеграции",
      "есть ли логи доставки и статусы сообщений",
      "есть ли запасной канал, если основной не сработал"
    ],
    moneyType: "messagingCost",
    resultHint: "Сначала посчитайте текущие расходы и отделите обязательные сообщения от дублей и нерабочих каналов."
  },
  {
    id: "analytics",
    tag: "управление",
    title: "Нет аналитики возвращаемости и оттока",
    description: "Без цифр сложно понять, какая утечка самая дорогая. Может казаться, что проблема в рекламе, хотя на деле проседают повторные визиты, отмены, база или заявки из мессенджеров.",
    why: "Аналитика нужна не ради красивого отчёта, а чтобы не чинить наугад. Она показывает, где реально теряются деньги и какой сценарий запускать первым.",
    checks: [
      "видите ли вы новых, повторных и спящих клиентов",
      "смотрите ли отмены, источники записей и возврат по услугам",
      "можно ли сравнить филиалы, мастеров или администраторов по возвратам"
    ],
    moneyType: "analytics",
    resultHint: "Начните с трёх цифр: новые клиенты, повторные клиенты и те, кто не был 60–90 дней."
  }
];

const scoreLabels = ["спокойно", "иногда", "часто", "болит"];
const scores = Object.fromEntries(questions.map((q) => [q.id, 0]));
const moneyInputs = ["avgCheck", "monthlyBookings", "monthlyLeads", "lostRequests", "cancellations", "sleepingClients"];

function byId(id) {
  return document.getElementById(id);
}

function num(id) {
  const value = Number(byId(id)?.value || 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function formatMoney(value) {
  const rounded = Math.round(value / 1000) * 1000;
  return new Intl.NumberFormat("ru-RU").format(Math.max(0, rounded)) + " ₽";
}

function estimateFor(question) {
  const scoreFactor = (scores[question.id] || 0) / 3;
  const avg = num("avgCheck");
  const bookings = num("monthlyBookings");
  const leads = num("monthlyLeads");
  const lost = num("lostRequests");
  const cancels = num("cancellations");
  const sleeping = num("sleepingClients");

  const raw = {
    entry: leads * 0.06 * avg,
    cancellations: cancels * avg,
    sleeping: sleeping * 0.05 * avg,
    segmentation: sleeping * 0.03 * avg,
    reviews: leads * 0.035 * avg,
    lostRequests: lost * avg,
    afterVisit: bookings * 0.045 * avg,
    birthday: bookings * 0.018 * avg,
    cancelReturn: cancels * 0.45 * avg,
    upsell: bookings * 0.025 * avg,
    messagingCost: Math.min(12000, Math.max(0, bookings * 22)),
    analytics: Math.max(avg * 2, bookings * 0.01 * avg)
  }[question.moneyType] || 0;

  return raw * scoreFactor;
}


function renderQuestions() {
  const list = byId("questionList");
  if (!list) return;

  list.innerHTML = questions.map((q, index) => `
    <article class="question-card" data-question-id="${q.id}">
      <div class="question-card__head">
        <div class="question-card__main">
          <div class="question-card__meta">
            <span class="question-card__number">${String(index + 1).padStart(2, "0")}</span>
            <span class="question-card__tag">${q.tag}</span>
          </div>
          <h3 class="question-card__title">${q.title}</h3>
          <p class="question-card__lead">${q.description}</p>
        </div>
        <div class="question-card__score-label">
          <span>Оценка</span>
          <strong>${scores[q.id]}/3</strong>
        </div>
      </div>
      <div class="question-card__details">
        <div>
          <strong>Почему это важно</strong>
          <p>${q.why}</p>
        </div>
        <div class="question-card__checks">
          <strong>Что проверить</strong>
          <ul>${q.checks.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="question-card__rating" role="group" aria-label="Оценка: ${q.title}">
        ${scoreLabels.map((label, value) => `
          <button class="question-score ${value === scores[q.id] ? "is-active" : ""}" type="button" data-id="${q.id}" data-value="${value}" aria-pressed="${value === scores[q.id]}">
            <b>${value}</b>
            <small>${label}</small>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function updateQuestionButtonState(id) {
  document.querySelectorAll(`.question-score[data-id="${id}"]`).forEach((button) => {
    const active = Number(button.dataset.value) === scores[id];
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const card = document.querySelector(`.question-card[data-question-id="${id}"]`);
  const label = card?.querySelector(".question-card__score-label strong");
  if (label) label.textContent = `${scores[id]}/3`;
}

function riskText(totalScore) {
  if (totalScore === 0) return "Оцените 12 точек, чтобы увидеть картину.";
  if (totalScore <= 10) return "Система в целом выглядит спокойно. Есть смысл точечно проверить зоны с самыми высокими баллами.";
  if (totalScore <= 22) return "Есть несколько заметных утечек. Лучше выбрать 1–2 самые дорогие точки и закрывать их первыми.";
  return "Утечек много. В такой ситуации важно не чинить всё подряд, а выбрать порядок действий по деньгам и сложности внедрения.";
}

function renderTopLeaks() {
  const grid = byId("topLeaks");
  if (!grid) return;

  const top = questions
    .map((q) => ({ ...q, score: scores[q.id] || 0, estimate: estimateFor(q) }))
    .sort((a, b) => (b.score * 100000 + b.estimate) - (a.score * 100000 + a.estimate))
    .slice(0, 3);

  if (top.every((item) => item.score === 0)) {
    grid.innerHTML = `
      <article class="leak-card leak-card--empty">
        <div class="leak-card__rank">?</div>
        <div class="leak-card__content">
          <div class="leak-card__meta"><span class="leak-chip">пока без данных</span></div>
          <h3>Здесь появятся ваши приоритеты</h3>
          <p class="leak-card__hint">Оцените 12 точек выше. После этого блок покажет 3 зоны, с которых разумнее начать.</p>
        </div>
      </article>
    `;
    return;
  }

  grid.innerHTML = top.map((item, index) => `
    <article class="leak-card">
      <div class="leak-card__rank">${String(index + 1).padStart(2, "0")}</div>
      <div class="leak-card__content">
        <div class="leak-card__meta">
          <span class="leak-chip">${item.tag}</span>
          <span class="leak-chip">оценка ${item.score}/3</span>
        </div>
        <h3>${item.title}</h3>
        <p class="leak-card__hint">${item.resultHint}</p>
      </div>
      <div class="leak-card__side">
        <div class="leak-card__money">${formatMoney(item.estimate)}</div>
        <span>ориентир в месяц</span>
      </div>
    </article>
  `).join("");
}

function updateTotals() {
  const totalScore = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const totalMoney = questions.reduce((sum, q) => sum + estimateFor(q), 0);
  const strongLeaks = Object.values(scores).filter((value) => value >= 2).length;
  const percent = Math.min(100, Math.round((totalScore / 36) * 100));

  if (byId("heroScore")) byId("heroScore").textContent = String(totalScore);
  if (byId("heroMoney")) byId("heroMoney").textContent = totalScore ? formatMoney(totalMoney) : "—";
  if (byId("totalScore")) byId("totalScore").textContent = `${totalScore} / 36`;
  if (byId("topCount")) byId("topCount").textContent = String(strongLeaks);
  if (byId("totalMoney")) byId("totalMoney").textContent = totalScore ? formatMoney(totalMoney) : "—";
  if (byId("riskBar")) byId("riskBar").style.width = `${percent}%`;
  if (byId("riskText")) byId("riskText").textContent = riskText(totalScore);

  renderTopLeaks();
}

function buildResultMessage(formData) {
  const top = questions
    .map((q) => ({ ...q, score: scores[q.id] || 0, estimate: estimateFor(q) }))
    .sort((a, b) => (b.score * 100000 + b.estimate) - (a.score * 100000 + a.estimate))
    .slice(0, 3);

  return [
    "Новая диагностика карты утечек записи",
    "",
    `Имя: ${formData.get("name") || "-"}`,
    `Бизнес: ${formData.get("business") || "-"}`,
    `Ссылка: ${formData.get("link") || "-"}`,
    `Контакт: ${formData.get("contact") || "-"}`,
    `Комментарий: ${formData.get("comment") || "-"}`,
    "",
    `Средний чек: ${num("avgCheck")} ₽`,
    `Записей в месяц: ${num("monthlyBookings")}`,
    `Новых обращений: ${num("monthlyLeads")}`,
    `Потерянных заявок: ${num("lostRequests")}`,
    `Отмен и неявок: ${num("cancellations")}`,
    `Спящих клиентов: ${num("sleepingClients")}`,
    "",
    `Итоговый балл: ${Object.values(scores).reduce((sum, value) => sum + value, 0)} / 36`,
    `Примерный порядок потерь: ${byId("totalMoney")?.textContent || "-"}`,
    "",
    "Топ-3 утечки:",
    ...top.map((q, index) => `${index + 1}. ${q.title} — ${q.score}/3, ${formatMoney(q.estimate)}`)
  ].join("\n");
}

function setupForm() {
  const form = byId("diagnosticForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = byId("formNote");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const message = buildResultMessage(new FormData(form));

    try {
      await navigator.clipboard?.writeText(message);
      if (note) note.textContent = "Результат собран и скопирован. Теперь напишите Марии в Telegram и вставьте сообщение.";
    } catch (error) {
      if (note) note.textContent = "Результат собран. Напишите Марии в Telegram, а данные можно продублировать вручную.";
    }

    if (window.ym) {
      ym(109430856, "reachGoal", "lead_submit");
      ym(109430856, "reachGoal", "diagnostic_submit");
    }
    window.open("https://t.me/masha_zoloty", "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  updateTotals();
  setupForm();

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".question-score");
    if (!button) return;

    const id = button.dataset.id;
    const value = Number(button.dataset.value);
    scores[id] = value;
    updateQuestionButtonState(id);
    updateTotals();
  });

  moneyInputs.forEach((id) => {
    byId(id)?.addEventListener("input", updateTotals);
  });
});
