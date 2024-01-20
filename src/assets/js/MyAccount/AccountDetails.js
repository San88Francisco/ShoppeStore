export const accountDetails = () => {
   const myProfile = JSON.parse(localStorage.getItem('myProfile'));

   const detailsFirstName = document.querySelector('.account__details-firstName');
   const detailsLastName = document.querySelector('.account__details-lastName');
   const detailsDisplayName = document.querySelector('.account__details-displayName');
   const detailsPhone = document.querySelector('.account__details-phone');
   const detailsFirstEmail = document.querySelector('.account__details-email');
   const curentPass = document.querySelector('.account__details-pass');
   const newPass = document.querySelector('.account__details-newPass');
   const confirmPass = document.querySelector('.account__confirm-pass');


   // Перевірка на номер телефону
   function ValidPhoneNumber(phoneNumber) {
      // Встановлюємо шаблон для номеру телефону у форматі "+код країни-номер телефону"
      let phonePattern = /^(\+\d{12}|\d{9}|\d{10})$/;

      // Перевірка, чи введений номер телефону відповідає шаблону
      return phonePattern.test(phoneNumber);
   }

   const detailsForm = document.querySelector('.details-form');
   const paragraf = detailsForm.querySelector('p');



   function displayErrorDetails() {
      const latinLettersRegex = /^[a-zA-Z]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isErrorMessage = detailsForm.querySelector('.error-message');
      let isValid = true;

      function clearFieldError(field) {
         let error = field.nextElementSibling;
         if (error && error.classList.contains('error-message')) {
            error.remove();
         }
      }

      function clearAllErrors() {
         const errors = detailsForm.querySelectorAll('.error-message');
         errors.forEach(error => error.remove());
         paragraf.style.opacity = '1';
      }

      // Додаємо обробник події для видалення всіх помилок при кліку на кожне поле вводу
      const inputFields = detailsForm.querySelectorAll('input');
      inputFields.forEach(input => {
         input.addEventListener('click', () => {
            clearAllErrors();
            clearFieldError(input);
         });
      });

      if (
         !latinLettersRegex.test(detailsFirstName.value) ||
         !latinLettersRegex.test(detailsLastName.value) ||
         !latinLettersRegex.test(detailsDisplayName.value) ||
         !ValidPhoneNumber(detailsPhone.value) ||
         !emailRegex.test(detailsFirstEmail.value)
      ) {
         if (!latinLettersRegex.test(detailsFirstName.value)) {
            if (!isErrorMessage) {
               detailsFirstName.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Please enter name</div>'
               );
            }
         }
         if (!latinLettersRegex.test(detailsLastName.value)) {
            if (!isErrorMessage) {
               detailsLastName.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Enter your last name</div>'
               );
            }
         }
         if (!latinLettersRegex.test(detailsDisplayName.value)) {
            if (!isErrorMessage) {
               detailsDisplayName.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Please enter your display name</div>'
               );
               paragraf.style.opacity = '0';
            }
         }
         if (!ValidPhoneNumber(detailsPhone.value)) {
            if (!isErrorMessage) {
               detailsPhone.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Incorrect phone number, please enter a phone number</div>'
               );
            }
         }
         if (!emailRegex.test(detailsFirstEmail.value)) {
            if (!isErrorMessage) {
               detailsFirstEmail.insertAdjacentHTML(
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
      }
   }

   function displayErrorPassword() {
      const isErrorMessage = detailsForm.querySelector('.error-message');
      let isValid = true;

      function addError(input, errorMessage) {
         if (!isErrorMessage) {
            input.insertAdjacentHTML('afterend', `<div class="error-message">${errorMessage}</div>`);
         }
         isValid = false;
      }

      function clearFieldError(field) {
         let error = field.nextElementSibling;
         if (error && error.classList.contains('error-message')) {
            error.remove();
         }
      }

      function clearAllErrors() {
         const errors = detailsForm.querySelectorAll('.error-message');
         errors.forEach(error => error.remove());
      }

      const inputFields = detailsForm.querySelectorAll('input');

      inputFields.forEach(input => {
         input.addEventListener('click', () => {
            clearAllErrors();
            clearFieldError(input);
         });
      });

      switch (true) {
         case curentPass.value.length < 8:
            addError(curentPass, 'The password must be at least 8 characters long');
            break;
         case !/[a-zA-Z]/.test(curentPass.value):
            addError(curentPass, 'Password must contain at least one letter');
            break;
      }

      switch (true) {
         case newPass.value.length < 8:
            addError(newPass, 'The password must be at least 8 characters long');
            break;
         case !/[a-zA-Z]/.test(newPass.value):
            addError(newPass, 'Password must contain at least one letter');
            break;
      }

      switch (true) {
         case confirmPass.value.length < 8:
            addError(confirmPass, 'The password must be at least 8 characters long');
            break;
         case !/[a-zA-Z]/.test(confirmPass.value):
            addError(confirmPass, 'Password must contain at least one letter');
            break;
         case newPass.value.trim() !== confirmPass.value:
            addError(confirmPass, 'Your passwords are different');
            addError(newPass, 'Your passwords are different');
            break;
      }

      // Додаємо обробник події для видалення помилок при кліку на кожне поле вводу
      inputFields.forEach(input => {
         input.addEventListener('click', () => clearAllErrors());
      });

      if (isValid) {
         // Всі перевірки пройшли без помилок
         console.log('valid');
      }
   }


   detailsFirstName.value = myProfile.nameInput;
   detailsLastName.value = myProfile.lastNameInput;
   detailsDisplayName.value = myProfile.displayName || '';
   detailsPhone.value = myProfile.phone || '';
   detailsFirstEmail.value = myProfile.emailInput;

   const btnSaveDetails = document.querySelector('.save__account-details');
   btnSaveDetails.addEventListener('click', () => {
      myProfile.nameInput = detailsFirstName.value;
      myProfile.lastNameInput = detailsLastName.value;
      myProfile.displayName = detailsDisplayName.value;
      myProfile.phone = detailsPhone.value;
      myProfile.emailInput = detailsFirstEmail.value;
      displayErrorDetails();
      localStorage.setItem('myProfile', JSON.stringify(myProfile));
      localStorage.setItem('userSignIn', JSON.stringify(myProfile.emailInput));
   });

   // Password logic
   const accountDetailsPass = document.querySelector('.account__details-pass');
   const accountDetailsMewPass = document.querySelector(
      '.account__details-newPass'
   );
   const accountConfirmPass = document.querySelector('.account__confirm-pass');

   const btnSavePass = document.querySelector('.save__account-password');
   btnSavePass.addEventListener('click', () => {
      myProfile.passwordInput = accountConfirmPass.value;

      localStorage.setItem('myProfile', JSON.stringify(myProfile));
   });
};
