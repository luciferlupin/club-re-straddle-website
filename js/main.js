// Club Re Straddle - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Full Sections & Content Motion Scroll Observer
  const animatedElements = document.querySelectorAll(
    '.section, .info-section, .two-col-grid, .img-stack, .img-frame, .gallery-grid, .news-grid, .tournament-qr-card, .contact-card, .contact-grid, .faq-list, .faq-item, .hand-card, .info-card, h1, h2, h3, .page-title, .hero-title, .section-tag, .footer'
  );
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.08
  };

  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Once animated, keep in view
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => motionObserver.observe(el));

  // Immediate animation for top/hero elements
  setTimeout(() => {
    document.querySelectorAll('.hero-title, .hero-desc, .page-title, .page-hero .breadcrumb').forEach(el => {
      el.classList.add('in-view');
    });
  }, 100);

  // 2. Header scroll state
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }

  // Mobile Dropdown click support
  const dropdownTrigger = document.querySelector('.nav-item.has-dropdown > .nav-link');
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownTrigger.parentElement.classList.toggle('dropdown-open');
      }
    });
  }

  // 3. FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        body.style.maxHeight = null;
      }
    });
  });

  // 4. Modal Triggers (Register / KYC / Tournaments)
  const modalBackdrop = document.getElementById('registerModal');
  const modalOpenBtns = document.querySelectorAll('.open-register-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalBackdrop) modalBackdrop.classList.add('open');
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close')) {
        if (modalBackdrop) modalBackdrop.classList.remove('open');
      }
    });
  });

  // 5. Lightbox for Gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxModal.classList.add('open');
        }
      });
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('modal-close')) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  // 6. Contact Form handling
  const contactForm = document.getElementById('clubContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('formSuccessMsg');
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      } else {
        alert('Thank you for reaching out! Our club host will get in touch with you shortly.');
        contactForm.reset();
      }
    });
  }
});
