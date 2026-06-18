import { qs } from '../utils/dom.js';

export function initBannerCarousel() {
    const track = qs('#bannerTrack');
    if (!track) return;

    const items = () => Array.from(track.children);
    if (items().length === 0) return;

    const PAUSE = 60 * 1000;
    const SPEED = 400;
    let index = 0;
    let timer = null;
    let locked = false;

    function go(n) {
        if (locked || items().length <= 1) return;
        locked = true;
        index = ((n % items().length) + items().length) % items().length;
        track.style.transition = `transform ${SPEED}ms ease`;
        track.style.transform = `translateX(-${index * 100}%)`;
        resetTimer();
        setTimeout(() => { locked = false; }, SPEED);
    }

    function next() { go(index + 1); }

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(next, PAUSE);
    }

    function init() {
        const imgs = items().filter(el => el.tagName === 'IMG' && !el.complete);
        const onReady = () => {
            track.style.transform = 'translateX(0)';
            resetTimer();
        };
        if (imgs.length > 0) {
            Promise.all(imgs.map(img => new Promise(r => {
                img.addEventListener('load', r, { once: true });
                img.addEventListener('error', r, { once: true });
            }))).then(onReady);
        } else {
            onReady();
        }
    }

    init();
}
