// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Ensure GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP library not loaded!");
        // Optionally, disable JS-dependent features or show a message
        return;
    }

    // --- Cosmic Background Elements ---
    // Particles adjusted for the new color scheme in CSS
    createNebula();
    createStardust();

    function createNebula() {
        const nebula = document.getElementById('nebula');
        if (!nebula) return;

        const numParticles = 120; // Adjusted particle count
        nebula.innerHTML = ''; // Clear existing particles if any
        for (let i = 0; i < numParticles; i++) {
            const star = document.createElement('div');
            star.className = 'nebula-particle';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 1; // Size between 1px and 3px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 10}s`;
            star.style.opacity = Math.random() * 0.5 + 0.2; // Lower opacity for subtlety
            nebula.appendChild(star);
        }
    }

    function createStardust() {
        const stardust = document.getElementById('stardust');
        if (!stardust) return;

        const numParticles = 60; // Adjusted stardust particle count
         stardust.innerHTML = ''; // Clear existing particles if any
        for (let i = 0; i < numParticles; i++) {
            const dust = document.createElement('div');
            dust.className = 'stardust-particle';
            dust.style.left = `${Math.random() * 100}%`;
            dust.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 4 + 2; // Size between 2px and 6px
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.animationDelay = `${Math.random() * 6}s`;
            dust.style.opacity = Math.random() * 0.4 + 0.3; // Adjusted opacity
            stardust.appendChild(dust);
        }
    }

    // --- Cosmic Cursor ---
    initCosmicCursor();

    function initCosmicCursor() {
        const cursor = document.getElementById('cosmic-cursor');
        if (!cursor) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const speed = 0.15;
        const maxCursorStars = 8; // Adjusted max stars
        const repulsionRadius = 200; // Adjusted repulsion radius
        const repulsionForce = 0.1; // Adjusted force

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create micro-constellation effect (Gold stars)
            if (Math.random() > 0.9) { // Reduced frequency further
                const star = document.createElement('div');
                star.className = 'cursor-star'; // Uses CSS for color/style
                star.style.left = `${e.clientX}px`;
                star.style.top = `${e.clientY}px`;
                cursor.appendChild(star);

                while (cursor.children.length > maxCursorStars) {
                    cursor.removeChild(cursor.children[0]);
                }
            }

            // Repel stardust particles (Gold particles)
            const particles = document.querySelectorAll('.stardust-particle');
            particles.forEach(particle => {
                const rect = particle.getBoundingClientRect();
                const particleX = rect.left + rect.width / 2;
                const particleY = rect.top + rect.height / 2;

                const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2));

                if (distance < repulsionRadius) {
                    const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
                    const force = (repulsionRadius - distance) * repulsionForce;

                    gsap.to(particle, {
                        x: `+=${Math.cos(angle) * force}`,
                        y: `+=${Math.sin(angle) * force}`,
                        duration: 0.8, // Adjusted duration
                        ease: 'power1.out' // Adjusted ease
                    });
                     // Reset rotation if CSS animation includes it, to allow repulsion to control position
                     gsap.set(particle, { rotation: 0 });
                } else {
                     // Allow CSS animation (stardust-float) to control position if not repelled
                     // This requires careful handling to prevent conflicts. A more robust solution
                     // might involve GSAP managing the animation always, but for simplicity,
                     // we let CSS handle default animation when far from the cursor.
                }
            });
        });

        // Smoothly animate cursor container position
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * speed;
            cursorY += dy * speed;

            gsap.to(cursor, {
                 x: cursorX,
                 y: cursorY,
                 duration: speed,
                 ease: "none"
            });

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }

    // --- No Video-Specific Interactive Effects in this style ---
    // Removed the setupVideoGlassEffects function and the irregular container hover logic.
    // The video is now a static background element.

});