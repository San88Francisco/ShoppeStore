import { clearOrderCart } from './ClearOrderCart';
import { saveOrder } from './SaveOrder';

export const placeOrder = (paymentMethod) => {
  const inputFirstName = document.querySelector('.input__first-name').value;
  const inputLastName = document.querySelector('.input__last-name').value;
  const inputCountry = document.querySelector('.input__country').value;
  const inputStreet = document.querySelector('.input__street-address').value;
  const inputPostcode = document.querySelector('.input__postcode').value;
  const inputCity = document.querySelector('.input__city').value;
  const inputPhone = document.querySelector('.input__phone').value;
  const inputEmail = document.querySelector('.input__email').value;
  const inputOrderNotes = document.querySelector('.input__order-notes').value;

  const blockData = {
    name: inputFirstName,
    lastName: inputLastName,
    country: inputCountry,
    street: inputStreet,
    postcode: inputPostcode,
    city: inputCity,
    phone: inputPhone,
    email: inputEmail,
    orderNotes: inputOrderNotes,
    paymentMethod: paymentMethod,
  };

  // console.log('blockData', blockData);

  localStorage.setItem('userOrderInfo', JSON.stringify(blockData));
  saveOrder();
  clearOrderCart();
  window.location.href = 'http://localhost:3000/order-confirmation.html';
};
