// ---HEADER---
function setupHeader() {
  const pageName = document.title.toLowerCase().replace(/\s/g, '');

  // Виходимо, якщо сторінка "home"
  if (pageName === 'home') return;

  const header__underline = document.querySelector('.header__underline');
  header__underline.style.display = 'block';

  const headerAElement = document.querySelector(`.header_link_${pageName}`);
  headerAElement !== null ? headerAElement.classList.add('act') : 0;
  pageName !== 'home' ? (header__underline.style.display = 'block') : 0;
}

document.addEventListener('DOMContentLoaded', setupHeader);

/** Count Icon Header */

const navCartCount = document.querySelector('.cart__count');
let navCartValid = navCartCount;
navCartValid = localStorage.getItem('countCart') || 0;

if (navCartValid > 0 && navCartValid < 100) {
  navCartCount.style.display = 'flex';
  navCartCount.textContent = localStorage.getItem('countCart');
} else if (navCartValid < 100 && navCartValid != 0) {
  navCartCount.style.display = 'flex';
  navCartCount.textContent = '99';
  console.log('2');
}
