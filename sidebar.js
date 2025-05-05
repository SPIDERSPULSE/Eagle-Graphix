document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add('active');
      }
      
      // Add click effect
      link.addEventListener('click', function() {
        const underline = this.querySelector('.gold-underline');
        if (underline) {
          underline.style.transform = 'scaleX(1)';
          setTimeout(() => {
            underline.style.transform = 'scaleX(0)';
            setTimeout(() => {
              underline.style.transform = 'scaleX(1)';
            }, 50);
          }, 300);
        }
      });
    });
    
    // Mobile toggle functionality
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'sidebar-mobile-toggle';
    mobileToggle.innerHTML = `
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
    `;
    document.body.appendChild(mobileToggle);
    
    mobileToggle.addEventListener('click', function() {
      document.querySelector('.luxury-sidebar').classList.toggle('active');
      this.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
      const sidebar = document.querySelector('.luxury-sidebar');
      if (!sidebar.contains(e.target) && e.target !== mobileToggle) {
        sidebar.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
    
    // Add shimmer effect to logo on load
    setTimeout(() => {
      document.querySelector('.logo-shimmer').style.opacity = '0.5';
      setTimeout(() => {
        document.querySelector('.logo-shimmer').style.opacity = '0';
      }, 1000);
    }, 500);
  });