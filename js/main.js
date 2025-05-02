document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    












    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
    








    // Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    












    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target, 0, parseInt(entry.target.getAttribute('data-count')), 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    












    // Initialize testimonial slider
    if (document.querySelector('.testimonials-slider')) {
        new Glide('.testimonials-slider', {
            type: 'carousel',
            perView: 1,
            autoplay: 3000,
            hoverpause: true,
            animationDuration: 800
        }).mount();
    }
    










     






    
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('[data-animate]');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('data-animate', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
});












// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize Masonry Layout
    function initMasonry() {
        const masonryGrid = document.querySelector('.portfolio-masonry');
        const masonryItems = document.querySelectorAll('.portfolio-item');
        
        // This would typically be replaced with an actual masonry library like:
        // new Masonry(masonryGrid, { itemSelector: '.portfolio-item', columnWidth: 300, gutter: 20 });
        
        // For this example, we'll use CSS Grid with manual sizing
        masonryItems.forEach(item => {
            const card = item.querySelector('.portfolio-card');
            if (card.classList.contains('wide')) {
                item.style.gridColumn = 'span 2';
            }
            if (card.classList.contains('tall')) {
                item.style.gridRow = 'span 2';
            }
        });
    }
    
    initMasonry();
    
    // Pause marquee on hover
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        marqueeTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});





















// Artistic Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      header.addEventListener('click', function() {
        const currentlyActive = document.querySelector('.accordion-item.active');
        
        // If the clicked item is already active, close it
        if (currentlyActive && currentlyActive !== item) {
          currentlyActive.classList.remove('active');
          currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
        }
        
        // Toggle current item
        item.classList.toggle('active');
        
        const content = item.querySelector('.accordion-content');
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
    
    // Animate service categories on scroll
    const serviceCategories = document.querySelectorAll('.service-category');
    const categoryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }, { threshold: 0.1 });
    
    serviceCategories.forEach(category => {
      category.style.opacity = 0;
      category.style.transform = 'translateY(30px)';
      category.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      categoryObserver.observe(category);
    });
    
    // Parallax effect for decorative elements
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const beforeElement = document.querySelector('.artistic-services::before');
      if (beforeElement) {
        beforeElement.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    });
  });