document.addEventListener('DOMContentLoaded', function() {
  // ===== Hero Section Animation =====
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('loaded');
    }, 500);
  }

  // ===== Multi-Step Contact Form =====
  const formSteps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const contactForm = document.getElementById('luxuryContactForm');
  
  if (contactForm) {
    let currentStep = 0;
    
    // Initialize form
    showStep(currentStep);
    
    // Next button click handler
    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });
    
    // Previous button click handler
    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Update review summary
      updateReviewSummary();
      
      // Show success message
      document.querySelector('.form-success').style.display = 'block';
      this.querySelectorAll('.form-step').forEach(step => {
        step.style.display = 'none';
      });
      
      // Scroll to success message
      setTimeout(() => {
        document.querySelector('.form-success').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
    
    // Show current step
    function showStep(step) {
      formSteps.forEach((formStep, index) => {
        formStep.classList.toggle('active', index === step);
      });
      
      progressSteps.forEach((progressStep, index) => {
        progressStep.classList.toggle('active', index <= step);
      });
      
      // Show/hide navigation buttons
      if (step === 0) {
        document.querySelectorAll('.btn-prev').forEach(btn => btn.style.display = 'none');
      } else {
        document.querySelectorAll('.btn-prev').forEach(btn => btn.style.display = 'inline-flex');
      }
      
      if (step === formSteps.length - 1) {
        document.querySelectorAll('.btn-next').forEach(btn => btn.style.display = 'none');
        document.querySelectorAll('.btn-submit').forEach(btn => btn.style.display = 'inline-flex');
      } else {
        document.querySelectorAll('.btn-next').forEach(btn => btn.style.display = 'inline-flex');
        document.querySelectorAll('.btn-submit').forEach(btn => btn.style.display = 'none');
      }
    }
    
    // Validate current step
    function validateStep(step) {
      let isValid = true;
      const currentFormStep = formSteps[step];
      
      // Validate service selection for step 0
      if (step === 0) {
        const selectedService = currentFormStep.querySelector('input[name="service"]:checked');
        if (!selectedService) {
          alert('Please select a service');
          isValid = false;
        }
      }
      
      // Validate required fields for step 1
      if (step === 1) {
        const requiredFields = currentFormStep.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
          } else {
            field.style.borderColor = '';
          }
        });
      }
      
      return isValid;
    }
    
    // Update review summary
    function updateReviewSummary() {
      document.getElementById('review-service').textContent = 
        document.querySelector('input[name="service"]:checked')?.nextElementSibling.querySelector('h4').textContent || 'Not specified';
      document.getElementById('review-name').textContent = 
        document.getElementById('fullName').value || 'Not specified';
      document.getElementById('review-email').textContent = 
        document.getElementById('email').value || 'Not specified';
      document.getElementById('review-phone').textContent = 
        document.getElementById('phone').value || 'Not specified';
      document.getElementById('review-company').textContent = 
        document.getElementById('company').value || 'Not specified';
      document.getElementById('review-message').textContent = 
        document.getElementById('message').value || 'Not specified';
    }
  }

  // ===== Live Concierge Chat =====
  const chatToggle = document.querySelector('.chat-toggle');
  const conciergeChat = document.querySelector('.concierge-chat');
  const chatClose = document.querySelector('.chat-close');
  const chatInput = document.querySelector('.chat-input input');
  const sendButton = document.querySelector('.send-button');
  const voiceButton = document.querySelector('.voice-button');
  
  if (chatToggle && conciergeChat) {
    chatToggle.addEventListener('click', () => {
      conciergeChat.classList.toggle('active');
    });
    
    chatClose.addEventListener('click', () => {
      conciergeChat.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
      const messageText = chatInput.value.trim();
      if (messageText) {
        // Add user message
        addMessage(messageText, 'user');
        chatInput.value = '';
        
        // Simulate concierge response after delay
        setTimeout(() => {
          const responses = [
            "I'd be delighted to assist you with that. Could you please provide more details?",
            "Thank you for your message. Our team will get back to you shortly.",
            "That's an excellent question. Let me connect you with a specialist.",
            "We appreciate your inquiry. How can we make your experience exceptional?"
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse, 'concierge');
        }, 1000 + Math.random() * 2000);
      }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
      const messagesContainer = document.querySelector('.chat-messages');
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', `${sender}-message`);
      
      const messagePara = document.createElement('p');
      messagePara.textContent = text;
      messageDiv.appendChild(messagePara);
      
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key press
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Voice button click (simulated)
    voiceButton.addEventListener('click', () => {
      if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onstart = () => {
          voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
          voiceButton.style.background = 'var(--emerald)';
          chatInput.placeholder = 'Listening...';
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          chatInput.value = transcript;
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
        };
        
        recognition.onend = () => {
          voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
          voiceButton.style.background = 'var(--gold-gradient)';
          chatInput.placeholder = 'Type your message...';
        };
        
        recognition.start();
      } else {
        alert('Speech recognition not supported in your browser');
      }
    });
  }

  // ===== Appointment Scheduler =====
  const appointmentWidget = document.querySelector('.appointment-widget');
  if (appointmentWidget) {
    const monthNav = document.querySelector('.current-month');
    const prevMonthBtn = document.querySelector('.month-nav.prev');
    const nextMonthBtn = document.querySelector('.month-nav.next');
    const calendarDays = document.querySelector('.calendar-days');
    const timeSlotsContainer = document.querySelector('.time-slots-container');
    const timeSlots = document.querySelector('.time-slots');
    const appointmentConfirm = document.querySelector('.appointment-confirm');
    const confirmBtn = document.querySelector('.confirm-appointment');
    
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
    
    // Initialize calendar
    renderCalendar(currentDate);
    
    // Previous month button
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
      resetTimeSelection();
    });
    
    // Next month button
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
      resetTimeSelection();
    });
    
    // Render calendar
    function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      
      // Update month header
      monthNav.textContent = new Date(year, month).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
      
      // Get first day of month and total days
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      // Clear previous days
      calendarDays.innerHTML = '';
      
      // Add empty cells for days before first day of month
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'disabled');
        calendarDays.appendChild(emptyCell);
      }
      
      // Add days of month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;
        
        // Highlight today
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dayCell.classList.add('active');
        }
        
        // Date selection
        dayCell.addEventListener('click', () => {
          document.querySelectorAll('.calendar-day').forEach(cell => {
            cell.classList.remove('active');
          });
          dayCell.classList.add('active');
          
          selectedDate = new Date(year, month, day);
          updateTimeSlots();
          timeSlotsContainer.style.display = 'block';
          appointmentConfirm.style.display = 'none';
        });
        
        calendarDays.appendChild(dayCell);
      }
    }
    
    // Update time slots based on selected date
    function updateTimeSlots() {
      // In a real app, you would fetch available times from your backend
      const availableTimes = [
        '9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'
      ];
      
      timeSlots.innerHTML = '';
      
      availableTimes.forEach(time => {
        const timeSlot = document.createElement('button');
        timeSlot.classList.add('time-slot');
        timeSlot.textContent = time;
        
        timeSlot.addEventListener('click', () => {
          document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
          });
          timeSlot.classList.add('selected');
          selectedTime = time;
          
          // Show confirmation section
          appointmentConfirm.style.display = 'block';
          document.querySelector('.selected-date-time').textContent = 
            selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }) + ' at ' + selectedTime;
        });
        
        timeSlots.appendChild(timeSlot);
      });
    }
    
    // Reset time selection when changing months
    function resetTimeSelection() {
      timeSlotsContainer.style.display = 'none';
      appointmentConfirm.style.display = 'none';
      selectedDate = null;
      selectedTime = null;
    }
    
    // Confirm appointment
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const name = document.getElementById('appointment-name').value;
        const email = document.getElementById('appointment-email').value;
        
        if (name && email) {
          // In a real app, you would send this data to your backend
          alert(`Thank you, ${name}! Your appointment has been scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}. A confirmation has been sent to ${email}.`);
          
          // Reset form
          document.getElementById('appointment-name').value = '';
          document.getElementById('appointment-email').value = '';
          document.getElementById('appointment-notes').value = '';
          resetTimeSelection();
          document.querySelectorAll('.calendar-day').forEach(cell => {
            cell.classList.remove('active');
          });
          document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
          });
        } else {
          alert('Please fill in all required fields');
        }
      });
    }
  }

  // ===== Testimonial Carousel =====
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  if (testimonialCarousel) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    
    // Initialize carousel
    showSlide(currentSlide);
    
    // Previous button
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
    
    // Auto-advance every 8 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 8000);
    
    // Show current slide
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
  }

  // ===== Contact Options Modals =====
  const optionCards = document.querySelectorAll('.option-card');
  const modals = document.querySelectorAll('.modal-overlay');
  
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal') + 'Modal';
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  

  // ===== QR Code Generator =====
  const qrContainer = document.getElementById('contactQR');
  const portfolioQR = document.getElementById('portfolioQR');
  const downloadQRBtn = document.querySelector('.download-qr');
  const generateVcardBtn = document.querySelector('.generate-vcard');
  
  if (qrContainer) {
    // In a real app, you would use a QR code library like QRious
    // This is a simplified simulation
    qrContainer.innerHTML = '<div class="qr-simulated"></div>';
    portfolioQR.innerHTML = '<div class="qr-simulated"></div>';
    
    // Download QR codes
    downloadQRBtn.addEventListener('click', () => {
      alert('In a real implementation, this would download QR code images');
    });
    
    // Generate vCard
    generateVcardBtn.addEventListener('click', () => {
      alert('In a real implementation, this would generate a vCard file');
    });
  }

  // ===== VIP Access Form =====
  const vipForm = document.getElementById('vipAccessForm');
  if (vipForm) {
    vipForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const code = document.getElementById('vip-code').value;
      const email = document.getElementById('vip-email').value;
      
      if (code || email) {
        // In a real app, you would validate the code/email with your backend
        alert('VIP access granted! Redirecting to your private concierge suite...');
        this.reset();
      } else {
        alert('Please enter either your VIP access code or registered email');
      }
    });
  }

  // ===== Brochure Download Form =====
  const brochureForm = document.getElementById('brochureForm');
  if (brochureForm) {
    brochureForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('brochure-name').value;
      const email = document.getElementById('brochure-email').value;
      
      if (name && email) {
        // In a real app, you would send this data to your backend
        alert(`Thank you, ${name}! Our premium brochure has been sent to ${email}.`);
        this.reset();
      } else {
        alert('Please fill in all required fields');
      }
    });
  }

  // ===== AI Recommender =====
  const aiRecommender = document.querySelector('.ai-recommender');
  if (aiRecommender) {
    const aiSteps = document.querySelectorAll('.ai-step');
    const aiProgressSteps = document.querySelectorAll('.ai-progress .progress-step');
    const aiNextButtons = document.querySelectorAll('.ai-next');
    const aiPrevButtons = document.querySelectorAll('.ai-prev');
    const aiForm = document.getElementById('aiRecommenderForm');
    
    let currentAiStep = 0;
    
    // Initialize form
    showAiStep(currentAiStep);
    
    // Next button click handler
    aiNextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (validateAiStep(currentAiStep)) {
          currentAiStep++;
          showAiStep(currentAiStep);
        }
      });
    });
    
    // Previous button click handler
    aiPrevButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentAiStep--;
        showAiStep(currentAiStep);
      });
    });
    
    // Form submission
    aiForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get email for results
      const email = document.getElementById('ai-email').value;
      
      if (email) {
        // Show results
        document.querySelector('.ai-results').style.display = 'block';
        this.querySelectorAll('.ai-step').forEach(step => {
          step.style.display = 'none';
        });
        
        // Scroll to results
        setTimeout(() => {
          document.querySelector('.ai-results').scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        alert('Please enter your email to receive recommendations');
      }
    });
    
    // Show current step
    function showAiStep(step) {
      aiSteps.forEach((aiStep, index) => {
        aiStep.classList.toggle('active', index === step);
      });
      
      aiProgressSteps.forEach((progressStep, index) => {
        progressStep.classList.toggle('active', index <= step);
      });
      
      // Show/hide navigation buttons
      if (step === 0) {
        document.querySelectorAll('.ai-prev').forEach(btn => btn.style.display = 'none');
      } else {
        document.querySelectorAll('.ai-prev').forEach(btn => btn.style.display = 'inline-flex');
      }
      
      if (step === aiSteps.length - 1) {
        document.querySelectorAll('.ai-next').forEach(btn => btn.style.display = 'none');
        document.querySelectorAll('.ai-submit').forEach(btn => btn.style.display = 'inline-flex');
      } else {
        document.querySelectorAll('.ai-next').forEach(btn => btn.style.display = 'inline-flex');
        document.querySelectorAll('.ai-submit').forEach(btn => btn.style.display = 'none');
      }
    }
    
    // Validate current step
    function validateAiStep(step) {
      let isValid = true;
      const currentAiStep = aiSteps[step];
      
      // Validate step 0 (brand personality)
      if (step === 0) {
        const selectedOption = currentAiStep.querySelector('input[name="brand-personality"]:checked');
        if (!selectedOption) {
          alert('Please select your brand personality');
          isValid = false;
        }
      }
      
      // Validate step 1 (color palette)
      if (step === 1) {
        const selectedOption = currentAiStep.querySelector('input[name="color-palette"]:checked');
        if (!selectedOption) {
          alert('Please select a color palette');
          isValid = false;
        }
      }
      
      // Validate step 2 (design styles - at least one selected)
      if (step === 2) {
        const selectedOptions = currentAiStep.querySelectorAll('input[name="design-styles"]:checked');
        if (selectedOptions.length === 0) {
          alert('Please select at least one design style');
          isValid = false;
        }
      }
      
      // Validate step 3 (emotions - at least one selected)
      if (step === 3) {
        const selectedOptions = currentAiStep.querySelectorAll('input[name="emotions"]:checked');
        if (selectedOptions.length === 0) {
          alert('Please select at least one emotion');
          isValid = false;
        }
      }
      
      return isValid;
    }
  }

  // ===== Ambient Sound Controls =====
  const soundToggle = document.querySelector('.sound-toggle');
  const ambientAudio = document.getElementById('ambientAudio');
  
  if (soundToggle && ambientAudio) {
    soundToggle.addEventListener('click', () => {
      if (ambientAudio.paused) {
        ambientAudio.play();
        soundToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>Ambient Mode</span>';
      } else {
        ambientAudio.pause();
        soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i> <span>Ambient Mode</span>';
      }
    });
  }

  // ===== Language Selector =====
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector) {
    const currentLanguage = languageSelector.querySelector('.current-language');
    const languageDropdown = languageSelector.querySelector('.language-dropdown');
    
    currentLanguage.addEventListener('click', () => {
      languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!languageSelector.contains(e.target)) {
        languageDropdown.style.display = 'none';
      }
    });
    
    // Language selection
    languageDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.getAttribute('data-lang');
        const flag = link.querySelector('img').src;
        const text = link.querySelector('span').textContent;
        
        // Update current language display
        currentLanguage.querySelector('img').src = flag;
        currentLanguage.querySelector('span').textContent = lang.toUpperCase();
        
        // In a real app, you would implement language switching here
        alert(`Language changed to ${text}`);
        
        // Close dropdown
        languageDropdown.style.display = 'none';
      });
    });
  }

  // ===== Parallax Effects =====
  const parallaxElements = document.querySelectorAll('.parallax-icon');
  if (parallaxElements.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.05 + (index * 0.02);
        const xPos = -(x * 50 * speed) + 50;
        const yPos = -(y * 50 * speed) + 50;
        
        element.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    });
  }

  // ===== Mobile Haptic Feedback =====
  if ('vibrate' in navigator) {
    const hapticElements = document.querySelectorAll('[data-haptic]');
    
    hapticElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        navigator.vibrate(10);
      });
    });
  }

  // ===== Smooth Scrolling for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll Animations =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .testimonial-slide, .option-card, .team-member');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});














