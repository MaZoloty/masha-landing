const responseHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};

// Lead capture is disabled: visitors contact Maria through the public
// Telegram link. This legacy route stays closed so a future Cloudflare Pages
// deployment cannot expose a second endpoint.
export function onRequest() {
  return new Response(
    JSON.stringify({ error: 'Endpoint disabled' }),
    { status: 410, headers: responseHeaders },
  );
}
