import { qs } from '../utils/dom.js';

// 横幅跑马灯：双份内容无缝滚动，按钮可手动微调。
export function initBannerCarousel() {
    const track = qs('#bannerTrack');
    const viewport = qs('[data-carousel-viewport]');
    const prevButton = qs('#carouselPrev');
    const nextButton = qs('#carouselNext');
    if (!track || !viewport) return;

    const baseItems = Array.from(track.children);
    if (baseItems.length === 0) return;

    // 复制一份横幅实现“到末尾后无感回绕”。
    baseItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    let previousTimestamp = performance.now();
    const speedPxPerSecond = 36;
    const manualStep = 300;
    let isPaused = false;
    let frameId = 0;
    let loopWidth = 0;
    let offsetX = 0;

    function refreshLoopWidth() {
        loopWidth = track.scrollWidth / 2;
    }

    function normalizeOffset() {
        if (loopWidth <= 0) return;
        while (offsetX >= loopWidth) offsetX -= loopWidth;
        while (offsetX < 0) offsetX += loopWidth;
    }

    function renderOffset() {
        track.style.transform = `translate3d(${-offsetX}px, 0, 0)`;
    }

    function tick(now) {
        const deltaSeconds = Math.min((now - previousTimestamp) / 1000, 0.5);
        previousTimestamp = now;
        if (!isPaused && loopWidth > 0) {
            offsetX += speedPxPerSecond * deltaSeconds;
            normalizeOffset();
            renderOffset();
        }
        frameId = window.requestAnimationFrame(tick);
    }

    function manualMove(distance) {
        if (loopWidth <= 0) return;
        offsetX += distance;
        normalizeOffset();
        renderOffset();
    }

    if (prevButton) prevButton.addEventListener('click', () => manualMove(-manualStep));
    if (nextButton) nextButton.addEventListener('click', () => manualMove(manualStep));

    window.addEventListener('resize', () => {
        refreshLoopWidth();
        normalizeOffset();
        renderOffset();
    });

    function ensureLoopWidth() {
        track.querySelectorAll('img').forEach((image) => {
            if (image.complete) {
                refreshLoopWidth();
            } else {
                image.addEventListener('load', () => {
                    refreshLoopWidth();
                    normalizeOffset();
                    renderOffset();
                }, { once: true });
            }
        });
        refreshLoopWidth();
    }

    function startLoop() {
        ensureLoopWidth();
        if (loopWidth <= 0) {
            frameId = window.requestAnimationFrame(startLoop);
            return;
        }
        normalizeOffset();
        renderOffset();
        previousTimestamp = performance.now();
        frameId = window.requestAnimationFrame(tick);
    }

    startLoop();
    window.addEventListener('beforeunload', () => {
        if (frameId) window.cancelAnimationFrame(frameId);
    });
}
