export const orderInfo = () => {
  const checkoutInfo = JSON.parse(localStorage.getItem('userOrderInfo'));
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Беремо всі замовлення та їх довжину (length) і задаємо в номер замовлення. Якщо замовлень ще не було, задаємо 0 .
  const numberOrder = JSON.parse(localStorage.getItem('allOrders')) || 0;

  document.querySelector('.order__number').textContent = numberOrder.length;
  document.querySelector('.order__email').textContent = checkoutInfo.email;
  document.querySelector('.order__payment').textContent =
    checkoutInfo.paymentMethod;
  document.querySelector('.order__date').textContent = currentDate;
  document.querySelector('.order__delivery').textContent = 'Standard delivery';
  document.querySelector('.order__address-country').textContent =
    checkoutInfo.country;
  document.querySelector('.order__address-city').textContent =
    checkoutInfo.city;
  document.querySelector('.order__address-street').textContent =
    checkoutInfo.street;
  document.querySelector('.order__address-postcode').textContent =
    checkoutInfo.postcode;
  document.querySelector('.order__contact-phone').textContent =
    checkoutInfo.phone;
};
