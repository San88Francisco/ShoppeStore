import { placeOrder } from './PlaceOrder';
import { orderItemViev } from './OrderItemViev';

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/checkout-pages')) {
    // Перевірка, чи є інформація в localStorage про товари в кошику
    const userСartInfo = localStorage.getItem('totalCountCart');
    // Якщо userСartInfo пусто, перенаправлення на error404
    if (+userСartInfo <= 0) {
      window.location.href = 'http://localhost:3000/error404.html';
    }

    const checkboxCreate = document.querySelectorAll(
      '.checkout__checkbox-create div'
    );
    const checkedCreate = document.querySelectorAll(
      '.checkout__checkbox-create input'
    );

    // Логіка checkbox create account and different address
    checkboxCreate.forEach((checked, index) => {
      checked.addEventListener('click', () => {
        checkedCreate[index].checked = !checkedCreate[index].checked;
      });
    });

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

    // Кнопка яка відправляє наші данні в order-confirmation
    const btnPlaceOrder = document.querySelector('.btn__place-order');
    btnPlaceOrder.addEventListener('click', (e) => {
      // Забираємо автооновлення сторінки при кліку
      e.preventDefault();
      placeOrder(paymentMethod);
    });
  }
});
