import { I18nManager } from './modules/i18n.js';
import { ThemeManager } from './modules/theme.js';
import { UIManager } from './modules/ui.js';
import { CookieManager } from './modules/cookies.js';
import { ParallaxManager } from './modules/parallax.js';

document.addEventListener('DOMContentLoaded', () => {
    new I18nManager();
    new ThemeManager();
    new UIManager();
    new CookieManager();
    new ParallaxManager();
});
