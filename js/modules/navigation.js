import { APP_CONFIG } from '../config.js';
import { qs } from '../utils/dom.js';

// 导航模块：处理移动端开关、滚动高亮和锚点滚动。
// 调整这个值即可微调点击导航后的“贴顶距离”（单位：px）。
const NAV_SCROLL_OFFSET = 8;
const MOBILE_NAV_BREAKPOINT = 920;

export function initNavigation() {
    const menuToggle = qs('#menuToggle');
    const siteNav = qs('#siteNav');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const mobileNavLinks = Array.from(document.querySelectorAll('#mobileNav a[href^="#"]'));

    if (menuToggle && siteNav) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const scrollToSectionTop = (hash) => {
        const target = document.querySelector(hash);
        if (!target) return;
        const header = document.getElementById('siteHeader');
        const headerOffset = header ? header.getBoundingClientRect().height + NAV_SCROLL_OFFSET : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        window.history.replaceState(null, '', hash);
    };

    [...navLinks, ...mobileNavLinks].forEach((link) => {
        link.addEventListener('click', (event) => {
            const hash = link.getAttribute('href');
            if (!hash || !hash.startsWith('#')) return;
            event.preventDefault();
            if (siteNav && menuToggle) {
                siteNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            scrollToSectionTop(hash);
        });
    });

    window.addEventListener('resize', () => {
        if (!siteNav || !menuToggle) return;
        if (window.innerWidth > MOBILE_NAV_BREAKPOINT) {
            siteNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    const sections = Array.from(document.querySelectorAll('main section[id]'));
    window.addEventListener('scroll', () => {
        let currentId = '#home';
        sections.forEach((section) => {
            if (window.scrollY + 120 >= section.offsetTop) currentId = `#${section.id}`;
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === currentId);
        });
    }, { passive: true });

    const cta = document.getElementById('ctaJoin');
    if (cta) cta.href = APP_CONFIG.telegramUrl;
}
