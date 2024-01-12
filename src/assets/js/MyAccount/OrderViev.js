export const orderViev = () => {
  const orderVievItem = JSON.parse(localStorage.getItem('allOrders')) || [];
  // console.log('orderVievItem:', orderVievItem);

  // Наш основний блок Orders
  const targetOfOrders = document.querySelector('.targetOf-orders');

  // Таблиця thead
  const accountOrderThead = document.querySelector('.account__order-thead');

  // Таблиця tbody
  const accountOrderTbody = document.querySelector('.account__order-tbody');

  if (orderVievItem.length >= 1) {
    console.log('Працює 1');
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
  } else {
    console.log('Працює 2');
    targetOfOrders.innerHTML = `
      <div class="alert-not-ofer">
        <p>No order has been made yet.</p>
        <p class="do-sth"><a href="./shop.html">BROWSE PRODUCT</a></p>   
      </div>
    `;
  }

  // console.log('accountOrderTbody:', accountOrderTbody);
  //

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

  // href="http://localhost:3000/order-confirmation.html"
  const vievOrderLink = document.querySelectorAll('.link__order-viev');

  vievOrderLink.forEach((link, index) => {
    link.addEventListener('click', () => {
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
