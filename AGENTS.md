# Project Agent Rules

This project is Maria Zolotukhina's personal site and funnel system. Treat every public page as a trust-building business interface, not as a rough MVP.

## Required Context

Before changing or creating any UI, read:

- `docs/product-brief.md`
- `docs/design-system.md`
- `docs/ui-principles.md`
- `docs/visual-qa-checklist.md`

If the change touches only backend logic, still preserve the visual contracts in these files.

## Product Standard

Build polished production interfaces from the first pass. Do not create temporary MVP screens with the intention to "make it beautiful later".

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
