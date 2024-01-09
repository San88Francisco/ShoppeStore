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
    city: inputCity,
    street: inputStreet,
    postcode: inputPostcode,
    phone: inputPhone,
    email: inputEmail,
    orderNotes: inputOrderNotes,
    paymentMethod: paymentMethod,
  };

  // console.log('blockData', blockData);

  let isValid = false;

  const errorName = document.querySelector('.order__error-name');
  console.log('errorName:', errorName);

  // const inputFields = document.querySelectorAll('.checkout__block-name input');
  // inputFields.forEach((inputField, index) => {
  //   inputField.addEventListener('input', function () {
  //     console.log(inputField);
  //     if (inputFirstName.trim().length < 4) {
  //       console.log('Спрацювала inputFirstName');
  //       errorName.style.setProperty('opacity', '1', 'important');
  //     } else {
  //       console.log('Введено імя');
  //       errorName.style.opacity = '0';
  //     }
  //   });
  // });

  // Name validation

  // if (inputLastName.trim().length < 4) {
  //   console.log('Спрацювала inputLastName');
  //   return (isValid = false);
  // }
  // if (inputCountry.trim().length < 6) {
  //   console.log('Спрацювала inputCountry');
  //   return (isValid = false);
  // }
  // if (inputCity.trim().length < 4) {
  //   console.log('Спрацювала inputCity');
  //   return (isValid = false);
  // }
  // console.log(inputPostcode);
  // if (inputPostcode) {
  //   console.log('Спрацювала inputPostcode');
  //   isValid = false;
  //   return; // Додаємо return, щоб вийти з функції
  // }
  // if (inputPhone.trim().length < 2) {
  //   console.log('Спрацювала inputPhone');
  //   return (isValid = false);
  // }
  // if (inputEmail.trim().length < 2) {
  //   console.log('Спрацювала inputEmail');
  //   return (isValid = false);
  // }

  if (isValid) {
    console.log('Form submitted successfully!');
    // Add code to submit the form or perform other actions here
  }

  localStorage.setItem('userOrderInfo', JSON.stringify(blockData));
  // saveOrder();
  // clearOrderCart();
  // window.location.href = 'http://localhost:3000/order-confirmation.html';
};
