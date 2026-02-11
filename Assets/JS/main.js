// ===================================
// BRUTALIST TERMINAL PORTFOLIO JS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initScrollAnimations();
  initGlitchEffect();
  initMobileMenu();
  initThemeToggle();
  initCurrentYear();
  initBackToTop();
});

// Current Year Display
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add a subtle flash animation
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Show theme change notification
    showThemeNotification(newTheme);
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '◐'; // Moon/Dark icon
    } else {
      themeIcon.textContent = '◑'; // Sun/Light icon
    }
  }
  
  function showThemeNotification(theme) {
    const notification = document.createElement('div');
    notification.textContent = `${theme.toUpperCase()} MODE`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 40px;
      background-color: var(--accent-green);
      color: var(--bg-primary);
      padding: 12px 24px;
      font-weight: 700;
      font-size: 0.85rem;
      z-index: 10000;
      border: 2px solid var(--accent-green);
      box-shadow: var(--shadow-glow);
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 1500);
  }
  
  // Keyboard shortcut: Ctrl/Cmd + Shift + T
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      themeToggle.click();
    }
  });
}

// Typing Effect
function initTypingEffect() {
  const typedTextElement = document.getElementById('typed-text');
  if (!typedTextElement) return;
  
  const texts = [
    'building scalable web apps',
    'designing intuitive interfaces',
    'exploring AI & machine learning',
    'writing clean, efficient code'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Animate skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Animate project items
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(item);
  });
  
  // Parallax effect for hero
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
          const opacity = 1 - (scrolled / window.innerHeight) * 0.5;
          hero.style.opacity = opacity;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// Glitch Effect on Hover
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.project-title, .card-title');
  
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.animation = 'none';
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle menu visibility
    if (navMenu.classList.contains('active')) {
      navMenu.style.display = 'flex';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.backgroundColor = 'var(--bg-secondary)';
      navMenu.style.flexDirection = 'column';
      navMenu.style.padding = '20px';
      navMenu.style.borderTop = '1px solid var(--border-color)';
    } else {
      navMenu.style.display = 'none';
    }
  });
  
  // Close menu when clicking nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      navMenu.style.display = 'none';
    });
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Random Glitch Effect on Page Load
function randomGlitch() {
  const glitchText = document.querySelector('.glitch-text');
  if (!glitchText) return;
  
  setInterval(() => {
    if (Math.random() > 0.95) {
      glitchText.style.animation = 'glitch 0.2s';
      setTimeout(() => {
        glitchText.style.animation = 'glitch 3s infinite';
      }, 200);
    }
  }, 3000);
}

randomGlitch();

// Add hover effect to tags
const tags = document.querySelectorAll('.tag, .card-tech span, .project-tags span');
tags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Terminal-style console messages
const theme = document.documentElement.getAttribute('data-theme') || 'dark';
console.log('%c> PORTFOLIO LOADED', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%c> System: Operational', 'color: #00ffff; font-size: 12px;');
console.log(`%c> Theme: ${theme.toUpperCase()}`, 'color: #ffff00; font-size: 12px;');
console.log('%c> Status: Ready for hire', 'color: #00ff41; font-size: 12px;');
console.log('%c> Contact: Available', 'color: #00ff41; font-size: 12px;');

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    document.body.style.animation = 'glitch 0.5s infinite';
    setTimeout(() => {
      document.body.style.animation = 'none';
      alert('🎮 CHEAT CODE ACTIVATED! You found the easter egg!');
    }, 2000);
  }
});

// Performance optimization
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add matrix rain effect (optional - can be enabled)
function matrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  canvas.style.opacity = '0.05';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = '01アイウエオカキクケコサシスセソタチツテト';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 50);
}

// Uncomment to enable matrix rain effect
// matrixRain();
