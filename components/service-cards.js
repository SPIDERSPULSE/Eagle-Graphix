export function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.03,
                boxShadow: '0 10px 30px rgba(80, 200, 120, 0.3)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                scale: 1,
                boxShadow: 'none',
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}
