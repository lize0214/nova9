export function initLazyMedia() {
    const applyBackground = () => {
        document.body.classList.add('bg-loaded');
    };

    if (typeof window === 'undefined') {
        applyBackground();
        return;
    }

    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(applyBackground, { timeout: 2000 });
        return;
    }

    window.setTimeout(applyBackground, 1500);
}
