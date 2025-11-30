export class FooterManager {
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
        // Add padding to body to prevent content from being hidden behind footer
        // We add a bit extra space (20px) for aesthetics
        const footerHeight = this.footer.offsetHeight;
        this.body.style.paddingBottom = `${footerHeight}px`;
        this.update();
    }

    update() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate distance from the bottom of the document
        // When we are at the bottom, distance is 0
        // When we overscroll (pull up), distance becomes negative
        const distanceToBottom = documentHeight - windowHeight - scrollY;

        // We want the footer to appear as if it's at the bottom of the document.
        // So we push it down by 'distanceToBottom'.
        // But we clamp it at 0, so it never moves UP past the bottom of the screen (handling overscroll).
        const translateY = Math.max(0, distanceToBottom);

        this.footer.style.transform = `translateY(${translateY}px)`;
    }
}
