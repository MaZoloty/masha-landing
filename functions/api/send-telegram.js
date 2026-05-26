export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { name, business, link, contact } = body;

  if (!name || !contact) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  const text =
    `📩 <b>Новая заявка с лендинга</b>\n\n` +
    `👤 Имя: ${name}\n` +
    `💼 Бизнес: ${business || '—'}\n` +
    `🔗 Ссылка: ${link || '—'}\n` +
    `📬 Связь: ${contact}`;

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  if (!tgRes.ok) {
    const err = await tgRes.text();
    console.error('Telegram error:', err);
    return new Response(JSON.stringify({ error: 'Telegram error' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
