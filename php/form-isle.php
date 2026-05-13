<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ../iletisim.html"); 
    exit();
}

$adSoyad  = $_POST['adSoyad'] ?? '';
$eposta   = $_POST['eposta'] ?? '';
$telefon  = $_POST['telefon'] ?? '';
$mesaj    = $_POST['mesaj'] ?? '';

// MAPPING
$rawKonu = $_POST['konu'] ?? '';
$konuMap = [
    'isbirligi' => 'İş Birliği',
    'proje'     => 'Proje Teklifi',
    'bilgi'     => 'Bilgi Alma',
    'diger'     => 'Diğer'
];
$konu = $konuMap[$rawKonu] ?? $rawKonu; 

// ILETISIM MAPPING
$rawIletisim = $_POST['iletisimYontemi'] ?? '';
$iletisimMap = [
    'eposta'    => 'E-posta',
    'telefon'   => 'Telefon',
    'farketmez' => 'Fark Etmez'
];
$iletisimYontemi = $iletisimMap[$rawIletisim] ?? 'Belirtilmedi';

$ilgiAlanlari = '';
if (isset($_POST['ilgi']) && is_array($_POST['ilgi'])) {
    $ilgiMap = [
        'BCI'   => 'BCI',
        'Web'   => 'Web Geliştirme',
        'AI'    => 'Yapay Zeka',
        'Diger' => 'Diğer'
    ];
    
    $guzelSecimler = [];
    foreach ($_POST['ilgi'] as $secim) {
        // her secimi dict den alip diziye eklemece
        $guzelSecimler[] = $ilgiMap[$secim] ?? $secim;
    }
    
    $ilgiAlanlari = implode(", ", $guzelSecimler);
} else {
    $ilgiAlanlari = 'Seçilmedi';
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Başarıyla Gönderildi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="form-result-body">

    <div class="container p-3">
        <div class="result-container mx-auto">
            
            <div class="text-center mb-4">
                <div class="form-result-icon auth-floating-icon">📨</div>
                <h2 class="mt-3 form-success-title">Mesajınız Alındı!</h2>
                <p class="form-subtitle">Aşağıdaki bilgiler tarafımıza başarıyla iletilmiştir.</p>
            </div>
            
            <ul class="data-list mb-4">
                <li class="data-item">
                    <span class="data-label">Ad Soyad</span>
                    <span class="data-value highlight"><?php echo htmlspecialchars($adSoyad, ENT_QUOTES, 'UTF-8'); ?></span>
                </li>
                
                <li class="data-item">
                    <span class="data-label">E-posta Adresi</span>
                    <span class="data-value"><?php echo htmlspecialchars($eposta, ENT_QUOTES, 'UTF-8'); ?></span>
                </li>
                
                <li class="data-item">
                    <span class="data-label">Telefon Numarası</span>
                    <span class="data-value"><?php echo htmlspecialchars($telefon, ENT_QUOTES, 'UTF-8'); ?></span>
                </li>
                
                <li class="data-item">
                    <span class="data-label">Konu</span>
                    <span class="data-value"><?php echo htmlspecialchars($konu, ENT_QUOTES, 'UTF-8'); ?></span>
                </li>
                
                <li class="data-item">
                    <span class="data-label">İletişim Tercihi</span>
                    <span class="data-value"><?php echo htmlspecialchars($iletisimYontemi, ENT_QUOTES, 'UTF-8'); ?></span>
                </li>
                
                <li class="data-item">
                    <span class="data-label">İlgi Alanları</span>
                    <span class="data-value"><?php echo htmlspecialchars($ilgiAlanlari, ENT_QUOTES, 'UTF-8'); ?></span>
                </li>
                
                <li class="data-item">
                    <span class="data-label">Mesaj İçeriği</span>
                    <span class="data-value data-value-multiline">
                        <?php echo nl2br(htmlspecialchars($mesaj, ENT_QUOTES, 'UTF-8')); ?>
                    </span>
                </li>
            </ul>

            <div class="text-center mt-5">
                <a href="../home.html" class="btn btn-return-home">
                    <i class="bi bi-arrow-left"></i> Ana Sayfaya Dön
                </a>
            </div>

        </div>
    </div>

</body>
</html>
