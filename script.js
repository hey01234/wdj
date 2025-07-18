document.addEventListener('DOMContentLoaded', function() {
  // Lightbox functionality
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
  
  // Copy button functionality
  const copyBtn = document.getElementById('copy-btn');
  const momoNumber = document.getElementById('momo-number');

  copyBtn.addEventListener('click', () => {
    const number = momoNumber.textContent.trim();
    navigator.clipboard.writeText(number).then(() => {
      const icon = copyBtn.querySelector('i');
      icon.classList.remove('fa-copy');
      icon.classList.add('fa-check');
      
      // Revenir à l'icône de copie après 2 secondes
      setTimeout(() => {
        icon.classList.remove('fa-check');
        icon.classList.add('fa-copy');
      }, 2000);
    });
  });
  
  // Countdown functionality and payment status check
  const paymentDeadline = new Date("2025-07-17T23:59:59"); // Date limite de paiement
  const now = new Date();
  
  const daysSpan = document.getElementById('days-left');
  const countdownMsg = document.getElementById('countdown-message');
  const continueButton = document.querySelector('.ticket-btn');
  
  // Vérifier si la date limite de paiement est dépassée
  if (now > paymentDeadline) {
    // Paiement terminé
    countdownMsg.innerHTML = `<strong>Paiement des tickets terminé.</strong>`;
    disableContinueButton();
  } 
  // Calculer le temps restant
  else {
    const msInHour = 1000 * 60 * 60;
    const msInDay = msInHour * 24;
    const timeLeft = paymentDeadline - now;
    
    let displayTime = "";
    
    if (timeLeft < msInDay) {
      const hoursLeft = Math.ceil(timeLeft / msInHour);
      displayTime = `${hoursLeft} heure${hoursLeft > 1 ? "s" : ""}`;
    } else {
      const daysLeft = Math.ceil(timeLeft / msInDay);
      displayTime = `${daysLeft} jour${daysLeft > 1 ? "s" : ""}`;
    }
    
    if (daysSpan) {
      daysSpan.textContent = displayTime;
    }
  }
  
  // Fonction pour désactiver le bouton "Continuer" quand le paiement est terminé
  function disableContinueButton() {
    if (continueButton) {
      continueButton.disabled = true;
      continueButton.style.opacity = '0.6';
      continueButton.style.cursor = 'not-allowed';
      continueButton.onclick = null;
      
      // Mettre à jour le texte et l'icône
      continueButton.innerHTML = '<i class="fa-solid fa-ban card-icon" aria-hidden="true"></i> Paiement terminé';
    }
  }
});

// WhatsApp function
function openWhatsApp() {
  const message = `Bonjour 👋,

Je viens de payer pour le WEEKEND DES JEUNES et souhaite recevoir mon ticket.

Voici mes informations :
🧍 Nom : 
🧍‍♂️ Prénom : 
📞 Téléphone : 

💳 Paiement : 3500 FCFA à Israël Venance AGOLIGAN (0190501196) - motif WDJ

📸 Capture du paiement jointe.

Merci !`;

  const url = "https://wa.me/2290190501196?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}
