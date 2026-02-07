<?php
/**
 * Contact Form Handler
 * Zpracuje formulář a odešle e-mail
 */

// Nastavení hlaviček pro AJAX požadavky
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Kontrola metody požadavku
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Pouze POST požadavky jsou povoleny.'
    ]);
    exit;
}

// Konfigurace
$to_email = 'franktomas@seznam.cz'; // Váš e-mail
$from_email = 'noreply@tomasfrank.cz'; // E-mail odesílatele

// Získání a sanitizace dat z formuláře
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$project = isset($_POST['project']) ? trim(strip_tags($_POST['project'])) : '';
$budget = isset($_POST['budget']) ? trim(strip_tags($_POST['budget'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
$gdpr = isset($_POST['gdpr']) ? $_POST['gdpr'] : '';

// Validace povinných polí
$errors = [];

if (empty($name)) {
    $errors[] = 'Jméno je povinné.';
}

if (empty($email)) {
    $errors[] = 'E-mail je povinný.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'E-mail není platný.';
}

if (empty($project)) {
    $errors[] = 'Typ projektu je povinný.';
}

if (empty($gdpr) || $gdpr !== 'on') {
    $errors[] = 'Musíte souhlasit se zpracováním osobních údajů.';
}

// Pokud jsou chyby, vrátit error
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Formulář obsahuje chyby.',
        'errors' => $errors
    ]);
    exit;
}

// Příprava textu projektu
$project_texts = [
    'vizitka' => 'VIZITKA (5 000 Kč)',
    'firemni' => 'FIREMNÍ WEB (12 000–15 000 Kč)',
    'namiru' => 'WEB NA MÍRU (od 20 000 Kč)',
    'nevim' => 'Ještě nevím – chci konzultaci'
];
$project_name = isset($project_texts[$project]) ? $project_texts[$project] : $project;

// Příprava textu rozpočtu
$budget_texts = [
    'do-10' => 'Do 10 000 Kč',
    '10-20' => '10 000–20 000 Kč',
    '20-30' => '20 000–30 000 Kč',
    '30+' => '30 000+ Kč',
    'unsure' => 'Zatím nevím'
];
$budget_name = !empty($budget) && isset($budget_texts[$budget]) ? $budget_texts[$budget] : 'Neuvedeno';

// Sestavení e-mailu
$subject = "Nová poptávka z webu: $project_name - $name";

// HTML verze e-mailu
$html_message = "
<!DOCTYPE html>
<html lang='cs'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #0ea5e9; margin-bottom: 5px; }
        .value { color: #333; }
        .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Nová poptávka z webu</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Jméno:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 E-mail:</div>
                <div class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
            </div>
            
            <div class='field'>
                <div class='label'>📦 Typ projektu:</div>
                <div class='value'>" . htmlspecialchars($project_name) . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>💰 Rozpočet:</div>
                <div class='value'>" . htmlspecialchars($budget_name) . "</div>
            </div>
            
            " . (!empty($message) ? "
            <div class='field'>
                <div class='label'>💬 Zpráva:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
            " : "") . "
            
            <div class='field'>
                <div class='label'>⏰ Čas odeslání:</div>
                <div class='value'>" . date('d.m.Y H:i:s') . "</div>
            </div>
        </div>
        <div class='footer'>
            Tento e-mail byl odeslán z kontaktního formuláře na tomasfrank.cz
        </div>
    </div>
</body>
</html>
";

// Plain text verze pro zálohu
$plain_message = "
NOVÁ POPTÁVKA Z WEBU
=====================

Jméno: $name
E-mail: $email
Typ projektu: $project_name
Rozpočet: $budget_name
" . (!empty($message) ? "
Zpráva:
$message
" : "") . "
Čas odeslání: " . date('d.m.Y H:i:s') . "

---
Tento e-mail byl odeslán z kontaktního formuláře na tomasfrank.cz
";

// Hlavičky e-mailu
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Pokus o odeslání e-mailu
$mail_sent = mail($to_email, $subject, $html_message, implode("\r\n", $headers));

if ($mail_sent) {
    // Úspěch
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Zpráva byla úspěšně odeslána! Brzy se vám ozvu.'
    ]);
} else {
    // Chyba při odesílání
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo mě kontaktujte přímo na e-mailu.'
    ]);
}
?>
