document.addEventListener('DOMContentLoaded', function() {
    // Hero Section Animation
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Animate hero content
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 500);
    
    // Animate scroll indicator
    setTimeout(() => {
      scrollIndicator.style.opacity = '1';
    }, 1500);
    
    // Scroll to next section when indicator is clicked
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('.founder-message');
      nextSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Floating Contact Button
    const floatingBtn = document.querySelector('.floating-contact-btn');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.transform = 'translateY(0)';
      } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.transform = 'translateY(20px)';
      }
    });
    
    floatingBtn.addEventListener('click', () => {
      document.querySelector('.smart-contact-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Multi-Step Contact Form
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const contactForm = document.getElementById('luxuryContactForm');
    
    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentStep = button.closest('.form-step');
        const nextStep = currentStep.nextElementSibling;
        
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        
        // Scroll to top of form
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    
    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentStep = button.closest('.form-step');
        const prevStep = currentStep.previousElementSibling;
        
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
        
        // Scroll to top of form
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const activeStep = document.querySelector('.form-step.active');
      const successMessage = document.querySelector('.form-success');
      
      // Hide current step and show success message
      activeStep.classList.remove('active');
      successMessage.style.display = 'block';
      
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth' });
      
      // Here you would normally send the form data to your server
      console.log('Form submitted:', new FormData(contactForm));
    });
    
    // Interactive Map
    const mapLocations = document.querySelectorAll('.map-location');
    const locationDetails = document.querySelectorAll('.location-details');
    
    mapLocations.forEach(location => {
      location.addEventListener('click', () => {
        const locationId = location.getAttribute('data-location');
        
        // Hide all location details
        locationDetails.forEach(detail => {
          detail.style.display = 'none';
        });
        
        // Show selected location details
        document.querySelector(`.location-details[data-location="${locationId}"]`).style.display = 'block';
      });
    });
    
    // Initialize first location as active
    if (mapLocations.length > 0) {
      const firstLocation = mapLocations[0].getAttribute('data-location');
      document.querySelector(`.location-details[data-location="${firstLocation}"]`).style.display = 'block';
    }
    
    // Appointment Scheduler
    const appointmentTypes = document.querySelectorAll('.type-option');
    const timeSlots = document.querySelectorAll('.time-slot');
    
    appointmentTypes.forEach(type => {
      type.addEventListener('click', () => {
        appointmentTypes.forEach(t => t.classList.remove('active'));
        type.classList.add('active');
      });
    });
    
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
      });
    });
    
    // Detect user timezone
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      document.getElementById('userTimezone').textContent = userTimezone;
    } catch (e) {
      console.log('Timezone detection not supported');
    }
    
    // Location Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const locationModal = document.getElementById('locationModal');
    const modalClose = document.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const location = item.querySelector('h4').textContent;
        const address = item.querySelector('p').textContent;
        
        document.getElementById('locationModalTitle').textContent = location;
        document.getElementById('locationModalAddress').textContent = address;
        
        locationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    modalClose.addEventListener('click', () => {
      locationModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    // Thumbnail click handler
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('locationMainImage');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        const imgSrc = thumb.querySelector('img').src;
        mainImage.src = imgSrc;
      });
    });
    
    // Concierge Chat
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.btn-send');
    const chatMessages = document.querySelector('.chat-messages');
    
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user' : 'concierge'}`;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';
      
      const messageText = document.createElement('p');
      messageText.textContent = text;
      
      const timeSpan = document.createElement('span');
      timeSpan.className = 'message-time';
      
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      timeSpan.textContent = `${hours}:${minutes}`;
      
      contentDiv.appendChild(messageText);
      contentDiv.appendChild(timeSpan);
      messageDiv.appendChild(contentDiv);
      chatMessages.appendChild(messageDiv);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    sendButton.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate concierge response
        setTimeout(() => {
          addMessage("Thank you for your message. Our concierge will respond to you shortly.");
        }, 1000);
      }
    });
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });
    
    // Quick replies
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    quickReplies.forEach(reply => {
      reply.addEventListener('click', () => {
        const text = reply.textContent;
        addMessage(text, true);
        
        // Simulate concierge response
        setTimeout(() => {
          if (text.includes('consultation')) {
            addMessage("I'd be happy to help you book a consultation. Please let me know your preferred date and time.");
          } else if (text.includes('services')) {
            addMessage("We offer a range of premium design services. Would you like me to send you more information?");
          } else if (text.includes('status')) {
            addMessage("To check your project status, I'll need your project reference number. Can you provide that?");
          }
        }, 1000);
      });
    });
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonial = document.querySelector('.carousel-prev');
    const nextTestimonial = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    
    function showSlide(index) {
      testimonialSlides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonialSlides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }
    
    prevTestimonial.addEventListener('click', () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = testimonialSlides.length - 1;
      showSlide(newIndex);
    });
    
    nextTestimonial.addEventListener('click', () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= testimonialSlides.length) newIndex = 0;
      showSlide(newIndex);
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
      let newIndex = currentSlide + 1;
      if (newIndex >= testimonialSlides.length) newIndex = 0;
      showSlide(newIndex);
    }, 8000);
    
    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(testimonialInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        showSlide(newIndex);
      }, 8000);
    });
    
    // Initialize first slide
    showSlide(0);
    
    // Video Play Button
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
      button.addEventListener('click', () => {
        const video = button.parentElement.querySelector('video');
        
        if (video.paused) {
          video.play();
          button.style.opacity = '0';
          button.style.pointerEvents = 'none';
        } else {
          video.pause();
          button.style.opacity = '1';
          button.style.pointerEvents = 'auto';
        }
      });
    });
    
    // Contact Options Grid Modals
    const optionCards = document.querySelectorAll('.option-card');
    const modals = document.querySelectorAll('.modal');
    
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal') + 'Modal';
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close modals
    modals.forEach(modal => {
      const closeButton = modal.querySelector('.modal-close');
      
      closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
      
      // Close when clicking outside modal content
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });
    });
    
    // Language Selector
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    languageSelector.addEventListener('click', (e) => {
      e.stopPropagation();
      languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    const languageOptions = document.querySelectorAll('.language-dropdown li');
    
    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        const flag = option.querySelector('.flag-icon').textContent;
        const name = option.querySelector('span').textContent;
        
        document.querySelector('.current-language .flag-icon').innerHTML = flag;
        document.querySelector('.current-language .language-name').textContent = name;
        
        // Here you would normally implement language switching
        console.log('Language changed to:', lang);
        
        languageDropdown.style.display = 'none';
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      languageDropdown.style.display = 'none';
    });
    
    // QR Code Generator
    const qrOptions = document.querySelectorAll('.qr-option');
    const qrImage = document.getElementById('qrCodeImage');
    
    qrOptions.forEach(option => {
      option.addEventListener('click', () => {
        qrOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const type = option.getAttribute('data-type');
        
        // In a real implementation, you would generate different QR codes
        // This is just a visual demonstration
        if (type === 'vcard') {
          qrImage.src = 'assets/images/qr-code-vcard.png';
        } else if (type === 'brochure') {
          qrImage.src = 'assets/images/qr-code-brochure.png';
        } else if (type === 'portfolio') {
          qrImage.src = 'assets/images/qr-code-portfolio.png';
        }
      });
    });
    
    // AI Recommender Form
    const aiForm = document.getElementById('aiRecommenderForm');
    const aiNextButtons = aiForm.querySelectorAll('.btn-next');
    const aiPrevButtons = aiForm.querySelectorAll('.btn-prev');
    const aiFormSteps = aiForm.querySelectorAll('.form-step');
    
    aiNextButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentStep = button.closest('.form-step');
        const nextStep = currentStep.nextElementSibling;
        
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
      });
    });
    
    aiPrevButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentStep = button.closest('.form-step');
        const prevStep = currentStep.previousElementSibling;
        
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
      });
    });
    
    aiForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Gather form data
      const formData = new FormData(aiForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Here you would normally send the data to your server
      console.log('AI Recommender data:', data);
      
      // Show results (simulated)
      alert("Based on your preferences, we recommend our Premium Branding Package with a minimalist aesthetic and premium materials.");
    });
    
    // VIP Access Form
    const vipForm = document.getElementById('vipAccessForm');
    
    vipForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const code = document.getElementById('modalVipCode').value;
      const email = document.getElementById('modalVipEmail').value;
      
      // Simple validation
      if (code && email) {
        // Here you would normally validate the VIP code with your server
        console.log('VIP access requested with code:', code, 'and email:', email);
        
        // Simulate successful access
        alert("VIP Access granted! Redirecting to your private portal...");
        document.getElementById('vipModal').classList.remove('active');
        document.body.style.overflow = 'auto';
      } else {
        alert("Please enter both your VIP code and registered email.");
      }
    });
    
    // Digital Brochure Form
    const brochureForm = document.getElementById('brochureForm');
    
    brochureForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('brochureName').value;
      const email = document.getElementById('brochureEmail').value;
      
      if (name && email) {
        // Here you would normally send the data to your server
        console.log('Brochure requested by:', name, email);
        
        // Simulate successful download
        alert("Thank you! Our luxury portfolio brochure has been sent to your email.");
        brochureForm.reset();
      } else {
        alert("Please enter your name and email address.");
      }
    });
    
    // Callback Request Form
    const callbackForm = document.getElementById('callbackForm');
    
    callbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('callbackName').value;
      const phone = document.getElementById('callbackPhone').value;
      const time = document.getElementById('callbackTime').value;
      
      if (name && phone && time) {
        // Here you would normally send the data to your server
        console.log('Callback requested by:', name, phone, time);
        
        // Simulate successful request
        alert(`Thank you, ${name}! We'll call you at your requested time (${time}).`);
        callbackForm.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
    
    // Mobile Haptic Feedback
    if ('vibrate' in navigator) {
      const hapticElements = document.querySelectorAll('[data-haptic]');
      
      hapticElements.forEach(element => {
        element.addEventListener('click', () => {
          navigator.vibrate(10); // 10ms vibration
        });
      });
    }
    
    // Ambient Sound Effects (optional)
    const soundElements = document.querySelectorAll('[data-sound]');
    let ambientSound = null;
    
    soundElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (ambientSound) {
          ambientSound.pause();
          ambientSound.currentTime = 0;
        }
        
        // In a real implementation, you would play subtle sound effects
        // This is just a placeholder
        console.log('Play sound effect for:', element.getAttribute('data-sound'));
      });
      
      element.addEventListener('mouseleave', () => {
        if (ambientSound) {
          ambientSound.pause();
          ambientSound.currentTime = 0;
        }
      });
    });
    
    // Parallax Effect for Floating Icons
    const parallaxIcons = document.querySelectorAll('.floating-parallax-icons .icon');
    
    if (parallaxIcons.length > 0) {
      window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxIcons.forEach(icon => {
          const depth = parseFloat(icon.getAttribute('data-depth')) || 0.2;
          const moveX = (x - 0.5) * 20 * depth;
          const moveY = (y - 0.5) * 20 * depth;
          
          icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
    }
    
    // Initialize all forms to show first step
    const multiStepForms = document.querySelectorAll('.multi-step-form');
    
    multiStepForms.forEach(form => {
      const firstStep = form.querySelector('.form-step');
      if (firstStep) firstStep.classList.add('active');
    });
  });