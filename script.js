document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const currentYearElements = document.querySelectorAll('[data-current-year]');
  const navShell = document.querySelector('.nav-shell');

  currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const updateNavigation = () => {
    if (!navShell) return;
    navShell.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateNavigation();
  window.addEventListener('scroll', updateNavigation, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
