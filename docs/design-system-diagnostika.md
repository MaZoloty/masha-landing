# Design System: `/diagnostika/`

## Status

This document defines the diagnostics funnel product logic. For the updated visual mood, `docs/visual-direction.md`, `docs/design-system.md`, and `docs/component-architecture.md` are the source of truth.

Do not continue polishing `/diagnostika/` by changing isolated colors, cards, buttons, or sections "by eye". First follow the approved visual system, then implement. If this document and the page disagree, update or approve the design system before editing HTML/CSS.

## Concept

**Premium consulting + light dashboard.**

The page should feel like a short management audit for a salon owner, not a quiz, not an info-product landing page, and not a raw MVP.

The user should feel:

> I am not passing a test. I am getting a preliminary map of weak points in the booking system.

The visual language must communicate:

- expertise;
- calm business thinking;
- money and operational clarity;
- diagnostic usefulness;
- controlled next steps.

## Visual Principles

### 1. Less Decoration, More Status

No random icons, loud gradients, decorative noise, cute blocks, or startup-style badges. The page should earn trust through structure, hierarchy, spacing, and precise content.

### 2. Block Types Must Feel Different

Do not make the whole page a stack of identical boxes. Each block type has its own role and visual weight:

- hero block;
- calculation data form;
- diagnostic card;
- result dashboard;
- priority list;
- solution map block;
- help/review block;
- lead form.

### 3. No Zero Results Before Interaction

Do not show `0 ₽`, `0 / 36`, or `0 утечек` on the first screen. Before the user interacts, show what will be calculated:

- общий уровень риска;
- 3 главные утечки;
- примерный порядок потерь;
- первый разумный шаг.

### 4. Sales Blocks Continue The Value

The paid step should not look like a separate advertisement.

Wrong:

- "Купите карту за 1 490 ₽"
- "Заберите PDF"
- price as the main headline.

Right:

- "Понять, чем закрывать свои утечки"
- "Теперь понятно, где течёт. Следующий шаг - понять, каким уровнем это закрывать."

The price can appear inside the block, but not as the main headline.

## Color Tokens

Use the global palette from `docs/design-system.md`. Do not create extra beige, green, gold, lilac, butter, or risk variants unless the global design system is updated.

```css
:root {
  --color-bg: #f7f1e7;
  --color-bg-soft: #fbf7ef;
  --color-surface: #fffdf8;
  --color-surface-muted: #efe8dc;

  --color-ink: #151511;
  --color-muted: #67635b;
  --color-muted-light: #969086;

  --color-cta: #151b17;
  --color-cta-hover: #22241e;

  --color-lilac: #e8dff2;
  --color-lilac-ink: #4d405d;
  --color-butter: #f4e7b8;
  --color-butter-ink: #5f4d1d;

  --color-line: #ded7ca;
  --color-grid: rgba(81, 73, 91, .12);
  --color-line-strong: #cfc4b4;

  --color-risk: #8b4b3d;
}
```

### Color Rules

- Background: warm paper, not pure white.
- Primary action: dark premium pill CTA.
- Business/consulting accent: pale butter when it has an informational role.
- Analytical/report accent: soft lilac and lavender linework.
- Risk colors: restrained, never bright red/yellow.
- Text muted color must stay readable.
- Avoid saturated purple, bright blue, saturated red, neon yellow.
- Avoid using many shades of beige, green, gold, lilac, or butter that are not tokens.

## Typography

Use one stable pair:

- headings: refined serif;
- interface/body: clean sans-serif.

### Rules

- Hero `h1` can be large and expressive.
- Step headings should be smaller and clearer than hero.
- Diagnostic card titles must not look like newspaper headlines.
- Dashboard numbers can be large, but they must support comprehension, not decoration.
- Body copy must be readable; avoid tiny pale gray text.
- Long paragraphs should have a comfortable max width.

## Grid And Spacing

### Desktop

- Content max width: `1180-1240px`.
- Section spacing: `80-112px`.
- Card spacing: `24-32px`.
- Use a 12-column grid or simple intentional 2-column layouts.
- Dashboard may use 3 metric cards only when the hierarchy is clear.

### Tablet

- Stack complex grids earlier rather than squeezing content.
- Keep dashboard cards readable.
- Keep diagnostic cards as single-column audit blocks.

### Mobile

- One column.
- Section spacing: `48-64px`.
- Cards without side panels.
- Buttons full width.
- No horizontal overflow.
- Metric values must wrap or scale safely.

## Components

Build the page from components, not random page-specific boxes.

### `PageHeader`

Normally disabled for `/diagnostika/` because this is a standalone funnel page. Do not add a header/navigation unless explicitly requested.

### `HeroReportCard`

Purpose: preview the report without showing zero values.

Contains:

- "Предварительный отчёт";
- what will be calculated;
- map of audit zones;
- short trust note.

Must not contain:

- `0 ₽`;
- `0 баллов`;
- fake metrics;
- decorative charts that imply real data.

### `StepHeader`

Purpose: introduce a diagnostic step with context.

Contains:

- eyebrow: `Шаг 1`, `Шаг 2`, etc.;
- concise title;
- explanatory copy.

### `InputCard`

Purpose: collect base numbers for calculation.

Should feel like "данные для расчёта", not a long questionnaire.

Rules:

- clear labels;
- reasonable default values only when useful;
- focus state;
- no decorative icons;
- button: `Перейти к оценке 12 точек`.

### `DiagnosticCard`

Purpose: mini-audit point.

Structure:

```txt
01 · До записи

Точка входа непонятна

Клиенту сложно быстро понять услуги, цены, мастеров и куда нажать, чтобы записаться.

Почему это важно:
Человек уже нашёл вас, но может уйти до записи просто потому, что путь оказался слишком сложным.

Что проверить:
• понятна ли цена
• есть ли очевидная кнопка записи
• сколько шагов от первого касания до записи

Оцените:
0 спокойно / 1 иногда / 2 часто / 3 болит
```

Rules:

- all content inside one calm card;
- no side panel inside the card;
- no heavy nested boxes;
- no table-like layout;
- score buttons must feel like a segmented control;
- score state must be visually obvious.

### `ScoreButton`

Values:

- `0 спокойно`;
- `1 иногда`;
- `2 часто`;
- `3 болит`.

Rules:

- tappable on mobile;
- active state uses dark CTA or quiet lilac/butter emphasis from the global palette;
- no aggressive warning colors;
- labels must not wrap awkwardly.

### `ResultDashboard`

Purpose: show a preliminary management report.

Contains:

```txt
Ваш предварительный отчёт

Примерный порядок потерь:
62 500 ₽ / месяц

Уровень риска:
18 из 36

Сильных утечек:
5
```

Rules:

- before answers, show neutral empty state, not broken zero values;
- numbers must have explanatory copy;
- risk indicator should be restrained;
- result should feel like a dashboard, not a banner.

### `PriorityListItem`

Purpose: show top-3 priority leaks as a decision list.

Structure:

```txt
01. Спящие клиенты
Оценка: 3/3 · База

Почему это важно...
Первый шаг...
Ориентир по деньгам...
```

Rules:

- vertical list, not three equal cards in a row;
- visible rank number;
- category and score near the title;
- money is useful but not the only emphasis;
- "first step" must be visible.

### `SolutionMapBlock`

Purpose: present the solution map as the natural next useful step.

Headline:

```txt
Понять, чем закрывать свои утечки
```

Copy:

```txt
Диагностика показывает, где клиент теряется. Карта решений показывает, что с этим делать дальше.
```

Levels:

1. Что можно закрыть штатно.
2. Где нужны простые связки.
3. Где уже нужна отдельная система.

Price placement:

```txt
Карта решений — 1 490 ₽.
Обычно это меньше, чем одно пустое окно в расписании.
```

Button:

```txt
Открыть карту решений
```

### `HelpBlock`

Purpose: softly introduce the review/consultation step.

Headline:

```txt
Когда лучше разобрать вместе
```

Copy:

```txt
Если после диагностики видно, что слабых мест несколько, можно не внедрять наугад. На точечном разборе берём ваши главные утечки и выбираем порядок действий под ваш салон, базу, администраторов и каналы записи.
```

Price placement:

```txt
Стоимость точечного разбора — 5 000 ₽.
Если дальше идём во внедрение, сумма засчитывается в работу.
```

Do not use "Разбор 3 утечек за 5 000 ₽" as the block headline.

### `LeadForm`

Purpose: capture context after the user has seen the diagnostic value.

Rules:

- form should feel calm and optional, not like a hard gate;
- labels must be clear;
- success state must tell the user what happened;
- if Telegram is used, make the transition explicit.

## Forbidden

For `/diagnostika/`, do not:

- show zero results before the user passes diagnostics;
- use identical frames for every block;
- use random icons;
- use bright red/yellow statuses;
- put price in the main headline of a sales block;
- add side panels inside diagnostic cards;
- make diagnostic cards look like tables;
- use markdown-like lists without design;
- add decorative elements without function;
- create info-product visual tone;
- add a page header unless explicitly requested;
- invent a new style outside this system;
- change calculations while doing visual work.

## Wireframe

This is the approved structure to use before implementation.

### 1. Hero

Goal: frame the page as a management audit, not a quiz.

Visual weight: strongest section. Large title on the left, report-preview card on the right.

Components:

- `StepHeader`-like eyebrow;
- primary button;
- `HeroReportCard`.

Copy:

```txt
Карта утечек записи

Интерактивная диагностика для салонов на YClients и Dikidi.

За 7 минут вы увидите, где клиент теряется: до записи, после отмены, после визита, в базе, мессенджерах и аналитике.
```

Button:

```txt
Начать с базовых цифр
```

Do not:

- show live zero numbers;
- add top navigation;
- add decorative hero artwork.

### 2. Step 1: Base Numbers

Goal: collect calculation inputs.

Visual weight: structured business form.

Components:

- `StepHeader`;
- `InputCard`;
- primary/ghost navigation button.

Button:

```txt
Перейти к оценке 12 точек
```

Do not:

- make it feel like a lead form;
- ask for contact details here.

### 3. Step 2: 12 Audit Points

Goal: help the user recognize operational weak points.

Visual weight: repeated audit cards, calm and readable.

Components:

- `StepHeader`;
- `DiagnosticCard`;
- `ScoreButton`.

Do not:

- use side panels;
- make cards too dense;
- use slider controls unless explicitly approved.

### 4. Result Dashboard

Goal: summarize risk and money in a decision-support format.

Visual weight: dashboard section with 3 metrics and clear explanation.

Components:

- `ResultDashboard`;
- metric cards;
- risk meter.

Do not:

- show a scary banner;
- overpromise financial growth;
- make money the only point.

### 5. Priority List

Goal: show what to check first.

Visual weight: vertical list, not a card grid.

Components:

- `PriorityListItem`.

Each item must include:

- rank;
- title;
- category;
- score;
- money estimate;
- first step.

### 6. Solution Map

Goal: move from "where it leaks" to "how to close it".

Visual weight: strong but useful consulting block.

Components:

- `SolutionMapBlock`;
- three solution levels;
- CTA.

Do not:

- lead with price;
- make it look like a PDF ad.

### 7. Help Block

Goal: explain when a personal review makes sense.

Visual weight: softer than solution map.

Components:

- `HelpBlock`;
- consultation note;
- optional form intro.

Do not:

- use a hard sales headline;
- make it appear before the solution map.

### 8. Lead Form

Goal: collect enough context for follow-up.

Visual weight: practical, calm form.

Components:

- `LeadForm`;
- fields;
- consent;
- success/error note.

Do not:

- make the form visually louder than the diagnostic result;
- hide what happens after submission.

## Implementation Gate

Before implementing a new `/diagnostika/` version:

1. Confirm this document is still the source of truth.
2. Implement only through the component structure above.
3. Do not change business logic or calculations during visual work.
4. Run visual QA at 1440px, 768px, and 390px.
5. Fix visual weaknesses before deployment.

If a new idea conflicts with this document, update this document first and ask for approval before implementation.
