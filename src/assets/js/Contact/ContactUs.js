//Провірка на правильність введення email
if (window.location.pathname.includes('/contact')) {

   document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('.contact__form');
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





   class User {
      constructor(nameInput, lastNameInput, emailInput, selectInput, messageInput) {
         this.nameInput = nameInput;
         this.lastNameInput = lastNameInput;
         this.emailInput = emailInput;
         this.selectInput = selectInput;
         this.messageInput = messageInput;
      }

      register() {
         if (this.nameInput.trim().length < 2) {
            return { isValid: false, element: 'input[name="inputName"]' };
         }

         if (this.lastNameInput.trim().length < 2) {
            return { isValid: false, element: 'input[name="inputLastName"]' };
         }

         return { isValid: true };
      }
   }

   let clientsArray = [];
   const form = document.querySelector('.contact__form');

   form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = form.querySelector('input[name="inputName"]');
      const lastNameInput = form.querySelector('input[name="inputLastName"]');
      const emailInput = form.querySelector('input[name="inputEmail"]').value.trim();
      const selectInput = form.querySelector('.select-header').textContent.trim();
      const messageInput = form.querySelector('input[name="messageInput"]').value.trim();

      const user = new User(nameInput.value, lastNameInput.value, emailInput, selectInput, messageInput);

      const validationResult = user.register();
      if (!validationResult.isValid) {
         const errorMessage = document.createElement('div');
         errorMessage.classList.add('error-message');
         errorMessage.textContent = 'Please enter at least 2 characters';

         const errorElement = form.querySelector(validationResult.element);
         errorElement.parentNode.appendChild(errorMessage);
      } else {
         console.log('good');
         form.reset();
         clientsArray.push(user);
         console.log(clientsArray);

         const errorMessages = form.querySelectorAll('.error-message');
         errorMessages.forEach(errorMessage => errorMessage.remove());
      }

   });


   // Прибираємо всі повідомлення про помилки при кліку на поде вводу
   form.addEventListener('click', (event) => {
      const clickedElement = event.target;
      if (clickedElement.tagName === 'INPUT' || clickedElement.tagName === 'SELECT') {
         const errorMessages = form.querySelectorAll('.error-message');
         errorMessages.forEach(errorMessage => errorMessage.remove());
      }
   });

   // кнопка reset в полях вводу
   const inputFields = document.querySelectorAll('.columns-form__input');
   const inputButtons = document.querySelectorAll('.columns-form__button');
   const submitButton = document.querySelector('.contact__button');

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

   //

   const selectHeader = document.querySelector('.select-header');
   const selectOptions = document.querySelector('.select-options');

   selectHeader.addEventListener('click', function () {
      selectOptions.style.display = (selectOptions.style.display === 'block') ? 'none' : 'block';
   });

   document.addEventListener('click', function (event) {
      if (!selectHeader.contains(event.target)) {
         selectOptions.style.display = 'none';
      }
   });

   const selectItems = document.querySelectorAll('.select-options li');

   selectItems.forEach(item => {
      item.addEventListener('click', function () {
         selectHeader.textContent = this.textContent;
         selectOptions.style.display = 'none';
      });
   });
}

