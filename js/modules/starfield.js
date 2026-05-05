import { qs } from '../utils/dom.js';

// 星空模块：保留原站氛围感，但代码简化成单一职责。
export function initStarfield() {
	const canvas = qs('#starfield');
	if (!canvas) return;

	const context = canvas.getContext('2d');
	if (!context) return;

	const stars = [];
	const starCount = 120;

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function seedStars() {
		stars.length = 0;
		for (let i = 0; i < starCount; i += 1) {
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				radius: Math.random() * 1.4 + 0.3,
				speedY: Math.random() * 0.18 + 0.03,
				alpha: Math.random() * 0.6 + 0.25
			});
		}
	}

	function drawFrame() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		stars.forEach((star) => {
			star.y += star.speedY;
			if (star.y > canvas.height) star.y = 0;

			context.beginPath();
			context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
			context.fillStyle = `rgba(180, 150, 80, ${star.alpha})`;
			context.fill();
		});

		requestAnimationFrame(drawFrame);
	}

	resizeCanvas();
	seedStars();
	drawFrame();
	window.addEventListener('resize', () => {
		resizeCanvas();
		seedStars();
	});
}
