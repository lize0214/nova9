﻿import { qs } from '../utils/dom.js';

const SPEED = 150;

export function initProviderMarquee() {
    const marquee = qs('#providerMarquee');
    const track = qs('#providerTrack');
    const trackReverse = qs('#providerTrackReverse');
    if (!marquee) return;

    const setupTrack = (targetTrack, animationName) => {
        if (!targetTrack || targetTrack.children.length === 0) return null;
        if (targetTrack.dataset.marqueeReady === '1') return targetTrack;
        const clones = Array.from(targetTrack.children).map((node) => node.cloneNode(true));
        clones.forEach((clone) => targetTrack.appendChild(clone));
        targetTrack.dataset.marqueeReady = '1';
        const duration = 2 * clones.length * SPEED / 100;
        targetTrack.style.animation = `${animationName} ${duration}s linear infinite`;
        targetTrack.style.animationPlayState = 'running';
        return targetTrack;
    };

    let tracks = [];
    let hasSetup = false;

    const applyPlayState = (state) => {
        tracks.forEach((item) => { item.style.animationPlayState = state; });
    };

    const setup = () => {
        if (hasSetup) return;
        tracks = [
            setupTrack(track, 'providerLoop'),
            setupTrack(trackReverse, 'providerLoopReverse')
        ].filter(Boolean);

        if (tracks.length === 0) return;
        hasSetup = true;

        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (canHover) {
            marquee.addEventListener('pointerenter', () => applyPlayState('paused'));
            marquee.addEventListener('pointerleave', () => applyPlayState('running'));
        }

        document.addEventListener('visibilitychange', () => {
            applyPlayState(document.hidden ? 'paused' : 'running');
        });

        observer.disconnect();
    };

    const observer = new MutationObserver(() => setup());
    observer.observe(marquee, { childList: true, subtree: true });
    setup();
}
