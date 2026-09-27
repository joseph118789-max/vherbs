/* VHerbs — lightbox for facility gallery + simple form UX */
(function () {
  'use strict';

  // ===== Lightbox for facility gallery =====
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-cap');
  const closeBtn = document.getElementById('lightbox-close');

  if (gallery && lightbox && lightboxImg && lightboxCap && closeBtn) {
    gallery.addEventListener('click', function (e) {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const img = item.querySelector('img');
      const cap = item.dataset.caption || '';
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCap.textContent = cap;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ===== Contact form (no backend; show confirmation) =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sent — we will reply soon';
      btn.disabled = true;
      form.reset();
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 4000);
    });
  }
})();
