// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const group = document.getElementById('group').value;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          group
        })
      });

      const data = await response.json();

      if (response.ok) {
        formMessage.textContent = '✓ Wiadomość wysłana pomyślnie! Wkrótce się skontaktujemy.';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        contactForm.reset();

        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.classList.remove('success');
        }, 5000);
      } else {
        formMessage.textContent = '✗ Błąd: ' + (data.error || 'Nie udało się wysłać wiadomości');
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
      }
    } catch (error) {
      console.error('Błąd:', error);
      formMessage.textContent = '✗ Błąd połączenia. Spróbuj ponownie później.';
      formMessage.classList.add('error');
      formMessage.classList.remove('success');
    }
  });
}

// ========================================
// SMOOTH SCROLL ENHANCEMENTS
// ========================================

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ========================================
// ANIMATIONS ON SCROLL (Optional Enhancement)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply observer to cards and sections
const cardsToObserve = document.querySelectorAll('.class-card, .value-card, .detail-item');
cardsToObserve.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

console.log('🥋 Bushido Gdynia - Strona załadowana');
