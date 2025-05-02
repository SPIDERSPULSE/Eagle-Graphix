// Hero video background fallback
function initHeroBackground() {
    const heroBg = document.querySelector('.hero-background');
    if (!heroBg) return;
    
    const video = heroBg.querySelector('video');
    
    // Check if video can play
    const canPlay = video && video.canPlayType('video/mp4');
    
    if (!canPlay) {
        // Fallback to image background
        heroBg.style.backgroundImage = 'url(assets/images/hero-fallback.jpg)';
        heroBg.style.backgroundSize = 'cover';
        heroBg.style.backgroundPosition = 'center';
        if (video) video.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroBackground();
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Parallax effect for elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.3;
                const offset = scrollPosition * speed;                if (element.getAttribute('data-parallax-axis') === 'x') {
                    element.style.transform = `translateX(${offset}px)`;
                } else {
                    element.style.transform = `translateY(${offset}px)`;
                }
            });
        });
    }

    // Work card hover effect
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const content = this.querySelector('.work-content');
            content.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            const content = this.querySelector('.work-content');
            content.style.transform = 'translateY(100%)';
        });
    });

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});

// Custom cursor for premium feel (optional)
function initCustomCursor() {
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', initCustomCursor);








