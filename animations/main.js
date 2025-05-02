import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupAnimations() {
    // Animate hero elements
    gsap.from('.hero-content h1', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content p', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-cta', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Scroll animations for sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });
    
    // Magnetic buttons
    document.querySelectorAll('[data-hover-effect="magnetic"]').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            gsap.to(e.currentTarget, {
                x: x * 10,
                y: y * 10,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', (e) => {
            gsap.to(e.currentTarget, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}
