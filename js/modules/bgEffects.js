/**
 * 背景增強特效模塊
 * 包含：視差互動、動態流星生成
 */

export function initBgEffects() {
    initParallax();
    initShootingStars();
}

/**
 * 視差互動：背景層隨鼠標輕微移動
 */
function initParallax() {
    const glowLayers = document.querySelector('.bg-glow-layers');
    const geometricLines = document.querySelector('.bg-geometric-lines');
    const partnershipSection = document.getElementById('partnershipSection');
    const partnershipBg = partnershipSection?.querySelector('.partnership-bg-elements');

    if (!glowLayers && !geometricLines && !partnershipBg) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        if (glowLayers) {
            glowLayers.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
        }

        if (geometricLines) {
            geometricLines.style.transform = `translate(${moveX * -10}px, ${moveY * -10}px)`;
        }
    });
}

/**
 * 流星生成邏輯
 */
function initShootingStars() {
    const container = document.getElementById('shootingStars');
    if (!container) return;

    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // 隨機位置與延遲
        const top = Math.random() * 50; // 只在上方 50% 出現
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);

        // 動畫結束後移除
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // 每隔一段時間生成一顆流星
    setInterval(() => {
        if (container.children.length < 5) { // 限制同時出現的數量
            createShootingStar();
        }
    }, 4000);
}
