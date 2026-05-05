import { qs } from '../utils/dom.js';

const SHOW_THRESHOLD = 16;

export function initDownloadBar() {
    const bar = qs('#topDownloadBar');
    if (!bar) return;

    const syncBarState = () => {
        const shouldShow = window.scrollY <= SHOW_THRESHOLD;
        const barHeight = bar.offsetHeight;
        document.body.style.setProperty('--download-bar-height', `${barHeight}px`);
        document.body.classList.toggle('download-bar-visible', shouldShow);
        bar.classList.toggle('is-hidden', !shouldShow);
    };

    syncBarState();
    window.addEventListener('scroll', syncBarState, { passive: true });
    window.addEventListener('resize', syncBarState);
}
