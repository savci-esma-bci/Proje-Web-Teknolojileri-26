// Native JS hata temizleme yardimci fonksiyonu
function nativeHatalariTemizle() {
    document.querySelectorAll('.native-error').forEach(el => el.remove());
    document.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));
}

// inputa yazilmaya baslaninca hata fade olup gitsin
document.addEventListener('DOMContentLoaded', function () {
    const izlenenAlanlar = ['adSoyad', 'eposta', 'telefon', 'mesaj'];

    izlenenAlanlar.forEach(function (id) {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('input', function () {
            // hata stillerini kaldir
            el.classList.remove('is-error');

            // A] Native hatayi fade ile kaldir
            const nativeErr = el.parentNode.querySelector('.native-error');
            if (nativeErr) {
                nativeErr.style.transition = 'opacity 0.4s';
                nativeErr.style.opacity = '0';
                setTimeout(() => nativeErr.remove(), 400);
            }

            // B] Vue hatasini fade ile kaldir
            if (vueApp && vueApp.vueErrors && vueApp.vueErrors[id]) {
                const vueErr = el.parentNode.querySelector('.vue-error') || el.parentNode.querySelector('.error-text');

                if (vueErr) {
                    vueErr.style.transition = 'opacity 0.4s ease';
                    vueErr.style.opacity = '0';
                    setTimeout(() => {
                        vueApp.vueErrors[id] = '';
                    }, 400);
                } else {
                    vueApp.vueErrors[id] = '';
                }
            }
        });
    });

    // select icin ayri dinleyici
    const konu = document.getElementById('konu');
    if (konu) {
        konu.addEventListener('change', function () {
            konu.classList.remove('is-error');
            
            // select icin Native hatai fade ile kaldir
            const nativeErr = konu.parentNode.querySelector('.native-error');
            if (nativeErr) {
                nativeErr.style.transition = 'opacity 0.4s';
                nativeErr.style.opacity = '0';
                setTimeout(() => nativeErr.remove(), 400);
            }

            // select icin Vue hatasini fade ile kaldir
            if (vueApp && vueApp.vueErrors && vueApp.vueErrors.konu) {
                const vueErr = konu.parentNode.querySelector('.vue-error') || konu.parentNode.querySelector('.error-text');
                if (vueErr) {
                    vueErr.style.transition = 'opacity 0.4s ease';
                    vueErr.style.opacity = '0';
                    setTimeout(() => {
                        vueApp.vueErrors.konu = '';
                    }, 400);
                } else {
                    vueApp.vueErrors.konu = '';
                }
            }
        });
    }
});

function nativeValidate() {
    let valid = true;

    // Native ve Vue hatalarini temizle
    nativeHatalariTemizle();
    vueApp.vueErrors = {};

    function showError(fieldId, msg) {
        const field = document.getElementById(fieldId);
        field.classList.add('is-error');
        const err = document.createElement('div');
        err.className = 'error-text native-error';
        err.textContent = msg;
        field.parentNode.appendChild(err);
        valid = false;
    }

    const adSoyad = document.getElementById('adSoyad').value.trim();
    const eposta  = document.getElementById('eposta').value.trim();
    const telefon = document.getElementById('telefon').value.trim();
    const konu    = document.getElementById('konu').value;
    const mesaj   = document.getElementById('mesaj').value.trim();

    if (!adSoyad)
        showError('adSoyad', 'Ad soyad boş bırakılamaz.');

    if (!eposta)
        showError('eposta', 'E-posta boş bırakılamaz.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta))
        showError('eposta', 'Geçerli bir e-posta adresi giriniz.');

    if (!telefon)
        showError('telefon', 'Telefon boş bırakılamaz.');
    else if (!/^\d{10,11}$/.test(telefon))
        showError('telefon', 'Telefon numarası yalnızca rakamlardan oluşmalı ve 10-11 hane olmalıdır.');

    if (!konu)
        showError('konu', 'Lütfen bir konu seçiniz.');

    if (!mesaj)
        showError('mesaj', 'Mesaj boş bırakılamaz.');

    if (valid) {
        document.getElementById('contactForm').submit();
    }
}

const { createApp } = Vue;

const vueApp = createApp({
    data() {
        return {
            submitted: false,
            form: {
                adSoyad: '',
                eposta: '',
                telefon: '',
                konu: '',
                iletisimYontemi: 'farketmez',
                ilgiAlanlari: [],
                mesaj: ''
            },
            vueErrors: {}
        };
    },
    methods: {
        vueValidate() {
            this.vueErrors = {};

            // Native JS hatalarini da temizle
            nativeHatalariTemizle();

            let valid = true;

            if (!this.form.adSoyad.trim()) {
                this.vueErrors.adSoyad = 'Ad soyad boş bırakılamaz.';
                valid = false;
            }

            if (!this.form.eposta.trim()) {
                this.vueErrors.eposta = 'E-posta boş bırakılamaz.';
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.eposta)) {
                this.vueErrors.eposta = 'Geçerli bir e-posta adresi giriniz.';
                valid = false;
            }

            if (!this.form.telefon.trim()) {
                this.vueErrors.telefon = 'Telefon boş bırakılamaz.';
                valid = false;
            } else if (!/^\d{10,11}$/.test(this.form.telefon)) {
                this.vueErrors.telefon = 'Telefon numarası yalnızca rakamlardan oluşmalı ve 10-11 hane olmalıdır.';
                valid = false;
            }

            if (!this.form.konu) {
                this.vueErrors.konu = 'Lütfen bir konu seçiniz.';
                valid = false;
            }

            if (!this.form.mesaj.trim()) {
                this.vueErrors.mesaj = 'Mesaj boş bırakılamaz.';
                valid = false;
            }

            if (valid) {
                document.getElementById('contactForm').submit();
            }
        }
    }
}).mount('#contactApp');
