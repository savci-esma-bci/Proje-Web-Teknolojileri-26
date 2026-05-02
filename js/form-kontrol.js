function formKontrol() {
    var hata = "";
    var adSoyad = document.getElementById("adSoyad").value;
    var eposta = document.getElementById("eposta").value;
    var telefon = document.getElementById("telefon").value;
    var konu = document.getElementById("konu").value;
    var mesaj = document.getElementById("mesaj").value;

    if (adSoyad == "") {
        hata += "Ad soyad boş bırakılamaz.\n";
    }
    if (eposta == "") {
        hata += "E-posta boş bırakılamaz.\n";
    } else if (eposta.indexOf("@") == -1) {
        hata += "Geçerli bir e-posta giriniz.\n";
    }
    if (telefon == "") {
        hata += "Telefon boş bırakılamaz.\n";
    } else {
        for (var i = 0; i < telefon.length; i++) {
            if (isNaN(telefon[i])) {
                hata += "Telefon sadece rakam içermelidir.\n";
                break;
            }
        }
    }
    if (konu == "") {
        hata += "Konu seçiniz.\n";
    }
    if (mesaj == "") {
        hata += "Mesaj boş bırakılamaz.\n";
    }

    if (hata != "") {
        var div = document.getElementById("hataMesaji");
        div.style.display = "block";
        div.innerHTML = hata.replace(/\n/g, "<br>");
    } else {
        document.getElementById("contactForm").submit();
    }
}
