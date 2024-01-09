export const saveOrder = () => {
  const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
  const userInfo = JSON.parse(localStorage.getItem('userOrderInfo'));
  const { info, item } = JSON.parse(localStorage.getItem('checkoutInfo'));
  const orderNumber = allOrders.length;

  const blockOrder = {
    orderId: orderNumber,
    userInfo: userInfo,
    orderInfo: info,
    orderItem: item,
  };

  //   console.log(' blockOrder:', blockOrder);
  allOrders.push(blockOrder);
  localStorage.setItem('allOrders', JSON.stringify(allOrders));
  //   console.log(orderNumber);
  //   console.log(' allOrders:', allOrders);
};
