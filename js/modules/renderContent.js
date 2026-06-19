﻿﻿﻿﻿﻿﻿﻿import { APP_CONFIG } from '../config.js';
import i18n from '../../src/i18n/index.js';
import { qs } from '../utils/dom.js';

// 数据渲染模块：按配置渲染厂商卡片与横幅。
export function renderStaticContent() {
    renderProviderCards();
    renderBanners();
}

function renderProviderCards() {
    const providerTrack = qs('#providerTrack');
    const providerTrackReverse = qs('#providerTrackReverse');
    if (!providerTrack && !providerTrackReverse) return;

    const createProviderCard = (provider) => {
        const card = document.createElement('div');
        card.className = 'w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl border border-amber-300/55 bg-black/35 shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm flex items-center justify-center p-2';

        const image = document.createElement('img');
        image.src = provider.image;
        image.alt = i18n.t('providers.logoAlt', { name: provider.name });
        image.loading = 'lazy';
        image.decoding = 'async';
        image.className = 'max-w-full max-h-full object-contain rounded-md';
        card.appendChild(image);
        return card;
    };

    if (providerTrack) {
        const fragment = document.createDocumentFragment();
        APP_CONFIG.providers.forEach((provider) => {
            fragment.appendChild(createProviderCard(provider));
        });
        providerTrack.innerHTML = '';
        providerTrack.appendChild(fragment);
    }

    if (providerTrackReverse) {
        const fragmentReverse = document.createDocumentFragment();
        [...APP_CONFIG.providers].reverse().forEach((provider) => {
            fragmentReverse.appendChild(createProviderCard(provider));
        });
        providerTrackReverse.innerHTML = '';
        providerTrackReverse.appendChild(fragmentReverse);
    }
}

function renderBanners() {
    const bannerTrack = qs('#bannerTrack');
    if (!bannerTrack) return;

    const fragment = document.createDocumentFragment();
    APP_CONFIG.banners.forEach((bannerUrl) => {
        const image = document.createElement('img');
        image.src = bannerUrl;
        image.alt = i18n.t('media.bannerAlt');
        image.loading = 'lazy';
        image.decoding = 'async';
        image.className = 'banner-carousel-img';
        fragment.appendChild(image);
    });

    bannerTrack.innerHTML = '';
    bannerTrack.appendChild(fragment);
}
