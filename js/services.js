document.addEventListener('DOMContentLoaded', function() {
    // Initialize service details functionality
    initServiceDetails();
    
    // Initialize GSAP animations
    initAnimations();
    
    // Initialize scroll events
    initScrollEffects();
});

function initServiceDetails() {
    const viewButtons = document.querySelectorAll('.view-details-button');
    const closeButtons = document.querySelectorAll('.close-detail');
    const detailsSection = document.querySelector('.service-details-section');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.closest('.service-card').dataset.service;
            const detail = document.querySelector(`#${service}-detail`);
            
            // Hide all details first
            document.querySelectorAll('.service-detail').forEach(d => {
                d.style.display = 'none';
            });
            
            // Show the selected detail
            detail.style.display = 'block';
            detailsSection.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Update URL hash
            history.pushState(null, null, `#${service}`);
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            detailsSection.classList.remove('active');
            document.body.style.overflow = '';
            history.pushState(null, null, ' ');
        });
    });
    
    // Close when clicking outside the detail
    detailsSection.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
            history.pushState(null, null, ' ');
        }
    });
    
    // Handle back button
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (!hash) {
            detailsSection.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Open detail if URL has hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        const detail = document.querySelector(`#${hash}-detail`);
        if (detail) {
            document.querySelectorAll('.service-detail').forEach(d => {
                d.style.display = 'none';
            });
            detail.style.display = 'block';
            detailsSection.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function initAnimations() {
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero elements
    gsap.from('.hero-title .title-line', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    gsap.from('.cta-button', {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 0.8,
        ease: 'power2.out'
    });
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Consultation Banner Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Magnetic button effect
    const magneticBtn = document.querySelector('.magnetic-hover');
    
    if (magneticBtn) {
      magneticBtn.addEventListener('mousemove', (e) => {
        const rect = magneticBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distanceX = x - centerX;
        const distanceY = y - centerY;
        
        // Adjust these values to change the magnetic pull strength
        magneticBtn.style.transform = `translate(${distanceX * 0.15}px, ${distanceY * 0.15}px)`;
      });
      
      magneticBtn.addEventListener('mouseleave', () => {
        magneticBtn.style.transform = 'translate(0, 0)';
      });
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Intersection Observer for animation
    const bannerContent = document.querySelector('.banner-content');
    
    if (bannerContent) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 });
  
      observer.observe(bannerContent);
    }
  
    // Parallax initialization (if using a parallax library)
    if (typeof simpleParallax !== 'undefined') {
      new simpleParallax('.luxe-parallax-section', {
        orientation: 'down',
        scale: 1.1,
        delay: 0.4,
        transition: 'cubic-bezier(0,0,0,1)'
      });
    }
  });
  
  // Optional: Add this if you want to animate elements on scroll
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.banner-headline, .banner-divider, .banner-subtext, .cta-group, .assurance-list');
    
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
  
    elements.forEach(el => observer.observe(el));
  }
  
  // Initialize animations when DOM is loaded
  if (document.readyState === 'complete') {
    initScrollAnimations();
  } else {
    window.addEventListener('load', initScrollAnimations);
  }
}










function initScrollEffects() {
    // Add scroll class to header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}