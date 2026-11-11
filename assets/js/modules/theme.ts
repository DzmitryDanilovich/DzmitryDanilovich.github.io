import faviconSource from '../../images/favicon.svg?raw';

export class ThemeManager {
    private themeToggle: HTMLElement | null;

    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.syncFavicon();
        this.init();
    }

    init() {
        if (!this.themeToggle) return;

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light', false);
            }
        });

        this.themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            this.setTheme(isDark ? 'light' : 'dark', true);
        });
    }

    // The sun/moon icon follows [data-theme] in CSS, so only the attribute changes here.
    setTheme(theme: string, save = true) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        if (save) localStorage.setItem('theme', theme);
        this.syncFavicon();
    }

    // favicon.svg turns light through a media query, so by itself it follows the system scheme.
    // Pinning that query makes it follow the theme chosen on the site instead.
    private syncFavicon() {
        const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]');
        if (!link) return;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const svg = faviconSource.replace('(prefers-color-scheme: light)', isDark ? 'not all' : 'all');
        link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }
}
