import { APP_CONFIG } from '../config.js';
import { qs } from '../utils/dom.js';

export function initSocialFloat() {
    const container = qs('#socialFloat');
    const toggle = qs('#socialToggle');
    const facebookLink = qs('#socialFacebook');
    const telegramLink = qs('#socialTelegram');
    if (!container || !toggle || !facebookLink || !telegramLink) return;

    if (container.dataset.socialFloatInitialized === 'true') return;
    container.dataset.socialFloatInitialized = 'true';

    facebookLink.href = APP_CONFIG.socialFacebook;
    telegramLink.href = APP_CONFIG.socialTelegram;

    toggle.addEventListener('click', () => {
        container.classList.toggle('is-open');
    });

    document.addEventListener('click', (event) => {
        if (!container.contains(event.target)) {
            container.classList.remove('is-open');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            container.classList.remove('is-open');
        }
    });
}
