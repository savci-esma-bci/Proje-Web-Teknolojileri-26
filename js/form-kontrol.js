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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
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

const { createApp } = Vue;
createApp({
    data() {
        return {
            hatalar: []
        }
    },
    methods: {
        vueKontrol() {
            this.hatalar = [];

            var adSoyad = document.getElementById("adSoyad").value;
            var eposta = document.getElementById("eposta").value;
            var telefon = document.getElementById("telefon").value;
            var konu = document.getElementById("konu").value;
            var mesaj = document.getElementById("mesaj").value;

            if (adSoyad == "") {
                this.hatalar.push("Ad soyad boş bırakılamaz.");
            }
            if (eposta == "") {
                this.hatalar.push("E-posta boş bırakılamaz.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
                this.hatalar.push("Geçerli bir e-posta giriniz.");
            }
            if (telefon == "") {
                this.hatalar.push("Telefon boş bırakılamaz.");
            } else if (!/^\d+$/.test(telefon)) {
                this.hatalar.push("Telefon sadece rakam içermelidir.");
            }
            if (konu == "") {
                this.hatalar.push("Konu seçiniz.");
            }
            if (mesaj == "") {
                this.hatalar.push("Mesaj boş bırakılamaz.");
            }

            if (this.hatalar.length === 0) {
                document.getElementById("contactForm").submit();
            }
        }
    },
    mounted() {
        document.getElementById("vueGonderBtn").addEventListener("click", () => {
            this.vueKontrol();
        });
    }
}).mount("#vueHatalar");
