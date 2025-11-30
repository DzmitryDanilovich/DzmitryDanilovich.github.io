import { I18nManager } from './modules/i18n';
import { ThemeManager } from './modules/theme';
import { UIManager } from './modules/ui';
import { CookieManager } from './modules/cookies';
import { ParallaxManager } from './modules/parallax';
import { FooterManager } from './modules/footer';

document.addEventListener('DOMContentLoaded', () => {
    new I18nManager();
    new ThemeManager();
    new UIManager();
    new CookieManager();
    new ParallaxManager();
    new FooterManager();
});
