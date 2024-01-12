import { popupOrder } from './PopupOrderWindow';
import { orderInfo } from './OrderInfo';
import { orderItemViev } from '../CheckoutPages/OrderItemViev';

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи на сторінці ми order-confirmation
  if (window.location.pathname.includes('/order-confirmation')) {
    // Перевірка, чи є інформація в localStorage
    const userOrderInfo = localStorage.getItem('userOrderInfo');

    if (!userOrderInfo) {
      // Якщо userOrderInfo пустий, перенаправлення на error404
      window.location.href = 'http://localhost:3000/error404.html';
    }

    const checkPopupOrder = localStorage.getItem('checkoutPopupOrder');
    console.log('checkPopupOrder:', checkPopupOrder);
    // Відображення вспливаючого вікна
    if (checkPopupOrder == '1') {
      console.log(checkPopupOrder);
      popupOrder();
    }
    // Виводить інформацію про данні користувача
    orderInfo();
    //  Відображає зроблене замовлення та ціну
    orderItemViev();

    // Автовидалення checkoutInfo і userOrderInfo, щоб після перезагрузки сторінки, order-confirmation не відображався
    setTimeout(() => {
      localStorage.removeItem('checkoutInfo');
      localStorage.removeItem('userOrderInfo');
      localStorage.setItem('checkoutPopupOrder', 1);
    }, 2000);
  }
});
