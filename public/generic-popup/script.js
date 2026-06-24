document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('tabSidebar');
    const contentArea = document.getElementById('contentArea');
    const overlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closeBtn');

    let activeTabId = promoData[0].id;
    let countdownInterval = null;

    function renderTabs() {
        // Keep mobile spacer
        const spacer = '<div class="mobile-header-spacer"></div>';
        
        const tabsHtml = promoData.map(item => `
            <button class="tab-btn ${item.id === activeTabId ? 'active' : ''}" data-id="${item.id}">
                <div class="tab-btn-content">
                    <i class="${item.icon}"></i>
                    <span>${item.title}</span>
                </div>
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `).join('');

        sidebar.innerHTML = spacer + tabsHtml;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newId = btn.dataset.id;
                if (newId === activeTabId) return;
                
                activeTabId = newId;
                renderTabs();
                renderContent();
            });
        });
    }

    function renderContent() {
        const item = promoData.find(i => i.id === activeTabId);
        
        // Clear previous interval if any
        if (countdownInterval) clearInterval(countdownInterval);

        // Show loading state
        contentArea.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
        `;

        const getImageUrl = () => {
            if (item.type === 'single-image' || item.type === 'links') return item.content.image;
            if (item.type === 'slideshow') return item.content.images[0];
            return null;
        };

        const imageUrl = getImageUrl();
        
        if (imageUrl) {
            const img = new Image();
            img.onload = () => {
                updatePopupSize(img.naturalWidth, img.naturalHeight);
                displayMainContent(item);
            };
            img.src = imageUrl;
        } else {
            // Default size for non-image types
            updatePopupSize(800, 600);
            displayMainContent(item);
        }
    }

    function displayMainContent(item) {
        let contentHtml = `
            <div class="animate-content" style="animation: slideIn 0.5s ease-out forwards;">
                <h2 class="tab-title"><i class="${item.icon}"></i> ${item.title}</h2>
                <p class="tab-subtitle">${item.subtitle}</p>
        `;

        if (item.type === 'worldcup') {
            contentHtml += `
                <div class="wc-header">
                    <div>
                        <div class="wc-kickoff">KICK-OFF · ${item.content.kickoff}</div>
                        <div class="wc-main-title">Champion Prediction</div>
                    </div>
                    <div class="countdown-grid" id="wcCountdown">
                        <div class="cd-box"><span class="cd-num" id="d">00</span><span class="cd-label">DAYS</span></div>
                        <div class="cd-box"><span class="cd-num" id="h">00</span><span class="cd-label">HRS</span></div>
                        <div class="cd-box"><span class="cd-num" id="m">00</span><span class="cd-label">MIN</span></div>
                        <div class="cd-box"><span class="cd-num" id="s">00</span><span class="cd-label">SEC</span></div>
                    </div>
                </div>

                <div class="wc-grid">
                    ${item.content.teams.map(t => `
                        <div class="team-pill">
                            <img src="${t.flag}" class="team-flag" alt="${t.name}">
                            <span class="team-name">${t.name}</span>
                            <span class="team-odds">${t.odds}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="wc-how-to">
                    <div class="how-to-title"><i class="fa-solid fa-circle-info"></i> How to submit your pick</div>
                    ${item.content.howToEnter.map((step, i) => `
                        <div class="step-item">
                            <div class="step-num">${i + 1}</div>
                            <span>${step}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            startCountdown(item.content.countdownDate);
        } else if (item.type === 'slideshow') {
            contentHtml += `
                <img src="${item.content.images[0]}" class="responsive-img">
            `;
        } else if (item.type === 'single-image' || item.type === 'links') {
            contentHtml += `
                <img src="${item.content.image}" class="responsive-img">
            `;
            if (item.type === 'links') {
                contentHtml += `
                    <div class="link-grid">
                        ${item.content.links.map(l => `
                            <a href="${l.url}" target="_blank" class="backup-link">${l.text}</a>
                        `).join('')}
                    </div>
                `;
            }
        }

        if (item.action) {
            const icons = item.action.icons ? item.action.icons.map(icon => `<i class="${icon}"></i>`).join('') : `<i class="${item.action.icon || ''}"></i>`;
            contentHtml += `
                <button class="cta-btn" id="ctaBtn">
                    ${icons}
                    <span>${item.action.text}</span>
                </button>
            `;
        }

        contentHtml += `</div>`;
        contentArea.innerHTML = contentHtml;

        // Add CTA event
        const ctaBtn = document.getElementById('ctaBtn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => handleAction(item.id));
        }
    }

    function startCountdown(dateStr) {
        const target = new Date(dateStr).getTime();
        
        const update = () => {
            const now = new Date().getTime();
            const dist = target - now;
            if (dist < 0) return;

            const d = Math.floor(dist / (1000 * 60 * 60 * 24));
            const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((dist % (1000 * 60)) / 1000);

            const dEl = document.getElementById('d');
            const hEl = document.getElementById('h');
            const mEl = document.getElementById('m');
            const sEl = document.getElementById('s');

            if (dEl) dEl.innerText = String(d).padStart(2, '0');
            if (hEl) hEl.innerText = String(h).padStart(2, '0');
            if (mEl) mEl.innerText = String(m).padStart(2, '0');
            if (sEl) sEl.innerText = String(s).padStart(2, '0');
        };

        update();
        countdownInterval = setInterval(update, 1000);
    }

    function updatePopupSize(imgWidth, imgHeight) {
        const container = document.querySelector('.popup-container');
        const isMobile = window.innerWidth <= 768;
        const sidebarWidth = isMobile ? 0 : 288;
        const padding = isMobile ? 50 : 80; 

        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;

        let targetWidth = imgWidth + sidebarWidth + padding;
        let targetHeight = imgHeight + 200; // Extra space for title/button

        // Scale down to fit viewport
        const widthRatio = maxWidth / targetWidth;
        const heightRatio = maxHeight / targetHeight;
        const scale = Math.min(1, widthRatio, heightRatio);

        targetWidth *= scale;
        targetHeight *= scale;

        // Apply constraints
        const minContentWidth = isMobile ? 280 : 450;
        const finalWidth = Math.max(targetWidth, isMobile ? 320 : 600, minContentWidth + sidebarWidth + padding);
        const finalHeight = Math.max(targetHeight, isMobile ? 450 : 550);

        if (!isMobile) {
            container.style.width = finalWidth + 'px';
            container.style.height = finalHeight + 'px';
        } else {
            container.style.width = '95vw';
            container.style.height = 'auto';
        }
    }

    window.handleAction = (id) => {
        const item = promoData.find(i => i.id === id);
        if (item.action.onclick) {
            // In a real app, these would be global functions
            console.log('Calling function:', item.action.onclick, 'with args:', item.action.args);
            alert(`Triggered: ${item.action.onclick}`);
        } else if (item.action.link) {
            window.open(item.action.link, item.action.target || '_self');
        }
    };

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // Auto-open for demo
    setTimeout(() => {
        overlay.classList.add('active');
    }, 500);

    renderTabs();
    renderContent();
});
