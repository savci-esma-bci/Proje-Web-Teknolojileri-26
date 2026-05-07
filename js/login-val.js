document.getElementById('loginForm').addEventListener('submit', function (e) {
    // inputlari trimlioruz
    const kullaniciAdi = document.getElementById('kullaniciAdi').value.trim();
    const sifre = document.getElementById('sifre').value.trim();
    const errorDiv = document.getElementById('loginError');
    let errors = [];

    // bos alan kontrolu
    if (kullaniciAdi === '' || sifre === '') {
        errors.push('❌ Kullanıcı adı ve şifre alanları boş bırakılamaz.');
    }

    // Regex ile mail format kontroll
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (kullaniciAdi !== '' && !emailRegex.test(kullaniciAdi)) {
        errors.push('❌ Lütfen geçerli bir e-posta adresi giriniz.');
    }

    // hata listesi bos degilse
    if (errors.length > 0) {
        e.preventDefault(); // phpye submiti durdurr
        errorDiv.innerHTML = errors.join('<br>'); // hatalari alt alta yazdirir br sagolsn
        errorDiv.classList.remove('d-none'); // warning kutusunu visible yapar
    } else {
        errorDiv.classList.add('d-none'); // error yoksa kutuyu gizler
    }
});