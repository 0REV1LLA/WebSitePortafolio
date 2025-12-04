
const scrollRevealOption = {
  origin: 'bottom',
  distance: '50px',
  duration: 800,
  easing: 'ease-out',
  opacity: 0,
  scale: 0.9
};

ScrollReveal().reveal('.hero profile-photo,.hero img,.hero h1,.hero p,.hero a', {
  ...scrollRevealOption,
  interval: 400,
  delay: 1000
});
// Generar partículas flotantes
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particlesContainer.appendChild(particle);
    }

    // Efecto parallax simple
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
    });
});