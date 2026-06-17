import { qs } from '../utils/dom.js';
import { APP_CONFIG } from '../config.js';

export function initPromoModal() {
    const modal = qs('#promoModal');
    const closeButton = qs('#promoModalClose');
    if (!modal || !closeButton) return;

    const closeModal = () => {
        modal.classList.add('is-hidden');
        document.body.classList.remove('modal-open');
    };

    const openModal = () => {
        console.log('openModal');
        modal.classList.remove('is-hidden');
        document.body.classList.add('modal-open');
    };

    if (APP_CONFIG.promoModal?.enabled) {
        openModal();
    }
    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('is-hidden')) closeModal();
    });
}
