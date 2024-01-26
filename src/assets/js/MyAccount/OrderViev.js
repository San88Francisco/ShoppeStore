export const orderViev = () => {
  const orderVievItem = JSON.parse(localStorage.getItem('allOrders')) || [];

  let isHandleResizeOrderEnabled = true;

  const orderLink = (link) => {
    const vievOrderLink = document.querySelectorAll(`${link}`);

    vievOrderLink.forEach((link, index) => {
      link.addEventListener('click', () => {
        console.log(link);
        const info = orderVievItem[index].orderInfo;
        const item = orderVievItem[index].orderItem;
        const checkoutInfo = {
          item: item,
          info: info,
        };

        localStorage.setItem(
          'userOrderInfo',
          JSON.stringify(orderVievItem[index].userInfo)
        );
        localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));
        localStorage.setItem('checkoutPopupOrder', 0);
      });
    });
  };

  // Наш основний блок Orders
  const targetOfOrders = document.querySelector('.targetOf-orders');

  // Таблиця thead
  const accountOrderThead = document.querySelector('.account__order-thead');

  // Таблиця tbody
  const accountOrderTbody = document.querySelector('.account__order-tbody');

  if (orderVievItem.length >= 1) {
    const html = `
      <tr>
        <td>ORDER NUMBER</td>
        <td>DATE</td>
        <td>STATUS</td>
        <td>TOTAL</td>
        <td>ACTIONS</td>
      </tr>
      `;
    accountOrderThead.insertAdjacentHTML('beforeend', html);
    orderLink('.link__order-viev');
  } else {
    targetOfOrders.innerHTML = `
      <div class="alert-not-ofer">
        <p>No order has been made yet.</p>
        <p class="do-sth"><a href="./shop.html">BROWSE PRODUCT</a></p>   
      </div>
    `;
    isHandleResizeOrderEnabled = false;
  }

  orderVievItem.forEach((order) => {
    const { orderId, orderInfo, userInfo } = order;
    const html = `
      <tr>
        <td>${orderId}</td>
        <td>${userInfo.date}</td>
        <td>Delivered</td>
        <td>$ ${orderInfo[0].totalPrice}</td>
        <td>
          <a href="http://localhost:3000/order-confirmation.html" class="link__order-viev do-sth">
            View Order
          </a>
        </td>
      </tr>
    `;
    accountOrderTbody.insertAdjacentHTML('beforeend', html);
  });

  function handleResizeOrder() {
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;

    if (screenWidth <= 600 && isHandleResizeOrderEnabled) {
      const showMobileDownloads = document.querySelector('.order__mobile');
      showMobileDownloads.innerHTML = '';

      orderVievItem.forEach((order) => {
        const { orderId, orderInfo, userInfo } = order;
        showMobileDownloads.innerHTML += `
        <div class="mobile__order-item">
          <ul class="mobile__title">
            <li class="mobile__title-text">ORDER NUMBER</li>
            <li class="mobile__title-text">DATE</li>
            <li class="mobile__title-text">STATUS</li>
            <li class="mobile__title-text">TOTAL</li>
            <li class="mobile__title-text">ACTIONS</li>
          </ul>
          <ul class="mobile__value">
            <li class="mobile__value-text">${orderId}</li>
            <li class="mobile__value-text">${userInfo.date}</li>
            <li class="mobile__value-text">Delivered</li>
            <li class="mobile__value-text">${orderInfo[0].totalPrice}</li>
            <li class="mobile__value-text">
              <a href="http://localhost:3000/order-confirmation.html" class="link__order-mobile do-sth">
                View Order
              </a>
            </li>
          </ul>
        </div>
        `;
      });

      orderLink('.link__order-mobile');
    } else {
      orderLink('.link__order-viev');
    }
  }

  // Викликаємо функцію при завантаженні сторінки та при зміні розміру вікна
  window.addEventListener('load', handleResizeOrder);
  window.addEventListener('resize', handleResizeOrder);

  // href="http://localhost:3000/order-confirmation.html"
};
