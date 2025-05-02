document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const pageLoader = document.getElementById('pageLoader');
    setTimeout(() => {
      pageLoader.classList.add('fade-out');
    }, 1000);
  
    // Mobile Navigation
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
  
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburgerLines.forEach(line => line.classList.toggle('active'));
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
          
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerLines.forEach(line => line.classList.remove('active'));
          }
        }
      });
    });
  
    // Accordion Functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  
    // Cookie Consent Banner
    const cookieConsent = document.querySelector('.cookie-consent');
    const consentAccept = document.querySelector('.consent-accept');
    const consentSettings = document.querySelector('.consent-settings');
    const consentReject = document.querySelector('.consent-reject');
    const cookieControls = document.querySelector('.cookie-controls');
  
    // Check if cookie consent was already given
    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(() => {
        cookieConsent.classList.add('active');
      }, 2000);
    }
  
    // Handle consent buttons
    consentAccept.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'all');
      cookieConsent.classList.remove('active');
    });
  
    consentSettings.addEventListener('click', () => {
      cookieControls.style.display = cookieControls.style.display === 'block' ? 'none' : 'block';
    });
  
    consentReject.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'essential');
      cookieConsent.classList.remove('active');
    });
  
    // Save cookie preferences
    const cookieSaveBtn = document.querySelector('.cookie-save-btn');
    if (cookieSaveBtn) {
      cookieSaveBtn.addEventListener('click', () => {
        const performanceChecked = document.querySelector('.cookie-toggle:nth-child(2) input').checked;
        const targetingChecked = document.querySelector('.cookie-toggle:nth-child(3) input').checked;
        
        localStorage.setItem('cookieConsent', 'custom');
        localStorage.setItem('performanceCookies', performanceChecked);
        localStorage.setItem('targetingCookies', targetingChecked);
        
        cookieControls.style.display = 'none';
        cookieConsent.classList.remove('active');
      });
    }
  
    // Accessibility Widget
    const accessibilityWidget = document.getElementById('accessibilityWidget');
    const widgetToggle = document.querySelector('.widget-toggle');
    const widgetMenu = document.querySelector('.widget-menu');
  
    widgetToggle.addEventListener('click', () => {
      accessibilityWidget.classList.toggle('active');
    });
  
    // Accessibility Actions
    const increaseFont = document.querySelector('[data-action="increaseFont"]');
    const decreaseFont = document.querySelector('[data-action="decreaseFont"]');
    const highContrast = document.querySelector('[data-action="highContrast"]');
    const grayscale = document.querySelector('[data-action="grayscale"]');
    const resetAccessibility = document.querySelector('[data-action="resetAccessibility"]');
  
    let currentFontSize = 16;
  
    increaseFont.addEventListener('click', () => {
      currentFontSize += 2;
      document.body.style.fontSize = `${currentFontSize}px`;
    });
  
    decreaseFont.addEventListener('click', () => {
      if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.body.style.fontSize = `${currentFontSize}px`;
      }
    });
  
    highContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  
    grayscale.addEventListener('click', () => {
      document.body.classList.toggle('grayscale');
    });
  
    resetAccessibility.addEventListener('click', () => {
      document.body.style.fontSize = '';
      document.body.classList.remove('high-contrast', 'grayscale');
      currentFontSize = 16;
    });
  
    // Ripple Effect for Buttons
    document.querySelectorAll('[data-interactive="ripple"]').forEach(button => {
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
  
    // 3D Effects
    document.querySelectorAll('[data-3d-effect="rotate"]').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  
    document.querySelectorAll('[data-3d-effect="float"]').forEach(element => {
      element.style.animation = 'float 3s ease-in-out infinite';
    });
  
    // Tilt Effect
    document.querySelectorAll('[data-tilt]').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        element.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 20px rgba(0, 0, 0, 0.2)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        element.style.boxShadow = 'var(--shadow-sm)';
      });
    });
  
    // Scroll Animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('[data-animation]');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          const animation = element.getAttribute('data-animation');
          const delay = element.getAttribute('data-delay') || 0;
          
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add(animation);
          }, delay * 1000);
        }
      });
    };
  
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
  
    // Section Entrance Effects
    const animateSections = () => {
      const sections = document.querySelectorAll('[data-section-effect]');
      
      sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
          const effect = section.getAttribute('data-section-effect');
          section.classList.add(effect);
        }
      });
    };
  
    // Initial check
    animateSections();
    
    // Check on scroll
    window.addEventListener('scroll', animateSections);
  
    // Staggered Animations
    const staggerElements = document.querySelectorAll('[data-animation="stagger"]');
    staggerElements.forEach(container => {
      const items = container.children;
      Array.from(items).forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  
    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      });
    }
  
    // Back to Top Button
    const backToTop = document.querySelector('.backtotop-btn');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });
  
    // Tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = element.getAttribute('data-tooltip');
      element.appendChild(tooltip);
      
      element.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      });
      
      element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });
    });
  
    // Form Submission
    const contactForm = document.getElementById('legalContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
      });
    }
  
    // Policy Update Subscription
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input').value;
        
        // Here you would typically send the email to a server
        console.log(`Subscribed email: ${email}`);
        
        // Show success message
        alert('Thank you for subscribing to policy updates!');
        
        // Reset form
        this.querySelector('input').value = '';
      });
    }
  });
  
  // Initialize animations when page is fully loaded
  window.addEventListener('load', function() {
    // Force reflow to trigger animations
    document.body.clientWidth;
  });