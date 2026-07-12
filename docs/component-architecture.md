# Component Architecture

## Purpose

This document proposes the reusable component architecture for rebuilding the website around the approved visual direction:

> Premium consulting + light dashboard.

No page should be built as a one-off composition. Every section should be assembled from reusable visual patterns that can support the homepage, internal pages, diagnostic flows, offers, and future AI/analytics products.

## Architecture Principles

1. Start with section purpose, not layout decoration.
2. Reuse tokens and components from `docs/design-system.md`.
3. Keep the approved hero reference as the visual anchor.
4. Separate editorial consulting sections from diagnostic/dashboard sections, but make both feel like one system.
5. Extend the system before adding a new one-off style.
6. Each component must define purpose, visual role, content rules, states, and mobile behavior.

## Global Shell Components

### 1. Site Shell

Purpose:

- creates the premium ivory canvas;
- controls page width, outer margins, and global background.

Visual role:

- warm ivory / milk background;
- no noisy decoration;
- optional thin outer shell/border on high-impact pages.

Used on:

- homepage;
- internal pages;
- product pages;
- diagnostic landing.

### 2. Grid Shell

Purpose:

- gives the site the approved reference structure.

Visual role:

- thin lavender-gray grid lines;
- large rounded outer boundary on hero/reference sections;
- horizontal navigation divider;
- subtle vertical separators where useful.

Used on:

- homepage hero;
- major product hero;
- diagnostic hero;
- premium report/result sections.

Do not use:

- on every small section;
- as decorative clutter;
- when it makes mobile cramped.

### 3. Container

Types:

- `container-wide`: 1320-1400px for hero and large editorial systems;
- `container-standard`: 1160-1240px for most sections;
- `container-reading`: 680-760px for text-led explanations.

Mobile behavior:

- strong side padding;
- no horizontal overflow;
- preserve air even when stacked.

## Navigation Components

### 1. Premium Nav

Purpose:

- quiet trust and orientation.

Visual role:

- minimal top nav;
- logo/wordmark area;
- clean sans-serif links;
- dark pill CTA;
- thin separator lines.

Rules:

- large whitespace around nav items;
- nav should not compete with hero;
- do not use on standalone funnel pages unless explicitly requested.

### 2. Funnel Minimal Nav

Purpose:

- lightweight orientation on standalone flows.

Visual role:

- optional logo/back link;
- no full marketing navigation;
- no distraction from the diagnostic/action.

Used on:

- `/audit/`;
- paid audit/solution map pages;
- future tool pages.

## Hero Components

### 1. Editorial Hero

Purpose:

- main homepage / offer entry.

Required structure:

- label or brand line;
- large serif headline;
- short explanatory copy;
- primary dark pill CTA;
- optional secondary text CTA;
- proof row;
- light analytical visual cluster.

Visual rules:

- headline is the strongest visual element;
- left side is editorial and spacious;
- right side contains curated cards or analytical visuals;
- background stays ivory and calm;
- grid lines can structure the hero.

### 2. Hero Analytical Cluster

Purpose:

- shows "smart tool" capability without becoming a dashboard.

Possible cards:

- leak map card;
- client path card;
- growth priorities card;
- metric or proof card.

Visual rules:

- 2-4 cards maximum;
- overlap can be used intentionally;
- lilac/butter cards are allowed;
- use simple line charts, route visuals, and signal dots;
- no dense tables or bright charts.

### 3. Proof Row

Purpose:

- gives quick credibility and expectation setting.

Content examples:

- `15-20 минут`;
- `2-3 главные точки потерь`;
- `beauty / wellness`;
- `с конкретикой и примерами`;
- `для салонов и клиник`.

Visual rules:

- small signal dots;
- calm labels;
- thin vertical separators on desktop;
- stack cleanly on mobile.

## Section Components

### 1. Section Head

Purpose:

- introduces a section with editorial clarity.

Structure:

- small uppercase label;
- serif or calm heading;
- short explanatory paragraph.

Rules:

- section heading must be smaller than hero;
- avoid long abstract headings;
- align with the section's decision/action.

### 2. Editorial Text Block

Purpose:

- explains Maria's method, positioning, or service-business experience.

Visual role:

- narrow reading width;
- generous line height;
- restrained emphasis;
- optional thin line or accent note.

### 3. Insight Card

Purpose:

- short strategic observation.

Use for:

- "where bookings leak";
- "what the owner usually misses";
- "what the site must clarify";
- "what AI should and should not do".

Rules:

- concise copy;
- no generic card grids;
- accent background only when it clarifies priority or category.

### 4. Path / Route Visual

Purpose:

- explains the client journey from interest to booking.

Visual role:

- thin route lines;
- signal dots;
- minimal step labels;
- curved line compositions.

Do not:

- show internal funnel mechanics too early;
- create busy infographics.

## Diagnostic Components

### 1. Diagnostic Card

Purpose:

- mini-audit block.

Required content:

- number;
- category;
- title;
- short issue description;
- "what to check";
- scoring controls.

States:

- unanswered;
- selected;
- needs attention;
- complete;
- error if required data is missing.

Mobile behavior:

- full-width stacked cards;
- controls remain tappable;
- no cramped side panels.

### 2. Diagnostic Progress

Purpose:

- show where the user is in the flow without gamifying it.

Visual role:

- thin line;
- small signal dots;
- calm labels;
- no loud progress bars.

### 3. Dashboard Result Block

Purpose:

- premium summary of diagnostic result.

Required content:

- large number or score;
- status label;
- explanation of what the number means;
- top leaks;
- next useful step.

Rules:

- never show zero-value placeholders before interaction;
- no fake precision;
- no harsh warning visuals;
- result must explain the decision, not just display a number.

### 4. Priority Card

Purpose:

- show what to fix first.

Required content:

- priority number;
- leak category;
- why it matters;
- what to check;
- recommended next step.

Visual role:

- soft signal indicators;
- optional butter accent for priority;
- calm risk language.

## Proof Components

### 1. Case Card

Purpose:

- prove capability through business result.

Required content:

- business context;
- what was confusing/broken before;
- what changed;
- number with interpretation;
- proof source if relevant;
- link or screenshot.

Visual role:

- evidence in a consulting report, not portfolio decoration.

### 2. Metric Card

Purpose:

- highlight one meaningful number.

Required content:

- metric;
- label;
- interpretation;
- source/context.

### 3. Experience Proof Block

Purpose:

- show Maria's service-business experience from inside.

Use for:

- admin/manager experience;
- client path understanding;
- beauty/wellness context;
- common owner/admin/client friction.

Visual role:

- editorial text + small proof markers;
- not a decorative biography block.

## Offer Components

### 1. Offer Panel

Purpose:

- present the next logical commercial step.

Required content:

- who it is for;
- what uncertainty it reduces;
- what the user gets;
- what decision becomes easier;
- price/range if relevant;
- calm CTA.

### 2. Product Ladder Block

Purpose:

- show possible next steps after diagnostic/audit.

Rules:

- do not show a forced upsell staircase;
- frame as levels of clarity or solution depth;
- after paid audit, any full product may fit the client request.

Possible product cards:

- site-funnel;
- AI administrator;
- Telegram bot;
- mini-app;
- client cabinet;
- analytics setup;
- automation system;
- custom system.

## Form Components

### 1. Premium Form Group

Purpose:

- collect only necessary data without breaking the premium mood.

Rules:

- large clear fields;
- calm labels;
- spacious groups;
- visible success/error states;
- no raw admin-panel look.

### 2. Consent Row

Purpose:

- legal clarity without visual clutter.

Rules:

- readable text;
- quiet placement;
- no tiny hidden consent.

### 3. Success State

Purpose:

- confirm the next step.

Required content:

- what happened;
- what happens next;
- expected timing;
- fallback contact if needed.

## Page Architecture

### Homepage

Recommended order:

1. Premium nav + editorial hero + analytical cluster.
2. Proof row / quick expectations.
3. Problem section: where bookings leak.
4. Method section: how Maria diagnoses and closes leaks.
5. Experience proof block.
6. Cases with numbers.
7. Diagnostic / audit entry.
8. Product ladder / possible solutions.
9. Soft final CTA.

Primary components:

- Editorial Hero;
- Hero Analytical Cluster;
- Proof Row;
- Insight Cards;
- Path / Route Visual;
- Experience Proof Block;
- Case Cards;
- Offer Panel.

### Internal Pages

Recommended structure:

1. Simple editorial page hero.
2. Section head.
3. Content/proof blocks.
4. Relevant CTA utility card.

Internal pages must feel like a quieter extension of the homepage hero, not a new site.

### Diagnostic Page

Recommended structure:

1. Minimal funnel nav or no nav.
2. Diagnostic hero with report framing.
3. Business input section.
4. Diagnostic cards.
5. Dashboard result block.
6. Priority cards.
7. Offer panel / solution map.
8. Soft consultation block.

Primary components:

- Diagnostic Card;
- Diagnostic Progress;
- Dashboard Result Block;
- Priority Card;
- Offer Panel;
- Premium Form Group.

## Implementation Sequence For Future Work

When implementation begins:

1. Define shared CSS tokens.
2. Build the homepage hero as the reference section.
3. Extract reusable components from the hero.
4. Apply components to one diagnostic section.
5. Run visual QA on desktop and mobile.
6. Only then expand to the rest of the homepage.

Do not rebuild the whole site before the reference hero section passes visual QA.
