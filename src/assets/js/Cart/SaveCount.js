import { emptyCartWindow } from './EmptyCart';
import { CartTotal } from './CartItem';

export const saveCount = (totalCount, allProduct) => {
  document.querySelector('.cart__count').textContent = +totalCount;
  localStorage.setItem('totalCountCart', totalCount);
  localStorage.setItem('allProductCart', JSON.stringify(allProduct));
  // Робимо редагування ціни товарів
  CartTotal();
  // Запускаємо emptyCartWindow щоб там перевірити чи кошик не пустий, якщо кошик пустий тоді відображаємо emptyCartWindow
  emptyCartWindow(allProduct);
};
