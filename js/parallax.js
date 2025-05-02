document.addEventListener('DOMContentLoaded', function() {
    // Initialize parallax effects
    initParallax();
});

function initParallax() {
    // Simple parallax for hero and banner sections
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = 0.5;
            const offset = scrollPosition * speed;
            const bg = section.querySelector('.parallax-bg');
            
            if (bg) {
                bg.style.transform = `translateY(${offset}px)`;
            } else {
                section.style.backgroundPositionY = `${offset}px`;
            }
        });
    });
    
    // More advanced parallax with GSAP
    gsap.utils.toArray('.parallax-element').forEach(element => {
        const depth = parseFloat(element.dataset.depth) || 0.3;
        
        gsap.to(element, {
            y: 100 * depth,
            ease: 'none',
            scrollTrigger: {
                trigger: element.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Parallax for service cards on hover
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            const glow = this.querySelector('.glow-effect');
            gsap.to(glow, {
                x: xAxis * 2,
                y: yAxis * 2,
                duration: 0.5
            });
            
            const shape = this.querySelector('.shape-overlay');
            gsap.to(shape, {
                x: xAxis,
                y: yAxis,
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.glow-effect');
            const shape = this.querySelector('.shape-overlay');
            
            gsap.to([glow, shape], {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}