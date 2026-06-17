import { initNavigation } from '../js/modules/navigation.js';
import { renderStaticContent } from '../js/modules/renderContent.js';
import { initCounterAnimation } from '../js/modules/counter.js';
import { initCommissionCalculator } from '../js/modules/commission.js';
import { initBannerCarousel } from '../js/modules/carousel.js';
import { initProviderMarquee } from '../js/modules/marquee.js';
import { initBackToTop } from '../js/modules/backToTop.js';
import { initStarfield } from '../js/modules/starfield.js';
import { initScrollReveal } from '../js/modules/scrollReveal.js';
import { initLiveTransaction } from '../js/modules/liveTransaction.js';
import { initDownloadBar } from '../js/modules/downloadBar.js';
import { initPromoModal } from '../js/modules/promoModal.js';
import { initContactFloat } from '../js/modules/contactFloat.js';
import { initLazyMedia } from '../js/modules/lazyMedia.js';

let initialized = false;

export function bootstrapLegacyModules() {
    if (initialized) return;

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

    initialized = true;
}
