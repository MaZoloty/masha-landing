# Visual QA Checklist

Run this before finishing UI work.

## Desktop

- Check around 1440px width.
- Does the first screen communicate the value without looking like a template?
- Is the main action obvious?
- Does the layout have enough whitespace?
- Are sections visually distinct but not noisy?
- Do cards have a purpose?
- Are metrics explained?
- Are headings clear and not too long?
- Are paragraph widths readable?
- Are buttons consistent?
- Is there any stale class, unused section, or leftover copy from a previous version?

## Tablet

- Check around 768px width.
- Does the layout stack intentionally?
- Are two-column sections still readable?
- Are dashboard cards balanced?
- Are forms still easy to scan?

## Mobile

- Check around 390px width.
- No horizontal overflow.
- Buttons fit and are tappable.
- Headings wrap cleanly.
- Cards do not feel cramped.
- Form fields are readable.
- Metric values do not overflow.
- Priority lists still read as priorities, not unrelated cards.

## Product Quality

Ask:

- Does this look like a real paid product?
- Would a business owner trust this page?
- Does the interface feel analytical and useful?
- Does anything look like a placeholder?
- Does anything look like a default UI kit?
- Does the commercial block follow naturally from the useful result?

## Technical Checks

For HTML/CSS/JS pages:

- Run `node --check` for changed JS files.
- Search for stale removed classes.
- Check key IDs used by scripts.
- Verify live deployment when the user asks to deploy.

For deployed pages:

- Confirm HTTP 200.
- Confirm the expected new selectors exist.
- Confirm removed selectors do not exist.
- Confirm analytics goals are not accidentally removed.
