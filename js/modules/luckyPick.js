import { APP_CONFIG } from '../config.js';
import { qs } from '../utils/dom.js';

// 幸运推荐模块：从品牌列表随机抽取一个品牌并输出可点击结果。
export function initLuckyPick() {
    const luckyButton = qs('#luckyPickBtn');
    const luckyResult = qs('#luckyResult');
    if (!luckyButton || !luckyResult) return;

    luckyButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * APP_CONFIG.brands.length);
        const pickedBrand = APP_CONFIG.brands[randomIndex];

        luckyResult.innerHTML = `推荐：<a href="${pickedBrand.url}" target="_blank" rel="noopener noreferrer">${pickedBrand.name}</a>`;
    });
}
