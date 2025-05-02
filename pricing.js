document.addEventListener('DOMContentLoaded', function() {
    // Contact page URL (replace with your actual contact page URL)
    const contactPageUrl = 'https://eaglegraphix.com/contact';
    
    // 3. Comparison Toggle Functionality
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
      billingToggle.addEventListener('change', function() {
        const monthlyPrices = document.querySelectorAll('.price');
        monthlyPrices.forEach(priceElement => {
          const currentPrice = priceElement.textContent;
          if (currentPrice.includes('$')) {
            const numericValue = parseFloat(currentPrice.replace(/[^0-9.]/g, ''));
            const newValue = this.checked ? numericValue * 12 * 0.8 : numericValue / 12 / 0.8;
            const formattedValue = this.checked ? `$${Math.round(newValue)}<span>/yr</span>` : `$${Math.round(newValue)}<span>/mo</span>`;
            priceElement.innerHTML = formattedValue;
          } else if (currentPrice.trim() === 'Custom') {
            priceElement.textContent = this.checked ? 'Annual Contract' : 'Custom';
          }
        });
      });
    }
  
    // 5. Interactive Price Calculator
    const priceCalculator = document.querySelector('.price-calculator');
    if (priceCalculator) {
      const serviceType = document.getElementById('service-type');
      const projectDuration = document.getElementById('project-duration');
      const durationValue = document.getElementById('duration-value');
      const calculatedPrice = document.querySelector('.calculated-price');
  
      // Update duration value display
      projectDuration.addEventListener('input', function() {
        durationValue.textContent = `${this.value} month${this.value > 1 ? 's' : ''}`;
        updateCalculatedPrice();
      });
  
      // Update price when service type changes
      serviceType.addEventListener('change', updateCalculatedPrice);
  
      // Calculate price based on inputs
      function updateCalculatedPrice() {
        const serviceMultiplier = {
          'branding': 1000,
          'web': 1500,
          'package': 2500
        };
        
        const duration = parseInt(projectDuration.value);
        const service = serviceType.value;
        const basePrice = serviceMultiplier[service];
        const totalPrice = basePrice * duration;
        
        calculatedPrice.textContent = `$${totalPrice.toLocaleString()}`;
      }
  
      // Initialize calculator
      updateCalculatedPrice();
  
      // Calculator CTA button - link to contact page
      const calculatorCta = document.querySelector('.calculator-cta');
      if (calculatorCta) {
        calculatorCta.addEventListener('click', function() {
          window.location.href = contactPageUrl;
        });
      }
    }
  
    // 7. Tooltip functionality is handled by CSS
  
    // 8. & 17. Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header, .faq-question');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  
    // 4. Custom Quote Modal
    const quoteModalTrigger = document.getElementById('quote-modal-trigger');
    const quoteModal = document.getElementById('quote-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
  
    if (quoteModalTrigger && quoteModal) {
      quoteModalTrigger.addEventListener('click', function() {
        quoteModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    }
  
    // Close modals when clicking X or outside
    closeModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    });
  
    window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    // 16. Consultation CTA - link to contact page
    const consultationButtons = document.querySelectorAll('.consultation-button, [href="#consultation"]');
    consultationButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = contactPageUrl;
      });
    });
  
    // 22. Dark Mode Toggle
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    if (darkModeSwitch) {
      darkModeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      });
  
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }
    }
  
    // 24. Brochure Form Submission
    const brochureForm = document.querySelector('.brochure-form');
    if (brochureForm) {
      brochureForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        // In a real implementation, you would send this to your server
        console.log('Brochure requested for:', email);
        alert('Thank you! Your pricing guide will be sent to ' + email);
        this.reset();
      });
    }
  
    // 4. Quote Form Submission
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
      quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
          name: this.querySelector('#name').value,
          company: this.querySelector('#company').value,
          email: this.querySelector('#email').value,
          needs: this.querySelector('#needs').value
        };
        // In a real implementation, you would send this to your server
        console.log('Quote request:', formData);
        alert('Thank you for your request! We will contact you shortly with a custom quote.');
        this.reset();
        quoteModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  
    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('featured') ? 'translateY(-10px) scale(1.05)' : 'translateY(-10px)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
      });
    });
  });