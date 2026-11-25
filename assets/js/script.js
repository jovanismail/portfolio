document.addEventListener('DOMContentLoaded', () => {
  /*  THEME SWITCHER & NAVBAR SCROLL  */
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const themeOptions = document.querySelectorAll('#themeSwitch .theme-opt');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    themeOptions.forEach(opt => {
      const isSelected = opt.getAttribute('data-theme') === theme;
      opt.classList.toggle('active', isSelected);
    });

    localStorage.setItem('portfolio_theme', theme);
  }

  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeOptions.length > 0) {
    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedTheme = opt.getAttribute('data-theme');
        if (!opt.classList.contains('active')) {
          applyTheme(selectedTheme);
        }
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (navbarWrapper) {
      if (window.scrollY > 40) {
        navbarWrapper.classList.add('scrolled');
      } else {
        navbarWrapper.classList.remove('scrolled');
      }
    }
  });

  /*  HAMBURGER MENU TOGGLE  */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinksMenu = document.getElementById('navLinks');

  if (hamburgerBtn && navLinksMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navLinksMenu.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (navLinksMenu.classList.contains('active')) {
        icon.classList.replace('bi-list', 'bi-x-lg');
      } else {
        icon.classList.replace('bi-x-lg', 'bi-list');
      }
    });

    navLinksMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
          icon.classList.replace('bi-x-lg', 'bi-list');
        }
      });
    });
  }

  /*  SHOWCASE TABS  */
  const tabButtons = document.querySelectorAll('.showcase-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /*  CONTACT FORM SUBMIT  */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:ji.jovanismail@gmail.com?subject=${subject}&body=${body}`;
      contactForm.reset();
    });
  }
});