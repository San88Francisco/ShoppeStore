if (window.location.pathname.includes("/account")) {
   document.addEventListener("DOMContentLoaded", async function () {
      // Отримуємо посилання на потрібні елементи DOM
      const signInTab = document.getElementById("signInTab");
      const registerTab = document.getElementById("registerTab");
      const signInBlock = document.querySelector(".block-tabs--singIn");
      const registerBlock = document.querySelector(".block-tabs--register");

      // Функція для зміни активної вкладки та відображення блоків
      async function switchTabs(
         activeTab,
         inactiveTab,
         activeBlock,
         inactiveBlock
      ) {
         activeTab.classList.add("_active");
         inactiveTab.classList.remove("_active");
         activeBlock.style.display = "block";
         inactiveBlock.style.display = "none";

         await new Promise((resolve) => setTimeout(resolve, 500));

         activeBlock.classList.add("opac");
         inactiveBlock.classList.remove("opac"); // Видалення класу 'opac' з неактивного блоку одразу
      }

      // Додаємо клас '_active' до елемента по замовчуванню

      // При кліку на вкладку "Sign in"
      signInTab.addEventListener("click", async function (event) {
         event.preventDefault(); // Запобігаємо стандартному переходу за посиланням
         await switchTabs(signInTab, registerTab, signInBlock, registerBlock);
      });

      // При кліку на вкладку "Register"
      registerTab.addEventListener("click", async function (event) {
         event.preventDefault(); // Запобігаємо стандартному переходу за посиланням
         await switchTabs(registerTab, signInTab, registerBlock, signInBlock);
      });

      //первірка на правильність введення емаіл
      const forms = document.querySelectorAll(".block-tabs__form");

      forms.forEach(function (form) {
         const emailInput = form.querySelector('input[name="EmailAccount"]');
         const errorMessage = document.createElement("div");
         errorMessage.classList.add("error-message");
         errorMessage.style.display = "none";

         form.addEventListener("submit", function (event) {
            const email = emailInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
               displayError(emailInput, "Please enter a valid email!");
               event.preventDefault();
            } else {
               hideError();
            }
         });

         emailInput.addEventListener("focus", function () {
            hideError();
         });

         function displayError(element, message) {
            errorMessage.textContent = message;
            element.parentNode.appendChild(errorMessage);
            errorMessage.style.display = "block";
         }

         function hideError() {
            errorMessage.style.display = "none";
         }
      });

      // кнопка reset в полях вводу
      const inputFields = document.querySelectorAll(".form__input");
      const inputButtons = document.querySelectorAll(".form__button");
      const submitButton = document.querySelector(".block-tabs__button");

      inputFields.forEach((inputField, index) => {
         inputField.addEventListener("input", function () {
            if (this.value.trim() !== "") {
               inputButtons[index].style.display = "block";
            } else {
               inputButtons[index].style.display = "none";
            }
         });

         inputButtons[index].addEventListener("click", function (event) {
            event.preventDefault();
            inputFields[index].value = "";
            inputButtons[index].style.display = "none";
            let togglePasswordBtn = document.querySelectorAll(".togglePasswordBtn");
            togglePasswordBtn.forEach((item) => {
               item.style.display = "none";
            });
         });
      });

      submitButton.addEventListener("click", function () {
         inputButtons.forEach((button) => {
            button.style.display = "none";
         });
      });

      const selectHeader = document.querySelector(".select-header");
      const selectOptions = document.querySelector(".select-options");

      selectHeader.addEventListener("click", function () {
         selectOptions.style.display =
            selectOptions.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", function (event) {
         if (!selectHeader.contains(event.target)) {
            selectOptions.style.display = "none";
         }
      });

      const selectItems = document.querySelectorAll(".select-options li");

      selectItems.forEach((item) => {
         item.addEventListener("click", function () {
            selectHeader.textContent = this.textContent;
            selectOptions.style.display = "none";
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
            selectHeaderText
         ) {
            this.nameInput = nameInput;
            this.lastNameInput = lastNameInput;
            this.emailInput = emailInput;
            this.passwordInput = passwordInput;
            this.repeatPasswordInput = repeatPasswordInput;
            this.selectHeaderText = selectHeaderText;
         }
         register() {
            if (this.nameInput.trim().length < 2) {
               const nameError = form.querySelector('input[name="inputName"]');
               nameError.insertAdjacentHTML(
                  "afterend",
                  '<div class="error-message">Please enter at least 2 characters</div>'
               );
               return;
            }

            if (this.lastNameInput.trim().length < 2) {
               const lastNameError = form.querySelector(
                  'input[name="inputLastName"]'
               );
               lastNameError.insertAdjacentHTML(
                  "afterend",
                  '<div class="error-message">Please enter at least 2 characters</div>'
               );
               return;
            }
            if (this.passwordInput.trim() !== this.repeatPasswordInput) {
               const theSamepassword = form.querySelector(
                  'input[name="inputPassword"]'
               );
               theSamepassword.insertAdjacentHTML(
                  "afterend",
                  '<div class="error-message">your passwords are different</div>'
               );
               return;
            }
            if (this.passwordInput.length < 8) {
               const theSamepassword = form.querySelector(
                  'input[name="inputPassword"]'
               );
               theSamepassword.insertAdjacentHTML(
                  "afterend",
                  '<div class="error-message">The password must be at least 8 characters long</div>'
               );
               return;
            }
            if (!/[a-zA-Z]/.test(this.passwordInput)) {
               const theSamepassword = form.querySelector(
                  'input[name="inputPassword"]'
               );
               theSamepassword.insertAdjacentHTML(
                  "afterend",
                  '<div class="error-message">Password must contain at least one letter</div>'
               );
               return;
            }
            if (this.selectHeaderText === "how old are you?") {
               const selectHeaderText = document.querySelector(".select-header");
               selectHeaderText.insertAdjacentHTML(
                  "afterend",
                  '<div class="error-message">Please select your age</div>'
               );
               return;
            }
            console.log(this);
            localStorage.setItem(this.emailInput, JSON.stringify(this));
            alert(`Successful registration`);
            return true;
         }
      }

      const form = document.querySelector('form[name="FormRegister"]');

      form.addEventListener("submit", (event) => {
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
         const selectHeaderText = document
            .querySelector(".select-header")
            .textContent.trim();

         const user = new User(
            nameInput,
            lastNameInput,
            emailInput,
            passwordInput,
            repeatPasswordInput,
            selectHeaderText
         );
         const validationResult = user.register();
         if (validationResult === true) {
            form.reset();

            const errorMessages = form.querySelectorAll(".error-message");
            errorMessages.forEach((errorMessage) => errorMessage.remove());
            const register = document.getElementById("registerTab");
            register.classList.remove("_active");
            const singIn = document.getElementById("signInTab");
            singIn.classList.add("_active");

            let signInBlock = document.querySelector(".block-tabs--singIn");
            let registerBlock = document.querySelector(".block-tabs--register");
            signInBlock.style.display = "block";
            registerBlock.style.display = "none";
            setTimeout(() => {
               signInBlock.classList.add("opac");
            }, 0.3); // Застосувати зміни через 0.1 секунди (після з'явлення блоку)
            registerBlock.classList.remove("opac"); // Видалення класу 'opac' з неактивного блоку одразу
         }
      });

      // Прибираємо всі повідомлення про помилки при кліку на поде вводу
      form.addEventListener("click", (event) => {
         const clickedElement = event.target;
         if (
            clickedElement.tagName === "INPUT" ||
            clickedElement.tagName === "SELECT"
         ) {
            const errorMessages = form.querySelectorAll(".error-message");
            errorMessages.forEach((errorMessage) => errorMessage.remove());
         }
      });

      //вхід в систему
      const loginForm = document.querySelector('form[name="FormSingIn"]');

      let invalidLoginAttempts = 0;

      loginForm.addEventListener("submit", (event) => {
         event.preventDefault();

         const loginEmail = document.querySelector(".input--singin").value.trim();
         const loginPass = document.querySelector(".input--pass").value.trim();
         const userData = localStorage.getItem(loginEmail);

         if (userData) {
            const user = JSON.parse(userData);
            console.log("✌️user --->", user);

            if (user.passwordInput === loginPass) {
               alert("You are signed in");
               window.location.href = "http://localhost:3000/index.html";
            }
         } else {
            invalidLoginAttempts++;

            if (invalidLoginAttempts >= 3) {
               window.location.href = 'http://localhost:3000/reset-password.html'; // Перенаправлення на сторінку відновлення паролю
            } else {
               let loginElement = document.querySelector('.input--singin');
               if (!emailTest(loginElement)) {
                  loginElement.insertAdjacentHTML('afterend', '<div class="error-message">Password or login is incorrect</div>');
               }
            }

         }

         function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
               input.value
            );
         }
      });

      //Функціонал показати пароль
      const allPass = document.querySelectorAll(".input--pass");

      allPass.forEach((passwordField) => {
         const togglePasswordBtn = document.createElement("button");
         togglePasswordBtn.innerHTML = "Show Password";
         togglePasswordBtn.className = "togglePasswordBtn";
         passwordField.parentNode.insertBefore(
            togglePasswordBtn,
            passwordField.nextSibling
         );

         passwordField.addEventListener("input", function () {
            if (passwordField.value.trim() !== "") {
               togglePasswordBtn.style.display = "inline-block";
            } else {
               togglePasswordBtn.style.display = "none";
            }
         });

         togglePasswordBtn.addEventListener("click", function (event) {
            event.preventDefault();
            if (passwordField.type === "password") {
               passwordField.type = "text";
               togglePasswordBtn.textContent = "Hide Password";
            } else {
               passwordField.type = "password";
               togglePasswordBtn.textContent = "Show Password";
            }
         });
      });
   });
}
