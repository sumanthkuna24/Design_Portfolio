document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. CLIENT-SIDE ROUTER (SPA HASH NAVIGATION)
  // ==========================================
  const views = document.querySelectorAll('.view');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.getElementById('main-navbar');

  function router() {
    // Get current hash, default to '#home'
    let hash = window.location.hash || '#home';
    
    // Check if hash matches a registered view ID
    let activeView = document.querySelector(hash);
    
    if (!activeView) {
      // Fallback to home if hash doesn't exist
      hash = '#home';
      activeView = document.getElementById('home');
    }

    // Close mobile menu if open during routing
    navbar.classList.remove('mobile-active');

    // 1. Smooth transition exit
    views.forEach(view => {
      view.classList.remove('enter-view');
    });

    // We delay the display state switch slightly to allow the exit transition
    setTimeout(() => {
      views.forEach(view => {
        view.classList.remove('active-view');
      });

      // 2. Active state switch
      activeView.classList.add('active-view');

      // 3. Smooth transition entry (next frame)
      requestAnimationFrame(() => {
        activeView.classList.add('enter-view');
      });

      // Scroll viewport back to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 100);

    // 4. Update Navigation Link Classes
    updateNavActiveState(hash);
  }

  function updateNavActiveState(hash) {
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // If it's a sub-page (like case studies or note details), associate it with parent tab
    let activeTabId = hash;
    if (hash.startsWith('#project-')) {
      activeTabId = '#work';
    } else if (hash.startsWith('#note-')) {
      activeTabId = '#notes';
    } else if (hash === '#home-contact') {
      activeTabId = '#contact';
    }

    const matchingLink = document.querySelector(`.nav-links a[href="${activeTabId}"]`);
    if (matchingLink) {
      matchingLink.classList.add('active');
    }
  }

  // Register routing listeners
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);


  // ==========================================
  // 2. MOBILE NAVIGATION MENU
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('mobile-active');
  });

  // Close menu when clicking outside the navbar
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains('mobile-active')) {
      navbar.classList.remove('mobile-active');
    }
  });


  // ==========================================
  // 3. INTERACTIVE DESIGN PROCESS EXPLORER
  // ==========================================
  const stepButtons = document.querySelectorAll('.process-step-btn');
  const detailPanes = document.querySelectorAll('.process-pane-content');

  stepButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all buttons
      stepButtons.forEach(btn => btn.classList.remove('active'));
      // Activate clicked button
      button.classList.add('active');

      const targetStep = button.getAttribute('data-step');
      
      // Transition details pane
      detailPanes.forEach(pane => {
        pane.classList.remove('active');
      });

      const targetPane = document.getElementById(`pane-${targetStep}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });


  // ==========================================
  // 4. CONTACT FORM HANDLERS (DYNAMIC SUCCESS)
  // ==========================================
  
  // Home Page Form
  const homeForm = document.getElementById('portfolio-contact-form');
  const homeSuccess = document.getElementById('form-success-message');
  
  if (homeForm) {
    homeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      homeForm.style.transition = 'opacity 0.3s ease';
      homeForm.style.opacity = '0';
      
      setTimeout(() => {
        homeForm.style.display = 'none';
        homeSuccess.style.display = 'block';
        homeSuccess.classList.add('animate-slide-up');
      }, 300);
    });
  }

  // Direct Contact Page Form
  const directForm = document.getElementById('direct-contact-form');
  const directSuccess = document.getElementById('direct-success-message');
  
  if (directForm) {
    directForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      directForm.style.transition = 'opacity 0.3s ease';
      directForm.style.opacity = '0';
      
      setTimeout(() => {
        directForm.style.display = 'none';
        directSuccess.style.display = 'block';
        directSuccess.classList.add('animate-slide-up');
      }, 300);
    });
  }

});
