import { popupOrder } from "./PopupOrderWindow";
import { orderInfo } from "./OrderInfo";
import { orderItemViev } from "../CheckoutPages/OrderItemViev";

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/order-confirmation')) {
     // Перевірка, чи є інформація в localStorage
     const userOrderInfo = localStorage.getItem('userOrderInfo');
     console.log("userOrderInfo:", userOrderInfo)
  
     if (!userOrderInfo) {
       // Якщо немає інформації, перенаправлення на іншу сторінку або виведення повідомлення
       window.location.href = 'http://localhost:3000/error404.html'; // Замініть шлях на той, який вам потрібен
     }



    popupOrder();
    orderInfo();
    orderItemViev();
    

    setTimeout(() => {
      localStorage.removeItem('checkoutInfo');
      localStorage.removeItem('userOrderInfo');
    }, 2000);

  }
})









