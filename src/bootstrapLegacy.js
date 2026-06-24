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
import { initContactFloat } from '../js/modules/contactFloat.js';
import { initLazyMedia } from '../js/modules/lazyMedia.js';
import { initBgEffects } from '../js/modules/bgEffects.js';
import { initGlobe3d } from '../js/modules/globe3d.js';

let initialized = false;

export function bootstrapLegacyModules(force = false) {
    if (initialized && !force) return;

    renderStaticContent();
    initLazyMedia();
    initBgEffects();
    initGlobe3d();
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

    if (!force) initialized = true;
}
