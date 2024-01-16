export const downloadView = () => {
  const orderVievItem = JSON.parse(localStorage.getItem('allOrders')) || [];
  // console.log('orderVievItem:', orderVievItem);

  // Наш основний блок Orders
  const targetOfDownloads = document.querySelector('.targetOf-downloads');

  // Таблиця thead
  const accountDownloadsThead = document.querySelector(
    '.account__downloads-thead'
  );

  // Таблиця tbody
  const accountDownloadsTbody = document.querySelector(
    '.account__downloads-tbody'
  );

  if (orderVievItem.length >= 1) {
    // console.log('Працює 1');
    const html = `
            <tr>
              <td>ORDER NUMBER</td>
              <td>DATE</td>
              <td>STATUS</td>
              <td>TOTAL</td>
              <td>ACTIONS</td>
            </tr>
            `;
    accountDownloadsThead.insertAdjacentHTML('beforeend', html);
  } else {
    // console.log('Працює 2');
    targetOfDownloads.innerHTML = `
            <div class="alert-not-address">
              <p>No downloads available yet.</p>
              <p class="do-sth"><a href="./shop.html">BROWSE PRODUCT</a></p>   
            </div>
          `;
  }

  orderVievItem.forEach((order) => {
    const { orderId, orderInfo, userInfo } = order;
    const html = `
            <tr>
              <td>${orderId}</td>
              <td>${userInfo.date}</td>
              <td>Delivered</td>
              <td>$ ${orderInfo[0].totalPrice}</td>
              <td class="td__action-link">
                <div>
                    <a href="http://localhost:3000/order-confirmation.html" class="link__downloads-viev do-sth">
                        View Order
                     </a>
                     <hr>
                    <a href="http://localhost:3000/order-confirmation.html" class="link__downloads-viev do-sth">
                        Download
                    </a>
                </div>
              </td>
            </tr>
          `;
    accountDownloadsTbody.insertAdjacentHTML('beforeend', html);
  });

  // href="http://localhost:3000/order-confirmation.html"
  const vievOrderLink = document.querySelectorAll('.link__downloads-viev');

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
