// ===================================
// AWWWARDS-LEVEL PORTFOLIO JS
// GSAP + Lenis + Custom Cursor
// Zohaib Ahmad — 2026
// ===================================

// ─── Initialize Everything ───
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLoader();
});

// ─── Theme Toggle ───
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  if (!themeToggle) return;
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a subtle animation
    gsap.fromTo(themeToggle, 
      { scale: 1 },
      { 
        scale: 0.9, 
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }
    );
  });
}

// ─── Smooth Scroll (Lenis) ───
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ─── Loading Screen ───
function initLoader() {
  const loader = document.getElementById('loader');
  const letters = document.querySelectorAll('.loader-letter');
  const barFill = document.querySelector('.loader-bar-fill');
  const percentEl = document.getElementById('loader-percent');

  const tl = gsap.timeline({
    onComplete: () => {
      // After loader finishes, init everything
      gsap.to(loader, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          initLenis();
          initCustomCursor();
          initNavigation();
          initHeroAnimations();
          initScrollAnimations();
          initMagneticElements();
          initProjectHovers();
          initCounterAnimation();
          initCurrentYear();
          initBackToTop();
          initMobileMenu();
        }
      });
    }
  });

  // Animate letters in
  tl.to(letters, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.06,
    ease: 'power3.out',
  });

  // Animate progress bar
  tl.to(barFill, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate: function () {
      const progress = Math.round(this.progress() * 100);
      if (percentEl) percentEl.textContent = progress;
    }
  }, '-=0.3');

  // Animate letters out
  tl.to(letters, {
    y: -100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power3.in',
  }, '+=0.3');
}


// ─── Custom Cursor ───
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(hover: none)').matches) return;

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow animation
  function animateCursor() {
    // Dot follows immediately
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    // Ring follows with more lag
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .bento-card, .tool-item');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}


// ─── Navigation ───
function initNavigation() {
  const nav = document.getElementById('nav');

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top -80px',
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 200) {
        nav.classList.add('scrolled');
      } else if (self.scroll() <= 100) {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, {
          offset: -80,
          duration: 1.5,
        });
      }
    });
  });
}


// ─── Mobile Menu ───
function initMobileMenu() {
  const menuBtn = document.getElementById('nav-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu-link');

  if (!menuBtn || !mobileMenu) return;

  let isOpen = false;

  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    menuBtn.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('active', isOpen);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animate links in
      gsap.fromTo(menuLinks,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen = false;
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';

      const target = document.querySelector(link.getAttribute('href'));
      if (target && lenis) {
        setTimeout(() => {
          lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        }, 300);
      }
    });
  });
}


// ─── Hero Animations ───
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.3 });

  // Badge
  tl.to('.hero-badge', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Title words
  tl.to('.title-word, .title-ampersand, .title-accent', {
    y: 0,
    duration: 1,
    stagger: 0.08,
    ease: 'power3.out',
  }, '-=0.4');

  // Description
  tl.to('.hero-description', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.5');

  // CTAs
  tl.to('.hero-ctas', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.6');

  // Scroll indicator
  tl.to('.hero-scroll-indicator', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  }, '-=0.3');
}


// ─── Scroll-Triggered Animations ───
function initScrollAnimations() {
  // Section labels
  gsap.utils.toArray('.section-label').forEach((label) => {
    gsap.from(label, {
      scrollTrigger: {
        trigger: label,
        start: 'top 85%',
        once: true,
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Work & Skills titles
  gsap.utils.toArray('.work-title, .skills-title, .about-title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        once: true,
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Project cards
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.05,
      ease: 'power3.out',
    });
  });

  // Bento cards
  gsap.utils.toArray('.bento-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        once: true,
      },
      opacity: 0,
      y: 50,
      scale: 0.97,
      duration: 0.8,
      delay: i * 0.08,
      ease: 'power3.out',
    });
  });

  // About image
  gsap.from('.about-image-frame', {
    scrollTrigger: {
      trigger: '.about-image-frame',
      start: 'top 85%',
      once: true,
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out',
  });

  // About bio
  gsap.from('.about-bio p', {
    scrollTrigger: {
      trigger: '.about-bio',
      start: 'top 85%',
      once: true,
    },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Contact section
  gsap.from('.contact-title', {
    scrollTrigger: {
      trigger: '.contact-title',
      start: 'top 85%',
      once: true,
    },
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.contact-subtitle', {
    scrollTrigger: {
      trigger: '.contact-subtitle',
      start: 'top 85%',
      once: true,
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2,
  });

  /* Animation removed to ensure visibility */
  // gsap.from('.contact-link', {
  //   scrollTrigger: {
  //     trigger: '.contact-links',
  //     start: 'top 85%',
  //     once: true,
  //   },
  //   opacity: 0,
  //   x: -30,
  //   stagger: 0.1,
  //   duration: 0.8,
  //   ease: 'power3.out',
  // });

  // Parallax for hero gradient
  gsap.to('.hero-gradient', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: -200,
    opacity: 0.1,
  });

  // Marquee speed on scroll
  gsap.to('.marquee-track', {
    scrollTrigger: {
      trigger: '.marquee-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
    x: -100,
  });
}


// ─── Magnetic Elements ───
function initMagneticElements() {
  if (window.matchMedia('(hover: none)').matches) return;

  const magneticEls = document.querySelectorAll('[data-magnetic]');

  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
}


// ─── Project Card Hovers ───
function initProjectHovers() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    const img = card.querySelector('.project-img-wrapper img');

    card.addEventListener('mouseenter', () => {
      gsap.to(img, {
        scale: 1,
        filter: 'grayscale(0%) brightness(1)',
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(img, {
        scale: 1.05,
        filter: 'grayscale(80%) brightness(0.7)',
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  });
}


// ─── Counter Animation ───
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count'));

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            counter.textContent = Math.round(parseFloat(counter.textContent));
          }
        });
      }
    });
  });
}


// ─── Current Year ───
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


// ─── Back to Top ───
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}


// ─── Console Easter Egg ───
console.log(
  '%c✦ Portfolio loaded successfully',
  'color: #84cc16; font-size: 14px; font-weight: bold;'
);
console.log(
  '%c→ Designed & Developed by Zohaib Ahmad',
  'color: #8e8e93; font-size: 12px;'
);
console.log(
  '%c→ Built with GSAP, Lenis & Love ♥',
  'color: #8e8e93; font-size: 12px;'
);
