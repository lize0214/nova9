import i18n from '../../src/i18n/index.js';
import { formatCurrency, qs } from '../utils/dom.js';

const FIXED_ROWS = [
    { account: '35A703152',  amount: 69939.34, platform: 'EVOLUTION', category: 'LIVE' },
    { account: '361968797', amount: 35450.50, platform: 'EVOLUTION', category: 'LIVE' },
    { account: 'A052A609A', amount: 29653.72, platform: 'JILI',      category: 'SLOT' },
    { account: 'A37505075', amount: 28770.12, platform: 'FACAI',     category: 'SLOT' },
    { account: 'A37A5887A', amount: 23660.53, platform: 'MEGA888H5', category: 'SLOT' },
];

function formatCategory(category) {
    return i18n.t(`liveTransaction.categories.${category}`, { defaultValue: category });
}

function getRankIcon(rankIndex) {
    if (rankIndex === 0) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 text-amber-600"><path fill="currentColor" d="M7 4h10v2a5 5 0 0 1-3 4.58V13h3v2H7v-2h3v-2.42A5 5 0 0 1 7 6V4Zm-2 1h2v1a7 7 0 0 0 .33 2.12A3.5 3.5 0 0 1 5 5Zm14 0a3.5 3.5 0 0 1-2.33 3.12A7 7 0 0 0 17 6V5h2ZM10 17h4v3h-4v-3Z"/></svg>';
    }
    if (rankIndex === 1) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 text-yellow-500"><circle cx="12" cy="14" r="5" fill="currentColor"/><path fill="currentColor" d="M8 3h3l1 6H9L8 3Zm8 0h-3l-1 6h3l1-6Z"/></svg>';
    }
    if (rankIndex === 2) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 text-slate-400"><circle cx="12" cy="14" r="5" fill="currentColor"/><path fill="currentColor" d="M8 3h3l1 6H9L8 3Zm8 0h-3l-1 6h3l1-6Z"/></svg>';
    }
    if (rankIndex === 3) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 text-amber-700"><circle cx="12" cy="14" r="5" fill="currentColor"/><path fill="currentColor" d="M8 3h3l1 6H9L8 3Zm8 0h-3l-1 6h3l1-6Z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-3.5 w-3.5 text-amber-400"><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>';
}

function getCategoryBadge(category) {
    const tone = category === 'LIVE'
        ? 'text-violet-200 border-violet-300/40 bg-violet-900/30'
        : category === 'FISH'
            ? 'text-cyan-200 border-cyan-300/40 bg-cyan-900/25'
            : 'text-amber-100 border-amber-300/40 bg-amber-900/25';
    return `<span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold shadow-sm ${tone}">${formatCategory(category)}</span>`;
}

function getRowBg(index) {
    return index % 2 === 0
        ? 'bg-white/[0.03]'
        : 'bg-white/[0.06]';
}

function animateCountUp(element, targetValue, delayMs) {
    const duration = 900;
    const startTime = performance.now() + delayMs;

    function step(now) {
        if (now < startTime) {
            requestAnimationFrame(step);
            return;
        }

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = targetValue * eased;

        element.textContent = formatCurrency(current);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

let _initialized = false;

export function initLiveTransaction() {
    if (_initialized) return;
    _initialized = true;

    const tbody = qs('#liveTransactionBody');
    const table = qs('#liveTransactionTable');
    const cardsContainer = qs('#liveTransactionCards');
    if (!tbody) return;

    // Render table rows (desktop)
    FIXED_ROWS.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.className = `align-middle text-amber-100 tx-row-stagger ${getRowBg(index)}`;
        tr.style.animationDelay = `${index * 80}ms`;

        const rankIcon = getRankIcon(index);

        tr.innerHTML = `
            <td class="border-b border-amber-300/20 px-2 py-3.5 text-center">${index + 1}</td>
            <td class="border-b border-amber-300/20 px-4 py-3.5">
                <span class="inline-flex items-center gap-2"><span class="ranking-icon">${rankIcon}</span><span class="text-sm">${row.account}</span></span>
            </td>
            <td class="tx-count-up border-b border-amber-300/20 px-4 py-3.5 text-sm font-semibold text-amber-100">${formatCurrency(0)}</td>
            <td class="border-b border-amber-300/20 px-4 py-3.5 text-sm">${row.platform}</td>
            <td class="border-b border-amber-300/20 px-4 py-3.5">${getCategoryBadge(row.category)}</td>
        `;
        tbody.appendChild(tr);
    });

    // Render mobile cards
    if (cardsContainer) {
        FIXED_ROWS.forEach((row, index) => {
            const card = document.createElement('div');
            card.className = 'lt-card tx-row-stagger rounded-2xl border border-amber-300/30 bg-white/5 p-4 backdrop-blur-sm';
            card.style.animationDelay = `${index * 80}ms`;

            const rankIcon = getRankIcon(index);
            const categoryTone = row.category === 'LIVE'
                ? 'text-violet-200 border-violet-300/40 bg-violet-900/30'
                : row.category === 'FISH'
                    ? 'text-cyan-200 border-cyan-300/40 bg-cyan-900/25'
                    : 'text-amber-100 border-amber-300/40 bg-amber-900/25';

            card.innerHTML = `
                <div class="lt-card-row">
                    <span class="lt-card-label">#</span>
                    <span class="inline-flex items-center gap-2 text-sm font-bold text-amber-100">${rankIcon} <span class="text-amber-200/80">${index + 1}</span></span>
                </div>
                <div class="lt-card-row">
                    <span class="lt-card-label">${i18n.t('liveTransaction.member')}</span>
                    <span class="inline-flex items-center gap-2 text-sm font-semibold text-amber-100">${row.account}</span>
                </div>
                <div class="lt-card-row">
                    <span class="lt-card-label">${i18n.t('liveTransaction.amount')}</span>
                    <span class="lt-card-amount text-sm font-bold text-amber-100">${formatCurrency(0)}</span>
                </div>
                <div class="lt-card-row">
                    <span class="lt-card-label">${i18n.t('liveTransaction.platform')}</span>
                    <span class="lt-card-value">${row.platform}</span>
                </div>
                <div class="lt-card-row">
                    <span class="lt-card-label">${i18n.t('liveTransaction.category')}</span>
                    <span class="inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold shadow-sm ${categoryTone}">${formatCategory(row.category)}</span>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    }

    // IntersectionObserver: trigger animations when table enters viewport
    const section = document.getElementById('live-transaction');
    if (!section) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            // Fade in the table
            if (table) {
                table.classList.add('tx-table-enter');
            }

            // Trigger count-up on each amount cell with staggered delay
            const amountCells = tbody.querySelectorAll('.tx-count-up');
            const cardAmounts = cardsContainer ? cardsContainer.querySelectorAll('.lt-card-amount') : [];
            FIXED_ROWS.forEach((row, index) => {
                if (amountCells[index]) {
                    animateCountUp(amountCells[index], row.amount, index * 80);
                }
                if (cardAmounts[index]) {
                    animateCountUp(cardAmounts[index], row.amount, index * 80);
                }
            });

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    observer.observe(section);
}
