// header - Оновлює відображення посилань на акаунт в залежності від входу в систему
export function updateAccountLinksVisibility() {
  const userSignedIn = localStorage.getItem('userSignIn');
  // const signInLink = document.querySelector(
  //   '#accountDropdown a[href="./account.html"]'
  // ) || null;
  const signInLink = document.querySelector('.accountDropdownSignIn');
  // const myAccountLink = document.querySelector(
  //   '#accountDropdown a[href="./my-account.html"]'
  // );
  const myAccountLink = document.querySelector('.accountDropdownMyAccount');
  const signOutLink = document.querySelector('#accountDropdown #logout');

  /** Burger account logisctics */
  const signInLinkPhone = document.getElementById('signInLink');
  const myAccountPhone = document.getElementById('myAccountContainer');
  const logoutPhone = document.getElementById('logoutContainer');

  if (userSignedIn) {
    // Користувач увійшов в систему
    signInLink.style.display = 'none'; // Приховати Sign In
    myAccountLink.style.display = 'block'; // Показати My account
    signOutLink.style.display = 'block'; // Показати Sign Out

    signInLinkPhone.style.display = 'none';
    myAccountPhone.style.display = 'block';
    logoutPhone.style.display = 'block';
  } else {
    // Користувач не увійшов в систему
    signInLink.style.display = 'block'; // Показати Sign In
    myAccountLink.style.display = 'none'; // Приховати My account
    signOutLink.style.display = 'none'; // Приховати Sign Out

    myAccountPhone.style.display = 'none'; // Показати My account
    logoutPhone.style.display = 'none';
  }
}

export function handleUserSignIn() {
  const userSignedIn = localStorage.getItem('userSignIn');

  function redirectToLoginPage() {
    window.location.href = './account.html';
  }

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('userSignIn');
    redirectToLoginPage();
  }

  return {
    redirectToLoginPage,
    handleLogout,
    userSignedIn,
  };
}

if (window.location.pathname.includes('/account')) {
  document.addEventListener('DOMContentLoaded', async function () {
    // Отримуємо посилання на потрібні елементи DOM
    const signInTab = document.getElementById('signInTab');
    const registerTab = document.getElementById('registerTab');
    const signInBlock = document.querySelector('.block-tabs--singIn');
    const registerBlock = document.querySelector('.block-tabs--register');
    const date = new Date();
    const currentDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Функція для зміни активної вкладки та відображення блоків
    async function switchTabs(
      activeTab,
      inactiveTab,
      activeBlock,
      inactiveBlock
    ) {
      activeTab.classList.add('_active');
      inactiveTab.classList.remove('_active');
      activeBlock.style.display = 'block';
      inactiveBlock.style.display = 'none';

      await new Promise((resolve) => setTimeout(resolve, 500));

      activeBlock.classList.add('opac');
      inactiveBlock.classList.remove('opac'); // Видалення класу 'opac' з неактивного блоку одразу
    }

    // Додаємо клас '_active' до елемента по замовчуванню

    // При кліку на вкладку "Sign in"
    signInTab.addEventListener('click', async function (event) {
      event.preventDefault(); // Запобігаємо стандартному переходу за посиланням
      await switchTabs(signInTab, registerTab, signInBlock, registerBlock);
    });

    // При кліку на вкладку "Register"
    registerTab.addEventListener('click', async function (event) {
      event.preventDefault(); // Запобігаємо стандартному переходу за посиланням
      await switchTabs(registerTab, signInTab, registerBlock, signInBlock);
    });

    // кнопка reset в полях вводу
    const inputFields = document.querySelectorAll('.form__input');
    const inputButtons = document.querySelectorAll('.form__button');
    const submitButton = document.querySelector('.block-tabs__button');

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
        let togglePasswordBtn = document.querySelectorAll('.togglePasswordBtn');
        togglePasswordBtn.forEach((item) => {
          item.style.display = 'none';
        });
      });
    });

    submitButton.addEventListener('click', function () {
      inputButtons.forEach((button) => {
        button.style.display = 'none';
      });
    });

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

    // Функціонал реєстрації
    class User {
      constructor(
        nameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        repeatPasswordInput,
        selectHeaderText,
        dataCreation
      ) {
        this.nameInput = nameInput;
        this.lastNameInput = lastNameInput;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.repeatPasswordInput = repeatPasswordInput;
        this.selectHeaderText = selectHeaderText;
        this.dataCreation = dataCreation;
      }
      register() {
        const emailError = form.querySelector('input[name="EmailAccount"]');
        const email = emailError.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const existingErrorMessage = form.querySelector('.error-message');
        if (
          this.nameInput.trim().length < 2 ||
          this.lastNameInput.trim().length < 2 ||
          !emailRegex.test(email) ||
          this.passwordInput.length < 8 ||
          this.selectHeaderText === 'How old are you?' ||
          this.repeatPasswordInput.length < 8 ||
          !/[a-zA-Z]/.test(this.passwordInput) ||
          this.passwordInput.trim() !== this.repeatPasswordInput
        ) {
          if (this.nameInput.trim().length < 2) {
            const nameError = form.querySelector('input[name="inputName"]');
            if (!existingErrorMessage) {
              nameError.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">Please enter at least 2 characters</div>'
              );
            }
          }

          if (this.lastNameInput.trim().length < 2) {
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
          if (this.selectHeaderText === 'How old are you?') {
            const selectHeaderText = document.querySelector('.select-header');
            if (!existingErrorMessage) {
              selectHeaderText.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">Please select your age</div>'
              );
            }
          }
          if (!emailRegex.test(email)) {
            if (!existingErrorMessage) {
              emailError.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">Please enter a valid email!</div>'
              );
            }
          }
          if (this.passwordInput.length < 8) {
            const theSamepassword = form.querySelector(
              'input[name="inputPassword"]'
            );
            if (!existingErrorMessage) {
              theSamepassword.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">The password must be at least 8 characters long</div>'
              );
            }
          } else {
            if (this.passwordInput.trim() !== this.repeatPasswordInput) {
              const theSamepassword = form.querySelector(
                'input[name="inputPassword"]'
              );
              if (!existingErrorMessage) {
                theSamepassword.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">your passwords are different</div>'
                );
              }
              return;
            }
            if (!/[a-zA-Z]/.test(this.passwordInput)) {
              const theSamepassword = form.querySelector(
                'input[name="inputPassword"]'
              );
              if (!existingErrorMessage) {
                theSamepassword.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Password must contain at least one letter</div>'
                );
              }
              return;
            }
          }
          if (this.repeatPasswordInput.length < 8) {
            const SamepasswordRepeat = form.querySelector(
              'input[name="inputPasswordRepeat"]'
            );
            if (!existingErrorMessage) {
              SamepasswordRepeat.insertAdjacentHTML(
                'afterend',
                '<div class="error-message">The password must be at least 8 characters long</div>'
              );
            }
          } else {
            if (!/[a-zA-Z]/.test(this.repeatPasswordInput)) {
              const SamepasswordRepeat = form.querySelector(
                'input[name="inputPasswordRepeat"]'
              );
              if (!existingErrorMessage) {
                SamepasswordRepeat.insertAdjacentHTML(
                  'afterend',
                  '<div class="error-message">Password must contain at least one letter</div>'
                );
              }
              return;
            }
          }
          return;
        }
        localStorage.setItem('myProfile', JSON.stringify(this));
        const registerWindow = document.getElementById('registerWindow');
        const headerLine = document.querySelector('header');
        registerWindow.style.display = 'flex';
        headerLine.style.borderBottom = '1.5px solid #A18A68';
        setTimeout(function () {
          registerWindow.style.opacity = '0';
          headerLine.style.borderBottom = '1.5px solid rgb(216, 216, 216)';
        }, 2000);
        setTimeout(function () {
          registerWindow.style.display = 'none';
        }, 2200);
        return true;
      }
    }

    const form = document.querySelector('form[name="FormRegister"]');

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Зупиняємо стандартну подію відправки форми

      const nameInput = form
        .querySelector('input[name="inputName"]')
        .value.trim();
      const lastNameInput = form
        .querySelector('input[name="inputLastName"]')
        .value.trim();
      const emailInput = form
        .querySelector('input[name="EmailAccount"]')
        .value.trim();
      const passwordInput = form
        .querySelector('input[name="inputPassword"]')
        .value.trim();
      const repeatPasswordInput = form
        .querySelector('input[name="inputPasswordRepeat"]')
        .value.trim();
      const selectHeaderText = form
        .querySelector('.select-header')
        .textContent.trim();
      console.log(selectHeaderText);
      const dataCreation = currentDate;

      const user = new User(
        nameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        repeatPasswordInput,
        selectHeaderText,
        dataCreation
      );
      const validationResult = user.register();
      if (validationResult === true) {
        form.reset();

        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach((errorMessage) => errorMessage.remove());
        const register = document.getElementById('registerTab');
        register.classList.remove('_active');
        const singIn = document.getElementById('signInTab');
        singIn.classList.add('_active');

        let signInBlock = document.querySelector('.block-tabs--singIn');
        let registerBlock = document.querySelector('.block-tabs--register');
        signInBlock.style.display = 'block';
        registerBlock.style.display = 'none';
        setTimeout(() => {
          signInBlock.classList.add('opac');
        }, 0.3); // Застосувати зміни через 0.1 секунди (після з'явлення блоку)
        registerBlock.classList.remove('opac'); // Видалення класу 'opac' з неактивного блоку одразу
      }
    });

    // Прибираємо всі повідомлення про помилки при кліку на поде вводу
    form.addEventListener('click', (event) => {
      const clickedElement = event.target;
      if (
        clickedElement.tagName === 'INPUT' ||
        clickedElement.tagName === 'SELECT'
      ) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach((errorMessage) => errorMessage.remove());
      }
    });

    // Вхід в систему
    const loginForm = document.querySelector('form[name="FormSingIn"]');
    const loginElement = document.querySelector('.input--singin');
    const passElement = document.querySelector('.input--pass');

    let invalidLoginAttempts = 0;
    let user;

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const loginEmail = loginElement.value.trim();
      const loginPass = passElement.value.trim();
      const userData = localStorage.getItem('myProfile');
      console.log('userData:', userData);

      function displayErrorMessage(element, message) {
        const existingErrorMessage = loginForm.querySelector('.error-message');
        if (existingErrorMessage) {
          existingErrorMessage.remove();
        }
        element.insertAdjacentHTML(
          'afterend',
          `<div class="error-message">${message}</div>`
        );
      }

      function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      if (
        !loginEmail.trim() ||
        !validateEmail(loginEmail) ||
        loginPass.length < 8
      ) {
        if (!loginEmail.trim()) {
          displayErrorMessage(loginElement, 'Login cannot be empty');
          return;
        }
        if (!validateEmail(loginEmail)) {
          displayErrorMessage(loginElement, 'Login is incorrect');
        }
        if (loginPass.length < 8) {
          displayErrorMessage(
            passElement,
            'The password must be at least 8 characters long'
          );
          return;
        }
        return;
      }

      // Решта вашого коду для перевірки наявності користувача, порівняння пароля, тощо.

      updateAccountLinksVisibility();

      if (validateEmail(loginEmail) && loginPass.length >= 8) {
        // Перевірка наявності користувача та інші операції
        if (userData) {
          user = JSON.parse(userData);
          console.log(' user:', user);

          if (user.passwordInput === loginPass) {
            localStorage.setItem('userSignIn', loginEmail);
            const windwSingIn = document.getElementById('registerWindow');
            const headerLine = document.querySelector('header');
            windwSingIn.innerHTML =
              '<p><img src="./assets/img/Cart_img/svg/checked.svg" alt="cheked">You are sing in!</p>';
            windwSingIn.style.display = 'flex';
            headerLine.style.borderBottom = 'solid 1.5px #A18A68';
            setTimeout(function () {
              windwSingIn.style.opacity = '0';
              headerLine.style.borderBottom = 'solid 1.5px rgb(216, 216, 216)';
            }, 2000);
            setTimeout(function () {
              window.location.href = 'http://localhost:3000/index.html';
            }, 2100);
          } else {
            invalidLoginAttempts++;
            displayErrorMessage(passElement, 'The password is incorrect');
            const errorWindow = document.getElementById('errorWindow');
            const headerLine = document.querySelector('header');
            errorWindow.style.display = 'flex';
            headerLine.style.borderBottom = 'solid 1.5px #D82700';

            if (invalidLoginAttempts == 2) {
              const Atempts = document.querySelector('.window__link');
              Atempts.innerHTML = '1 attempts left';
            } else if (invalidLoginAttempts > 2) {
              const Atempts = document.querySelector('.window__link');
              const errorWindow = document.getElementById('errorWindow');
              const headerLine = document.querySelector('header');

              Atempts.innerHTML = 'no more attempts';
              setTimeout(function () {
                errorWindow.style.opacity = '0';
                headerLine.style.borderBottom =
                  'solid 1.5px rgb(216, 216, 216)';
              });
              setTimeout(function () {
                window.location.href =
                  'http://localhost:3000/reset-password.html'; // Перенаправлення на сторінку відновлення паролю
              }, 1500);
            }
          }
        } else {
          // Логіка для випадку, коли користувача не існує
          displayErrorMessage(loginElement, 'User not found');
        }
      }

      updateAccountLinksVisibility();
    });

    // Функція для перевірки правильності email
    function emailTest(input) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }

    //Функціонал показати пароль
    const allPass = document.querySelectorAll('.input--pass');

    allPass.forEach((passwordField) => {
      const togglePasswordBtn = document.createElement('button');
      togglePasswordBtn.innerHTML = 'Show Password';
      togglePasswordBtn.className = 'togglePasswordBtn';
      passwordField.parentNode.insertBefore(
        togglePasswordBtn,
        passwordField.nextSibling
      );

      passwordField.addEventListener('input', function () {
        if (passwordField.value.trim() !== '') {
          togglePasswordBtn.style.display = 'inline-block';
        } else {
          togglePasswordBtn.style.display = 'none';
        }
      });

      togglePasswordBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          togglePasswordBtn.textContent = 'Hide Password';
        } else {
          passwordField.type = 'password';
          togglePasswordBtn.textContent = 'Show Password';
        }
      });
    });
  });
}
