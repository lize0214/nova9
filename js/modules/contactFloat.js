import { APP_CONFIG } from '../config.js';
import { qs } from '../utils/dom.js';

export function initContactFloat() {
    const container = qs('#contactFloat');
    const toggle = qs('#contactToggle');
    const whatsappLink = qs('#contactWhatsapp');
    const telegramLink = qs('#contactTelegram');
    if (!container || !toggle) return;

    whatsappLink.href = `https://wa.me/${APP_CONFIG.whatsapp}`;
    telegramLink.href = `https://t.me/${APP_CONFIG.telegram}`;

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
