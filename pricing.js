document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const navToggle = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerLines.forEach(line => line.classList.toggle('active'));
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburgerLines.forEach(line => line.classList.remove('active'));
    });
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.getAttribute('href') === '#') return;
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Pricing Toggle Functionality
  const billingToggle = document.getElementById('billingToggle');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const pricePeriods = document.querySelectorAll('.price-period');
  
  billingToggle.addEventListener('change', function() {
    priceAmounts.forEach(price => {
      const monthlyPrice = price.getAttribute('data-monthly');
      const yearlyPrice = price.getAttribute('data-yearly');
      
      if (this.checked) {
        price.textContent = monthlyPrice;
      } else {
        price.textContent = yearlyPrice;
      }
      
      // Add animation class
      price.classList.add('price-change');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        price.classList.remove('price-change');
      }, 500);
    });
    
    // Update billing period text
    pricePeriods.forEach(period => {
      period.textContent = this.checked ? '/mo' : '/mo';
    });
  });

  // Price change animation
  const priceChangeKeyframes = [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(1.2)', opacity: 0.8 },
    { transform: 'scale(1)', opacity: 1 }
  ];
  
  const priceChangeTiming = {
    duration: 500,
    iterations: 1
  };

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.style.display = i === index ? 'flex' : 'none';
    });
  }
  
  prevButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  });
  
  nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  });
  
  // Initialize first testimonial
  showTestimonial(currentTestimonial);

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // Process Step Animations
  const processSteps = document.querySelectorAll('.process-step .step-content');
  
  function checkProcessSteps() {
    processSteps.forEach((step, index) => {
      const stepPosition = step.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (stepPosition < screenPosition) {
        setTimeout(() => {
          step.classList.add('visible');
        }, index * 200);
      }
    });
  }
  
  // Initial check
  checkProcessSteps();
  
  // Check on scroll
  window.addEventListener('scroll', checkProcessSteps);

  // Ripple Effect for Buttons
  document.querySelectorAll('.tier-cta, .service-cta, .addon-cta, .cta-primary, .cta-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Card Hover Effects
  const cards = document.querySelectorAll('.pricing-card, .service-card, .addon-card, .team-member, .award-card, .case-study-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) ${card.classList.contains('featured') ? 'translateY(-20px)' : 'translateY(0)'}`;
      card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(0, 0, 0, 0.15)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = card.classList.contains('featured') ? 
        'perspective(1000px) rotateX(0) rotateY(0) translateY(-20px)' : 
        'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.boxShadow = card.classList.contains('featured') ? 'var(--shadow-lg)' : 'var(--shadow-md)';
    });
  });

  // Scroll Animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.pricing-card, .service-card, .section-header, .testimonial-card, .faq-item, .team-member, .award-card, .case-study-card, .guarantee-content');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Price change animation
  const priceChangeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'characterData' || mutation.attributeName === 'class') {
        if (mutation.target.classList.contains('price-change')) {
          mutation.target.animate(priceChangeKeyframes, priceChangeTiming);
        }
      }
    });
  });

  priceAmounts.forEach(price => {
    priceChangeObserver.observe(price, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: true,
      subtree: true
    });
  });
});

// Initialize animations when page is fully loaded
window.addEventListener('load', function() {
  // Force reflow to trigger animations
  document.body.clientWidth;
});