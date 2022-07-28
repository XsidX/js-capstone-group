const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

export const mobileMenu = () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
};