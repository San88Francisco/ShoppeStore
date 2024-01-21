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

   //Перевірка на індекс
   function isValidPostalCode(postalCode) {
      // Встановлюємо шаблон поштового індексу для формату "00-000"
      let postalCodePattern = /^(\d{5}|\d{2}-\d{3})$/;

      // Перевірка, чи введений поштовий індекс відповідає шаблону
      return postalCodePattern.test(postalCode);
   }

   // Перевірка на номер телефону
   function isValidPhoneNumber(phoneNumber) {
      // Встановлюємо шаблон для номеру телефону у форматі "+код країни-номер телефону"
      let phonePattern = /^(\+\d{12}|\d{9}|\d{10})$/;


      // Перевірка, чи введений номер телефону відповідає шаблону
      return phonePattern.test(phoneNumber);
   }

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

   function displayErrorCheckout() {
      const latinLettersRegex = /^[a-zA-Z]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;
      console.log(isValid);

      if (
         !latinLettersRegex.test(inputFirstName) ||
         !latinLettersRegex.test(inputLastName) ||
         !latinLettersRegex.test(inputCountry) ||
         !latinLettersRegex.test(inputCity) ||
         inputStreet.length < 3 ||
         !isValidPostalCode(inputPostcode) ||
         !isValidPhoneNumber(inputPhone) ||
         !emailRegex.test(inputEmail)
      ) {
         if (!latinLettersRegex.test(inputFirstName)) {
            const errorName = document.querySelector('.order__error-name');
            errorName.style.opacity = '1';
            console.log(isValid);
         }
         if (!latinLettersRegex.test(inputLastName)) {
            const errorNameLast = document.querySelector('.order__error-lastName');
            errorNameLast.style.opacity = '1';
         }
         if (!latinLettersRegex.test(inputCountry)) {
            const errorCountry = document.querySelector('.order__error-country');
            errorCountry.style.opacity = '1';
         }
         if (!latinLettersRegex.test(inputCity)) {
            const errorAddress = document.querySelector('.order__error-city');
            errorAddress.style.opacity = '1';
         }
         if (inputStreet.length < 3) {
            const errorStreet = document.querySelector('.order__error-address');
            errorStreet.style.opacity = '1';
         }
         if (!isValidPostalCode(inputPostcode)) {
            const errorZip = document.querySelector('.order__error-zip');
            errorZip.style.opacity = '1';
         }
         if (!isValidPhoneNumber(inputPhone)) {
            const errorPhone = document.querySelector('.order__error-phone');
            errorPhone.style.opacity = '1';
         }
         if (!emailRegex.test(inputEmail)) {
            const errorEmail = document.querySelector('.order__error-email');
            errorEmail.style.opacity = '1';
         }

         isValid = false; // Встановлюємо isValid в false, якщо є помилка
      } else {
         window.location.href = 'http://localhost:3000/order-confirmation.html';
         // Зберігаємо інофрмацію клієнта в userOrderInfo
         localStorage.setItem('userOrderInfo', JSON.stringify(blockData));
         console.log('saveOrder');
         // Функція запису замовлень
         saveOrder();
         // Функція очистки кошику !
         clearOrderCart();
      }

      if (isValid) {
         // Всі перевірки пройшли без помилок
         console.log('work');
      }
   }

   displayErrorCheckout();
   let formCheckout = document.querySelector('.checkout__container');
   const orderForm = formCheckout.querySelectorAll('.order__form-info');

   orderForm.forEach((element, index) => {
      const inputForm = element.querySelector('input');
      const labelForInput = inputForm.nextElementSibling;

      inputForm.addEventListener('focus', function () {
         labelForInput.style.opacity = '0';
      });
   });
};
