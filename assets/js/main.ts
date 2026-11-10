import '../css/style.less';

import { I18nManager } from './modules/i18n';
import { ThemeManager } from './modules/theme';
import { UIManager } from './modules/ui';
import { ParallaxManager } from './modules/parallax';
import { FooterManager } from './modules/footer';

document.addEventListener('DOMContentLoaded', () => {
    new I18nManager();
    new ThemeManager();
    new UIManager();
    new ParallaxManager();
    new FooterManager();
});
