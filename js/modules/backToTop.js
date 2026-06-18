import { qs } from '../utils/dom.js';

// 回到顶部模块：滚动一定距离后显示按钮。
export function initBackToTop() {
	const button = qs('#backToTop');
	if (!button) return;

	window.addEventListener('scroll', () => {
		const shouldShow = window.scrollY > 0;
		button.classList.toggle('opacity-100', shouldShow);
		button.classList.toggle('translate-y-0', shouldShow);
		button.classList.toggle('pointer-events-auto', shouldShow);
		button.classList.toggle('opacity-0', !shouldShow);
		button.classList.toggle('translate-y-3', !shouldShow);
		button.classList.toggle('pointer-events-none', !shouldShow);
	}, { passive: true });

	button.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}
