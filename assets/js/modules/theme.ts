export class ThemeManager {
    private themeToggle: HTMLElement | null;
    private icon: HTMLElement | null;

    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.icon = this.themeToggle?.querySelector('i') || null;
        this.init();
    }

    init() {
        if (!this.themeToggle || !this.icon) return;

        this.updateIcon(document.documentElement.getAttribute('data-theme') === 'dark');
        this.setupListeners();
    }

    setupListeners() {
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

    setTheme(theme: string, save = true) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        if (save) localStorage.setItem('theme', theme);
        this.updateIcon(theme === 'dark');
    }

    updateIcon(isDark: boolean) {
        if (this.icon) {
            this.icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}
