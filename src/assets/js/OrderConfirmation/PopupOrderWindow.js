export const popupOrder = () => {
    const popupWindow = document.querySelector('.order__window-block');
    const headerUnderline = document.querySelector('.header__underline');

    // Задаємо стилі для popupWindow і headerUnderline
    headerUnderline.style.border = '1px solid #A18A68';
    headerUnderline.style.transition = 'border 0.3s ease-in-out';
    popupWindow.style.visibility = 'visible';
    popupWindow.style.opacity = 1;
    popupWindow.style.transition = 'opacity 0.3s ease-in-out';

    setTimeout(() => {
      headerUnderline.style.border = '1px solid #d8d8d8';
      popupWindow.style.opacity = '0';
    }, 3000);
}