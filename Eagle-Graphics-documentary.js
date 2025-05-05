document.addEventListener('DOMContentLoaded', function() {
  // ================ Page Loader ================
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', function() {
    setTimeout(function() {
      pageLoader.classList.add('fade-out');
      setTimeout(function() {
        pageLoader.style.display = 'none';
      }, 500);
    }, 1000);
  });

  // ================ Navigation ================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Sticky navigation on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.premium-nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ================ 3D Effects ================
  // Rotate effect for logo
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    navLogo.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }

  // Float effect for section icons
  const floatElements = document.querySelectorAll('[data-3d-effect="float"]');
  floatElements.forEach(el => {
    el.style.transform = 'translateY(0)';
  });

  // ================ Accordion Functionality ================
  const accordions = document.querySelectorAll('[data-interactive="accordion"] .accordion-item');
  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    const content = accordion.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      const isActive = accordion.classList.contains('active');
      
      // Close all accordions
      accordions.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = '0';
      });
      
      // Open clicked accordion if it was closed
      if (!isActive) {
        accordion.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion by default
  if (accordions.length > 0) {
    accordions[0].classList.add('active');
    accordions[0].querySelector('.accordion-content').style.maxHeight = 
      accordions[0].querySelector('.accordion-content').scrollHeight + 'px';
  }

  // ================ Tab Functionality ================
  const tabContainers = document.querySelectorAll('[data-interactive="tabs"]');
  tabContainers.forEach(container => {
    const tabLinks = container.querySelectorAll('.tab-link');
    const tabContents = container.querySelectorAll('.tab-content');
    
    tabLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and contents
        tabLinks.forEach(l => l.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked link and corresponding content
        link.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });
    
    // Activate first tab by default
    if (tabLinks.length > 0) {
      tabLinks[0].click();
    }
  });

  // ================ Cookie Consent ================
  const cookieConsent = document.getElementById('cookieConsentBanner');
  const acceptCookiesBtn = document.querySelector('.consent-accept');
  const rejectCookiesBtn = document.querySelector('.consent-reject');
  const settingsCookiesBtn = document.querySelector('.consent-settings');
  
  // Check if user has already made a choice
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieConsent.classList.add('show');
    }, 2000);
  }
  
  // Accept all cookies
  acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'all');
    cookieConsent.classList.remove('show');
    setCookiePreferences(true, true, true);
  });
  
  // Reject non-essential cookies
  rejectCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'essential');
    cookieConsent.classList.remove('show');
    setCookiePreferences(true, false, false);
  });
  
  // Cookie settings
  settingsCookiesBtn.addEventListener('click', () => {
    // In a real implementation, this would open a more detailed settings modal
    alert('Cookie preferences would open here in a full implementation');
  });
  
  // Function to set cookie preferences
  function setCookiePreferences(essential, performance, targeting) {
    // In a real implementation, this would set actual cookies
    console.log('Cookie preferences set:', { essential, performance, targeting });
  }

  // ================ Cookie Controls ================
  const cookieSaveBtn = document.querySelector('.cookie-save-btn');
  if (cookieSaveBtn) {
    cookieSaveBtn.addEventListener('click', () => {
      const essentialChecked = true; // Essential cookies are always enabled
      const performanceChecked = document.getElementById('performanceCookies').checked;
      const targetingChecked = document.getElementById('targetingCookies').checked;
      
      setCookiePreferences(essentialChecked, performanceChecked, targetingChecked);
      alert('Your cookie preferences have been saved.');
    });
  }

  // ================ Accessibility Widget ================
  const accessibilityWidget = document.getElementById('accessibilityWidget');
  const widgetToggle = document.querySelector('.widget-toggle');
  
  if (widgetToggle) {
    widgetToggle.addEventListener('click', () => {
      accessibilityWidget.classList.toggle('active');
    });
  }
  
  // Accessibility options
  document.querySelectorAll('.widget-option').forEach(option => {
    option.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      applyAccessibilityAction(action);
    });
  });
  
  function applyAccessibilityAction(action) {
    const root = document.documentElement;
    
    switch (action) {
      case 'increaseFont':
        const currentFontSize = parseFloat(getComputedStyle(root).fontSize);
        root.style.fontSize = (currentFontSize + 1) + 'px';
        break;
      case 'decreaseFont':
        const currentFontSizeDec = parseFloat(getComputedStyle(root).fontSize);
        root.style.fontSize = (currentFontSizeDec - 1) + 'px';
        break;
      case 'highContrast':
        root.classList.toggle('high-contrast');
        break;
      case 'grayscale':
        root.classList.toggle('grayscale');
        break;
      case 'textToSpeech':
        alert('Text to speech would be implemented here');
        break;
      case 'resetAccessibility':
        root.style.fontSize = '';
        root.classList.remove('high-contrast', 'grayscale');
        break;
    }
  }

  // ================ Ripple Effect ================
  document.querySelectorAll('[data-interactive="ripple"]').forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // Add CSS for ripple effect
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ================ Form Submission ================
  const contactForm = document.getElementById('legalContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // In a real implementation, this would send the form data to a server
      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message. We will get back to you soon.');
      this.reset();
    });
  }

  // ================ Scroll Animations ================
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('[data-animation]');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const delay = element.getAttribute('data-delay') || 0;
      
      if (elementPosition < windowHeight - 100) {
        setTimeout(() => {
          const animation = element.getAttribute('data-animation');
          element.style.opacity = '1';
          element.style.transform = 'translate(0)';
          element.classList.add(animation);
        }, delay * 1000);
      }
    });
  };

  // Run on initial load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // ================ Parallax Effect ================
  const parallaxElements = document.querySelectorAll('[data-parallax="scroll"]');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const elementHeight = element.offsetHeight;
        
        if (scrollPosition > elementPosition - window.innerHeight && 
            scrollPosition < elementPosition + elementHeight) {
          const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
          const yPos = -(scrollPosition - elementPosition) * speed;
          
          element.style.backgroundPosition = `center ${yPos}px`;
        }
      });
    });
  }

  // ================ Tilt Effect ================
  const tiltElements = document.querySelectorAll('[data-tilt]');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      this.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 20px rgba(0, 0, 0, 0.1)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      this.style.boxShadow = 'var(--shadow-sm)';
    });
  });

  // ================ Tooltips ================
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = element.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    element.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      tooltip.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', function() {
      tooltip.style.opacity = '0';
    });
  });

  // Add CSS for tooltips
  const tooltipStyle = document.createElement('style');
  tooltipStyle.textContent = `
    .tooltip {
      position: fixed;
      background-color: var(--accent-black);
      color: white;
      padding: 6px 12px;
      border-radius: var(--border-radius);
      font-size: 0.8rem;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1001;
      transform: translateY(5px);
    }
    
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: var(--accent-black) transparent transparent transparent;
    }
  `;
  document.head.appendChild(tooltipStyle);

  // ================ Interactive Map ================
  const interactiveMap = document.querySelector('[data-interactive="map"]');
  if (interactiveMap) {
    const markers = interactiveMap.querySelectorAll('.map-marker');
    
    markers.forEach(marker => {
      marker.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        alert(`Selected location: ${location}`);
      });
    });
  }
});