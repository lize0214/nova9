import { qs } from '../utils/dom.js';

const MAX_ROWS = 5;
const GLOBAL_SEED = 20260101;
const MIN_UPDATE_MS = 1100;
const PUSH_NEW_ROW_EVERY = 4;

const platformPool = [
    { name: 'MEGAH5', category: 'SLOT' },
    { name: 'RICH GAMING', category: 'SLOT' },
    { name: 'WF GAMING', category: 'SLOT' },
    { name: 'ACEWIN', category: 'SLOT' },
    { name: 'EPICWIN', category: 'SLOT' },
    { name: '888KING', category: 'SLOT' },
    { name: 'CQ9', category: 'SLOT' },
    { name: 'JILI', category: 'SLOT' },
    { name: 'PRAGMATIC PLAY', category: 'SLOT' },
    { name: 'SPADE GAMING', category: 'SLOT' },
    { name: 'EVOLUTION', category: 'LIVE' },
    { name: 'DREAMGAMING', category: 'LIVE' },
    { name: 'WM CASINO', category: 'LIVE' },
    { name: 'JDB', category: 'FISH' },
    { name: 'YOU LIAN', category: 'FISH' }
];

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function generateAmountBySeed(seed, volatility = 1) {
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 999);

    let amount = 0;
    if (r1 < 0.7) amount = 50 + r2 * 250;
    else if (r1 < 0.85) amount = 300 + r2 * 700;
    else if (r1 < 0.95) amount = 1000 + r2 * 4000;
    else if (r1 < 0.995) amount = 5000 + r2 * 10000;
    else amount = 15000 + r2 * 35000;

    return Number((amount * volatility).toFixed(2));
}

function generateRowByIndex(index, epoch = 0) {
    const seedBase = GLOBAL_SEED + index * 100;
    const volatility = 0.94 + seededRandom(seedBase + 515 + epoch) * 0.2;
    const amount = generateAmountBySeed(seedBase, volatility);
    const platformData = platformPool[Math.floor(seededRandom(seedBase + 33) * platformPool.length)];
    const account = generateMaskedAccount(seedBase + 77);

    return {
        id: `${index}-${epoch}`,
        account,
        amount,
        platform: platformData.name,
        category: platformData.category,
        pulse: seededRandom(seedBase + 11 + epoch)
    };
}

function generateMaskedAccount(seed) {
    return `65****${100 + Math.floor(seededRandom(seed) * 900)}`;
}

function formatAmount(amount) {
    return `SGD ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

function nudgeRow(row, seed) {
    const drift = 0.97 + seededRandom(seed + 300) * 0.08;
    const nextAmount = Math.max(30, Number((row.amount * drift).toFixed(2)));
    const shouldRotateAccount = seededRandom(seed + 901) > 0.82;
    const nextAccount = shouldRotateAccount ? generateMaskedAccount(seed + 177) : row.account;
    return {
        ...row,
        account: nextAccount,
        amount: nextAmount,
        pulse: seededRandom(seed + 701)
    };
}

export function initLiveTransaction() {
    const tbody = qs('#liveTransactionBody');
    if (!tbody) return;

    const startIndex = Math.floor(Date.now() / 1000);
    let tick = 0;
    let rows = Array.from({ length: MAX_ROWS }, (_, i) => generateRowByIndex(startIndex - i, 0));
    let previousAmountMap = new Map();

    const renderTable = () => {
        tbody.innerHTML = '';
        const orderedRows = [...rows].sort((a, b) => b.amount - a.amount);
        const nextAmountMap = new Map();

        orderedRows.forEach((row, index) => {
            const previousAmount = previousAmountMap.get(row.id);
            const isNewRow = previousAmount === undefined;
            const delta = isNewRow ? 0 : row.amount - previousAmount;
            const amountFlashClass = isNewRow
                ? 'tx-flash-new'
                : delta > 0.01
                    ? 'tx-flash-up'
                    : delta < -0.01
                        ? 'tx-flash-down'
                        : '';

            const tr = document.createElement('tr');
            tr.className = `align-middle text-amber-950${isNewRow ? ' tx-row-enter' : ''}`;
            const rankIcon = getRankIcon(index);
            const categoryTone = row.category === 'LIVE'
                ? 'text-violet-700 border-violet-200 bg-violet-50'
                : row.category === 'FISH'
                    ? 'text-cyan-700 border-cyan-200 bg-cyan-50'
                    : 'text-amber-800 border-amber-200 bg-amber-50';

            tr.innerHTML = `
                <td class="border-b border-amber-100 px-3 py-2.5">
                    <span class="inline-flex items-center gap-2">${rankIcon}<span>${row.account}</span></span>
                </td>
                <td class="border-b border-amber-100 px-3 py-2.5 font-semibold text-amber-900 ${amountFlashClass}">${formatAmount(row.amount)}</td>
                <td class="border-b border-amber-100 px-3 py-2.5">${row.platform}</td>
                <td class="border-b border-amber-100 px-3 py-2.5"><span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${categoryTone}">${row.category}</span></td>
            `;
            tbody.appendChild(tr);
            nextAmountMap.set(row.id, row.amount);
        });

        previousAmountMap = nextAmountMap;
    };

    const stepFeed = () => {
        tick += 1;

        rows = rows.map((row, index) => nudgeRow(row, GLOBAL_SEED + tick * 10 + index));

        if (tick % PUSH_NEW_ROW_EVERY === 0) {
            const nextIndex = startIndex + tick;
            const newRow = generateRowByIndex(nextIndex, tick);
            rows = [newRow, ...rows].slice(0, MAX_ROWS);
        }

        if (tick % 3 === 0) {
            const swapIndex = Math.floor(seededRandom(GLOBAL_SEED + tick * 17) * rows.length);
            rows[swapIndex] = generateRowByIndex(startIndex + tick + swapIndex, tick);
        }

        renderTable();
    };

    renderTable();
    const timerId = window.setInterval(stepFeed, MIN_UPDATE_MS);
    window.addEventListener('beforeunload', () => {
        window.clearInterval(timerId);
    }, { once: true });
}
