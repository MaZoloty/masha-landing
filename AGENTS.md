# Project Agent Rules

This project is Maria Zolotukhina's personal site and funnel system. Treat every public page as a trust-building business interface, not as a rough MVP.

## Required Context

Before changing or creating any UI, read:

- `PRODUCT.md` — strategic summary (register, users, positioning, belief ladder)
- `DESIGN.md` — visual system summary (tokens, typography, layout, motion)
- `docs/product-brief.md`
- `docs/brandbook-framework.md`
- `docs/visual-direction.md`
- `docs/visual-brandbook.md`
- `docs/design-system.md`
- `docs/component-architecture.md`
- `docs/ui-principles.md`
- `docs/visual-qa-checklist.md`


If the change touches only backend logic, still preserve the visual contracts in these files.

## Design Skills

Installed in `.claude/skills/` and `.agents/skills/` (shared by Claude Code and Codex). Use them in this order for UI work:

1. `impeccable` — design language, audits, polish, anti-slop detection. Commands: `/impeccable polish <section>`, `/impeccable audit`, `/impeccable critique <page>`, `/impeccable live`. Reads `PRODUCT.md` and `DESIGN.md` first.
2. `design-taste-frontend` (+ `redesign-existing-projects`, `high-end-visual-design`) — non-default, studio-level design decisions. In Codex prefer `gpt-taste`.
3. `emil-design-eng` — motion and micro-interactions; verify with `review-animations`.

Skill output must still obey `DESIGN.md` tokens and `docs/design-system.md`; skills raise the bar, they do not replace the visual system.

## Product Standard

Build polished production interfaces from the first pass. Do not create temporary MVP screens with the intention to "make it beautiful later".

## Quality Loop

For substantial work, use a self-review loop instead of a single-pass answer:

1. Define the task-specific success criteria before implementation.
2. Build or write against those criteria without adding unrelated scope.
3. Review the result against the criteria item by item.
4. List concrete gaps, bugs, weak decisions, or missing states.
5. Fix the highest-impact issues and review again.
6. Stop only when the review passes cleanly or further iterations no longer improve the result meaningfully.

For new features or ambiguous requests, first turn the request into a clear working spec: objective, exact requirements, constraints, edge cases, and definition of done. Keep implementation tied to that spec. When reporting completion, mention which requirements were covered and any remaining risk or verification gap.

Every new page or major section must start from:

1. Screen goal.
2. User decision or action on the screen.
3. Reusable components needed.
4. Existing visual tokens and page patterns.
5. Desktop and mobile layout plan.
6. Empty, loading, error, and success states where relevant.

## UI Rules

- Use the existing visual system before inventing a new style.
- Use design tokens for color, spacing, radius, shadows, and typography.
- Do not use inline styles except for third-party snippets that require them.
- Do not add random colors, decorative gradients, icons, shadows, or radii.
- Do not make generic SaaS screens with identical gray cards unless that pattern is explicitly part of the design system.
- Do not add a header/navigation to standalone funnel pages unless explicitly requested.
- On funnel pages, the first screen should communicate value and next action without showing zero-value calculator placeholders.
- Components should feel like consulting tools, dashboards, and decision support, not quizzes or decorative landing pages.

## UI Rules For This Project

This project must follow the visual direction described in:

- `docs/visual-direction.md`
- `docs/design-system.md`
- `docs/component-architecture.md`

Before changing any page, you must:

1. Identify which existing components can be reused.
2. Extend the design system if needed.
3. Avoid one-off styling decisions.
4. Preserve the premium consulting + light dashboard aesthetic.
5. Keep the approved homepage hero reference as the visual anchor.

Never do this:

- Do not create generic SaaS sections.
- Do not create random card styles.
- Do not use default-looking MVP UI.
- Do not introduce new colors outside the palette.
- Do not create cramped layouts.
- Do not use decorative icons unless they are essential.
- Do not style sections independently from the system.
- Do not build a full page before a reference section passes visual QA.

Every section must be reviewed for:

- visual hierarchy;
- whitespace;
- typography quality;
- premium feel;
- consistency with the homepage hero;
- mobile responsiveness;
- editorial clarity.

Required self-review before finishing:

- Does this look like a premium consulting brand?
- Does this section match the hero visually?
- Is the layout calm and expensive-looking?
- Are the cards curated rather than generic?
- Is every new section assembled from documented component patterns?
- Is there any MVP-looking UI left?

If the first five answers are not clearly "yes", refine before finishing. If there is any MVP-looking UI left, refine before finishing.

## Implementation Order

For new UI work:

1. Update or confirm design direction.
2. Define or reuse design tokens.
3. Build/extend reusable components.
4. Build one reference screen or section.
5. Run visual QA.
6. Fix visual issues before considering the work done.

If a component is missing, extend the UI system first, then use it on the page.


## Visual QA Before Finish

Before finalizing UI work, check:

- Does it look like a real paid product?
- Is visual hierarchy obvious within 3 seconds?
- Are sections grouped with purpose?
- Is there enough whitespace?
- Is typography readable and consistent?
- Are mobile layouts intentionally designed?
- Are empty states, loading states, errors, and success messages covered where needed?
- Are there placeholder-looking elements?
- Does anything look like a default template?

When practical, verify desktop and mobile in-browser. For static pages, at minimum run syntax checks and inspect the generated HTML/CSS/JS for missing selectors and stale classes.

## Deployment

The site deploys from `main` through GitHub Actions. When asked to deploy, commit only relevant files, push `main`, wait for Actions to finish, and verify the live URL.

Ignore unrelated untracked `.claude/` and `specs/` files unless the user asks about them.
