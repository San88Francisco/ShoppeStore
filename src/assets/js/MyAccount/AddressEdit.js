export const addressEdit = () => {

   const btnSaveChanges = document.querySelector('.btn__address-edit');
   console.log('addressEdit  btnSaveChanges:', btnSaveChanges);

   const addressFirstName = document.querySelector('.address__first-name');
   const addressLastName = document.querySelector('.address__last-name');
   const addressCountry = document.querySelector('.address__country');
   const addressCity = document.querySelector('.address__city');
   const addressStreet = document.querySelector('.address__street');
   const addressPostcode = document.querySelector('.address__postcode');
   const addressPhone = document.querySelector('.address__phone');
   const addressEmail = document.querySelector('.address__email');

   const userAddressInfo =
      JSON.parse(localStorage.getItem('userAddressInfo')) || false;
   console.log('placeOrder  userAddressInfo:', userAddressInfo);

   if (userAddressInfo) {
      addressFirstName.value = userAddressInfo.name;
      addressLastName.value = userAddressInfo.lastName;
      addressCountry.value = userAddressInfo.country;
      addressCity.value = userAddressInfo.city;
      addressStreet.value = userAddressInfo.street;
      addressPostcode.value = userAddressInfo.postcode;
      addressPhone.value = userAddressInfo.phone;
      addressEmail.value = userAddressInfo.email;
   }

   //Перевірка на індекс
   function ValidPostalCode(postalCode) {
      // Встановлюємо шаблон поштового індексу для формату "00-000"
      let postalCodePattern = /^(\d{5}|\d{2}-\d{3})$/;

      // Перевірка, чи введений поштовий індекс відповідає шаблону
      return postalCodePattern.test(postalCode);
   }

   // Перевірка на номер телефону
   function ValidPhoneNumber(phoneNumber) {
      // Встановлюємо шаблон для номеру телефону у форматі "+код країни-номер телефону"
      let phonePattern = /^(\+\d{12}|\d{9}|\d{10})$/;

      // Перевірка, чи введений номер телефону відповідає шаблону
      return phonePattern.test(phoneNumber);
   }

   const formAdress = document.querySelector('.adress-form');

   function displayErrorAdress() {
      const latinLettersRegex = /^[a-zA-Z]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isErrorMessage = formAdress.querySelector('.error-message');
      let isValid = true;

      function clearFieldError(field) {
         const error = field.nextElementSibling;
         if (error && error.classList.contains('error-message')) {
            error.remove();
         }
      }

      function clearAllErrors() {
         const errors = formAdress.querySelectorAll('.error-message');
         errors.forEach(error => error.remove());
      }

      // Додаємо обробник події для видалення всіх помилок при кліку на кожне поле вводу
      const inputFields = formAdress.querySelectorAll('input');
      inputFields.forEach(input => {
         input.addEventListener('click', () => {
            clearAllErrors();
            clearFieldError(input);
         });
      });

      if (
         !latinLettersRegex.test(addressFirstName.value) ||
         !latinLettersRegex.test(addressLastName.value) ||
         !latinLettersRegex.test(addressCountry.value) ||
         !latinLettersRegex.test(addressCity.value) ||
         addressStreet.value.length < 3 ||
         !ValidPostalCode(addressPostcode.value) ||
         !ValidPhoneNumber(addressPhone.value) ||
         !emailRegex.test(addressEmail.value)
      ) {
         if (!latinLettersRegex.test(addressFirstName.value)) {
            if (!isErrorMessage) {
               addressFirstName.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Please enter name</div>'
               );
               console.log('ku');
            }
         }
         if (!latinLettersRegex.test(addressLastName.value)) {
            if (!isErrorMessage) {
               addressLastName.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Enter your last name</div>'
               );
            }
         }
         if (!latinLettersRegex.test(addressCountry.value)) {
            if (!isErrorMessage) {
               addressCountry.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Please enter a country</div>'
               );
            }
         }
         if (!latinLettersRegex.test(addressCity.value)) {
            if (!isErrorMessage) {
               addressCity.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Please enter the city</div>'
               );
            }
         }
         if (addressStreet.value.length < 3) {
            if (!isErrorMessage) {
               addressStreet.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Please enter an address</div>'
               );
            }
         }
         if (!ValidPostalCode(addressPostcode.value)) {
            if (!isErrorMessage) {
               addressPostcode.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Incorrect index, please enter an index</div>'
               );
            }
         }
         if (!ValidPhoneNumber(addressPhone.value)) {
            if (!isErrorMessage) {
               addressPhone.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Incorrect phone number, please enter a phone number</div>'
               );
            }
         }
         if (!emailRegex.test(addressEmail.value)) {
            if (!isErrorMessage) {
               addressEmail.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Incorrect email, please enter email</div>'
               );
            }
         }

         // Додаємо обробник події для видалення помилок при кліку на кожне поле вводу
         inputFields.forEach(input => {
            input.addEventListener('click', () => clearAllErrors());
         });
      }

      if (isValid) {
         // Всі перевірки пройшли без помилок
         console.log('work');
         formAdress.reset();
      }
   }


   btnSaveChanges.addEventListener('click', () => {
      const blockData = {
         name: addressFirstName.value,
         lastName: addressLastName.value,
         country: addressCountry.value,
         city: addressCity.value,
         street: addressStreet.value,
         postcode: addressPostcode.value,
         phone: addressPhone.value,
         email: addressEmail.value,
      };

      localStorage.setItem('userAddressInfo', JSON.stringify(blockData));

      displayErrorAdress();
   })

};
