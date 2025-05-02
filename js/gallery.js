document.addEventListener('DOMContentLoaded', function() {
    // Initialize card galleries
    initCardGalleries();
    
    // Initialize detail galleries
    initDetailGalleries();
});

function initCardGalleries() {
    document.querySelectorAll('.card-gallery').forEach(gallery => {
        const viewport = gallery.querySelector('.gallery-viewport');
        const track = gallery.querySelector('.gallery-track');
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const pips = gallery.querySelectorAll('.pip');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Set initial active pip
        pips[0].classList.add('active');
        
        // Next button functionality
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateGallery();
        });
        
        // Previous button functionality
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateGallery();
        });
        
        // Pip navigation
        pips.forEach((pip, index) => {
            pip.addEventListener('click', function() {
                currentIndex = index;
                updateGallery();
            });
        });
        
        // Auto-advance (optional)
        let autoAdvance = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateGallery();
        }, 5000);
        
        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        gallery.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateGallery();
            }, 5000);
        });
        
        function updateGallery() {
            // Update track position
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active pip
            pips.forEach((pip, index) => {
                if (index === currentIndex) {
                    pip.classList.add('active');
                } else {
                    pip.classList.remove('active');
                }
            });
        }
    });
}

function initDetailGalleries() {
    document.querySelectorAll('.detail-gallery').forEach(gallery => {
        const viewport = gallery.querySelector('.full-gallery-viewport');
        const track = gallery.querySelector('.full-gallery-track');
        const slides = gallery.querySelectorAll('.full-slide');
        const prevBtn = gallery.querySelector('.full-prev');
        const nextBtn = gallery.querySelector('.full-next');
        const pips = gallery.querySelectorAll('.full-gallery-pips .pip');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Set initial active pip
        pips[0].classList.add('active');
        
        // Next button functionality
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateGallery();
        });
        
        // Previous button functionality
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateGallery();
        });
        
        // Pip navigation
        pips.forEach((pip, index) => {
            pip.addEventListener('click', function() {
                currentIndex = index;
                updateGallery();
            });
        });
        
        function updateGallery() {
            // Update track position
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active pip
            pips.forEach((pip, index) => {
                if (index === currentIndex) {
                    pip.classList.add('active');
                } else {
                    pip.classList.remove('active');
                }
            });
        }
    });
}