const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

// Toggle menu on click
menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// Reset menu state on page load
window.addEventListener('load', () => {
  menu.classList.remove('is-active');
  menuLinks.classList.remove('active');
});
