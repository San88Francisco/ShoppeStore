import { loadCartItems } from './LoadCart';
import { applyCoupon } from './applyCoupon';
import { emptyCartWindow } from './EmptyCart';
import { amountItem } from './AmountItem';
import { saveCount } from './SaveCount';
import { updateCartProduct } from './UpdateCart';

// Функція для підрахунку всієї суми наших товарів
export const CartTotal = () => {
  // Змінна яка в себе приймає товари з сховища
  let cartAllProduct = JSON.parse(localStorage.getItem('allProductCart')) || [];

  const subTotal = document.querySelector('.subtotal__price');
  const totalPriceCart = document.querySelector('.total__price');
  const priceDiscount = document.querySelector('.price__discount');
  const checkoutCoupon = document.querySelector('.checkout__coupon');
  const newTotalPrice = document.querySelector('.new__total-price');

  // Змінна для логіки з coupon (знижка по купону)
  let prevTotalBalance = 0;
  //
  let sumCartDiscount = localStorage.getItem('cartDiscount') || null;
  // Використовуємо forEach для підсумовування вартості кожного товару
  cartAllProduct.forEach((item) => {
    const price = item.discountPrice || item.price;
    const numericPrice = parseFloat(price.replace('$', '').replace(',', '.'));
    const numericAmount = numericPrice * item.count;

    prevTotalBalance = numericAmount + prevTotalBalance;
  });

  // Перевірка, якщо в сховищі знижок пусто, то ми пропускаємо цей код і йдемо до else
  if (sumCartDiscount > 1) {
    checkoutCoupon.style.display = 'flex';
    priceDiscount.textContent = sumCartDiscount;
    subTotal.textContent = prevTotalBalance.toFixed(2);
    // Шукаємо яка буде сума знижки з нашим купоном
    let res = ((prevTotalBalance + 20).toFixed(2) / 100) * sumCartDiscount;
    // Стара ціна, яка буде перекреслена
    totalPriceCart.textContent = '$ ' + (prevTotalBalance + 20).toFixed(2);
    totalPriceCart.classList.add('total__price-discount');
    // Нова ціна
    newTotalPrice.textContent =
      '$ ' + ((prevTotalBalance + 20).toFixed(2) - res).toFixed(2);
  } else {
    subTotal.textContent = prevTotalBalance.toFixed(2);
    totalPriceCart.textContent = '$ ' + (prevTotalBalance + 20).toFixed(2);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/cart')) {
    // Отримуємо дотуп до головного блоку з товарами
    const cartBlockItem = document.querySelector('.cart__block-item');
    let cartAllProduct =
      JSON.parse(localStorage.getItem('allProductCart')) || [];

    // Запускаємо спочатку перевірку чи є щось в кошику, якщо немає відображаємо emptyCartWindow
    emptyCartWindow(cartAllProduct);

    // Перевірка чи не пусте в нас сховище
    if (cartAllProduct.length) {
      loadCartItems(cartAllProduct, cartBlockItem); // Викликаємо функцію при завантаженні сторінки
    }

    // CartTotal, підрахунок ціни товарів
    CartTotal();

    // Додаємо обробник подій для popstate, який викликає функцію при зміні історії браузера (наприклад, при переході між сторінками)
    // Це для того щоб автоматично оновлювався наш лічильник в кошику
    window.addEventListener('popstate', function () {
      loadCartItems(cartAllProduct, cartBlockItem);
    });

    // Запускаємо функцію додавання та віднімання товару в кошику
    amountItem();

    // Логіка з видаленням товару з кошика
    const cartDelete = document.querySelectorAll('.cart__delete');
    const popupDelete = document.querySelector('.popup__cart-delete');
    const btnPopupYes = document.querySelector('.btn__popup-yes');
    const btnPopupNo = document.querySelector('.btn__popup-no');

    // Створюємо змінні в які потім будемо присвоювати відповідні значення
    let productNameToDelete, productAmountToDelete, cartItemDelete;

    // Шукаємо на який хрестик ми нажали, щоб знйти відповідний блок на html сторінці
    cartDelete.forEach((btnDelete, index) => {
      const cartBlockItem = document.querySelectorAll('.cart__product');
      btnDelete.addEventListener('click', () => {
        popupDelete.style.display = 'grid';

        cartItemDelete = cartBlockItem[index];

        productNameToDelete =
          cartItemDelete.querySelector('.cart__item-title').textContent;

        productAmountToDelete =
          cartItemDelete.querySelector('.amount').textContent;

        // Запускаємо функцію з відобразить повідомлення попередження про видалення товару
        popupWindowQuick();
      });
    });

    // Відслідковуємо подію чи користувач нажме Yes(Видалити) чи No (Не видаляти)
    const popupWindowQuick = () => {
      btnPopupYes.addEventListener('click', onBtnPopupYesClick);
      btnPopupNo.addEventListener('click', onBtnPopupNoClick);
    };

    const onBtnPopupYesClick = () => {
      cartItemDelete.innerHTML = '';
      popupDelete.style.display = 'none';
      deleteItem(productNameToDelete, productAmountToDelete);
    };

    const onBtnPopupNoClick = () => {
      popupDelete.style.display = 'none';
    };

    // Якщо користувач нажме будь де на сторінці,окрім вікна з попередженяням видаленн, то вікно закриється
    window.onclick = (e) => {
      if (e.target === popupDelete) {
        popupDelete.style.display = 'none';
      }
    };

    // Перевіряємо, чи вже є продукт з такою назвою в кошику
    const deleteItem = (cartItemDelete, cartItemAmount) => {
      const totalCount = localStorage.getItem('totalCountCart');

      // Шукаємо відповідний товар в сховищу і перезаписуємо його в новий масив
      const filterDelete = cartAllProduct.filter(
        (product) => product.name !== cartItemDelete
      );
      const newTotalCount = +totalCount - +cartItemAmount;

      // Присвоюємо новий масив основному масиву з нашими товарами
      cartAllProduct = filterDelete;

      // Запускаємо функцію з новим масимов та лічильником товарів
      saveCount(newTotalCount, cartAllProduct);
    };

    // Логіка з оновленням товару, якщо ми вирішили збільшити його кількість
    const btnUpdate = document.querySelector('.btn__update-cart');
    btnUpdate.addEventListener('click', () =>
      updateCartProduct(cartAllProduct)
    );

    // Запускаємо функцію з купонами
    applyCoupon();
    //
  }
});
