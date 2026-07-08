# UI Principles

## Process

Do not start from "build the app/page". Start from the visual and product structure.

For substantial UI work:

1. Define the screen purpose.
2. Define the user's decision or action.
3. Identify reusable components.
4. Confirm tokens and layout.
5. Implement.
6. Run visual QA.
7. Fix visual weaknesses.

## Reference Screen Rule

When building a new product flow, create or refine one reference screen/section first. It should be strong enough to become the model for the rest of the product.

Do not build ten visually inconsistent screens and then try to polish them later.

## Funnel Rule

Funnel pages should sell through clarity and usefulness:

- show the user's problem;
- help them diagnose or decide;
- show what the result means;
- offer the next useful step;
- make the commercial step feel logical.

Avoid exposing internal funnel logic such as "ladder next" unless it is genuinely helpful to the client.

## Dashboard Rule

Dashboard-style blocks should answer business questions:

- What is happening?
- How serious is it?
- What should I look at first?
- What money/order of magnitude is involved?
- What level of solution is needed?

Numbers must have context. Do not show big numbers just because the layout needs drama.

## Copy And Tone

Use direct Russian business language. Prefer:

- "что проверить";
- "почему это важно";
- "с чего начать";
- "ориентир по деньгам";
- "уровень решения";
- "порядок действий".

Avoid over-selling:

- "заберите срочно";
- "волшебная автоматизация";
- "гарантированный рост";
- "секретная схема".

## Mobile

Mobile is not an afterthought:

- no horizontal overflow;
- buttons should be tappable;
- long headings must wrap cleanly;
- metric cards should stack with clear rhythm;
- forms should stay readable and calm.

## States

Where relevant, include:

- empty state;
- loading state;
- error state;
- success state;
- disabled state.

For static diagnostic pages, empty states matter most: before the user answers, the result should not look broken.
