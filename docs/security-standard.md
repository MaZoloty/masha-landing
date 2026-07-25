# Web Project Security Standard

## Scope

This is the minimum baseline for Maria's public websites, funnels, diagnostics, lead forms, payment pages, and downloadable-product flows. It applies before a page receives real traffic or personal data.

## 1. Transport and Runtime

- HTTPS is mandatory; HTTP redirects permanently to HTTPS.
- TLS 1.0 and 1.1 are disabled at the hosting or CDN level.
- The production runtime is a supported version. PHP 5.x and other end-of-life runtimes are prohibited.
- HSTS is enabled after HTTPS works on every public route.
- Runtime and framework version headers are removed.

## 2. Browser Security Headers

Every public response should provide:

- `Content-Security-Policy` with a deny-by-default policy, no inline event handlers, and explicit third-party allowlists;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` denying unused browser capabilities;
- clickjacking protection through `frame-ancestors 'none'` and `X-Frame-Options: DENY`;
- `Cross-Origin-Opener-Policy: same-origin`;
- `Strict-Transport-Security` on HTTPS.

When inline structured data is used, authorize its exact SHA-256 hashes instead of allowing all inline scripts.

## 3. Public Files

- Directory listing is disabled.
- Source control, environment, config, backup, log, archive, source-map, documentation, automation, and specification files are not public.
- Secrets are never stored in HTML, JavaScript, repository configuration, archives, or a file below the public web root.
- A leaked credential is rotated; deleting it from the current file is not sufficient.
- External fonts and static UI assets are self-hosted when licensing permits.

## 4. Forms and APIs

- Personal data is sent only with `POST` to a same-origin endpoint.
- Client-side checks are convenience only; the server repeats all validation.
- The server enforces content type, total request size, scalar types, field lengths, required consent, and a consent version.
- A honeypot and persistent rate limit protect every public form. High-risk endpoints also use a challenge or managed WAF rule.
- Requests with an unexpected `Origin` are rejected.
- Responses use generic errors, `no-store`, and `nosniff`.
- Provider requests use verified TLS, strict timeouts, and no redirects.
- Provider credentials come from environment variables or a configuration file outside the public web root.
- Duplicate and legacy endpoints fail closed.
- Logs never contain secrets and should minimize personal data.

## 5. Personal Data and Analytics

- Collect only fields necessary for the stated action.
- Show a separate, unchecked consent control and link to a versioned consent document.
- The privacy policy must name the real processors, delivery channels, purposes, retention period, and withdrawal method.
- Optional analytics loads only after explicit consent. Refusal must be as easy as acceptance, and settings remain available later.
- Marketing consent is separate from service messages, form consent, analytics consent, and contract acceptance.
- Before production collection, choose the approved primary storage location and complete the required operator/legal steps.

## 6. Payments and Download Delivery

- The browser success page is never proof of payment.
- A signed server-to-server payment notification is the only source of paid status.
- Callback signatures, amounts, currencies, order status transitions, and idempotency are checked on the server.
- Public URLs never contain Telegram IDs, email addresses, or predictable order identifiers.
- Access links use random or signed, short-lived tokens and are bound to the intended order/product.
- Repeated callbacks and repeated download requests are safe.
- Test mode is required before real payments.

## 7. Verification Before Release

- Search the tracked tree, generated artifacts, and deployment package for secret patterns.
- Check changed JavaScript syntax and server syntax with the production runtime version.
- Test desktop around 1440px, tablet around 768px, and mobile around 390px.
- Test required-field errors, consent rejection, oversized input, wrong methods, wrong content type, untrusted origin, honeypot, rate limit, timeout, provider failure, and success.
- Verify that no analytics request occurs before consent.
- Verify CSP in an actual browser with production-equivalent headers and review the console.
- After deployment, confirm headers, TLS protocols, protected paths, runtime version disclosure, form delivery, and external requests on the live URL.
- Rotate test credentials if they have appeared in logs, terminals, screenshots, or chat.

## Release Gate

A project does not accept real contacts or payments until:

1. supported runtime and modern TLS are active;
2. secrets are rotated and stored outside the repository;
3. the privacy documents reflect the actual data flow;
4. the form/API abuse controls pass;
5. live headers and protected paths are verified;
6. primary personal-data storage and required legal/operator actions are confirmed.
