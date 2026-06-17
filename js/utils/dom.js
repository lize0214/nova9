// 常用 DOM 工具函数：减少重复代码，统一空值处理逻辑。
import { getLanguageLocale } from '../../src/i18n/index.js';

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function formatCurrency(value) {
    const amount = Number(value || 0);
    const formatter = new Intl.NumberFormat(getLanguageLocale(), {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return `SGD ${formatter.format(amount)}`;
}

export function createImageCard(className, item) {
    const card = document.createElement('a');
    card.className = className;
    card.href = item.url || '#';
    card.target = item.url ? '_blank' : '_self';
    card.rel = item.url ? 'noopener noreferrer' : '';

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.name;
    image.loading = 'lazy';
    image.decoding = 'async';

    const text = document.createElement('p');
    text.textContent = item.name;

    card.appendChild(image);
    card.appendChild(text);
    return card;
}
