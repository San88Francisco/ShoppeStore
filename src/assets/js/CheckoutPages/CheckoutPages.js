import { orderItemViev } from './OrderItemViev';
import { clearOrderCart } from './ClearOrderCart';
import { saveOrder } from './SaveOrder';

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/checkout-pages')) {
    // Перевірка, чи є інформація в localStorage про товари в кошику
    const userСartInfo = localStorage.getItem('totalCountCart');
    // Якщо userСartInfo пусто, перенаправлення на error404
    if (+userСartInfo <= 0) {
      window.location.href = 'http://localhost:3000/error404.html';
    }

 /*    const checkboxCreate = document.querySelectorAll('.checkout__checkbox-create div');
    const checkedCreate = document.querySelectorAll('.checkout__checkbox-create input');
    
    // Логіка checkbox create account and different address
    checkboxCreate.forEach((checked, index) => {
      checked.addEventListener('click', () => {
        if (checkedCreate[index]) {
          checkedCreate[index].checked = !checkedCreate[index].checked;
        }
      });
    }); */
    
    // Логіка відображення наших товарів і ціни в правому блоці checkout-pages !
    orderItemViev();

    // Знаходимо всі наші чекбокси з вибором оплати
    const checkboxPaymentDivs = document.querySelectorAll(
      '.checkout__checkbox-payment div'
    );
    // Всі доступні назви методів оплати
    const nuancesPayment = document.querySelectorAll('.nuances__payment');

    // По замовчуванню в нас завжди перший метод оплати
    let paymentMethod = 'Direct bank transfer';

    // Лоігка з вибором методу оплати
    checkboxPaymentDivs.forEach((div, index) => {
      const radioInput = div.querySelector('input[type="radio"]');

      // Знаходимо який чекбокс ми вибрали
      radioInput.addEventListener('change', () => {
        nuancesPayment.forEach((paymentInfo) => {
          paymentInfo.style.display = 'none';
        });

        switch (index) {
          case 0:
          case 1:
          case 2:
          case 3:
            // Якщо вибраний чекбокс відповідає вибраному index, тоді задаємо цю логіку
            nuancesPayment[index].style.display = 'block';
            paymentMethod = radioInput.value;
            // console.log('paymentMethod:', paymentMethod);
            break;
          default:
            break;
        }
      });
    });

    // Створюємо всі input де в нас будуть значення
    const inputFirstName = document.querySelector('.input__first-name');
    const inputLastName = document.querySelector('.input__last-name');
    const inputCountry = document.querySelector('.input__country');
    const inputStreet = document.querySelector('.input__street-address');
    const inputPostcode = document.querySelector('.input__postcode');
    const inputCity = document.querySelector('.input__city');
    const inputPhone = document.querySelector('.input__phone');
    const inputEmail = document.querySelector('.input__email');
    const inputOrderNotes = document.querySelector('.input__order-notes').value;

    const userAddressInfo =
      JSON.parse(localStorage.getItem('userAddressInfo')) || false;
    console.log('placeOrder  userAddressInfo:', userAddressInfo);

    if (userAddressInfo) {
      inputFirstName.value = userAddressInfo.name;
      inputLastName.value = userAddressInfo.lastName;
      inputCountry.value = userAddressInfo.country;
      inputStreet.value = userAddressInfo.street;
      inputPostcode.value = userAddressInfo.postcode;
      inputCity.value = userAddressInfo.city;
      inputPhone.value = userAddressInfo.phone;
      inputEmail.value = userAddressInfo.email;
    }

    // Кнопка яка відправляє наші данні в order-confirmation
    const btnPlaceOrder = document.querySelector('.btn__place-order');
    btnPlaceOrder.addEventListener('click', (e) => {
      // Забираємо автооновлення сторінки при кліку
      e.preventDefault();
      placeOrder(paymentMethod);
    });

    const placeOrder = () => {
      //Перевірка на індекс
      function isValidPostalCode(postalCode) {
        // Встановлюємо шаблон поштового індексу для формату "00-000"
        let postalCodePattern = /^(\d{5}|\d{2}-\d{3})$/;

        // Перевірка, чи введений поштовий індекс відповідає шаблону
        return postalCodePattern.test(postalCode);
      }

      // Перевірка на номер телефону
      function isValidPhoneNumber(phoneNumber) {
        // Встановлюємо шаблон для номеру телефону у форматі "+код країни-номер телефону 1 знак та 10 цифр"
        let phonePattern = /^(\+\d{11}|\d{9})$/;

        // Перевірка, чи введений номер телефону відповідає шаблону
        return phonePattern.test(phoneNumber);
      }

      const date = new Date();
      const currentDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const numberOrder = () => {
        const randomNumber = Math.floor(Math.random() * 10000000);
        const paddedNumber = randomNumber.toString().padStart(7, '0');
        console.log("numberOrder paddedNumber:", paddedNumber)
        return paddedNumber;
      }
      const orderNumber = numberOrder();

      // Створюємо обєкт з нашими данними
      const blockData = {
        name: inputFirstName.value,
        lastName: inputLastName.value,
        country: inputCountry.value,
        city: inputCity.value,
        street: inputStreet.value,
        postcode: inputPostcode.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        orderNotes: inputOrderNotes.value,
        paymentMethod: paymentMethod,
        date: currentDate,
        orderNumber: orderNumber,
      };
      console.log(blockData);

      function displayErrorCheckout() {
        const latinLettersRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valueStreet = inputStreet.value;
        console.log('valueStreet:', valueStreet);

        console.log('displayErrorCheckout  valueStreet:', valueStreet);

        if (
          !latinLettersRegex.test(inputFirstName.value) ||
          !latinLettersRegex.test(inputLastName.value) ||
          !latinLettersRegex.test(inputCountry.value) ||
          !latinLettersRegex.test(inputCity.value) ||
          valueStreet.length < 3 ||
          !isValidPostalCode(inputPostcode.value) ||
          !isValidPhoneNumber(inputPhone.value) ||
          !emailRegex.test(inputEmail.value)
        ) {
          if (!latinLettersRegex.test(inputFirstName.value)) {
            const errorName = document.querySelector('.order__error-name');
            errorName.style.opacity = '1';
          }
          if (!latinLettersRegex.test(inputLastName.value)) {
            const errorNameLast = document.querySelector(
              '.order__error-lastName'
            );
            errorNameLast.style.opacity = '1';
          }
          if (!latinLettersRegex.test(inputCountry.value)) {
            const errorCountry = document.querySelector(
              '.order__error-country'
            );
            errorCountry.style.opacity = '1';
          }
          if (!latinLettersRegex.test(inputCity.value)) {
            const errorAddress = document.querySelector('.order__error-city');
            errorAddress.style.opacity = '1';
          }
          if (valueStreet.length < 3) {
            const errorStreet = document.querySelector('.order__error-address');
            errorStreet.style.opacity = '1';
          }
          if (!isValidPostalCode(inputPostcode.value)) {
            const errorZip = document.querySelector('.order__error-zip');
            errorZip.style.opacity = '1';
          }
          if (!isValidPhoneNumber(inputPhone.value)) {
            const errorPhone = document.querySelector('.order__error-phone');
            errorPhone.style.opacity = '1';
          }
          if (!emailRegex.test(inputEmail.value)) {
            const errorEmail = document.querySelector('.order__error-email');
            errorEmail.style.opacity = '1';
          }
        } else {
          window.location.href =
            '/order-confirmation.html';
          // Зберігаємо інофрмацію клієнта в userOrderInfo
          localStorage.setItem('userAddressInfo', JSON.stringify(blockData));
          console.log('saveOrder');
          // Функція запису замовлень
          saveOrder();
          // Функція очистки кошику !
          clearOrderCart();
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
  }
});
