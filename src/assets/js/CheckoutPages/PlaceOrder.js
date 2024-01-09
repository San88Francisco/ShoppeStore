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

  const inputHandler = ({ target }) => {
    if (target.hasAttribute('data-reg')) {
      inputCheck(target);
      console.log('target:', target);
    }
  };

  const form = document.forms['checkout__container'];
  console.log('form:', form);

  form.addEventListener('input', inputHandler);

  const inputCheck = (element) => {
    console.log('element', element);
    const inputValue = element.value;
    const inputReg = element.getAttribute('data-reg');
    const reg = new RegExp(inputReg);

    if (reg.test(inputValue)) {
      element.style.border = '2px solid rgb(0,196,0)';
    } else {
      element.style.border = '2px solid rgb(255,0,0)';
    }
  };

  localStorage.setItem('userOrderInfo', JSON.stringify(blockData));
  // saveOrder();
  // clearOrderCart();
  // window.location.href = 'http://localhost:3000/order-confirmation.html';
};

// let isValid = false;

//   const errorName = document.querySelector('.order__error-name');

//   const inputFields = document.querySelectorAll('.checkout__block-name input');

//   const inputValidate = () => {};

//   inputFields.forEach((inputField, index) => {
//     if (inputFirstName.length < 2) {
//       console.log(inputField);
//       console.log(index);
//       return console.log('немає inputFirstName');
//     }
//     if (inputLastName.length < 2) {
//       return console.log('немає inputLastName');
//     }
//     if (inputCountry.length < 2) {
//       return console.log('немає inputCountry');
//     }
//     if (inputCity.length < 2) {
//       return console.log('немає inputCity');
//     }
//     if (inputStreet.length < 2) {
//       return console.log('немає inputStreet');
//     }
//     if (inputPostcode.length < 2) {
//       return console.log('немає inputPostcode');
//     }
//     if (inputPhone.length < 2) {
//       return console.log('немає inputPhone');
//     }
//     if (inputEmail.length < 2) {
//       return console.log('немає inputEmail');
//     }
//     // inputField.addEventListener('input', function () {
//     //   console.log(inputField);
//     // });
//   });

//   if (isValid) {
//     console.log('Form submitted successfully!');
//     // Add code to submit the form or perform other actions here
//   }
