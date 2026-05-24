/* ==========================================
   NGOMBOR ART CONTEST - APP LOGIC & INTERACTIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initWhatsAppCTA();
  initStarburstAlert();
});

/* ------------------------------------------
   1. Theme Toggle Logic (Light / Dark)
   ------------------------------------------ */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeBtn || !themeIcon) return;

  // Retrieve saved preference or default to light mode (matching flyer)
  const savedTheme = localStorage.getItem('contest-theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    themeIcon.textContent = 'light_mode'; // Show sun icon in dark mode
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    themeIcon.textContent = 'dark_mode';  // Show moon icon in light mode
  }

  themeBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      // Switch to Dark Mode
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      themeIcon.textContent = 'light_mode';
      localStorage.setItem('contest-theme', 'dark');
    } else {
      // Switch to Light Mode
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      themeIcon.textContent = 'dark_mode';
      localStorage.setItem('contest-theme', 'light');
    }
  });
}

/* ------------------------------------------
   2. Automated WhatsApp Link Generator
   ------------------------------------------ */
function initWhatsAppCTA() {
  const whatsappBtn = document.getElementById('whatsapp-btn');
  
  if (!whatsappBtn) return;

  whatsappBtn.addEventListener('click', () => {
    const phoneNumber = '256785955683';
    // Pre-filled professional template matching the flyer details
    const text = encodeURIComponent("Hello Ngombor, I am interested in joining the Ebola Prevention Art Contest! Please send me more registration info. My name is: ");
    
    // Open in a new tab
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  });
}

/* ------------------------------------------
   3. Starburst Badge Interaction
   ------------------------------------------ */
function initStarburstAlert() {
  const starburst = document.getElementById('starburst-btn');
  
  if (!starburst) return;

  starburst.addEventListener('click', () => {
    // Add a quick double wiggle class
    starburst.style.transform = 'scale(1.1) rotate(16deg)';
    setTimeout(() => {
      starburst.style.transform = 'scale(0.95) rotate(-6deg)';
      setTimeout(() => {
        starburst.style.transform = '';
      }, 150);
    }, 150);
    
    // Smooth custom dialog alert for desktop/mobile engagement
    const confirmationText = "🎨 Welcome to the Ebola Prevention Art Contest!\n\nYou can participate by making drawings, songs, social posts, or short videos promoting Ebola safety.\n\nMake sure to keep your art Ebola-safe (no big crowds!). Click the Message button below to register!";
    alert(confirmationText);
  });
}
