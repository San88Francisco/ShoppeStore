// Функція для відображення картинки з пустим кошиком, якщо в нас не вибрані ще товари
export const emptyCartWindow = (cartAllProduct) => {
  const cartBlock = document.querySelector('.cart__container');
  const emptyCart = document.querySelector('.empty__cart');

  console.log('emptyCartWindow  cartAllProduct:', cartAllProduct);

  if (!cartAllProduct.length) {
    // console.log('good');
    localStorage.setItem('cartDiscount', null);
    cartBlock.style.display = 'none';
    emptyCart.style.display = 'flex';
  } else {
    // console.log('no good');
    emptyCart.style.display = 'none';
    cartBlock.style.display = 'flex';
  }
};
