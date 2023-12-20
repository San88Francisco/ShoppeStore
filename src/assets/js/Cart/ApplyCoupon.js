import { CartTotal } from './CartItem';

export const applyCoupon = () => {
  const btnCoupon = document.querySelector('.btn__coupon');
  const inputCoupon = document.querySelector('.input__coupon');
  const popupCoupon = document.querySelector('.popup__cart-coupon');
  const couponText = document.querySelector('.popup__coupon-text');

  const couponCart = [
    '2024',
    '14 лютого',
    '8 березня',
    'san francisco',
    'dota',
    'minecraft',
  ];

  const couponAnswer = [
    'Вітаємо, ваша новорічна знижка 20%',
    'Вітаємо, тільки для закоханих знижка 25%',
    'Вітаємо підкаблучнику 😄 Твоя знижа 30%',
    'Ого як далеко тебе занесло, для таких випадків у нас максимальна знижка 90%',
    'Мужик! Вітаємо з дорослішанням :) 50%',
    'Нажаль для дітей в нас немає знижки',
  ];

  if (inputCoupon.value) {
    // Шукаємо чи співпадає введене значення користувача з нашими купонами
    const res = couponCart.find(
      (item) => item === inputCoupon.value.toLowerCase()
    );
    // Якщо в res є наш купон, воно його знайде
    console.log(res);

    switch (res) {
      case '2024':
        popupCoupon.style.display = 'grid';
        couponText.textContent = couponAnswer[0];
        localStorage.setItem('cartDiscount', 20);
        CartTotal();
        break;
      case '14 лютого':
        popupCoupon.style.display = 'grid';
        couponText.textContent = couponAnswer[1];
        localStorage.setItem('cartDiscount', 25);
        CartTotal();
        break;
      case '8 березня':
        popupCoupon.style.display = 'grid';
        couponText.textContent = couponAnswer[2];
        localStorage.setItem('cartDiscount', 30);
        CartTotal();
        break;
      case 'san francisco':
        popupCoupon.style.display = 'grid';
        couponText.textContent = couponAnswer[3];
        localStorage.setItem('cartDiscount', 90);
        CartTotal();
        break;
      case 'dota':
        popupCoupon.style.display = 'grid';
        couponText.textContent = couponAnswer[4];
        localStorage.setItem('cartDiscount', 10);
        CartTotal();
        break;
      case 'minecraft':
        popupCoupon.style.display = 'grid';
        couponText.textContent = couponAnswer[5];
        break;
      default:
        popupCoupon.style.display = 'grid';
        couponText.textContent = 'No coupon found';
        break;
    }

    inputCoupon.value = '';

    // Функція яка закриє наше вікно з купоном через 3сек
    setTimeout(() => {
      popupCoupon.style.display = 'none';
    }, 3000);
  }

  btnCoupon.addEventListener('click', applyCoupon);

  inputCoupon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      applyCoupon();
    }
  });

  const hintCoupon = document.querySelector('.hint__coupon');
  // Змінна для обнулення таймеру, якщо ми наведемо знову мишку на input
  let debounceTimerCoupon;

  // Якщо навели, відображаємо блок
  inputCoupon.addEventListener('mouseenter', () => {
    clearTimeout(debounceTimerCoupon);
    hintCoupon.style.display = 'block';
  });

  // Якщо забрали мишку, приховаємо блок через 0.5сек
  inputCoupon.addEventListener('mouseleave', () => {
    debounceTimerCoupon = setTimeout(() => {
      hintCoupon.style.display = 'none';
    }, 500);
  });
};
