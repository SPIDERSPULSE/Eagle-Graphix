document.addEventListener('DOMContentLoaded', function() {
    // ===== Hero Slider =====
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (heroSlider && slides.length > 0) {
      let currentSlide = 0;
      
      // Initialize slider
      showSlide(currentSlide);
      
      // Auto-rotate slides
      let slideInterval = setInterval(nextSlide, 7000);
      
      // Next slide function
      function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
      
      // Previous slide function
      function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      }
      
      // Show specific slide
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
        
        // Reset timer when manually changing slides
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
      }
      
      // Event listeners
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // Pause on hover
      heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      heroSlider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
      });
    }
  
    // ===== Category Filter =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length > 0 && blogCards.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Filter cards
          const category = button.dataset.category;
          
          blogCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  
    // ===== Editor's Picks Carousel =====
    const picksCarousel = document.querySelector('.picks-carousel');
    const pickCards = document.querySelectorAll('.pick-card');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    
    if (picksCarousel && pickCards.length > 0) {
      let currentPosition = 0;
      const cardWidth = pickCards[0].offsetWidth + 20; // Including gap
      
      // Next pick
      function nextPick() {
        if (currentPosition > -(pickCards.length - 1) * cardWidth) {
          currentPosition -= cardWidth;
          picksCarousel.style.transform = `translateX(${currentPosition}px)`;
        }
      }
      
      // Previous pick
      function prevPick() {
        if (currentPosition < 0) {
          currentPosition += cardWidth;
          picksCarousel.style.transform = `translateX(${currentPosition}px)`;
        }
      }
      
      // Event listeners
      carouselNext.addEventListener('click', nextPick);
      carouselPrev.addEventListener('click', prevPick);
    }
  
    // ===== Table of Contents =====
    const toc = document.querySelector('.article-toc');
    const tocToggle = document.querySelector('.toc-toggle');
    const headings = document.querySelectorAll('.article-content h2');
    
    if (toc && headings.length > 0) {
      // Show TOC when scrolling
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          toc.classList.add('active');
        } else {
          toc.classList.remove('active');
        }
      });
      
      // Toggle TOC visibility
      tocToggle.addEventListener('click', () => {
        toc.classList.toggle('active');
      });
      
      // Update active TOC item while scrolling
      window.addEventListener('scroll', () => {
        let currentSection = '';
        
        headings.forEach(heading => {
          const sectionTop = heading.offsetTop;
          
          if (window.scrollY >= sectionTop - 200) {
            currentSection = heading.id;
          }
        });
        
        const tocLinks = document.querySelectorAll('.toc-list a');
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
      });
    }
  
    // ===== Story Progress Bar =====
    const progressBar = document.querySelector('.progress-fill');
    
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / (docHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${progress}%`;
      });
    }
  
    // ===== Theme Switcher =====
    const themeSwitcher = document.querySelector('.theme-switcher');
    const lightBtn = document.querySelector('.light-mode');
    const darkBtn = document.querySelector('.dark-mode');
    
    if (themeSwitcher) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
          darkBtn.classList.add('active');
          lightBtn.classList.remove('active');
        } else {
          lightBtn.classList.add('active');
          darkBtn.classList.remove('active');
        }
      }
      
      // Light mode
      lightBtn.addEventListener('click', () => {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', '');
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
      });
      
      // Dark mode
      darkBtn.addEventListener('click', () => {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
      });
    }
  
    // ===== Back to Top Button =====
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // ===== Archive Widget =====
    const archiveToggle = document.querySelector('.archive-toggle');
    const archiveDropdown = document.querySelector('.archive-dropdown');
    const yearButtons = document.querySelectorAll('.year-btn');
    
    if (archiveToggle && archiveDropdown) {
      archiveToggle.addEventListener('click', () => {
        archiveDropdown.classList.toggle('visible');
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!archiveToggle.contains(e.target) && !archiveDropdown.contains(e.target)) {
          archiveDropdown.classList.remove('visible');
        }
      });
      
      // Year buttons functionality
      yearButtons.forEach(button => {
        button.addEventListener('click', () => {
          yearButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          // In a real implementation, you would load the months for the selected year
        });
      });
    }
  
    // ===== Audio Player =====
    const audioToggle = document.querySelector('.audio-toggle');
    const audioPlayer = document.querySelector('.audio-player audio');
    
    if (audioToggle && audioPlayer) {
      audioToggle.addEventListener('click', () => {
        if (audioPlayer.paused) {
          audioPlayer.play();
          audioToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>Ambient Mode</span>';
        } else {
          audioPlayer.pause();
          audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i> <span>Ambient Mode</span>';
        }
      });
    }
  
    // ===== Article Audio Narration =====
    const articleAudioBtn = document.querySelector('.audio-btn');
    
    if (articleAudioBtn) {
      articleAudioBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
          const articleText = document.querySelector('.article-content').innerText;
          const utterance = new SpeechSynthesisUtterance(articleText);
          
          // Configure voice
          const voices = window.speechSynthesis.getVoices();
          utterance.voice = voices.find(voice => voice.name.includes('Google UK English Female')) || voices[0];
          utterance.rate = 0.9;
          utterance.pitch = 1;
          
          // Toggle play/pause
          if (articleAudioBtn.classList.contains('playing')) {
            window.speechSynthesis.cancel();
            articleAudioBtn.classList.remove('playing');
            articleAudioBtn.innerHTML = '<i class="fas fa-headphones"></i> Listen to Article';
          } else {
            window.speechSynthesis.speak(utterance);
            articleAudioBtn.classList.add('playing');
            articleAudioBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Listening';
          }
          
          // Reset button when finished
          utterance.onend = () => {
            articleAudioBtn.classList.remove('playing');
            articleAudioBtn.innerHTML = '<i class="fas fa-headphones"></i> Listen to Article';
          };
        } else {
          alert('Text-to-speech is not supported in your browser');
        }
      });
    }
  
    // ===== Print/PDF Buttons =====
    const printBtn = document.querySelector('.print-btn');
    const pdfBtn = document.querySelector('.pdf-btn');
    
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
    
    if (pdfBtn) {
      pdfBtn.addEventListener('click', () => {
        alert('In a real implementation, this would generate a PDF of the article');
        // You would use a library like jsPDF or html2pdf.js here
      });
    }
  
    // ===== Comment Form =====
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
      const emojiBtns = document.querySelectorAll('.emoji-btn');
      const commentTextarea = commentForm.querySelector('textarea');
      
      emojiBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const emoji = btn.textContent;
          const cursorPos = commentTextarea.selectionStart;
          const textBefore = commentTextarea.value.substring(0, cursorPos);
          const textAfter = commentTextarea.value.substring(cursorPos);
          
          commentTextarea.value = textBefore + emoji + textAfter;
          commentTextarea.focus();
          commentTextarea.selectionEnd = cursorPos + emoji.length;
        });
      });
    }
  
    // ===== Like Buttons =====
    const likeBtns = document.querySelectorAll('.like-btn');
    
    likeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('liked')) {
          const currentLikes = parseInt(btn.textContent.match(/\d+/)[0]) || 0;
          btn.innerHTML = `❤️ ${currentLikes + 1}`;
          btn.classList.add('liked');
        }
      });
    });
  
    // ===== Scroll Animations =====
    const animatedElements = document.querySelectorAll('.scroll-animation-section, .blog-card, .pick-card');
    
    function checkScroll() {
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on page load
  });