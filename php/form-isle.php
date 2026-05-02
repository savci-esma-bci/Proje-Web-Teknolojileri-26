<?php
$adSoyad  = $_POST['adSoyad'];
$eposta   = $_POST['eposta'];
$telefon  = $_POST['telefon'];
$konu     = $_POST['konu'];
$mesaj    = $_POST['mesaj'];
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Form Sonucu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h3>Gönderilen Veriler</h3>
    <hr>
    <p><b>Ad Soyad:</b> <?php echo $adSoyad; ?></p>
    <p><b>E-posta:</b> <?php echo $eposta; ?></p>
    <p><b>Telefon:</b> <?php echo $telefon; ?></p>
    <p><b>Konu:</b> <?php echo $konu; ?></p>
    <p><b>Mesaj:</b> <?php echo $mesaj; ?></p>
    <a href="../iletisim.html">Geri Dön</a>
</div>
</body>
</html>
