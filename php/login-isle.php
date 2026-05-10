<?php
declare(strict_types=1);
error_reporting(0);

$dogru_kullanici = 'B2412100001@sakarya.edu.tr'; 
$dogru_sifre     = 'B2412100001';

$hataMesaji = '';
$islemTamam = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $kullanici = trim($_POST['kullaniciAdi'] ?? '');
    $sifre     = trim($_POST['sifre']        ?? '');

    // bos alan ve mail formati validasyon
    if ($kullanici === '' || $sifre === '') {
        $hataMesaji = '❌ Kullanıcı adı veya şifre boş bırakılamaz.';
    } elseif (!filter_var($kullanici, FILTER_VALIDATE_EMAIL)) {
        $hataMesaji = '❌ Lütfen geçerli bir e-posta formatı giriniz.';
    } elseif ($kullanici !== $dogru_kullanici || $sifre !== $dogru_sifre) {
        $hataMesaji = '❌ Kullanıcı adı veya şifre hatalı.';
    } else {
        $islemTamam = true;
    }
} else {
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="auth-result-body">
    <main class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-5">
                <div class="custom-card text-center p-5">
                    
                    <?php if ($islemTamam): ?>
                        <div class="auth-result-icon auth-floating-icon">👋</div>
                        <h2 class="mt-4 text-auth-success">Hoşgeldiniz</h2>
                        <h3 class="fw-bold text-auth-white"><?php echo htmlspecialchars($dogru_sifre); ?></h3>
                        <p class="text-secondary mt-3">Başarıyla giriş yaptınız, ana sayfaya gidebilirsiniz.</p>
                        <a href="../home.html" class="btn btn-light mt-4 px-5">Ana Sayfa</a>
                        
                    <?php else: ?>
                        <div class="auth-result-icon">❌</div>
                        <h2 class="mt-4 text-auth-danger">Giriş Başarısız</h2>
                        <div class="alert alert-auth-danger mt-3">
                            <?php echo $hataMesaji; ?>
                        </div>
                        <p class="text-secondary">Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.</p>
                        <a href="../login.html" class="btn btn-outline-light mt-3 w-100 btn-auth-return">
                            <i class="bi bi-arrow-left"></i> Giriş Sayfasına Dön
                        </a>
                    <?php endif; ?>

                </div>
            </div>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>