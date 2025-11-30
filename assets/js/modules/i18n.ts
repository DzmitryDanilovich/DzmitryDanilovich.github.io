import { translations } from './translations';

export class I18nManager {
    private langButtons: NodeListOf<Element>;

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
                if (lang) {
                    this.setLanguage(lang);
                    localStorage.setItem('lang', lang);
                }
            });
        });
    }

    setLanguage(lang: string) {
        this.updateButtons(lang);
        this.updateContent(lang);
        document.documentElement.lang = lang;
    }

    updateButtons(lang: string) {
        this.langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    updateContent(lang: string) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                const value = this.getTranslation(lang, key);
                if (value) element.textContent = value;
            }
        });
    }

    getTranslation(lang: string, key: string) {
        return key.split('.').reduce((obj: any, k: string) => obj && obj[k], (translations as any)[lang]);
    }
}
