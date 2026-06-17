import { initNavigation } from './modules/navigation.js';
import { renderStaticContent } from './modules/renderContent.js';
import { initCounterAnimation } from './modules/counter.js';
import { initCommissionCalculator } from './modules/commission.js';
import { initBannerCarousel } from './modules/carousel.js';
import { initProviderMarquee } from './modules/marquee.js';
import { initBackToTop } from './modules/backToTop.js';
import { initStarfield } from './modules/starfield.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initLiveTransaction } from './modules/liveTransaction.js';
import { initDownloadBar } from './modules/downloadBar.js';
import { initPromoModal } from './modules/promoModal.js';
import { initContactFloat } from './modules/contactFloat.js';
import { initLazyMedia } from './modules/lazyMedia.js';

// 主入口：只负责按顺序初始化模块，避免逻辑耦合。
document.addEventListener('DOMContentLoaded', () => {
    renderStaticContent();
    initLazyMedia();
    initPromoModal();
    initContactFloat();
    initDownloadBar();
    initNavigation();
    initCounterAnimation();
    initCommissionCalculator();
    initBannerCarousel();
    initLiveTransaction();
    initProviderMarquee();
    initBackToTop();
    initStarfield();
    initScrollReveal();
});
