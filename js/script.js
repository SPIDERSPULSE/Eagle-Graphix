document.addEventListener('DOMContentLoaded', () => {

    // Get all buttons that open an overlay (using the new class and data attribute)
    const detailButtons = document.querySelectorAll('.details-button[data-target]');

    // Get all buttons that close an overlay (using the new class and data attribute)
    const closeButtons = document.querySelectorAll('.details-close[data-close]');

    // Get all overlay elements (using the new class)
    const overlays = document.querySelectorAll('.service-details-overlay');

    // Function to show an overlay
    const showOverlay = (overlayId) => {
        const targetOverlay = document.getElementById(overlayId);
        if (targetOverlay) {
            targetOverlay.classList.add('is-visible');
            // Optional: Prevent body scroll when overlay is open
            document.body.style.overflow = 'hidden';
        }
    };

    // Function to hide an overlay
    const hideOverlay = (overlayElement) => {
         if (overlayElement) {
            overlayElement.classList.remove('is-visible');
            // Optional: Restore body scroll
            document.body.style.overflow = '';
        }
    };

    // Add click listeners to open buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('data-target');
            if (targetId) {
                showOverlay(targetId);
            }
        });
    });

    // Add click listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            // Find the closest parent overlay element (using the new class)
            const overlayElement = button.closest('.service-details-overlay');
             if (overlayElement) {
                hideOverlay(overlayElement);
            }
        });
    });

    // Optional: Close overlay when clicking outside the details-content box
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            // Check if the click target is the overlay itself, not its children inside .details-content
             if (event.target.classList.contains('service-details-overlay')) {
                hideOverlay(overlay);
            }
        });
    });

    // Optional: Close overlay on Escape key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const visibleOverlay = document.querySelector('.service-details-overlay.is-visible');
            if (visibleOverlay) {
                hideOverlay(visibleOverlay);
            }
        }
    });

    // Main CTA Button functionality (placeholder)
    const exploreButton = document.querySelector('.explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', (event) => {
            // Add your desired action here, e.g., navigate to a full services page
            console.log('Explore Full Range button clicked!');
             // Example: window.location.href = '/our-full-portfolio.html';
        });
    }

});