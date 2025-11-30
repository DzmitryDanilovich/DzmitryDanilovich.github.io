export class ParallaxManager {
    constructor() {
        this.container = document.querySelector('.parallax-container');
        this.init();
    }

    init() {
        if (!this.container) return;

        window.addEventListener('scroll', () => requestAnimationFrame(this.update.bind(this)));
        window.addEventListener('resize', () => requestAnimationFrame(this.update.bind(this)));
        this.update();
    }

    update() {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const containerHeight = this.container.offsetHeight;

        const maxScroll = documentHeight - windowHeight;
        const maxTranslate = containerHeight - windowHeight;

        if (maxScroll > 0 && maxTranslate > 0) {
            // Clamp scroll value to prevent background jumping during overscroll
            const clampedScroll = Math.max(0, Math.min(scrolled, maxScroll));
            const translateValue = (clampedScroll / maxScroll) * maxTranslate;
            this.container.style.transform = `translateY(-${translateValue}px)`;
        } else {
            this.container.style.transform = 'translateY(0px)';
        }
    }
}
