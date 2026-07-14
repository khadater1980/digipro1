// ===== KETO 2.0 - MAIN SCRIPT =====
document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header ---
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile Menu ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // --- Dark Mode ---
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('keto-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    };
    updateIcon();
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('keto-theme', newTheme);
      updateIcon();
    });
  }

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Smooth Scroll for CTA links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Lead Form ---
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = leadForm.querySelector('input[type="email"]').value;
      if (email) {
        leadForm.innerHTML = '<div style="text-align:center;padding:20px"><p style="font-size:1.2rem;font-weight:700;margin-bottom:8px">🎉 You\'re in!</p><p style="font-size:.9rem;opacity:.8">Check your inbox for the free guide.</p></div>';
      }
    });
  }

  // --- Countdown Timer ---
  const timerEl = document.getElementById('countdownTimer');
  if (timerEl) {
    const end = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
    const update = () => {
      const now = new Date().getTime();
      const diff = end - now;
      if (diff <= 0) { timerEl.textContent = 'Offer expired!'; return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      timerEl.textContent = `${h}h ${m}m ${s}s remaining`;
    };
    update();
    setInterval(update, 1000);
  }

  // --- Number Counter Animation ---
  document.querySelectorAll('[data-count]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current.toLocaleString() + suffix;
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });

});
