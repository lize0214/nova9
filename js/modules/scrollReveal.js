// 区块进入动画：当区块进入视口时，只触发一次 reveal。
export function initScrollReveal() {
    const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
    if (revealTargets.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        revealTargets.forEach((target) => {
            target.classList.remove('opacity-0', 'translate-y-6');
            target.classList.add('opacity-100', 'translate-y-0');
        });
        return;
    }

    revealTargets.forEach((target) => {
        target.classList.add(
            'opacity-0',
            'translate-y-6',
            'transition-all',
            'duration-500',
            'ease-out',
            'will-change-transform'
        );
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: [0.15],
        rootMargin: '0px 0px -10% 0px'
    });

    revealTargets.forEach((target) => observer.observe(target));
}
