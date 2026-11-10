export class UIManager {
    constructor() {
        this.initMobileMenu();
        this.initCurrentSection();
        this.updateCopyrightYear();
    }

    initMobileMenu() {
        const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
        const panel = document.getElementById('nav-panel');

        if (!toggle || !panel) return;

        const setOpen = (open: boolean) => {
            panel.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };

        toggle.addEventListener('click', () => setOpen(!panel.classList.contains('open')));

        panel.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => setOpen(false));
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && panel.classList.contains('open')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    // Marks the nav link of the section crossing a band just above mid-viewport.
    // The last section is often too short to reach that band, so the bottom of
    // the page counts as the last section.
    initCurrentSection() {
        const links = new Map<string, HTMLAnchorElement>();
        document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]').forEach(link => {
            links.set(link.hash.slice(1), link);
        });

        const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
        const lastId = sections[sections.length - 1]?.id;
        if (!lastId) return;

        let inBand = '';
        let current = '';

        const update = () => {
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            const id = atBottom ? lastId : inBand;
            if (id === current) return;
            current = id;
            links.forEach((link, key) => {
                if (key === id) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) inBand = entry.target.id;
            });
            update();
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(section => observer.observe(section));
        window.addEventListener('scroll', update, { passive: true });
    }

    updateCopyrightYear() {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear().toString();
        }
    }
}
