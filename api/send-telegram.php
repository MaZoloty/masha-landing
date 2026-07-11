<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://mazoloty.ru');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed');
}

$config = read_config_file(dirname(dirname(__DIR__)) . '/telegram-config.php');
$token = getenv('TELEGRAM_BOT_TOKEN') ? getenv('TELEGRAM_BOT_TOKEN') : get_config_value($config, 'TELEGRAM_BOT_TOKEN');
$chatId = getenv('TG_CHAT_ID') ? getenv('TG_CHAT_ID') : get_config_value($config, 'TG_CHAT_ID');

if (!$token || !$chatId) {
    respond(500, false, 'Form is not configured');
}

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true);
if (!is_array($body)) {
    respond(400, false, 'Invalid request');
}

// Заявка на гайд со страницы /audit/
if (get_body_value($body, 'form') === 'guide') {
    $name = trim((string)get_body_value($body, 'name'));
    $channel = trim((string)get_body_value($body, 'channel'));
    $contact = trim((string)get_body_value($body, 'contact'));
    $score = trim((string)get_body_value($body, 'score'));

    if ($name === '' || $contact === '') {
        respond(400, false, 'Required fields are missing');
    }

    $text =
        "<b>Заявка на гайд с /audit</b>\n\n" .
        "<b>Имя:</b> " . escape_html(limit_text($name, 80)) . "\n" .
        "<b>Канал:</b> " . escape_html(value_or_dash($channel)) . "\n" .
        "<b>Контакт:</b> " . escape_html(limit_text($contact, 160)) . "\n" .
        "<b>Балл диагностики:</b> " . escape_html($score !== '' ? limit_text($score, 10) : 'не указан');

    $payload = json_encode(array(
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ), JSON_UNESCAPED_UNICODE);

    $telegram = send_to_telegram($token, $payload);
    if (!$telegram['ok']) {
        respond(502, false, 'Telegram request failed');
    }

    respond(200, true, null);
}

$name = trim((string)get_body_value($body, 'name'));
$business = trim((string)get_body_value($body, 'business'));
$link = trim((string)get_body_value($body, 'link'));
$problem = trim((string)get_body_value($body, 'problem'));
$contact = trim((string)get_body_value($body, 'contact'));

if ($name === '' || $business === '' || $link === '' || $contact === '') {
    respond(400, false, 'Required fields are missing');
}

$text =
    "<b>Новая заявка на диагностику с личного сайта</b>\n\n" .
    "<b>Имя:</b> " . escape_html(limit_text($name, 80)) . "\n" .
    "<b>Бизнес:</b> " . escape_html(value_or_dash($business)) . "\n" .
    "<b>Ссылка:</b> " . escape_html(value_or_dash($link)) . "\n" .
    "<b>Что важно разобрать:</b> " . escape_html(value_or_dash($problem)) . "\n" .
    "<b>Связь:</b> " . escape_html(limit_text($contact, 160));

$payload = json_encode(array(
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
), JSON_UNESCAPED_UNICODE);

$telegram = send_to_telegram($token, $payload);
if (!$telegram['ok']) {
    respond(502, false, 'Telegram request failed');
}

respond(200, true, null);

function get_body_value($body, $key) {
    return isset($body[$key]) ? $body[$key] : '';
}

function get_config_value($config, $key) {
    return isset($config[$key]) ? $config[$key] : '';
}

function read_config_file($path) {
    if (!is_file($path)) {
        return array();
    }

    $content = file_get_contents($path);
    if ($content === false) {
        return array();
    }

    $config = array();
    foreach (array('TELEGRAM_BOT_TOKEN', 'TG_CHAT_ID') as $key) {
        $pattern = "/['\"]" . preg_quote($key, '/') . "['\"]\\s*=>\\s*['\"]([^'\"]+)['\"]/";
        if (preg_match($pattern, $content, $matches)) {
            $config[$key] = $matches[1];
        }
    }
    return $config;
}

function send_to_telegram($token, $payload) {
    $url = "https://api.telegram.org/bot" . $token . "/sendMessage";

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        $response = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = $response ? json_decode($response, true) : null;
        return array('ok' => $statusCode < 400 && is_array($data) && !empty($data['ok']));
    }

    $context = stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
            'ignore_errors' => true,
        ),
    ));
    $response = file_get_contents($url, false, $context);
    $data = $response ? json_decode($response, true) : null;
    return array('ok' => is_array($data) && !empty($data['ok']));
}

function value_or_dash($value) {
    $value = trim((string)$value);
    return $value !== '' ? limit_text($value, 500) : '-';
}

function limit_text($value, $length) {
    return function_exists('mb_substr') ? mb_substr($value, 0, $length, 'UTF-8') : substr($value, 0, $length);
}

function escape_html($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function respond($status, $ok, $error) {
    http_response_code($status);
    $payload = array('ok' => $ok);
    if ($error !== null) {
        $payload['error'] = $error;
    }
    echo json_encode($payload);
    exit;
}
