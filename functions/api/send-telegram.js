export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { name, business, link, contact, problem, goal, timeline } = body;

  if (!name || !business || !link || !timeline || !contact) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TG_CHAT_ID;

  const text =
    `📩 <b>Новая заявка на диагностику с лендинга</b>\n\n` +
    `👤 Имя: ${name}\n` +
    `💼 Бизнес: ${business || '—'}\n` +
    `🔗 Ссылка: ${link || '—'}\n` +
    `🎯 Что хочет понять: ${goal || 'пока не знаю'}\n` +
    `🗓️ Срок: ${timeline || '—'}\n` +
    `🧩 Что не работает: ${problem || '—'}\n` +
    `📬 Связь: ${contact}`;

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  if (!tgRes.ok) {
    const err = await tgRes.text();
    return new Response(JSON.stringify({ error: 'Telegram error' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
