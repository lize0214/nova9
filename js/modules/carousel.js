﻿import { qs } from '../utils/dom.js';

// 横幅跑马灯：双份内容无缝滚动，悬停自动暂停，按钮可手动微调。
export function initBannerCarousel() {
    const track = qs('#bannerTrack');
    const viewport = qs('[data-carousel-viewport]');
    const prevButton = qs('#carouselPrev');
    const nextButton = qs('#carouselNext');
    if (!track || !viewport) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        const deltaSeconds = (now - previousTimestamp) / 1000;
        previousTimestamp = now;
        if (!isPaused && !prefersReducedMotion && loopWidth > 0) {
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

    viewport.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    viewport.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    document.addEventListener('visibilitychange', () => {
        isPaused = document.hidden;
    });

    window.addEventListener('resize', () => {
        refreshLoopWidth();
        normalizeOffset();
        renderOffset();
    });

    track.querySelectorAll('img').forEach((image) => {
        image.addEventListener('load', () => {
            refreshLoopWidth();
            normalizeOffset();
            renderOffset();
        }, { once: true });
    });

    refreshLoopWidth();
    renderOffset();
    frameId = window.requestAnimationFrame(tick);
    window.addEventListener('beforeunload', () => {
        if (frameId) window.cancelAnimationFrame(frameId);
    });
}
