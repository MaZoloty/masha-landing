# Visual Brandbook

## Status

This document explains how `docs/visual-direction.md` supports Maria's positioning, product ladder, and page modes.

The source of truth for visual mood is:

> Premium consulting + light dashboard.

Core offer language:

> Помогаю beauty и wellness-бизнесам находить, где теряются записи, и закрывать эти утечки системой.

Primary role:

> Specialist in site-funnels and AI for service businesses.

The brand should feel like a premium consulting brand with editorial clarity and light dashboard intelligence.

## Design Position

Maria's visual system sits between:

- a human expert brand: warm, personal, clear, alive;
- a premium consulting system: structured, editorial, analytical, useful, precise.

It should not sit at either extreme.

Avoid:

- a cold enterprise dashboard with no person behind it;
- a decorative author landing with weak product logic;
- a generic SaaS template;
- a Tilda template;
- an infoproduct landing page;
- a beauty-salon visual style;
- a cheap quiz;
- a "pretty website" portfolio;
- AI-magic aesthetics.

## Visual Formula

The working formula:

> Premium consulting restraint + editorial typography + light dashboard intelligence + service-business proof.

This means:

- soft ivory base, not sterile white;
- dark premium CTA pills;
- subtle lilac and butter accent cards;
- thin grid lines;
- large elegant serif headlines;
- clean sans-serif UI text;
- generous air and whitespace with clear grouping;
- real numbers, cases, and diagnostic logic;
- calm typography, not trendy display drama;
- components that help decide, not decorate.

## Brand Modes

### 1. Personal Expert Mode

Use for:

- main landing;
- about sections;
- author notes;
- case introductions;
- philosophy/method sections;
- soft consultation blocks.

Feeling:

- warmer;
- more human;
- more narrative;
- still structured and business-like.

Visual traits:

- warm paper background;
- fewer dense cards;
- wider text rhythm;
- real portrait/process/case imagery when available;
- subtle lilac or butter accent cards allowed when they support meaning;
- proof is woven into the story.

Do not:

- make it a personal blog without offer logic;
- overuse decorative quotes;
- hide the product ladder;
- make the first screen about Maria instead of the client's business problem.

### 2. Smart Tool Mode

Use for:

- diagnostics;
- calculators;
- result dashboards;
- audit reports;
- solution map offers;
- paid product pages;
- AI/automation tools;
- analytics explanations.

Feeling:

- sharper;
- more structured;
- more report-like;
- still warm and understandable.

Visual traits:

- dashboard grids;
- metric cards;
- priority blocks;
- status chips;
- progress and result states;
- dark CTA, lilac/butter accent hierarchy;
- serif or stronger numeric styling for important numbers.

Do not:

- make it look like a toy quiz;
- show empty `0 ₽`, `0 баллов`, or meaningless placeholders before interaction;
- add decorative cards that do not help the user decide;
- use numbers without interpretation.

## Color System

Use a limited palette. Every color must have a job.

### Core Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#f7f1e7` | soft ivory page background |
| `--color-bg-soft` | `#fbf7ef` | softer editorial section background |
| `--color-surface` | `#fffdf8` | cards, panels, forms |
| `--color-surface-muted` | `#efe8dc` | secondary panels, separators |
| `--color-ink` | `#151511` | main text and dark CTA |
| `--color-ink-soft` | `#2a2a24` | secondary dark surfaces |
| `--color-muted` | `#67635b` | body support text |
| `--color-muted-light` | `#969086` | labels, captions |
| `--color-line` | `#ded7ca` | thin low-contrast borders and grid lines |
| `--color-line-strong` | `#cfc4b4` | stronger separators |
| `--color-lilac` | `#e8dff2` | subtle accent card background |
| `--color-lilac-ink` | `#4d405d` | text/emphasis on lilac |
| `--color-butter` | `#f4e7b8` | subtle business-value accent card |
| `--color-butter-ink` | `#5f4d1d` | text/emphasis on butter |
| `--color-risk` | `#8b4b3d` | leaks and warnings, used softly |
| `--color-white` | `#ffffff` | high-contrast inserts only |

### Color Roles

Dark ink:

- primary CTA;
- premium contrast;
- strategic emphasis;
- main navigation or action anchor.

Lilac:

- soft analytical accent;
- secondary report card;
- AI/system hint when useful;
- never a full-page purple theme.

Butter:

- value, money, priority, and consulting emphasis;
- paid offer highlights;
- warm business note.

Risk color:

- leaks;
- warnings;
- lost booking points;
- attention points.

### Forbidden Color Moves

- no random blue SaaS buttons;
- no purple or blue-purple gradients;
- no pink beauty palette;
- no bright neon AI accents;
- no harsh red/yellow warning blocks;
- no many equal accent colors on one screen;
- no color used only because a block needs variety.

## Typography

The typography should feel calm, precise, and premium without becoming fashion/editorial for its own sake.

Recommended direction:

- body/UI: clean sans-serif with strong Cyrillic support;
- numbers/metrics: optional serif or stronger display treatment;
- headings: large elegant serif for hero and major sections, confident and readable elsewhere.

Current acceptable pair:

- UI/body: `"Segoe UI", "Helvetica Neue", Arial, sans-serif`;
- metric/display: Georgia, `"Times New Roman"`, serif.

Future stronger pair to test:

- body/UI: `Manrope`, `IBM Plex Sans`, or another clean sans-serif with strong Cyrillic support;
- heading/display: `Cormorant Garamond`, `Lora`, `Playfair Display`, or another elegant serif with strong Cyrillic support;
- fallback display: Georgia, `"Times New Roman"`, serif.

Typography rules:

- headings should carry business meaning, not vague drama;
- avoid very long hero lines;
- avoid tiny pale body text;
- metric values must have labels and interpretation;
- do not use negative letter spacing for normal text;
- keep line length readable, especially in expert/narrative sections.

## Layout System

Desktop content width:

- default: `1160px`;
- wide product/dashboard sections: up to `1240px`;
- reading/narrative sections: `680-760px`.

Spacing:

- base rhythm: 4/8px;
- section spacing: 64-96px;
- dense dashboard spacing: 20-32px inside groups;
- mobile section spacing: 44-64px.

Grid behavior:

- personal sections may use 1-2 columns;
- product sections may use 2-3 columns on desktop;
- mobile should stack intentionally;
- cards must not become squeezed columns.

Grouping rule:

> Every section should show what belongs together and what decision follows.

Use:

- full-width section bands;
- clear internal containers;
- purposeful cards;
- priority order;
- visual hierarchy before decoration.

Avoid:

- cards inside cards unless the inner item is a real metric/form/repeated item;
- decorative card grids;
- sections that all have the same visual weight;
- centered text everywhere.

## Radius And Shape

The visual system should feel soft but not childish.

Recommended tokens:

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `10px` | fields, small chips |
| `--radius-md` | `16px` | cards, form groups |
| `--radius-lg` | `24px` | large panels |
| `--radius-xl` | `32px` | hero/report containers only |
| `--radius-pill` | `999px` | buttons, chips, progress labels |

Rules:

- large radii are allowed for warm consulting panels;
- repeated cards should usually stay at `16-24px`;
- do not invent one-off radius values;
- avoid overly bubbly UI unless it is a small chip/button.

## Shadows And Depth

Use shadows sparingly. The brand should feel premium through structure and spacing, not heavy effects.

Recommended tokens:

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-soft` | `0 14px 36px rgba(34, 39, 31, .08)` | hover or lifted secondary panels |
| `--shadow-card` | `0 12px 34px rgba(34, 39, 31, .045)` | subtle dashboard cards |
| `--shadow-strong` | `0 28px 70px rgba(18, 63, 50, .16)` | major offer/report panel only |

Rules:

- default cards may use border only;
- shadow should indicate importance or interaction;
- do not use many different shadow recipes;
- no glowing AI-style effects.

## Components

### Buttons

Primary:

- dark premium background;
- white text;
- action copy names the user's next useful step.

Good button copy:

- "Найти, где теряются записи";
- "Получить карту решений";
- "Разобрать путь клиента";
- "Посмотреть, что исправить первым";
- "Обсудить систему".

Avoid:

- "Отправить";
- "Получить результат" without context;
- "Забрать";
- "Хочу больше заявок";
- several competing primary buttons in one view.

Secondary:

- outline or soft surface;
- used for Telegram, case link, details, lower-commitment action.

### Cards And Panels

A card is allowed only when it has a job:

- metric;
- audit point;
- priority;
- offer level;
- form group;
- case proof;
- state message.

Each card should answer at least one:

- what is happening;
- why it matters;
- what to do next;
- what proof supports this.

### Metrics

Metric blocks must include:

- number;
- label;
- interpretation;
- source or context when needed.

Good:

> 39% нажимают "Записаться" - сайт ведет к действию, а не просто показывает услуги.

Bad:

> 39%

### Diagnostic Results

Result screens should show:

- short diagnosis;
- priority level;
- top leaks;
- what they cost or risk;
- next step;
- offer that follows logically.

Do not show:

- empty result cards before input;
- fake precision;
- scary numbers without explanation;
- paid offer before the user sees useful value.

### Offer Panels

Offer panels should feel like the next rational step, not a pressure block.

Required elements:

- who it is for;
- what uncertainty it reduces;
- what the user gets;
- what decision becomes easier after it;
- price or price range where appropriate;
- calm CTA.

### Forms

Forms should feel like a continuation of the diagnostic.

Rules:

- labels are clear;
- placeholders are useful but not required for comprehension;
- required fields are obvious;
- success/error states are visible;
- consent text is calm and readable;
- no sudden change into aggressive lead capture.

## Imagery And Proof

Strongest proof, according to Maria:

1. Experience inside service businesses.
2. Cases with numbers.

Visual proof should prioritize:

- case screenshots;
- analytics screenshots;
- before/after path diagrams;
- service-business process details;
- simple annotated report fragments;
- real work artifacts where appropriate.

Use portraits carefully:

- a portrait can support trust on personal sections;
- it should not replace business proof;
- avoid stock-like posing and overly decorative beauty imagery.

Avoid:

- generic laptop mockups;
- stock photos of salons without meaning;
- abstract AI illustrations;
- decorative icons in every block;
- blurry atmospheric backgrounds where the user needs clarity.

## Hero Rules

The first screen must start from the client's business problem and next action.

It should communicate:

- what kind of business this is for;
- what leak/problem Maria helps find;
- what system closes it;
- why Maria can see it;
- what to do next.

Approved hero direction:

> Записи теряются не только в рекламе. Часто клиент уже заинтересовался, но не понял услугу, цену, мастера или следующий шаг.

Possible hero headline directions:

- "Найдите, где на пути к записи теряются клиенты";
- "Сайт, аналитика и AI, которые закрывают утечки до записи";
- "Помогаю beauty и wellness-бизнесам находить и закрывать утечки в записи";
- "Не просто сайт. Система, которая объясняет услугу и ведет к записи".

Do not:

- start with "я делаю красивые сайты";
- start with a zero-value calculator;
- show internal funnel terms before the user understands value;
- make the first screen only about Maria.

## Copy And Tone On Screens

Tone:

- calm;
- alive;
- professional;
- simple;
- analytical;
- lightly ironic when natural;
- without aggressive sales pressure.

Preferred language:

- "где теряются записи";
- "путь клиента до записи";
- "что человек понимает в первые секунды";
- "что мешает выбрать услугу";
- "какой следующий шаг логичен";
- "система";
- "карта решений";
- "разбор";
- "утечки";
- "заявка/запись";
- "администратор";
- "мастер";
- "цены";
- "доверие".

Avoid:

- "продающий продающий";
- "волшебная автоматизация";
- "гарантированный рост";
- "закрываем боли";
- "секретная схема";
- "просто красиво";
- "AI сделает все за вас".

## Product Ladder Visual Logic

The ladder should not be shown as a rigid staircase if it makes the page feel mechanical.

Accepted logic:

1. Free diagnostic or useful tool.
2. Paid audit/review/solution map.
3. Any full product that fits the client's request after the audit.

Full product examples:

- site-funnel;
- AI administrator;
- Telegram bot;
- mini-app;
- client cabinet;
- analytics setup;
- automation system;
- custom website/system package.

Visual rule:

> Show the ladder as "levels of certainty" or "next logical steps", not as a forced upsell path.

## Page-Level Direction

### Main Landing

Mode:

- personal expert mode with product structure.

Should prove:

- Maria understands service business from the inside;
- she sees where bookings leak;
- she can connect site, analytics, and AI into a working system.

Primary proof:

- experience inside service businesses;
- 1-2 strong cases with numbers.

Primary CTA:

- find where bookings are leaking;
- start with a diagnostic/review.

### Diagnostic Page

Mode:

- smart tool mode.

Should feel:

- like a preliminary report;
- useful before payment;
- precise enough to trust;
- not like a toy quiz.

### Paid Audit / Solution Map

Mode:

- smart tool + consulting offer.

Should sell:

- reduced uncertainty;
- clear priority;
- what to fix first;
- what full product is actually needed.

### Full Product Pages

Mode:

- depends on product, but product dashboard mode is primary.

Should show:

- business problem;
- system architecture in simple words;
- what changes for owner/admin/client;
- proof;
- scope;
- next step.

## Accessibility And Practical Quality

Minimum standard:

- readable contrast;
- no pale body text;
- large enough tap targets;
- clear focus states;
- labels for form fields;
- useful alt text for proof images;
- no horizontal overflow on mobile;
- result states that are understandable without color alone.

## Visual QA Questions

Before accepting a page, ask:

1. Does this look like a mix of personal expert and smart tool?
2. Is the business problem clear in 3 seconds?
3. Is the next useful action obvious?
4. Is there proof from experience or numbers?
5. Are cards helping a decision, or just decorating the page?
6. Does the page avoid cheap quiz, generic SaaS, and beauty-template signals?
7. Are colors taken from the brand tokens?
8. Do metrics have interpretation?
9. Does mobile feel designed, not squeezed?
10. Would a service-business owner trust this enough to take the next step?

## Implementation Rule

Before redesigning a full page, create one reference section first:

- hero;
- diagnostic result;
- case proof block;
- offer panel.

Approve the visual logic there, then expand.

Do not build many disconnected sections and polish later.
