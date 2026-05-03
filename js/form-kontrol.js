function nativeValidate() {
    let valid = true;

    document.querySelectorAll('.native-error').forEach(el => el.remove());
    document.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));

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

createApp({
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
