// Функція для відображення картинки з пустим кошиком, якщо в нас не вибрані ще товари
export const emptyCartWindow = (cartAllProduct) => {
  const cartBlock = document.querySelector('.cart__container');
  const emptyCart = document.querySelector('.empty__cart');

  if (!cartAllProduct.length) {
    localStorage.setItem('cartDiscount', null);
    cartBlock.style.display = 'none';
    emptyCart.style.display = 'flex';
  } else {
    emptyCart.style.display = 'none';
    cartBlock.style.display = 'flex';
  }
};
