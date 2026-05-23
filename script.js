// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = '+' + target + '%';
            clearInterval(timer);
        } else {
            element.textContent = '+' + Math.floor(current) + '%';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.hasAttribute('data-target')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }

            // Add visible class for animations
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all stat values with data-target
document.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('[data-target]');
    statValues.forEach(stat => observer.observe(stat));

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
});
