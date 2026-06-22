/**
 * 3D 金色半球地圖模塊 (優化版)
 * 優化點：單例模式、懶加載、數據緩存、資源清理
 */

let globeInstance = null;
let cachedGeoData = null;
let resizeHandler = null;
let observer = null;

export function initGlobe3d() {
    const container = document.getElementById('partnershipGlobe3d');
    if (!container) return;

    // 1. 使用 Intersection Observer 實現懶加載
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startGlobeInitialization(container);
                    // 確保回到視口時恢復旋轉
                    if (globeInstance) {
                        globeInstance.controls().autoRotate = true;
                    }
                } else if (globeInstance) {
                    // 當不在視口時，可以考慮暫停旋轉以節省效能
                    globeInstance.controls().autoRotate = false;
                }
            });
        }, { threshold: 0.1, rootMargin: '100px' });
        
        observer.observe(container);
    } else {
        // 如果已經在觀察，確保恢復旋轉
        if (globeInstance) {
            globeInstance.controls().autoRotate = true;
        }
    }
}

function startGlobeInitialization(container) {
    // 檢查 Globe.gl 是否已加載
    if (typeof window.Globe !== 'function') {
        setTimeout(() => startGlobeInitialization(container), 200);
        return;
    }

    // 2. 單例模式：避免重複創建 WebGL 上下文
    if (globeInstance) {
        // 如果容器沒變，只需觸發 resize 確保佈局正確
        if (container.contains(globeInstance.renderer().domElement)) {
            handleResize(container);
            return;
        }
        // 如果容器變了（例如 React 重新渲染了 DOM），將舊畫布移動到新容器
        container.innerHTML = '';
        container.appendChild(globeInstance.renderer().domElement);
        handleResize(container);
        return;
    }

    // 首次初始化
    globeInstance = window.Globe()
        (container)
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(false)
        .showGraticules(true);

    // 材質設置
    const globeMaterial = globeInstance.globeMaterial();
    if (window.THREE) {
        globeMaterial.color = new window.THREE.Color('#be9431');
    }
    globeMaterial.transparent = true;
    globeMaterial.opacity = 0.05;

    // 邊界樣式
    globeInstance
        .polygonSideColor(() => 'rgba(0,0,0,0)')
        .polygonStrokeColor(() => 'rgba(190, 148, 49, 0.5)')
        .polygonCapColor(() => 'rgba(190, 148, 49, 0.05)');

    // 3. 數據緩存：避免重複請求 GeoJSON
    if (cachedGeoData) {
        globeInstance.polygonsData(cachedGeoData);
    } else {
        fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countries => {
                cachedGeoData = countries.features;
                if (globeInstance) globeInstance.polygonsData(cachedGeoData);
            });
    }

    // 標記點數據
    const markerData = [
        { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
        { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
        { lat: 51.5074, lng: -0.1278, name: 'London' },
        { lat: 40.7128, lng: -74.0060, name: 'New York' },
        { lat: 31.2304, lng: 121.4737, name: 'Shanghai' },
        { lat: 22.3193, lng: 114.1694, name: 'Hong Kong' },
        { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
        { lat: 25.2048, lng: 55.2708, name: 'Dubai' }
    ];

    globeInstance
        .htmlElementsData(markerData)
        .htmlElement(d => {
            const el = document.createElement('div');
            el.innerHTML = `
                <div class="relative flex items-center justify-center">
                    <div class="absolute h-2 w-2 animate-ping rounded-full bg-[#be9431] opacity-75"></div>
                    <div class="relative h-1.5 w-1.5 rounded-full bg-[#be9431] shadow-[0_0_8px_rgba(190,148,49,0.8)]"></div>
                </div>
            `;
            return el;
        });

    globeInstance.pointOfView({ lat: 30, lng: 0, altitude: 2.0 }, 0);

    const controls = globeInstance.controls();
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // 4. 優化 Resize 處理
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
    }
    resizeHandler = () => handleResize(container);
    window.addEventListener('resize', resizeHandler);
    
    // 初始調整大小
    setTimeout(() => handleResize(container), 100);
}

function handleResize(container) {
    if (!globeInstance || !container) return;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    if (width && height) {
        globeInstance.width(width).height(height);
    }
}
