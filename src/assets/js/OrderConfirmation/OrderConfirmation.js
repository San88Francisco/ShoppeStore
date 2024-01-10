import { popupOrder } from "./PopupOrderWindow";
import { orderInfo } from "./OrderInfo";
import { orderItemViev } from "../CheckoutPages/OrderItemViev";

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/order-confirmation')) {
    popupOrder();
    orderInfo();
    orderItemViev();
    
  }
})









