/* ==========================================
   NGOMBOR PAGES - APP LOGIC & INTERACTIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPillarTabs();
  initDonationWidget();
  initScrollAnimations();
});

/* ------------------------------------------
   1. Theme Toggle Logic (Light / Dark)
   ------------------------------------------ */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeBtn || !themeIcon) return;

  // Retrieve saved preference or default to dark mode
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    themeIcon.textContent = 'dark_mode';
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    themeIcon.textContent = 'light_mode';
  }

  themeBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      // Switch to Light Mode
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      themeIcon.textContent = 'dark_mode';
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to Dark Mode
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      themeIcon.textContent = 'light_mode';
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* ------------------------------------------
   2. Interactive Tab System (Pillars)
   ------------------------------------------ */
function initPillarTabs() {
  const tabs = document.querySelectorAll('.pillar-tab');
  const panes = document.querySelectorAll('.pillar-pane');
  
  if (tabs.length === 0 || panes.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active states from all tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // Hide all panes
      panes.forEach(pane => {
        pane.classList.remove('active');
        pane.setAttribute('hidden', '');
      });

      // Activate current tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show associated content pane
      const targetId = tab.getAttribute('aria-controls');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
        targetPane.removeAttribute('hidden');
      }
    });
  });
}

/* ------------------------------------------
   3. Interactive Donation Widget
   ------------------------------------------ */
function initDonationWidget() {
  const donationButtons = document.querySelectorAll('.donation-btn');
  const impactDesc = document.getElementById('impact-description');
  
  if (donationButtons.length === 0 || !impactDesc) return;

  donationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate other buttons
      donationButtons.forEach(b => b.classList.remove('active'));
      
      // Activate clicked button
      btn.classList.add('active');
      
      // Fetch and transition the impact text smoothly
      const newImpact = btn.getAttribute('data-impact');
      
      impactDesc.style.opacity = '0';
      setTimeout(() => {
        impactDesc.textContent = newImpact;
        impactDesc.style.opacity = '1';
      }, 150);
    });
  });
}

/* ------------------------------------------
   4. Scroll Animations & Reveal Transitions
   ------------------------------------------ */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.goal-card, .stat-card, .pane-visual-box');
  
  if (revealElements.length === 0 || !('IntersectionObserver' in window)) return;

  // Initial opacity setup
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.unobserve(el); // Stop observing once animated
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
