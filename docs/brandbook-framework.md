# Brandbook Framework

## Purpose

This document defines how to build and use Maria Zolotukhina's brandbook for web products, funnel pages, diagnostics, offers, and future AI/analytics tools.

The brandbook is not a decorative PDF. It is a working system for making product, copy, visual, and implementation decisions consistently.

## Research Sources

- Nielsen Norman Group, "Design Systems 101": design systems are standards for reusable components and patterns, with a style guide, component library, pattern library, and ongoing maintenance. Source: https://www.nngroup.com/articles/design-systems-101/
- U.S. Web Design System, "Design tokens": tokens reduce arbitrary choices by giving teams a limited set of named values for visual design. Source: https://designsystem.digital.gov/design-tokens/
- Carbon Design System, "Content": product content should help people use the product, and voice should remain recognizable while tone adapts to context. Source: https://carbondesignsystem.com/guidelines/content/overview/
- W3C WAI, "WCAG 2 Overview" and "Accessibility Principles": web products should follow accessibility principles around perceivable, operable, understandable, and robust interfaces. Sources: https://www.w3.org/WAI/standards-guidelines/wcag/ and https://www.w3.org/WAI/fundamentals/accessibility-principles/
- GOV.UK content guidance: content should be written to user needs, clear structure, clear language, effective links, and the right tone. Source: https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/
- Lamine and Cheng, "Understanding and Supporting the Design Systems Practice": design systems need to capture stable design knowledge while staying flexible for concrete products; bottom-up evolution from real components is valuable. Source: https://arxiv.org/abs/2205.10713

## Main Research Conclusions

1. A useful brandbook for a web product has three layers:
   - brand strategy: who Maria is, who she serves, what she sells, what she refuses to be;
   - product design system: tokens, components, page patterns, interaction states, accessibility, analytics rules;
   - content system: voice, offers, CTAs, proof, objections, page section logic.

2. A personal expert brand cannot be separated from the product interface.
   Maria's site should not look like a generic SaaS dashboard or a decorative beauty landing page. It should feel like a calm expert system that helps a service-business owner understand the path to booking.

3. A brandbook should be used as a decision filter.
   It should answer: "Does this screen make the business decision clearer?", "Does this sound like Maria?", "Does this component already exist?", "Does this visual choice support trust and clarity?"

4. Tokens matter more than moodboards.
   Colors, spacing, type, radius, shadow, surfaces, borders, data states, and CTA styles need named rules in CSS and docs. Random visual choices create inconsistency quickly.

5. Components need usage rules, not just styles.
   A button, dashboard card, result block, audit point, offer panel, priority list, form, and diagnostic state should each have: when to use, when not to use, content requirements, states, and mobile behavior.

6. The system should evolve from real pages.
   Start with one reference product page or section, extract stable rules, then reuse. Do not design a huge abstract brandbook before testing it on the landing and funnel pages.

## Brand Position For Web

Maria's web brand should be built around this working idea:

> Site, analytics, and AI as a clear client path to booking for service businesses.

The interface should communicate:

- business clarity, not decorative design;
- service-business experience, not generic marketing theory;
- calm premium usefulness, not pressure;
- analytics and decisions, not vague promises;
- AI as a system amplifier, not magic;
- a human expert behind the system, not a faceless SaaS product.

## Brand Pillars

### 1. Client Path Before Page Beauty

Every screen should help a business owner see where the client gets clarity, trust, choice, and booking.

Use:

- path to booking;
- client understands;
- what blocks the decision;
- where the request leaks;
- what to fix first.

Avoid:

- "just beautiful";
- "selling design";
- "guaranteed leads";
- "magic automation".

### 2. Consulting Dashboard, Not Quiz

Diagnostics and tools should feel like decision support.

Use:

- report framing;
- metric explanation;
- priority levels;
- next useful step;
- result interpretation.

Avoid:

- toy quiz language;
- empty zero-value calculators on first screen;
- decorative score blocks without meaning;
- gamified urgency.

### 3. Warm Expert, Not Cold Enterprise

Maria's personal brand can be alive and human, but the interface must stay business-like.

Use:

- warm ivory / milk backgrounds;
- dark premium CTA pills;
- soft lilac and pale butter accent cards;
- thin grid lines;
- elegant editorial serif headlines;
- restrained typography;
- real cases, numbers, screenshots, and explanations.

Avoid:

- generic blue SaaS;
- bright gradients;
- beauty-salon pink visual language;
- stock-photo softness without business proof.

### 4. AI With Boundaries

AI should be explained as part of the system.

Use:

- "helps reduce repeated admin work";
- "makes the path clearer";
- "supports response consistency";
- "strengthens a process that is already understood".

Avoid:

- "AI will replace everything";
- "instant automation";
- "guaranteed growth";
- unclear AI features that do not affect the client's decision or booking.

## Recommended Brandbook Structure

### 1. Strategy

File: `docs/product-brief.md`

Should contain:

- audience;
- business role of the site;
- product ladder;
- current funnel;
- offer hierarchy;
- proof and cases;
- red flags and non-clients.

### 2. Brand Position And Voice

Recommended future file: `docs/brand-voice.md`

Should contain:

- core positioning;
- one-line description;
- expanded description;
- preferred and banned phrases;
- tone rules;
- CTA rules;
- claims Maria can and cannot make;
- examples of good and bad copy.

### 3. Visual System

File: `docs/design-system.md`

Should contain:

- brand feeling;
- color tokens;
- typography;
- spacing;
- radii;
- shadows;
- surfaces;
- lines;
- icon/image rules;
- accessibility requirements.

### 4. Product Components

Recommended future file: `docs/components.md`

Should document:

- buttons;
- fields;
- section heads;
- dashboard cards;
- metric cards;
- audit cards;
- priority list items;
- result panels;
- offer panels;
- consent rows;
- empty/loading/error/success states.

Each component should include:

- purpose;
- when to use;
- when not to use;
- content rules;
- visual rules;
- states;
- mobile behavior;
- current CSS selectors.

### 5. Page And Funnel Patterns

Recommended future file: `docs/page-patterns.md`

Should define reusable page structures:

- main personal landing;
- diagnostic page;
- solution map offer;
- paid audit offer;
- site-funnel offer;
- AI automation offer;
- case page;
- article/post landing.

Each page pattern should include:

1. screen goal;
2. user decision;
3. required proof;
4. CTA logic;
5. section order;
6. required states;
7. analytics events.

### 6. Visual QA

File: `docs/visual-qa-checklist.md`

Should stay practical and be updated after real issues appear in implementation.

## How To Use This In Future Work

Before creating or changing a page:

1. Read `docs/product-brief.md`, `docs/brandbook-framework.md`, `docs/design-system.md`, `docs/ui-principles.md`, and `docs/visual-qa-checklist.md`.
2. Define the screen goal and the user's decision.
3. Choose the page pattern.
4. Reuse existing tokens and components.
5. Write the section copy in Maria's voice.
6. Implement one strong reference section first for major new flows.
7. Review against the success criteria.
8. Run visual QA on desktop and mobile when practical.
9. If a new reusable pattern appears, document it before reusing it elsewhere.

## Immediate Gap In Current Site

The project currently has two visual directions:

- current main landing: warmer personal landing with terracotta accent and larger rounded elements;
- approved future system: premium consulting + light dashboard, based on the new hero reference with ivory background, editorial serif typography, lilac/butter cards, thin grid lines, and dark pill CTAs.

The next brandbook step should move the site toward one shared visual system with two expression modes:

- personal editorial mode for author-led and case sections;
- light dashboard mode for funnel tools, diagnostics, audits, and product explanations.

Recommendation: rebuild from the approved homepage hero as the reference section, then extract reusable components before expanding to other pages.

## Definition Of Done For The Brandbook

The brandbook is usable when:

- a new page can be designed without inventing a new visual style;
- copy decisions can be checked against voice rules;
- colors, spacing, radii, shadows, and typography exist as named tokens;
- components have usage rules and states;
- funnel pages have page patterns and CTA logic;
- mobile behavior is defined before implementation;
- accessibility and analytics are part of the page spec;
- future agents can read the docs and produce consistent work.
