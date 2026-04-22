/* ---- Photo fallback ---- */
const heroPhoto = document.getElementById('heroPhoto');
const photoFallback = document.getElementById('photoFallback');

if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
    if (photoFallback) photoFallback.style.display = 'flex';
  });
}

/* ---- Dual cursor ---- */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (dot && ring && matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  });

  const interactives = 'a, button, .service-row, .project-item, .stack-item, .magnetic';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) ring.classList.remove('hovering');
  });

  (function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(animateRing);
  })();
}

/* ---- Nav scroll ---- */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 50);
}, { passive: true });

/* ---- Scroll reveal ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---- Yungas-reveal observer — organic emergence ---- */
const yungasObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      yungasObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.yungas-reveal').forEach(el => yungasObserver.observe(el));

/* ---- Card 3D tilt ---- */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- Magnetic buttons ---- */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ---- Dynamic footer year ---- */
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* ---- Hero parallax bg text ---- */
const bgText = document.querySelector('.hero-bg-text');
if (bgText) {
  window.addEventListener('scroll', () => {
    bgText.style.transform = `translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}
