# Design System

## Source Of Truth

The source of truth for visual mood is `docs/visual-direction.md`.

This file translates that direction into practical design rules, tokens, component behavior, and implementation constraints.

The visual concept is:

> Premium consulting + light dashboard.

The interface must feel like a premium consulting brand for beauty and wellness businesses: editorial, calm, structured, high-trust, and intelligent.

## 1. Color Palette

Use a limited palette. The page should not feel colorful. Main visual contrast comes from typography, whitespace, rhythm, and hierarchy, not saturation.

### Base

| Role | Direction | Suggested token |
| --- | --- | --- |
| Background | warm ivory / milk | `--color-bg: #f7f1e7` |
| Soft background | lighter editorial ivory | `--color-bg-soft: #fbf7ef` |
| Surface | soft white | `--color-surface: #fffdf8` |
| Muted surface | warm secondary surface | `--color-surface-muted: #efe8dc` |
| Primary text | deep charcoal / near-black | `--color-ink: #151511` |
| Secondary text | muted gray-green / warm gray | `--color-muted: #67635b` |
| Light text | labels and captions | `--color-muted-light: #969086` |

### Accent

| Role | Direction | Suggested token |
| --- | --- | --- |
| Accent 1 | soft lilac | `--color-lilac: #e8dff2` |
| Accent 1 text | muted plum | `--color-lilac-ink: #4d405d` |
| Accent 2 | pale butter yellow | `--color-butter: #f4e7b8` |
| Accent 2 text | muted ochre | `--color-butter-ink: #5f4d1d` |
| Accent 3 | soft lavender linework | `--color-line-lavender: #ddd4e8` |
| CTA | deep black-green or deep charcoal | `--color-cta: #151b17` |
| CTA hover | slightly warmer/darker | `--color-cta-hover: #22241e` |

### Borders And Lines

| Role | Direction | Suggested token |
| --- | --- | --- |
| Hairline border | very light gray-lilac | `--color-line: #ded7ca` |
| Grid line | subtle, soft, low contrast | `--color-grid: rgba(81, 73, 91, .12)` |
| Strong line | stronger separator only | `--color-line-strong: #cfc4b4` |

### Usage Rules

- Use accent colors sparingly.
- Never make the page colorful.
- Accents belong in cards, thin lines, small labels, and quiet emphasis.
- Main visual contrast comes from typography and spacing, not saturation.
- Lilac should feel editorial and intelligent, not purple SaaS.
- Butter should feel warm and strategic, not yellow warning.
- Avoid harsh red/yellow warning blocks. Use risk colors softly and explain the meaning in text.
- Do not introduce random blues, bright gradients, neon AI colors, or one-off accent colors without updating this file.

## 2. Typography

Typography is the main luxury signal.

### Headlines

Use an elegant high-contrast serif for large headlines and major section titles.

Characteristics:

- refined;
- high-end editorial;
- dramatic but clean;
- suitable for premium consulting;
- readable in Cyrillic;
- not fashion-magazine decorative for its own sake.

Suggested direction:

- primary display: `Cormorant Garamond`, `Lora`, `Playfair Display`, or another elegant serif with strong Cyrillic support;
- fallback display: Georgia, `"Times New Roman"`, serif.

### UI / Body Text

Use a clean, modern sans-serif for:

- navigation;
- buttons;
- labels;
- paragraphs;
- metadata;
- UI cards;
- form fields;
- diagnostic controls.

Suggested direction:

- body/UI: `Manrope`, `IBM Plex Sans`, `Inter`, or another clean sans-serif with strong Cyrillic support;
- fallback UI: `"Segoe UI"`, `"Helvetica Neue"`, Arial, sans-serif.

### Typography Rules

- Hero headline is the strongest visual element.
- Section headings must be smaller than hero and calmer.
- Avoid too many huge headings throughout the page.
- Paragraphs must be airy and readable.
- Small uppercase labels can be used for category tags and section labels.
- Body text must not be too small or too pale.
- Metric values may use display serif or strong numeric styling.
- Metrics must always have labels and interpretation.
- Do not use negative letter spacing for normal text.
- Keep reading sections around `680-760px` wide.

## 3. Layout

### Container

- Max width: `1320-1400px` for the main page shell and hero compositions.
- Use `1160-1240px` for standard content sections.
- Use `680-760px` for reading/editorial text blocks.
- Keep strong outer margins on desktop.
- Mobile must be intentionally designed, not a squeezed desktop.

### Grid

- Hero may use an asymmetrical editorial layout.
- Internal sections should use a clean modular grid.
- Avoid cramped 3-column card grids unless highly curated.
- Product/diagnostic sections may use dashboard grids when each card has a clear job.
- Cards must not become narrow columns with cramped text.

### Spacing

- Use a consistent 4/8px spacing scale.
- Prefer generous spacing.
- Large section spacing: `72-112px` on desktop.
- Standard internal group spacing: `24-40px`.
- Dense dashboard groups may use `16-24px`, but grouping must remain clear.
- Mobile section spacing: `48-72px`.
- No visually crowded sections.

### Layout Rules

- Air and restraint over density.
- Every section needs a clear visual center of gravity.
- Avoid centering everything.
- Use full-width bands or unframed layouts for major page sections.
- Avoid cards inside cards unless the inner element is a true metric, field group, repeated item, or state.

## 4. Components

Every new section must be assembled from reusable visual patterns. Do not invent a new visual style per section.

### Buttons

Main CTA:

- dark pill button;
- deep charcoal / black-green background;
- soft ivory or white text;
- generous horizontal padding;
- premium, calm, not app-like;
- action copy names the user's next useful step.

Good main CTA copy:

- "Найти, где теряются записи";
- "Разобрать путь клиента";
- "Посмотреть, что исправить первым";
- "Получить карту решений";
- "Обсудить систему".

Secondary CTA:

- quiet outlined button;
- text button;
- soft surface button;
- used for Telegram, details, cases, or lower-commitment actions.

Button rules:

- Do not place several competing primary buttons in one view.
- Avoid generic copy such as "Отправить" when a more specific action is possible.
- Buttons should feel premium, not app-like.
- Hover/focus states must be visible and calm.

### Navigation

Navigation should be:

- clean;
- minimal;
- premium;
- spacious;
- visually quiet.

Rules:

- Thin separators are allowed.
- Large whitespace around nav items is preferred.
- Navigation must not dominate standalone funnel pages.
- Do not add navigation to standalone funnel pages unless explicitly requested.

### Cards

Card types:

1. Hero insight cards.
2. Diagnostic cards.
3. Priority cards.
4. Case cards.
5. Metric cards.
6. CTA utility cards.

Rules:

- Cards may use lilac or butter backgrounds selectively.
- Cards need large radius, usually `24-32px`.
- Borders should be subtle.
- No heavy shadow stacks.
- Default card depth should come from border, surface, and spacing.
- Content inside cards should be minimal and well-structured.
- Cards must feel curated, not generic.
- A card must answer at least one: what is happening, why it matters, what to check, what to do next, or what proof supports this.

### Hero Insight Cards

Use for:

- short strategic observations;
- first-screen proof;
- light dashboard hints;
- compact route/path summaries.

Rules:

- 1-3 cards maximum in a hero.
- Use short copy.
- Avoid turning hero into a dense dashboard.
- Accent cards must support the message, not decorate the screen.

### Diagnostic Cards

Diagnostic cards must feel like mini-audit blocks.

Each card should contain:

- number;
- category;
- title;
- short issue description;
- "what to check";
- scoring controls.

Rules:

- No side panel.
- No raw form look.
- No cramped control groups.
- Controls should be visually calm and tappable.
- The card should read like an expert audit point, not like a quiz question.
- Each score must be understandable without relying on color alone.

### Priority Cards

Use for:

- top leaks;
- what to fix first;
- risk/impact order;
- next recommended action.

Rules:

- Priority must be obvious.
- Explain why this is first.
- Do not use harsh warning colors.
- Use soft signal dots, labels, or linework for status.

### Case Cards

Use for:

- proof with business context;
- numbers;
- before/after path;
- analytics screenshots.

Rules:

- Lead with the business situation, not only a website screenshot.
- Show numbers with interpretation.
- Avoid generic portfolio-card styling.
- Case cards should feel like evidence in a consulting report.

### Metric Cards

Metric cards must include:

- large number;
- label;
- short interpretation;
- source or context when needed.

Good:

> 39% нажимают "Записаться" - сайт ведет к действию, а не просто показывает услуги.

Bad:

> 39%

### CTA Utility Cards

Use for:

- soft next step;
- diagnostic continuation;
- offer summary;
- "what happens after this" explanation.

Rules:

- CTA cards should feel useful before they sell.
- The commercial step must follow naturally from the value already shown.
- Do not use aggressive urgency.

### Dashboard Result Block

Should feel like a premium summary, not a calculator.

Use:

- large number;
- supporting labels;
- subtle status indicators;
- structured hierarchy;
- result interpretation;
- next useful step.

Rules:

- No empty `0 ₽`, `0 баллов`, or meaningless placeholder result on first screen.
- Do not use fake precision.
- Do not show scary numbers without explanation.
- Data-like visuals should feel light and editorial, not technical-heavy.

## 5. Graphic Language

Use:

- thin line diagrams;
- subtle chart-like abstractions;
- soft signal dots;
- simple route/path visuals;
- curved line compositions;
- quiet grid lines;
- minimal but intentional data visualization.

Do not use:

- random infographic clutter;
- bright charts;
- dense tables;
- clipart-like icons;
- icon packs used decoratively;
- stock illustration style;
- lashes, flowers, sparkles, glossy feminine tropes;
- abstract AI graphics that do not explain anything.

Graphic rules:

- Every visual element must have a role.
- Use graphic clarity, not decorative noise.
- Sparse use of illustration is allowed only when it supports trust, explanation, or navigation.
- Diagrams should simplify the client path, not show internal funnel mechanics too early.

## 6. Form Style

Forms must feel editorial and premium.

Use:

- large clear fields;
- strong spacing;
- calm labels;
- readable helper text;
- visible success/error states;
- clear but non-aggressive CTA;
- consent text that does not feel hidden.

Avoid:

- dense admin-panel feel;
- raw form look;
- cramped control groups;
- tiny labels;
- sudden aggressive lead capture;
- surprise tone shift after a useful diagnostic.

Form rules:

- Forms should feel like a continuation of the diagnostic or consultation flow.
- Place only necessary fields.
- Keep labels understandable without relying on placeholders.
- Error states should explain how to fix the issue.

## 7. Consistency Rule

Every new section must be assembled from reusable visual patterns.

Do not invent a new visual style per section.

Before adding a new pattern, check whether it can be built from:

- section head;
- editorial text block;
- hero insight card;
- diagnostic card;
- priority card;
- case card;
- metric card;
- CTA utility card;
- form group;
- dashboard result block.

If a new reusable pattern is truly needed, document:

- purpose;
- when to use it;
- when not to use it;
- visual rules;
- content rules;
- mobile behavior;
- states.

## 8. Forbidden

Do not use:

- temporary UI;
- inline styles for normal interface work;
- random colors outside tokens;
- random radius values without a system;
- random shadows without a system;
- generic SaaS cards everywhere;
- blue startup colors;
- random gradients;
- heavy shadows;
- small cramped text;
- decorative icon packs;
- harsh red/yellow warning colors;
- stock illustration style;
- overly rounded cute UI;
- dense layouts with little whitespace;
- beauty cliches like lashes, flowers, sparkles, glossy feminine tropes;
- hero sections that look like stock landing pages instead of a premium expert product.

## 9. Page Rules

### Homepage

The homepage is the visual source for the rest of the public site.

It should use:

- a premium nav or clean top band;
- large editorial serif hero typography;
- warm ivory shell;
- thin grid lines;
- right-side light analytical card cluster;
- dark premium pill CTA;
- proof row;
- curated sections with clear whitespace.

The homepage must not become:

- a generic portfolio;
- a decorative beauty promo;
- a dense dashboard;
- an infoproduct landing page.

### Internal Pages

Internal pages should feel quieter than the homepage but visually related to it.

Use:

- serif page titles;
- clean sans-serif text;
- modular sections;
- curated cards;
- thin line dividers;
- occasional lilac/butter accent cards;
- clear CTA utility cards.

Do not create a separate visual style per internal page.

### Diagnostic Sections

Diagnostic sections should feel like premium mini-audits.

Use:

- diagnostic cards;
- calm scoring controls;
- dashboard result blocks;
- priority cards;
- light chart/path visuals;
- soft signal dots;
- clear next-step CTA.

Avoid:

- side-panel form layouts;
- raw form look;
- cramped controls;
- quiz-like styling;
- empty calculator placeholders;
- harsh warning colors.

## 10. Motion

Motion is a quiet orientation layer, not decoration. Use it only to clarify
hierarchy, response, or a change of state.

- Keep interface feedback at `160ms`; a section entrance must stay within `280ms`.
- Use one calm decelerating easing curve: `cubic-bezier(.22, 1, .36, 1)`.
- Reveal a section once as it enters the viewport; do not loop or animate every
  element independently.
- Buttons and interactive cards may lift by 1–3px on hover. Do not use bounce,
  elastic motion, autoplaying decorative effects, or animations for frequent actions.
- Motion must be progressive enhancement: content remains visible without
  JavaScript and fully respects `prefers-reduced-motion: reduce`.
