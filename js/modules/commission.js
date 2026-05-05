import { APP_CONFIG } from '../config.js';
import { qs, formatCurrency } from '../utils/dom.js';

// 佣金模块：封装计算逻辑，避免在事件处理器中散落重复代码。
export function initCommissionCalculator() {
    const rateInput = qs('#commissionRate');
    const rateText = qs('#commissionRateText');
    const depositInput = qs('#depositValue');
    const dailyResult = qs('#dailyCommission');
    const monthlyResult = qs('#monthlyCommission');

    if (!rateInput || !depositInput || !dailyResult || !monthlyResult || !rateText) return;

    rateInput.min = String(APP_CONFIG.commission.minRate);
    rateInput.max = String(APP_CONFIG.commission.maxRate);
    rateInput.value = String(APP_CONFIG.commission.defaultRate);

    function updateResult() {
        const rate = Number(rateInput.value) / 100;
        const deposit = Number(depositInput.value || 0);
        const dailyCommission = deposit * rate;
        const monthlyCommission = dailyCommission * APP_CONFIG.commission.monthlyFactor;

        rateText.textContent = `${rateInput.value}%`;
        dailyResult.textContent = formatCurrency(dailyCommission);
        monthlyResult.textContent = formatCurrency(monthlyCommission);
    }

    rateInput.addEventListener('input', updateResult);
    depositInput.addEventListener('input', updateResult);
    updateResult();
}
