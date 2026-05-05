﻿import { qsa } from '../utils/dom.js';

// 统计数字模块：当统计区块进入视口时，执行一次动画计数。
export function initCounterAnimation() {
    const counters = qsa('[data-counter]');
    if (!counters.length) return;

    let hasPlayed = false;
    const heroStats = document.getElementById('heroStats');
    if (!heroStats) return;

    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting || hasPlayed) return;

        counters.forEach((counter) => animateCounter(counter));
        hasPlayed = true;
        observer.disconnect();
    }, { threshold: 0.4 });

    observer.observe(heroStats);
}

function animateCounter(counterElement) {
    const target = Number(counterElement.dataset.target || '0');
    const suffix = counterElement.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counterElement.textContent = `${Math.floor(target * eased).toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}
