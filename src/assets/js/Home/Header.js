document.addEventListener('DOMContentLoaded', function () {
  /** Count Icon Header */

  const navCartCount = document.querySelector('.cart__count');

  // Оновлення navCartCount на основі значення в localStorage
  function updateNavCartCount() {
    let navCartValid = localStorage.getItem('totalCountCart') || 0;

    if (+navCartValid > 0) {
      navCartCount.style.display = 'flex';
      navCartCount.textContent = localStorage.getItem('totalCountCart');
    } else {
      navCartCount.style.display = 'none';
    }
  }

  // Спробуйте оновити на початку для початкового стану
  updateNavCartCount();

  /** Count Icon Header */

  // Додайте подію 'storage', яка буде викликатися при зміні localStorage
  window.addEventListener('storage', updateNavCartCount);

  function isElementVisible(element) {
    return window.getComputedStyle(element).display !== 'none';
  }

  const accountDropdownWrapper = document.getElementById(
    'accountDropdownWrapper'
  );
  const accountToggle = document.getElementById('accountToggle');
  const logoutButton = document.getElementById('logout');

  accountToggle.addEventListener('click', function (event) {
    event.preventDefault();
    accountDropdownWrapper.classList.toggle('active');
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('#accountDropdownWrapper')) {
      accountDropdownWrapper.classList.remove('active');
    }
  });
});

// фун для підчеркування сторінок
(function () {
  const hrefPags = location.href;
  const menuLinks = document.querySelectorAll('.decstop-nav li');

  const header = document.querySelector('header');

  // Об'єкт для визначення відповідних індексів елементів меню
  const pageMapping = {
    index: -1, // Вказуємо -1 для сторінки "index", щоб не встановлювати клас
    shop: 0,
    product: 0,
    blog: 1,
    our: 2,
    cart: 5,
    checkout: 5,
    confirmation: 5,
    account: 6,
  };

  // Перевірка чи частину URL містить ключі з pageMapping
  switch (true) {
    case hrefPags.includes('index'):
      header.style.borderBottom = 'none';
      break;
    case Object.keys(pageMapping).some((key) => hrefPags.includes(key)):
      header.style.borderBottom = '1.5px solid #D8D8D8';
      const currentPage = Object.keys(pageMapping).find((key) =>
        hrefPags.includes(key)
      );
      const typeIndex = pageMapping[currentPage];
      if (typeIndex >= 0) {
        const type = menuLinks[typeIndex];
        type.classList.add('active-header-li');
      }
      break;
    default:
      console.error('Такої сторінки немає');
  }
})();
