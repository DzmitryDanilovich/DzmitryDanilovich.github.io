declare const gtag: any;

export class CookieManager {
    private banner: HTMLElement | null;
    private acceptBtn: HTMLElement | null;
    private rejectBtn: HTMLElement | null;

    constructor() {
        this.banner = document.getElementById('cookie-banner');
        this.acceptBtn = document.getElementById('accept-cookies');
        this.rejectBtn = document.getElementById('reject-cookies');
        this.init();
    }

    init() {
        if (!this.banner || !this.acceptBtn || !this.rejectBtn) return;

        const savedConsent = localStorage.getItem('cookieConsent');

        if (!savedConsent) {
            setTimeout(() => this.banner!.classList.remove('hidden'), 1000);
        } else if (savedConsent === 'granted') {
            this.updateGAConsent(true);
        }

        this.acceptBtn.addEventListener('click', () => this.handleConsent(true));
        this.rejectBtn.addEventListener('click', () => this.handleConsent(false));
    }

    handleConsent(granted: boolean) {
        localStorage.setItem('cookieConsent', granted ? 'granted' : 'denied');
        this.updateGAConsent(granted);
        this.banner!.classList.add('hidden');
    }

    updateGAConsent(granted: boolean) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': granted ? 'granted' : 'denied',
                'analytics_storage': granted ? 'granted' : 'denied'
            });
        }
    }
}
