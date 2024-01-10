export const saveOrder = () => {
  // Якщо вже маємо замовлення, тоді беремо їх, якщо замовлень немає, створюємо пустий масив
  const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

  // Беремо інформацію користувача, записували її в placeOrder
  const userInfo = JSON.parse(localStorage.getItem('userOrderInfo'));

  // Через деструктуризацію виймаємо наш checkoutInfo. Ці значення ми записуємо в CartItem
  const { info, item } = JSON.parse(localStorage.getItem('checkoutInfo'));

  // Створюємо змінну яка буде слугувати нам задавання ID (номер) замовлення
  const orderNumber = allOrders.length;

  const blockOrder = {
    orderId: orderNumber,
    userInfo: userInfo,
    orderInfo: info,
    orderItem: item,
  };

  // Пушимо наше замовлення в allOrders та записуємо його
  allOrders.push(blockOrder);
  localStorage.setItem('allOrders', JSON.stringify(allOrders));
};
