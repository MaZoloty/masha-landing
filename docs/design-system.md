# Design System

## Visual Direction

The default visual direction is expensive consulting plus light dashboard. Interfaces should look calm, mature, analytical, and useful from the first screen.

Use visual restraint. Avoid decorative excess. The strongest signal should be structure, hierarchy, readable data, clear sections, and precise copy.

## Design Tokens

Use tokens before ad hoc values.

Recommended base:

- Background: warm off-white or very light paper tone.
- Surface: near-white panels with subtle contrast.
- Ink: deep warm black/green-black.
- Muted text: readable gray-green, not overly pale.
- Accent: deep green for primary actions and system emphasis.
- Secondary accent: muted gold for consulting/business highlights.
- Lines: soft low-contrast borders.

Do not introduce random blues, purples, bright gradients, or many one-off accent colors without updating this file.

## Layout

- Desktop content max width: 1160-1240px.
- Mobile should be designed intentionally, not as a squeezed desktop.
- Use spacing based on 4/8px rhythm.
- Large section spacing: 64-96px where the page has enough room.
- Dense dashboard blocks may use tighter spacing, but grouping must stay clear.
- Avoid cards inside cards unless the inner card is a real repeated item, metric, or form group.

## Typography

- Headings should be confident, readable, and not overly long.
- Use large headings only for true page/section hierarchy.
- Body text should not be too small or too pale.
- Metric values may use a display serif or strong numeric styling.
- Avoid negative letter spacing except where already established for large display numbers.

## Components

Prefer reusable patterns:

- Button
- Ghost button
- Field
- Section head
- Dashboard card
- Metric card
- Audit card
- Priority list item
- Badge/chip
- Form note
- Consent row
- Offer/guide panel

New screens should not be assembled from random raw `div` structures if an existing pattern can be reused.

## Buttons

- Primary buttons use deep green and clear action copy.
- Ghost buttons are for secondary navigation or lower-commitment actions.
- Avoid multiple competing primary buttons in the same view.
- Button copy should name the user's next step, not internal funnel mechanics.

## Cards And Panels

Cards should have a reason:

- metric;
- audit point;
- priority item;
- offer level;
- form group;
- empty state.

Avoid decorative card grids that do not help the user decide.

## Forms

Forms should be calm and business-like:

- clear labels;
- useful placeholders;
- obvious required fields;
- visible success/error state;
- no surprise change in tone.

## Forbidden

- "Temporary" UI.
- Inline styles for normal interface work.
- Random colors outside tokens.
- Random radius values without a system.
- Random shadows without a system.
- Icons just to make the page feel busy.
- Generic blue SaaS buttons.
- Decorative blobs, orbs, and bokeh backgrounds.
- Hero sections that look like stock landing pages instead of the actual tool.
