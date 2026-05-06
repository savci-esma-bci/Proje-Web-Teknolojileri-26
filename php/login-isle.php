<?php
declare(strict_types=1);

$hataMesaji = '';
$kullanici = '';
$islemTamam = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dogru_kullanici = 'B2412100001@sakarya.edu.tr';
    $dogru_sifre     = 'B2412100001';

    $kullanici = trim($_POST['kullaniciAdi'] ?? '');
    $sifre     = trim($_POST['sifre']        ?? '');

    // Doğrulama Kontrolleri
    if ($kullanici === '' || $sifre === '') {
        $hataMesaji = '❌ Kullanıcı adı ve şifre alanları boş bırakılamaz.';
    } elseif (!filter_var($kullanici, FILTER_VALIDATE_EMAIL)) {
        $hataMesaji = '❌ Geçerli bir e-posta adresi giriniz.';
    } elseif ($kullanici !== $dogru_kullanici || $sifre !== $dogru_sifre) {
        $hataMesaji = '❌ Kullanıcı adı veya şifre hatalı.';
    } else {
        $islemTamam = true;
    }
} else {
    // Eğer post edilmeden doğrudan bu sayfaya girilirse ana login sayfasına yönlendir
    header('Location: ../login.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giriş İşlemi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="auth-body">
    <main class="w-100 d-flex flex-grow-1 align-items-center justify-content-center p-3">
    <div class="custom-card">
        <?php if (!$islemTamam): ?>
            <h2>Giriş Yap</h2>
            <p class="subtitle">Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.</p>

            <div class="alert alert-danger py-2">
                <?= htmlspecialchars($hataMesaji, ENT_QUOTES, 'UTF-8') ?>
            </div>

            <form method="POST" action="login-isle.php">
                <div class="mb-3">
                    <label class="form-label fw-semibold">Kullanıcı Adı (E-posta)</label>
                    <input type="text" name="kullaniciAdi" class="form-control" placeholder="B2512000001@sakarya.edu.tr"
                           value="<?= htmlspecialchars($kullanici, ENT_QUOTES, 'UTF-8') ?>">
                </div>
                <div class="mb-4">
                    <label class="form-label fw-semibold">Şifre (Öğrenci No)</label>
                    <input type="password" name="sifre" class="form-control" placeholder="B2512000001">
                </div>
                <button type="submit" class="btn-custom">Tekrar Dene</button>
                <div class="text-center mt-3">
                    <a href="../home.html" class="text-decoration-none small text-secondary">← Ana Sayfaya Dön</a>
                </div>
            </form>

        <?php else: ?>
            <div class="text-center">
                <div style="font-size:3rem;">✅</div>
                <h2 class="mt-3 text-dark fw-bold">Hoşgeldiniz<br><?= htmlspecialchars($sifre, ENT_QUOTES, 'UTF-8') ?></h2>
                <p class="text-secondary mt-2">Başarıyla giriş yaptınız.</p>
                <a href="../home.html" class="btn btn-dark mt-4 w-100">Ana Sayfaya Git</a>
            </div>
        <?php endif; ?>
    </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>