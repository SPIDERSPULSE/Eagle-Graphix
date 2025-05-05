
  // ===== PREMIUM CURSOR EFFECT =====
  const cursorOuter = document.querySelector('.cursor-outer');
  const cursorInner = document.querySelector('.cursor-inner');
  let mouseX = 0, mouseY = 0;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorOuter.style.left = `${mouseX}px`;
    cursorOuter.style.top = `${mouseY}px`;
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
  });

  // Magnetic hover effect
  const magneticElements = document.querySelectorAll('.magnetic, a, button');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const force = 0.2;
      
      el.style.transform = `translate(${(x - centerX) * force}px, ${(y - centerY) * force}px)`;
      cursorOuter.style.width = '30px';
      cursorOuter.style.height = '30px';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      cursorOuter.style.width = '42px';
      cursorOuter.style.height = '42px';
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    cursorOuter.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Touch device fallback
  if ('ontouchstart' in window) {
    cursorOuter.style.display = 'none';
    cursorInner.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
