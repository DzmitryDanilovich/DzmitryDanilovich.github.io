import { translations } from './translations.js';

export class I18nManager {
    constructor() {
        this.langButtons = document.querySelectorAll('.lang-btn');
        this.init();
    }

    init() {
        const savedLang = localStorage.getItem('lang') || 'en';
        this.setLanguage(savedLang);

        this.langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
                localStorage.setItem('lang', lang);
            });
        });
    }

    setLanguage(lang) {
        this.updateButtons(lang);
        this.updateContent(lang);
        document.documentElement.lang = lang;
    }

    updateButtons(lang) {
        this.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getTranslation(lang, key);
            if (value) element.textContent = value;
        });
    }

    getTranslation(lang, key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
    }
}
