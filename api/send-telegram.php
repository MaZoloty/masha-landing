<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
http_response_code(410);
echo json_encode(array(
    'ok' => false,
    'error' => 'Form endpoint disabled',
));
