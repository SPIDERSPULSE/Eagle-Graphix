// JavaScript for Eagle Graphics About Page
document.addEventListener('DOMContentLoaded', function() {
    // Animate numbers in metrics section
    function animateNumbers() {
        const metrics = document.querySelectorAll('.metric-number');
        const speed = 200;
        
        metrics.forEach(metric => {
            const target = +metric.getAttribute('data-count');
            const count = +metric.innerText;
            const increment = target / speed;
            
            if (count < target) {
                metric.innerText = Math.ceil(count + increment);
                setTimeout(animateNumbers, 1);
            } else {
                metric.innerText = target;
            }
        });
    }
    
    // Initialize number animation when metrics section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});
    
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) {
        observer.observe(metricsSection);
    }
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
            
            // Close other open accordion items
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    otherBtn.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Video play button
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-container video');
    
    if (playButton && video) {
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.display = 'none';
                }, 300);
            } else {
                video.pause();
                this.style.display = 'block';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 10);
            }
        });
        
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                playButton.style.opacity = '0';
                setTimeout(() => {
                    playButton.style.display = 'none';
                }, 300);
            } else {
                this.pause();
                playButton.style.display = 'block';
                setTimeout(() => {
                    playButton.style.opacity = '1';
                }, 10);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add shadow to header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize any carousels (simplified version)
    function setupCarousels() {
        const carousels = document.querySelectorAll('.team-carousel, .testimonials-carousel');
        
        carousels.forEach(carousel => {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
                carousel.style.cursor = 'grabbing';
                carousel.style.scrollBehavior = 'auto';
            });
            
            carousel.addEventListener('mouseleave', () => {
                isDown = false;
                carousel.style.cursor = 'grab';
                carousel.style.scrollBehavior = 'smooth';
            });
            
            carousel.addEventListener('mouseup', () => {
                isDown = false;
                carousel.style.cursor = 'grab';
                carousel.style.scrollBehavior = 'smooth';
            });
            
            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
        });
    }
    
    setupCarousels();
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});