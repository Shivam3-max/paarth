<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$config = loadConfig();
$allowedOrigin = $config['APPLICATION_ALLOWED_ORIGIN'] ?? '';
$mailTo = $config['APPLICATION_MAIL_TO'] ?? 'the.garv97@gmail.com';
$mailFrom = $config['APPLICATION_MAIL_FROM'] ?? 'Paarth Applications <onboarding@resend.dev>';
$resendApiKey = $config['RESEND_API_KEY'] ?? '';

if ($allowedOrigin !== '' && isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Vary: Origin');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, [
        'ok' => false,
        'message' => 'Method not allowed',
    ]);
}

if (!requestOriginAllowed($allowedOrigin)) {
    respond(403, [
        'ok' => false,
        'message' => 'Request origin is not allowed.',
    ]);
}

if (!isJsonRequest()) {
    respond(415, [
        'ok' => false,
        'message' => 'Content type must be application/json.',
    ]);
}

$rawBody = file_get_contents('php://input');

if ($rawBody === false || strlen($rawBody) > 100000) {
    respond(413, [
        'ok' => false,
        'message' => 'Request body is too large.',
    ]);
}

$data = json_decode($rawBody ?: '{}', true);

if (!is_array($data)) {
    respond(400, [
        'ok' => false,
        'message' => 'Invalid JSON payload.',
    ]);
}

if (!empty(trim((string) ($data['website'] ?? '')))) {
    respond(200, ['ok' => true]);
}

$requiredFields = ['name', 'email', 'phone', 'stage', 'why', 'goal', 'focus'];

foreach ($requiredFields as $field) {
    if (trim((string) ($data[$field] ?? '')) === '') {
        respond(400, [
            'ok' => false,
            'message' => 'Please complete all required fields.',
        ]);
    }
}

$email = trim((string) $data['email']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, [
        'ok' => false,
        'message' => 'Please enter a valid email address.',
    ]);
}

if ($mailTo === '' || $mailFrom === '') {
    respond(500, [
        'ok' => false,
        'message' => 'Mail settings are not configured on the server.',
    ]);
}

if ($resendApiKey === '') {
    respond(500, [
        'ok' => false,
        'message' => 'Resend API key is not configured on the server.',
    ]);
}

$fields = [
    'Full name' => $data['name'] ?? '',
    'Email' => $email,
    'Phone' => $data['phone'] ?? '',
    'Current stage' => $data['stage'] ?? '',
    'LinkedIn / Portfolio / Website' => $data['link'] ?? '',
    'Focus area' => $data['focus'] ?? '',
    'Why Paarth?' => $data['why'] ?? '',
    'Goal' => $data['goal'] ?? '',
    'Anything else' => $data['more'] ?? '',
];

$subject = 'New Paarth application from ' . trim((string) $data['name']);
$html = buildHtml($fields);
$resendPayload = [
    'from' => $mailFrom,
    'to' => [$mailTo],
    'reply_to' => $email,
    'subject' => $subject,
    'html' => $html,
];

$ch = curl_init('https://api.resend.com/emails');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($resendPayload, JSON_UNESCAPED_SLASHES),
    CURLOPT_TIMEOUT => 20,
]);

$responseBody = curl_exec($ch);
$curlError = curl_error($ch);
$statusCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

curl_close($ch);

if ($responseBody === false && $curlError !== '') {
    error_log('Paarth application Resend curl error: ' . $curlError);
    respond(502, [
        'ok' => false,
        'message' => 'Mail service could not send the application.',
    ]);
}

if ($statusCode < 200 || $statusCode >= 300) {
    error_log('Paarth application Resend API error: ' . (string) $responseBody);
    respond(502, [
        'ok' => false,
        'message' => readResendError((string) $responseBody) ?: 'Mail service could not send the application.',
    ]);
}

respond(200, ['ok' => true]);

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function loadConfig(): array
{
    $config = [];
    $keys = [
        'APPLICATION_ALLOWED_ORIGIN',
        'APPLICATION_MAIL_TO',
        'APPLICATION_MAIL_FROM',
        'RESEND_API_KEY',
    ];

    foreach ($keys as $key) {
        $value = getenv($key);

        if ($value !== false && $value !== '') {
            $config[$key] = $value;
        }
    }

    foreach (envFileCandidates() as $path) {
        if (!is_readable($path)) {
            continue;
        }

        foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
            $trimmed = trim($line);

            if ($trimmed === '' || str_starts_with($trimmed, '#') || !str_contains($trimmed, '=')) {
                continue;
            }

            [$name, $value] = explode('=', $trimmed, 2);
            $name = trim($name);

            if (!in_array($name, $keys, true) || isset($config[$name])) {
                continue;
            }

            $config[$name] = trim($value, " \t\n\r\0\x0B\"'");
        }

        break;
    }

    return $config;
}

function envFileCandidates(): array
{
    return [
        dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env',
        __DIR__ . DIRECTORY_SEPARATOR . '.env',
    ];
}

function buildHtml(array $fields): string
{
    $rows = '';

    foreach ($fields as $label => $value) {
        $cleanValue = trim((string) $value);

        if ($cleanValue === '') {
            continue;
        }

        $rows .= '<tr>'
            . '<td style="border:1px solid #e2dac8;padding:10px;font-weight:700;width:220px;background:#f2ede2">'
            . escapeHtml($label)
            . '</td>'
            . '<td style="border:1px solid #e2dac8;padding:10px;white-space:pre-wrap">'
            . nl2br(escapeHtml($cleanValue), false)
            . '</td>'
            . '</tr>';
    }

    return '<div style="font-family:Arial,sans-serif;color:#17150f;line-height:1.55">'
        . '<h1 style="font-size:22px;margin:0 0 16px">New Paarth Application</h1>'
        . '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">'
        . $rows
        . '</table>'
        . '</div>';
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function readResendError(string $responseBody): string
{
    $payload = json_decode($responseBody, true);

    if (!is_array($payload)) {
        return '';
    }

    $message = $payload['message'] ?? $payload['error'] ?? $payload['name'] ?? '';

    return is_string($message) ? $message : '';
}

function requestOriginAllowed(string $allowedOrigin): bool
{
    if ($allowedOrigin !== '') {
        return !isset($_SERVER['HTTP_ORIGIN']) || $_SERVER['HTTP_ORIGIN'] === $allowedOrigin;
    }

    if (!isset($_SERVER['HTTP_ORIGIN'], $_SERVER['HTTP_HOST'])) {
        return true;
    }

    $originHost = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $serverHost = preg_replace('/:\d+$/', '', (string) $_SERVER['HTTP_HOST']);

    return is_string($originHost) && $originHost !== '' && strcasecmp($originHost, (string) $serverHost) === 0;
}

function isJsonRequest(): bool
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';

    return stripos((string) $contentType, 'application/json') === 0;
}
