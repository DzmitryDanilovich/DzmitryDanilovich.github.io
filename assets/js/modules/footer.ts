export class FooterManager {
    private footer: HTMLElement | null;
    private body: HTMLElement;

    constructor() {
        this.footer = document.querySelector('.footer');
        this.body = document.body;
        this.init();
    }

    init() {
        if (!this.footer) return;

        // Set initial styles for fixed positioning simulation
        this.footer.style.position = 'fixed';
        this.footer.style.bottom = '0';
        this.footer.style.width = '100%';
        this.footer.style.zIndex = '1000'; // Ensure it's above content when visible
        this.footer.style.willChange = 'transform';

        // Bind methods
        this.update = this.update.bind(this);
        this.resize = this.resize.bind(this);

        // Add event listeners
        window.addEventListener('scroll', () => requestAnimationFrame(this.update));
        window.addEventListener('resize', () => requestAnimationFrame(this.resize));
        
        // Initial calculation
        this.resize();
        this.update();
    }

    resize() {
        if (!this.footer) return;
        // Add padding to body to prevent content from being hidden behind footer
        // We add a bit extra space (20px) for aesthetics
        const footerHeight = this.footer.offsetHeight;
        this.body.style.paddingBottom = `${footerHeight}px`;
        this.update();
    }

    update() {
        if (!this.footer) return;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate distance from the bottom of the document
        // When we are at the bottom, distance is 0
        // When we overscroll (pull up), distance becomes negative
        const distanceToBottom = documentHeight - windowHeight - scrollY;

        // We want the footer to appear as if it's at the bottom of the document.
        // So we push it down by 'distanceToBottom'.
        // However, we only want to push it down (positive translateY), never pull it up (negative translateY)
        // relative to its fixed position at bottom:0.
        
        // When distanceToBottom > 0 (we are above the bottom), we push the footer down so it's hidden or lower.
        // When distanceToBottom <= 0 (we are at bottom or overscrolling), we want it to stick to bottom (translateY = 0).
        // Actually, if we want it to be revealed as we scroll, we might want a different logic.
        // But based on "reveal" effect:
        // The footer is fixed at bottom.
        // We want it to be covered by the content.
        // So we usually use z-index -1 on footer and margin-bottom on body.
        // But here the logic seems to be manual translation.
        
        // Let's stick to the existing logic translation:
        const translateY = Math.max(0, distanceToBottom);
        
        this.footer.style.transform = `translateY(${translateY}px)`;
    }
}
