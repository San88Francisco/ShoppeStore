import { saveCount } from './SaveCount';

export const updateCartProduct = (cartAllProduct) => {
  const cartBlockItem = document.querySelectorAll('.amountCart');

  // Шукаємо які значення були змінені в масиві з товарами
  cartAllProduct.forEach((item, index) => {
    item.count = cartBlockItem[index].textContent;
  });
  // Шукаємо які значення були змінені в лічильнику загальних товарів
  const totalCount = cartAllProduct.reduce((sum, item) => {
    // Перетворюємо count на числове значення та додаємо до sum
    return sum + parseInt(item.count, 10);
  }, 0);

  saveCount(totalCount, cartAllProduct);
};
