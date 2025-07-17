// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const galleryImages = document.querySelectorAll('.gallery img');
  
  let currentImageIndex = 0;
  
  // Open lightbox with clicked image
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImageIndex = index;
      lightboxImg.src = img.src;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  });
  
  // Navigate images
  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  });
  
  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
});