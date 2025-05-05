document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.luxury-preloader');
  
  // Simulate loading
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }, 2000);

  // Sidebar navigation active state
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Hero video play on mobile
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    
    // For mobile devices
    document.addEventListener('scroll', function() {
      if (window.innerWidth <= 768 && isInViewport(heroVideo)) {
        heroVideo.play().catch(e => console.log(e));
      }
    }, { once: true });
  }

  // Featured carousel
  const featuredCarousel = document.querySelector('.featured-carousel');
  const featuredArticles = document.querySelectorAll('.featured-article');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  const carouselDots = document.querySelector('.carousel-dots');
  let currentSlide = 0;
  
  if (featuredCarousel && featuredArticles.length > 0) {
    // Create dots
    featuredArticles.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      carouselDots.appendChild(dot);
    });
    
    // Next button
    carouselNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % featuredArticles.length;
      updateCarousel();
    });
    
    // Previous button
    carouselPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + featuredArticles.length) % featuredArticles.length;
      updateCarousel();
    });
    
    // Auto-advance carousel
    let carouselInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % featuredArticles.length;
      updateCarousel();
    }, 5000);
    
    // Pause on hover
    featuredCarousel.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    featuredCarousel.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % featuredArticles.length;
        updateCarousel();
      }, 5000);
    });
  }
  
  function updateCarousel() {
    const itemWidth = featuredArticles[0].offsetWidth + 30; // Include gap
    featuredCarousel.scrollTo({
      left: currentSlide * itemWidth,
      behavior: 'smooth'
    });
    
    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  // Case studies carousel
  const caseStudiesCarousel = document.querySelector('.case-studies-carousel');
  const caseStudies = document.querySelectorAll('.case-study');
  let currentCaseStudy = 0;
  
  if (caseStudiesCarousel && caseStudies.length > 0) {
    // Auto-advance carousel
    let caseStudyInterval = setInterval(() => {
      currentCaseStudy = (currentCaseStudy + 1) % caseStudies.length;
      updateCaseStudiesCarousel();
    }, 6000);
    
    // Pause on hover
    caseStudiesCarousel.addEventListener('mouseenter', () => {
      clearInterval(caseStudyInterval);
    });
    
    caseStudiesCarousel.addEventListener('mouseleave', () => {
      caseStudyInterval = setInterval(() => {
        currentCaseStudy = (currentCaseStudy + 1) % caseStudies.length;
        updateCaseStudiesCarousel();
      }, 6000);
    });
  }
  
  function updateCaseStudiesCarousel() {
    const itemWidth = caseStudies[0].offsetWidth + 30; // Include gap
    caseStudiesCarousel.scrollTo({
      left: currentCaseStudy * itemWidth,
      behavior: 'smooth'
    });
  }

  // Community tabs
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show corresponding tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });

  // Like buttons
  const likeButtons = document.querySelectorAll('.like');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const icon = this.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      
      if (icon.classList.contains('fas')) {
        const count = this.textContent.match(/\d+/)[0];
        this.innerHTML = `<i class="fas fa-heart"></i> ${parseInt(count) + 1}`;
      } else {
        const count = this.textContent.match(/\d+/)[0];
        this.innerHTML = `<i class="far fa-heart"></i> ${parseInt(count) - 1}`;
      }
    });
  });

  // Bookmark buttons
  const bookmarkButtons = document.querySelectorAll('.bookmark');
  
  bookmarkButtons.forEach(button => {
    button.addEventListener('click', function() {
      const icon = this.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
    });
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
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Newsletter form submission
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput.value.trim() !== '') {
        // Simulate successful submission
        emailInput.value = '';
        alert('Thank you for subscribing to our luxury digest!');
      }
    });
  });

  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientHeight)
    );
  }

  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.featured-article, .trending-article, .article-card, .interview-card, .case-study');
    
    elements.forEach(element => {
      if (isInViewport(element)) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Initialize smooth scroll for the whole document
document.documentElement.style.scrollBehavior = 'smooth';














// Live Q&A Countdown Timer
function updateCountdown() {
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 3); // Set to 3 days from now
  
  const now = new Date().getTime();
  const distance = eventDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 60000);

// Resource Library Tabs
const resourceTabs = document.querySelectorAll('.resource-tab');
const resourceContents = document.querySelectorAll('.resource-content');

resourceTabs.forEach(tab => {
  tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      
      // Update active tab
      resourceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding content
      resourceContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === tabId) {
              content.classList.add('active');
          }
      });
  });
});

// Interactive World Map
const regions = document.querySelectorAll('.region');
const mapTooltip = document.querySelector('.map-tooltip');
const selectedRegion = document.getElementById('selected-region');
const trendsGrid = document.querySelector('.trends-grid');

// Sample trend data by region
const trendData = {
  'north-america': [
      {
          title: "Minimalist Luxury",
          description: "Clean layouts with ample white space and subtle animations dominate North American luxury sites.",
          examples: []
      },
      {
          title: "Dark Mode Elegance",
          description: "High-contrast dark themes with gold accents are becoming standard for premium brands.",
          examples: []
      }
  ],
  'europe': [
      {
          title: "Heritage Modernization",
          description: "European brands are blending traditional elements with contemporary digital experiences.",
          examples: []
      },
      {
          title: "Sustainable Storytelling",
          description: "Emphasis on eco-friendly practices through interactive narratives.",
          examples: []
      }
  ],
  // Add data for other regions...
};

regions.forEach(region => {
  region.addEventListener('mouseenter', (e) => {
      const regionName = region.getAttribute('data-region');
      const regionTitle = regionName.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Position tooltip
      const rect = region.getBoundingClientRect();
      mapTooltip.style.left = `${rect.left + rect.width/2}px`;
      mapTooltip.style.top = `${rect.top - 40}px`;
      mapTooltip.textContent = regionTitle;
      mapTooltip.style.opacity = '1';
  });
  
  region.addEventListener('mouseleave', () => {
      mapTooltip.style.opacity = '0';
  });
  
  region.addEventListener('click', () => {
      const regionName = region.getAttribute('data-region');
      const regionTitle = regionName.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      selectedRegion.textContent = regionTitle;
      
      // Load trends for this region
      trendsGrid.innerHTML = '';
      
      if (trendData[regionName]) {
          trendData[regionName].forEach(trend => {
              const trendItem = document.createElement('div');
              trendItem.className = 'trend-item active';
              trendItem.innerHTML = `
                  <h3 class="trend-title">${trend.title}</h3>
                  <p class="trend-description">${trend.description}</p>
                  <div class="trend-examples"></div>
              `;
              trendsGrid.appendChild(trendItem);
          });
      } else {
          trendsGrid.innerHTML = `
              <div class="empty-state">
                  <i class="fas fa-info-circle"></i>
                  <p>No trend data available for this region yet</p>
              </div>
          `;
      }
  });
});

// Client Logo Tooltips
const clientLogos = document.querySelectorAll('.client-logo');

clientLogos.forEach(logo => {
  logo.addEventListener('mouseenter', () => {
      const tooltip = logo.querySelector('.client-tooltip');
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
  });
  
  logo.addEventListener('mouseleave', () => {
      const tooltip = logo.querySelector('.client-tooltip');
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
  });
});

// Design Challenge Submission Modal
const submitButton = document.querySelector('.submit-button');
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
  <div class="modal-content">
      <button class="close-modal"><i class="fas fa-times"></i></button>
      <h2>Submit Your Design</h2>
      <form class="submission-form">
          <div class="form-group">
              <label>Your Name</label>
              <input type="text" required>
          </div>
          <div class="form-group">
              <label>Email Address</label>
              <input type="email" required>
          </div>
          <div class="form-group">
              <label>Portfolio URL</label>
              <input type="url">
          </div>
          <div class="form-group">
              <label>Design Files (ZIP)</label>
              <input type="file" accept=".zip,.rar" required>
          </div>
          <div class="form-group">
              <label>Design Description</label>
              <textarea rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-form-button">
              <i class="fas fa-paper-plane"></i> Submit Entry
          </button>
      </form>
  </div>
`;

submitButton.addEventListener('click', () => {
  document.body.appendChild(modalOverlay);
  document.body.style.overflow = 'hidden';
  
  const closeModal = modalOverlay.querySelector('.close-modal');
  closeModal.addEventListener('click', () => {
      document.body.removeChild(modalOverlay);
      document.body.style.overflow = '';
  });
  
  const submissionForm = modalOverlay.querySelector('.submission-form');
  submissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your submission! Good luck!');
      document.body.removeChild(modalOverlay);
      document.body.style.overflow = '';
  });
});

// Previous Sessions Carousel
const sessionsCarousel = document.querySelector('.sessions-carousel');
let isDragging = false;
let startX, scrollLeft;

sessionsCarousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - sessionsCarousel.offsetLeft;
  scrollLeft = sessionsCarousel.scrollLeft;
  sessionsCarousel.style.cursor = 'grabbing';
});

sessionsCarousel.addEventListener('mouseleave', () => {
  isDragging = false;
  sessionsCarousel.style.cursor = 'grab';
});

sessionsCarousel.addEventListener('mouseup', () => {
  isDragging = false;
  sessionsCarousel.style.cursor = 'grab';
});

sessionsCarousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - sessionsCarousel.offsetLeft;
  const walk = (x - startX) * 2;
  sessionsCarousel.scrollLeft = scrollLeft - walk;
});
























// Design Spotlight Functionality
function initDesignSpotlight() {
  const caseStudies = document.querySelectorAll('.case-study');
  const projectDots = document.querySelectorAll('.project-dot');
  const prevBtn = document.querySelector('.spotlight-prev');
  const nextBtn = document.querySelector('.spotlight-next');
  let currentCase = 0;

  // Media Gallery Controls
  const mediaDots = document.querySelectorAll('.media-dots .dot');
  const mediaPrev = document.querySelector('.media-prev');
  const mediaNext = document.querySelector('.media-next');
  const galleryImages = document.querySelectorAll('.media-viewer img');
  let currentImage = 0;

  // Tab Functionality
  const tabBtns = document.querySelectorAll('.case-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Bookmark Button
  const bookmarkBtn = document.querySelector('.bookmark-btn');

  // Video Play Button
  const playBtn = document.querySelector('.play-btn');
  const caseVideo = document.querySelector('.case-video video');

  // Switch Case Studies
  function showCase(index) {
    caseStudies.forEach(caseStudy => caseStudy.classList.remove('active'));
    caseStudies[index].classList.add('active');
    
    projectDots.forEach(dot => dot.classList.remove('active'));
    projectDots[index].classList.add('active');
    
    currentCase = index;
  }

  // Media Gallery Navigation
  function showImage(index) {
    galleryImages.forEach(img => img.classList.remove('active'));
    galleryImages[index].classList.add('active');
    
    mediaDots.forEach(dot => dot.classList.remove('active'));
    mediaDots[index].classList.add('active');
    
    currentImage = index;
  }

  // Event Listeners
  projectDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showCase(index));
  });

  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentCase - 1 + caseStudies.length) % caseStudies.length;
    showCase(prevIndex);
  });

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentCase + 1) % caseStudies.length;
    showCase(nextIndex);
  });

  mediaDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showImage(index));
  });

  mediaPrev.addEventListener('click', () => {
    const prevIndex = (currentImage - 1 + galleryImages.length) % galleryImages.length;
    showImage(prevIndex);
  });

  mediaNext.addEventListener('click', () => {
    const nextIndex = (currentImage + 1) % galleryImages.length;
    showImage(nextIndex);
  });

  // Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active tab button
      tabBtns.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update active tab content
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Bookmark Toggle
  bookmarkBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    this.classList.toggle('far');
    this.classList.toggle('fas');
    
    if (this.classList.contains('active')) {
      // Add to saved items
      showNotification('Case study saved to your collection');
    }
  });

  // Video Play/Pause
  playBtn.addEventListener('click', function() {
    if (caseVideo.paused) {
      caseVideo.play();
      this.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      caseVideo.pause();
      this.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // Auto-rotate images every 5 seconds
  setInterval(() => {
    const nextIndex = (currentImage + 1) % galleryImages.length;
    showImage(nextIndex);
  }, 5000);

  // Show first case study by default
  showCase(0);
  showImage(0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDesignSpotlight);






















// Client Showcase Carousel
function initClientShowcase() {
  const clientCards = document.querySelectorAll('.client-card');
  const carouselDots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.control-prev');
  const nextBtn = document.querySelector('.control-next');
  let currentClient = 0;

  // Before/After Slider
  const slider = document.querySelector('.slider');
  const beforeImage = document.querySelector('.before-image');
  const afterImage = document.querySelector('.after-image');

  // Video Play Button
  const playBtn = document.querySelector('.play-btn');
  const clientVideo = document.querySelector('.video-container video');

  // Switch Clients
  function showClient(index) {
    clientCards.forEach(card => card.classList.remove('active'));
    clientCards[index].classList.add('active');
    
    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[index].classList.add('active');
    
    currentClient = index;
    
    // Reset video when changing cards
    if (clientVideo) {
      clientVideo.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  // Before/After Slider Functionality
  if (slider) {
    slider.addEventListener('input', function() {
      const sliderValue = this.value + '%';
      afterImage.style.width = sliderValue;
    });
  }

  // Video Play/Pause
  if (playBtn && clientVideo) {
    playBtn.addEventListener('click', function() {
      if (clientVideo.paused) {
        clientVideo.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        clientVideo.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }

  // Event Listeners
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showClient(index));
  });

  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentClient - 1 + clientCards.length) % clientCards.length;
    showClient(prevIndex);
  });

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentClient + 1) % clientCards.length;
    showClient(nextIndex);
  });

  // Auto-rotate every 8 seconds
  let autoRotate = setInterval(() => {
    const nextIndex = (currentClient + 1) % clientCards.length;
    showClient(nextIndex);
  }, 8000);

  // Pause auto-rotation on hover
  const carousel = document.querySelector('.showcase-carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });

  carousel.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
      const nextIndex = (currentClient + 1) % clientCards.length;
      showClient(nextIndex);
    }, 8000);
  });

  // Show first client by default
  showClient(0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initClientShowcase);

































// 3D Social Media Scene Interaction
document.addEventListener('DOMContentLoaded', function() {
  const scene = document.getElementById('socialScene');
  const rotateXBtn = document.querySelector('.rotate-x');
  const rotateYBtn = document.querySelector('.rotate-y');
  const rotateZBtn = document.querySelector('.rotate-z');
  const resetBtn = document.querySelector('.reset');
  
  let currentRotation = 'y';
  let isRotating = true;
  let rotationAngle = 0;
  let animationId;
  
  // Set initial rotation
  rotateScene();
  
  // Rotation control buttons
  rotateXBtn.addEventListener('click', function() {
      currentRotation = 'x';
      rotateYBtn.classList.remove('active');
      rotateZBtn.classList.remove('active');
      this.classList.add('active');
  });
  
  rotateYBtn.addEventListener('click', function() {
      currentRotation = 'y';
      rotateXBtn.classList.remove('active');
      rotateZBtn.classList.remove('active');
      this.classList.add('active');
  });
  
  rotateZBtn.addEventListener('click', function() {
      currentRotation = 'z';
      rotateXBtn.classList.remove('active');
      rotateYBtn.classList.remove('active');
      this.classList.add('active');
  });
  
  resetBtn.addEventListener('click', function() {
      currentRotation = 'y';
      rotateXBtn.classList.remove('active');
      rotateZBtn.classList.remove('active');
      rotateYBtn.classList.add('active');
      rotationAngle = 0;
      rotateScene();
  });
  
  // Parallax effect on mouse move
  scene.addEventListener('mousemove', function(e) {
      if (!isRotating) return;
      
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      
      scene.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  // Reset rotation when mouse leaves
  scene.addEventListener('mouseleave', function() {
      if (isRotating) {
          rotateScene();
      }
  });
  
  // Auto-rotation function
  function rotateScene() {
      if (!isRotating) return;
      
      rotationAngle += 0.2;
      
      switch(currentRotation) {
          case 'x':
              scene.style.transform = `rotateX(${rotationAngle}deg)`;
              break;
          case 'y':
              scene.style.transform = `rotateY(${rotationAngle}deg)`;
              break;
          case 'z':
              scene.style.transform = `rotateZ(${rotationAngle}deg)`;
              break;
      }
      
      animationId = requestAnimationFrame(rotateScene);
  }
  
  // Feature tabs
  const featureTabs = document.querySelectorAll('.feature-tab');
  const featurePanels = document.querySelectorAll('.feature-panel');
  
  featureTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          const target = this.getAttribute('data-tab');
          
          // Update active tab
          featureTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          // Update active panel
          featurePanels.forEach(panel => {
              panel.classList.remove('active');
              if (panel.getAttribute('data-panel') === target) {
                  panel.classList.add('active');
              }
          });
      });
  });
  
  // Results carousel
  const resultsTrack = document.querySelector('.results-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentSlide = 0;
  
  nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % document.querySelectorAll('.result-card').length;
      scrollToSlide();
  });
  
  prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + document.querySelectorAll('.result-card').length) % 
                    document.querySelectorAll('.result-card').length;
      scrollToSlide();
  });
  
  function scrollToSlide() {
      const slideWidth = document.querySelector('.result-card').offsetWidth + 32; // including gap
      resultsTrack.scrollTo({
          left: currentSlide * slideWidth,
          behavior: 'smooth'
      });
  }
  
  // Initialize Chart.js graphs
  const ctx = document.querySelector('.engagement-graph').getContext('2d');
  const engagementChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
              label: 'Engagement Rate',
              data: [12, 19, 15, 27, 34, 42],
              backgroundColor: 'rgba(4, 106, 56, 0.2)',
              borderColor: 'rgba(4, 106, 56, 1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      display: false
                  },
                  ticks: {
                      display: false
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          }
      }
  });
});




































// Client Showcase Carousel
function initClientShowcase() {
  const clientCards = document.querySelectorAll('.client-card');
  const carouselDots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.control-prev');
  const nextBtn = document.querySelector('.control-next');
  let currentClient = 0;

  // Before/After Slider
  const slider = document.querySelector('.slider');
  const beforeImage = document.querySelector('.before-image');
  const afterImage = document.querySelector('.after-image');

  // Video Play Button
  const playBtn = document.querySelector('.play-btn');
  const clientVideo = document.querySelector('.video-container video');

  // Switch Clients
  function showClient(index) {
    clientCards.forEach(card => card.classList.remove('active'));
    clientCards[index].classList.add('active');
    
    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[index].classList.add('active');
    
    currentClient = index;
    
    // Reset video when changing cards
    if (clientVideo) {
      clientVideo.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  // Before/After Slider Functionality
  if (slider) {
    slider.addEventListener('input', function() {
      const sliderValue = this.value + '%';
      afterImage.style.width = sliderValue;
    });
  }

  // Video Play/Pause
  if (playBtn && clientVideo) {
    playBtn.addEventListener('click', function() {
      if (clientVideo.paused) {
        clientVideo.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        clientVideo.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }

  // Event Listeners
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showClient(index));
  });

  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentClient - 1 + clientCards.length) % clientCards.length;
    showClient(prevIndex);
  });

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentClient + 1) % clientCards.length;
    showClient(nextIndex);
  });

  // Auto-rotate every 8 seconds
  let autoRotate = setInterval(() => {
    const nextIndex = (currentClient + 1) % clientCards.length;
    showClient(nextIndex);
  }, 8000);

  // Pause auto-rotation on hover
  const carousel = document.querySelector('.showcase-carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });

  carousel.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
      const nextIndex = (currentClient + 1) % clientCards.length;
      showClient(nextIndex);
    }, 8000);
  });

  // Show first client by default
  showClient(0);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initClientShowcase);




































document.addEventListener('DOMContentLoaded', function() {
  // Animate project cards on scroll
  const projectCards = document.querySelectorAll('.project-card');
  
  const animateOnScroll = () => {
    projectCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (cardPosition < screenPosition) {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Social button hover effects
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Dynamic image loading from Pexels API (example)
  // Note: You would need to sign up for a Pexels API key
  /*
  const loadPexelsImages = async () => {
    try {
      const response = await fetch('https://api.pexels.com/v1/search?query=web+development&per_page=3', {
        headers: {
          'Authorization': 'YOUR_PEXELS_API_KEY'
        }
      });
      const data = await response.json();
      
      const projectImages = document.querySelectorAll('.project-image img');
      data.photos.forEach((photo, index) => {
        if (projectImages[index]) {
          projectImages[index].src = photo.src.large;
          projectImages[index].alt = photo.photographer;
        }
      });
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };
  
  loadPexelsImages();
  */
});














































