export const downloadView = () => {
  const orderVievItem = JSON.parse(localStorage.getItem('allOrders')) || [];

  let isHandleResizeEnabled = true;

  const orderLinkDownloads = (link) => {
    const vievOrderLink = document.querySelectorAll(`${link}`);

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
    orderLinkDownloads('.link__downloads-viev');
  } else {
    targetOfDownloads.innerHTML = `
      <div class="alert-not-address">
        <p>No downloads available yet.</p>
        <p class="do-sth"><a href="./shop.html">BROWSE PRODUCT</a></p>
      </div>
    `;
    isHandleResizeEnabled = false;
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
                    <a href="#" class="do-sth">
                        Download
                    </a>
                </div>
              </td>
            </tr>
          `;
    accountDownloadsTbody.insertAdjacentHTML('beforeend', html);
  });

  function handleResize() {
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;

    if (screenWidth < 600 && isHandleResizeEnabled) {
      const showMobileDownloads = document.querySelector('.downloads__mobile');
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
          <li class="mobile__value-link">
            <a href="http://localhost:3000/order-confirmation.html" class="link__downloads-mobile do-sth">
              View Order
            </a>
  
            <hr>
  
            <a href="#" class="do-sth">
              Download
            </a>
          </li>
        </ul>
      </div>
        `;
      });

      orderLinkDownloads('.link__downloads-mobile');
    } else {
      orderLinkDownloads('.link__downloads-viev');
    }
  }

  // Викликаємо функцію при завантаженні сторінки та при зміні розміру вікна
  window.addEventListener('load', handleResize);
  window.addEventListener('resize', handleResize);

  // href="http://localhost:3000/order-confirmation.html"
};
