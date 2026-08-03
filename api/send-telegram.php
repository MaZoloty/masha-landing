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
$allowedOrigins = array('https://mazoloty.ru', 'https://www.mazoloty.ru');
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$refererOrigin = '';
if ($referer !== '') {
    $refererParts = parse_url($referer);
    if (is_array($refererParts) && isset($refererParts['scheme'], $refererParts['host'])) {
        $refererOrigin = strtolower((string)$refererParts['scheme']) . '://' . strtolower((string)$refererParts['host']);
    }
}
if (($origin === '' || !in_array($origin, $allowedOrigins, true))
    && ($refererOrigin === '' || !in_array($refererOrigin, $allowedOrigins, true))) {
    respond(403, array('error' => 'Не удалось проверить источник заявки.'));
}

if (!empty($_POST['website_check']) || !empty($_POST['company_fax'])) {
    respond(200, array('ok' => true));
}

$now = time();

function scalar(string $name): string {
    if (!isset($_POST[$name])) {
        return '';
    }
    if (!is_string($_POST[$name])) {
        respond(422, array('error' => 'Проверьте заполнение полей формы.'));
    }
    return $_POST[$name];
}

$startedAtRaw = scalar('form_started_at');
$elapsedRaw = scalar('form_elapsed_ms');
$elapsedMs = ctype_digit($elapsedRaw) ? (int)$elapsedRaw : -1;
if (!preg_match('/^\d{13}$/', $startedAtRaw)
    || $elapsedMs < 5000
    || $elapsedMs > 7200000
    || scalar('form_interaction') !== 'yes') {
    respond(422, array('error' => 'Обновите страницу и заполните форму ещё раз.'));
}

function enforceRateLimit(string $ip, int $now): void {
    $rateKey = hash('sha256', $ip . '|mazoloty-b2b-form-v2');
    $rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $rateKey;
    $handle = @fopen($rateFile, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        respond(503, array('error' => 'Не удалось отправить заявку. Попробуйте позже.'));
    }

    $raw = stream_get_contents($handle);
    $state = json_decode($raw !== false ? $raw : '', true);
    if (!is_array($state)) {
        $state = array();
    }

    $last = (int)($state['last'] ?? 0);
    $hourStarted = (int)($state['hour_started'] ?? $now);
    $hourCount = (int)($state['hour_count'] ?? 0);
    $dayStarted = (int)($state['day_started'] ?? $now);
    $dayCount = (int)($state['day_count'] ?? 0);

    if (($now - $hourStarted) >= 3600) {
        $hourStarted = $now;
        $hourCount = 0;
    }
    if (($now - $dayStarted) >= 86400) {
        $dayStarted = $now;
        $dayCount = 0;
    }

    if (($last > 0 && ($now - $last) < 60) || $hourCount >= 4 || $dayCount >= 10) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(429, array('error' => 'Слишком много отправок. Попробуйте позже.'));
    }

    $state = array(
        'last' => $now,
        'hour_started' => $hourStarted,
        'hour_count' => $hourCount + 1,
        'day_started' => $dayStarted,
        'day_count' => $dayCount + 1,
    );
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($state));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
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
$systems = array_values(array_intersect($allowedSystems, array_filter($systems, 'is_string')));

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

$contact = $fields['Контакт'];
$contactDigits = preg_replace('/\D+/', '', $contact) ?? '';
$validContact = filter_var($contact, FILTER_VALIDATE_EMAIL) !== false
    || preg_match('/(?:^|\s)@[a-zA-Z0-9_]{5,32}(?:\s|$)/u', $contact) === 1
    || preg_match('~(?:https?://)?t\.me/[a-zA-Z0-9_]{5,32}~iu', $contact) === 1
    || (strlen($contactDigits) >= 7 && strlen($contactDigits) <= 15);
if (!$validContact) {
    respond(422, array('error' => 'Укажите Telegram, телефон или email для ответа.'));
}

$task = $fields['Задача'];
if (mb_strlen($task) < 20 || preg_match('/[\p{L}]/u', $task) !== 1) {
    respond(422, array('error' => 'Опишите задачу чуть подробнее.'));
}

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

    $solicitationPatterns = array(
        '/(?:предлагаю|предлагаем|хотим предложить|готовы предложить).{0,120}(?:услуг|продвиж|реклам|сотруднич|разработ)/uis',
        '/(?:seo|сео)[\s-]*(?:продвиж|оптимизац|аудит)/ui',
        '/(?:продвин|вывед).{0,80}(?:ваш|сайт|топ|поиск)/uis',
        '/(?:увеличим|нарастим).{0,80}(?:трафик|продаж|заявк|посещаем)/uis',
        '/(?:заработок|доход).{0,80}(?:крипт|инвест|пассивн)/uis',
    );
    $solicitationText = implode("\n", array(
        $fields['Имя'] ?? '',
        $fields['Компания'] ?? '',
        $narrative,
    ));
    foreach ($solicitationPatterns as $pattern) {
        if (preg_match($pattern, $solicitationText) === 1) {
            $score += 7;
            break;
        }
    }

    if (count($systems) >= 7) {
        $score += 2;
    }

    $name = normalized($fields['Имя'] ?? '');
    $company = normalized($fields['Компания'] ?? '');
    if ($name !== '' && $company !== '' && $name === $company) {
        $score += 1;
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

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
enforceRateLimit($ip, $now);

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

@file_put_contents($fingerprintFile, (string)$now, LOCK_EX);

respond(200, array('ok' => true));

