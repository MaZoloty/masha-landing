<?php
declare(strict_types=1);

header_remove('X-Powered-By');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, array('error' => 'Используйте форму на сайте.'));
}

$contentType = strtolower((string)($_SERVER['CONTENT_TYPE'] ?? ''));
if (
    !str_starts_with($contentType, 'multipart/form-data')
    && !str_starts_with($contentType, 'application/x-www-form-urlencoded')
) {
    respond(415, array('error' => 'Не удалось обработать формат заявки.'));
}

$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength < 1 || $contentLength > 30000) {
    respond(413, array('error' => 'Заявка слишком большая.'));
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, array('https://mazoloty.ru', 'https://www.mazoloty.ru'), true)) {
    respond(403, array('error' => 'Не удалось проверить источник заявки.'));
}

if (!empty($_POST['website_check'])) {
    respond(200, array('ok' => true));
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateKey = hash('sha256', $ip . '|mazoloty-b2b-form');
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $rateKey;
$now = time();
$lastRequest = is_file($rateFile) ? (int)file_get_contents($rateFile) : 0;
if ($lastRequest > 0 && ($now - $lastRequest) < 60) {
    respond(429, array('error' => 'Подождите минуту перед повторной отправкой.'));
}
@file_put_contents($rateFile, (string)$now, LOCK_EX);

function scalar(string $name): string {
    if (!isset($_POST[$name])) {
        return '';
    }
    if (!is_string($_POST[$name])) {
        respond(422, array('error' => 'Проверьте заполнение полей формы.'));
    }
    return $_POST[$name];
}

function field(string $name, int $max, bool $required = false): string {
    $value = trim(scalar($name));
    if ($required && $value === '') {
        respond(422, array('error' => 'Заполните обязательные поля.'));
    }
    if (mb_strlen($value) > $max) {
        respond(422, array('error' => 'Сократите текст в одном из полей.'));
    }
    return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
}

if (scalar('consent') !== 'yes' || scalar('consent_version') !== '2026-07-27') {
    respond(422, array('error' => 'Нужно подтвердить согласие на обработку данных.'));
}

$systems = $_POST['systems'] ?? array();
if (!is_array($systems)) {
    $systems = array();
}
$allowedSystems = array('CRM', '1С', 'Telegram', 'MAX', 'WhatsApp', 'Email', 'Google Sheets / Excel', 'Сайт', 'Другое');
$systems = array_values(array_intersect($allowedSystems, array_map('strval', $systems)));

$fields = array(
    'Имя' => field('name', 80, true),
    'Компания' => field('company', 120),
    'Контакт' => field('contact', 160, true),
    'Сайт' => field('company_site', 200),
    'Задача' => field('task', 2000, true),
    'Текущий процесс' => field('current_process', 3000),
    'Системы' => implode(', ', $systems),
    'Объём' => field('volume', 200),
    'Сотрудники' => field('employees', 100),
    'Главная проблема' => field('problem', 120),
    'Желаемый результат' => field('desired_result', 2000),
    'Бюджет' => field('budget', 100),
);

function normalized(string $value): string {
    $value = mb_strtolower($value, 'UTF-8');
    $value = preg_replace('/\s+/u', ' ', $value) ?? $value;
    return trim($value);
}

function urlCount(string $value): int {
    preg_match_all('~(?:https?://|www\.)[^\s<>()]+~iu', $value, $matches);
    return count($matches[0] ?? array());
}

function spamScore(array $fields, array $systems): int {
    $score = 0;
    $narrative = implode("\n", array(
        $fields['Задача'] ?? '',
        $fields['Текущий процесс'] ?? '',
        $fields['Желаемый результат'] ?? '',
    ));

    $links = urlCount($narrative);
    if ($links >= 3) {
        $score += 4;
    } elseif ($links >= 1) {
        $score += 1;
    }

    $promotionPattern = '/\b(?:proxies|proxy|sale|sales|discounts?|coupons?|promotion|promo|casino|viagra|backlinks?|seo services?)\b|(?:скидк|распродаж|промокод)/iu';
    preg_match_all($promotionPattern, $narrative, $promotionMatches);
    $promotionCount = count($promotionMatches[0] ?? array());
    if ($promotionCount >= 3) {
        $score += 5;
    } elseif ($promotionCount >= 1) {
        $score += 2;
    }

    if (preg_match('/\b\d{1,2}\s*%\s*(?:off|sale|discount|saving)/iu', $narrative)) {
        $score += 2;
    }

    if (count($systems) >= 7) {
        $score += 2;
    }

    $name = normalized($fields['Имя'] ?? '');
    $company = normalized($fields['Компания'] ?? '');
    if ($name !== '' && $company !== '' && $name === $company) {
        $score += 1;
    }

    $startedAt = scalar('form_started_at');
    if ($startedAt === '' || !ctype_digit($startedAt)) {
        $score += 1;
    } else {
        $elapsedMs = (int)round(microtime(true) * 1000) - (int)$startedAt;
        if ($elapsedMs < 2500 || $elapsedMs > 86400000) {
            $score += 3;
        }
    }

    return $score;
}

$fingerprintText = normalized(($fields['Контакт'] ?? '') . '|' . ($fields['Задача'] ?? ''));
$fingerprintFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR
    . 'mazoloty-lead-'
    . hash('sha256', $fingerprintText);
$fingerprintTime = is_file($fingerprintFile) ? (int)file_get_contents($fingerprintFile) : 0;

// Repeated submissions and high-confidence spam get a neutral response. This
// keeps junk out of Telegram without confirming the filter rules to bots.
if (
    ($fingerprintTime > 0 && ($now - $fingerprintTime) < 86400)
    || spamScore($fields, $systems) >= 7
) {
    respond(200, array('ok' => true));
}
@file_put_contents($fingerprintFile, (string)$now, LOCK_EX);

$message = "Новая B2B-заявка с mazoloty.ru\n\n";
foreach ($fields as $label => $value) {
    if ($value !== '') {
        $message .= $label . ":\n" . $value . "\n\n";
    }
}
$message .= 'Согласие: версия 2026-07-27';

$token = getenv('TELEGRAM_BOT_TOKEN') ?: '';
$chatId = getenv('TELEGRAM_CHAT_ID') ?: '';

// Beget can report DOCUMENT_ROOT differently depending on the PHP handler.
// Check the private directory derived both from DOCUMENT_ROOT and this script.
$configCandidates = array_unique(array(
    dirname((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__)) . '/telegram-config.php',
    dirname(__DIR__, 2) . '/telegram-config.php',
    dirname(__DIR__) . '/telegram-config.php',
));

foreach ($configCandidates as $privateConfig) {
    if (($token !== '' && $chatId !== '') || !is_file($privateConfig)) {
        continue;
    }

    $botToken = '';
    $telegramBotToken = '';
    $telegramChatId = '';
    $config = require $privateConfig;
    $token = defined('TELEGRAM_BOT_TOKEN') ? (string)TELEGRAM_BOT_TOKEN : $token;
    $chatId = defined('TELEGRAM_CHAT_ID') ? (string)TELEGRAM_CHAT_ID : $chatId;
    $token = defined('BOT_TOKEN') ? (string)BOT_TOKEN : $token;
    $chatId = defined('CHAT_ID') ? (string)CHAT_ID : $chatId;
    $token = $telegramBotToken !== '' ? (string)$telegramBotToken : $token;
    $token = $botToken !== '' ? (string)$botToken : $token;
    $chatId = $telegramChatId !== '' ? (string)$telegramChatId : $chatId;

    // Also accept a returned array to keep the private file easy to maintain.
    if (is_array($config)) {
        $token = (string)($config['TELEGRAM_BOT_TOKEN'] ?? $config['bot_token'] ?? $token);
        $chatId = (string)($config['TELEGRAM_CHAT_ID'] ?? $config['TG_CHAT_ID'] ?? $config['chat_id'] ?? $chatId);
    }
}

if ($token === '' || $chatId === '') {
    respond(503, array('error' => 'Форма пока не подключена.'));
}

$payload = http_build_query(array(
    'chat_id' => $chatId,
    'text' => $message,
    'disable_web_page_preview' => 'true',
), '', '&', PHP_QUERY_RFC3986);

$curl = curl_init('https://api.telegram.org/bot' . rawurlencode($token) . '/sendMessage');
curl_setopt_array($curl, array(
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_HTTPHEADER => array('Content-Type: application/x-www-form-urlencoded'),
));
$providerResponse = curl_exec($curl);
$providerStatus = (int)curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$providerError = curl_errno($curl);
curl_close($curl);

if ($providerError !== 0 || $providerStatus < 200 || $providerStatus >= 300 || $providerResponse === false) {
    respond(502, array('error' => 'Не удалось отправить заявку. Попробуйте позже.'));
}

respond(200, array('ok' => true));

