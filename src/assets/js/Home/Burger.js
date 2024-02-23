function setupHeader() {
  const pageName = document.title.toLowerCase().replace(/\s/g, '');

  const headerAElement = document.querySelector(`.burger__link_${pageName}`);
  headerAElement?.classList.add('burg');
}

document.addEventListener('DOMContentLoaded', setupHeader);

document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');
  const headerLogo = document.querySelector('.header__logo');

  const checkbox = document.querySelector('.button-burger');
  const menuItems = document.querySelector('.menu-items');

  const burgerItems = document.querySelectorAll('.burger-menu__item');
  const burgerSignIn = document.querySelector('.burger__signIn');
  const burgerMyAccount = document.querySelector('.burger__myAccount');
  const burgerHeader = document.querySelector('.burger__header');
  const burgerFooter = document.querySelector('.burger__footer');
  const burgerLogout = document.querySelector('.burger__logout');
  const burgerLine = document.querySelector('.burger-line');

  checkbox.addEventListener('click', function () {
    this.classList.toggle('active');
    menuItems.classList.toggle('active');

    if (menuItems.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    burgerItems.forEach((item) => {
      item.classList.toggle('active');
    });

    if (checkbox.classList.contains('active')) {
      setTimeout(function () {
        headerLogo.style.zIndex = '4';
      }, 400);
    } else {
      setTimeout(function () {
        headerLogo.style.zIndex = '7';
      }, 400);
    }

    burgerFooter.classList.toggle('active');
    burgerSignIn.classList.toggle('active');
    burgerMyAccount.classList.toggle('active');
    burgerLogout.classList.toggle('active');
    burgerHeader.classList.toggle('active');
    burgerLine.classList.toggle('active');
  });
});
