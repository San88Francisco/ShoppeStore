if (window.location.pathname.includes('/reset-password')) {
   // кнопка reset в полях вводу
   const inputFields = document.querySelectorAll('.form-reset__input');
   const inputButtons = document.querySelectorAll('.form-reset__button-reset');
   const submitButton = document.querySelector('.form-reset__button');

   inputFields.forEach((inputField, index) => {
      inputField.addEventListener('input', function () {
         if (this.value.trim() !== '') {
            inputButtons[index].style.display = 'block';
         } else {
            inputButtons[index].style.display = 'none';
         }
      });

      inputButtons[index].addEventListener('click', function (event) {
         event.preventDefault();
         inputFields[index].value = '';
         inputButtons[index].style.display = 'none';
      });
   });

   submitButton.addEventListener('click', function () {
      inputButtons.forEach((button) => {
         button.style.display = 'none';
      });
   });

   //Провірка на правильність введення email
   document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('.form-reset');
      const emailInput = form.querySelector('input[name="inputEmail"]');
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.style.display = 'none';

      form.addEventListener('submit', function (event) {
         const email = emailInput.value;
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

         if (!emailRegex.test(email)) {
            displayError(emailInput, 'Please enter email!');
            event.preventDefault();
         } else {
            hideError();
         }
      });

      emailInput.addEventListener('focus', function () {
         hideError();
      });

      function displayError(element, message) {
         errorMessage.textContent = message;
         element.parentNode.appendChild(errorMessage);
         errorMessage.style.display = 'block';
      }

      function hideError() {
         errorMessage.style.display = 'none';
      }
   });
}