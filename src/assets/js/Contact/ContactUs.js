if (window.location.pathname.includes('/contact')) {
  class User {
    constructor(
      nameInput,
      lastNameInput,
      emailInput,
      selectInput,
      messageInput
    ) {
      this.nameInput = nameInput;
      this.lastNameInput = lastNameInput;
      this.emailInput = emailInput;
      this.selectInput = selectInput;
      this.messageInput = messageInput;
    }

    getSerializedUser() {
      return {
        name: this.nameInput,
        lastName: this.lastNameInput,
        email: this.emailInput,
        subject: this.selectInput,
        message: this.messageInput,
      };
    }

    register() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const existingErrorMessage = form.querySelector('.error-message');
      if (
        this.nameInput.length < 2 ||
        this.lastNameInput.length < 2 ||
        !emailRegex.test(this.emailInput) ||
        this.selectInput === 'Subject' ||
        this.messageInput.length < 2
      ) {
        if (this.nameInput.length < 2) {
          const nameError = form.querySelector('input[name="inputName"]');
          if (!existingErrorMessage) {
            nameError.insertAdjacentHTML(
              'afterend',
              '<div class="error-message">Please enter at least 2 characters</div>'
            );
          }
        }
        if (this.lastNameInput.length < 2) {
          const lastNameError = form.querySelector(
            'input[name="inputLastName"]'
          );
          // Перевіряємо, чи є вже відображена помилка цього виду
          if (!existingErrorMessage) {
            lastNameError.insertAdjacentHTML(
              'afterend',
              '<div class="error-message">Please enter at least 2 characters</div>'
            );
          }
        }
        if (!emailRegex.test(this.emailInput)) {
          if (!existingErrorMessage) {
            const emailError = form.querySelector('input[name="inputEmail"]');
            emailError.insertAdjacentHTML(
              'afterend',
              '<div class="error-message">Please enter a valid email!</div>'
            );
          }
        }
        if (this.selectInput === 'Subject') {
          const selectHeaderText = document.querySelector('.select-header');
          if (!existingErrorMessage) {
            selectHeaderText.insertAdjacentHTML(
              'afterend',
              '<div class="error-message">Please select subject</div>'
            );
          }
        }
        if (this.messageInput.length < 2) {
          const MassegeError = form.querySelector('input[name="messageInput"]');
          if (!existingErrorMessage) {
            MassegeError.insertAdjacentHTML(
              'afterend',
              '<div class="error-message">Please enter at least 2 characters</div>'
            );
          }
        }
        return;
      } else {
        clientsArray.push(this.getSerializedUser());
        clientsArray;
      }
    }
  }

  let clientsArray = [];
  const form = document.querySelector('.contact__form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = form.querySelector('input[name="inputName"]');
    const lastNameInput = form.querySelector('input[name="inputLastName"]');
    const emailInput = form
      .querySelector('input[name="inputEmail"]')
      .value.trim();
    const selectInput = form.querySelector('.select-header').textContent.trim();
    const messageInput = form
      .querySelector('input[name="messageInput"]')
      .value.trim();

    const user = new User(
      nameInput.value,
      lastNameInput.value,
      emailInput,
      selectInput,
      messageInput
    );

    const validationResult = user.register();
    if (validationResult === true) {
      form.reset();
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach((errorMessage) => errorMessage.remove());
    }
  });

  // Прибираємо всі повідомлення про помилки при кліку на поде вводу
  form.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (
      clickedElement.tagName === 'INPUT' ||
      clickedElement.tagName === 'DIV'
    ) {
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach((errorMessage) => errorMessage.remove());
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
    selectOptions.style.display =
      selectOptions.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', function (event) {
    if (!selectHeader.contains(event.target)) {
      selectOptions.style.display = 'none';
    }
  });

  const selectItems = document.querySelectorAll('.select-options li');

  selectItems.forEach((item) => {
    item.addEventListener('click', function () {
      selectHeader.textContent = this.textContent;
      selectOptions.style.display = 'none';
    });
  });

  //прибираємо текст з заголовка на мобілці
  const titleText = document.querySelector('.contact__block-header');

  function deleteText() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 500) {
      titleText.innerHTML = '<h1 class="contact__title">Contact</h1>';
    } else {
      titleText.innerHTML = `
         <div class="contact__block-header">
         <h1 class="contact__title">Contact Us</h1>
         <div class="contact__text">
            Say Hello send us your thoughts about our products or share
            your ideas with our Team!
         </div>
      </div>
         `;
    }
  }

  // Викликаємо функцію deleteText після завантаження сторінки
  deleteText();

  // Викликаємо функцію deleteText при зміні розміру вікна
  window.addEventListener('resize', deleteText);
}
