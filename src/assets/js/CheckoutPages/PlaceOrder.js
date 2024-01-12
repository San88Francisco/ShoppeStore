import { clearOrderCart } from './ClearOrderCart';
import { saveOrder } from './SaveOrder';

// paymentMethod приходить мектод вибраної оплати
export const placeOrder = (paymentMethod) => {
  // Створюємо всі input де в нас будуть значення
  const inputFirstName = document.querySelector('.input__first-name').value;
  const inputLastName = document.querySelector('.input__last-name').value;
  const inputCountry = document.querySelector('.input__country').value;
  const inputStreet = document.querySelector('.input__street-address').value;
  const inputPostcode = document.querySelector('.input__postcode').value;
  const inputCity = document.querySelector('.input__city').value;
  const inputPhone = document.querySelector('.input__phone').value;
  const inputEmail = document.querySelector('.input__email').value;
  const inputOrderNotes = document.querySelector('.input__order-notes').value;

  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Створюємо обєкт з нашими данними
  const blockData = {
    name: inputFirstName,
    lastName: inputLastName,
    country: inputCountry,
    city: inputCity,
    street: inputStreet,
    postcode: inputPostcode,
    phone: inputPhone,
    email: inputEmail,
    orderNotes: inputOrderNotes,
    paymentMethod: paymentMethod,
    date: currentDate,
  };

  // Зберігаємо інофрмацію клієнта в userOrderInfo
  localStorage.setItem('userOrderInfo', JSON.stringify(blockData));
  // Функція запису замовлень
  saveOrder();
  // Функція очистки кошику !
  clearOrderCart();
  // Перехід на order-confirmation
  window.location.href = 'http://localhost:3000/order-confirmation.html';
};
