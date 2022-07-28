const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// eslint-disable-next-line import/prefer-default-export
export const mobileMenu = () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
};