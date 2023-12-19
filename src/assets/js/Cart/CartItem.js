document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/cart')) {
    const cartBlock = document.querySelector('.cart__container');
    const emptyCart = document.querySelector('.empty__cart');

    const cartBlockItem = document.querySelector('.cart__block-item');
    let cartAllProduct =
      JSON.parse(localStorage.getItem('allProductCart')) || [];

    const emptyCartWindow = () => {
      if (!cartAllProduct.length) {
        // console.log('good');
        cartBlock.style.display = 'none';
        emptyCart.style.display = 'flex';
      } else {
        // console.log('no good');
        emptyCart.style.display = 'none';
        cartBlock.style.display = 'flex';
      }
    };
    emptyCartWindow();

    const loadCartItems = (cartAllProduct, cartBlockItem) => {
      console.log('cartAllProduct:', cartAllProduct);
      cartBlockItem.innerHTML = '';

      cartAllProduct.map((item) => {
        const discount = item.discountPrice || null;

        cartBlockItem.innerHTML += `
          <div class="cart__product">
            <div class="cart__item">
            <a href="./product.html">
              <div class="cart__item-info">
                <div class="cart__item-img">
                  <img src="${item.imgProduct}" alt="" />
                </div>
          
                <div class="cart__item-caption">
                  <h3 class="cart__item-title">${item.name}</h3>
                  <p class="cart__item-subtitle">Black / Medium</p>
                  <p class="cart__item-price">
                    ${
                      discount
                        ? `<span class="cart__price-discount">${item.price}</span>
                    <span class="item__price">${discount}</span>`
                        : `<span
                      class="item__price"
                      >${item.price}</span
                    >`
                    }
                  </p>
                </div>
                </div>
              </a>
      
              <div class="change--amount">
                <button class="minus">-</button>
                <span class="amount">${item.count}</span>
                <button class="plus">+</button>
              </div>
              <img
                class="cart__delete"
                src="./assets/img/Cart_img/svg/delete.svg"
                alt=""
              />
            </div>
            <hr class="cart__underline" />
          </div>
            `;
      });
    };

    loadCartItems(cartAllProduct, cartBlockItem); // Викликаємо функцію при завантаженні сторінки

    // CartTotal

    const CartTotal = (sum) => {
      const subTotal = document.querySelector('.subtotal__price');
      const totalPriceCart = document.querySelector('.total__price');
      // Використовуємо forEach для підсумовування вартості кожного товару
      let subTotalBalance = 0;

      cartAllProduct.forEach((item) => {
        const price = item.discountPrice || item.price;
        const numericPrice = parseFloat(
          price.replace('$', '').replace(',', '.')
        );
        const numericAmount = numericPrice * item.count;

        subTotalBalance = numericAmount + subTotalBalance;
      });

      if (sum) {
        priceDiscount.textContent = sum;
        subTotal.textContent = subTotalBalance.toFixed(2);
        let res = ((subTotalBalance + 20).toFixed(2) / 100) * sum;
        totalPriceCart.textContent = (subTotalBalance + 20).toFixed(2) - res;
      } else {
        subTotal.textContent = subTotalBalance.toFixed(2);
        totalPriceCart.textContent = (subTotalBalance + 20).toFixed(2);
      }
    };
    CartTotal();

    // Додаємо обробник подій для popstate, який викликає функцію при зміні історії браузера (наприклад, при переході між сторінками)
    window.addEventListener('popstate', function () {
      loadCartItems(cartAllProduct, cartBlockItem);
    });

    // Amount вибрана кількість товару, та сама логіка що в addToCart
    const btnDecrease = document.querySelectorAll('.minus');
    const btnIncrease = document.querySelectorAll('.plus');
    const numberOfShoppings = document.querySelectorAll('.amount');

    if (btnDecrease.length && btnIncrease.length && numberOfShoppings.length) {
      btnIncrease.forEach((button, index) => {
        button.addEventListener('click', () => {
          let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
          numberOfShoppings[index].textContent = `${++numberOfShoppingsValue}`;
        });
      });

      btnDecrease.forEach((button, index) => {
        button.addEventListener('click', () => {
          let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
          if (numberOfShoppingsValue === 1) return;
          numberOfShoppings[index].textContent = `${--numberOfShoppingsValue}`;
        });
      });
    }

    const cartDelete = document.querySelectorAll('.cart__delete');
    const popupDelete = document.querySelector('.popup__cart-delete');
    const btnPopupYes = document.querySelector('.btn__popup-yes');
    const btnPopupNo = document.querySelector('.btn__popup-no');

    let productNameToDelete, productAmountToDelete, cartItemDelete;

    cartDelete.forEach((btnDelete, index) => {
      const cartBlockItem = document.querySelectorAll('.cart__product');
      btnDelete.addEventListener('click', () => {
        popupDelete.style.display = 'grid';

        cartItemDelete = cartBlockItem[index];

        productNameToDelete =
          cartItemDelete.querySelector('.cart__item-title').textContent;

        productAmountToDelete =
          cartItemDelete.querySelector('.amount').textContent;

        console.log(productNameToDelete, productAmountToDelete);
        popupWindowQuick();
      });
    });

    const popupWindowQuick = () => {
      btnPopupYes.addEventListener('click', onBtnPopupYesClick);
      btnPopupNo.addEventListener('click', onBtnPopupNoClick);
    };

    function onBtnPopupYesClick() {
      console.log('152', productNameToDelete);
      console.log('153', productAmountToDelete);
      console.log('btnPopupYes');
      cartItemDelete.innerHTML = '';
      popupDelete.style.display = 'none';
      deleteItem(productNameToDelete, productAmountToDelete);
    }

    function onBtnPopupNoClick() {
      console.log('btnPopupNo');
      popupDelete.style.display = 'none';
    }

    window.onclick = (e) => {
      if (e.target === popupDelete) {
        popupDelete.style.display = 'none';
      }
    };

    // Перевіряємо, чи вже є продукт з такою назвою в кошику
    const deleteItem = (cartItemDelete, cartItemAmount) => {
      console.log('cartItemAmount:', cartItemAmount);
      console.log('cartItemDelete:', cartItemDelete);
      const totalCount = localStorage.getItem('totalCountCart');

      const filterDelete = cartAllProduct.filter(
        (product) => product.name !== cartItemDelete
      );
      const newTotalCount = +totalCount - +cartItemAmount;
      cartAllProduct = filterDelete;

      saveCount(newTotalCount, cartAllProduct);
    };

    const saveCount = (totalCount, allProduct) => {
      console.log('  totalCount:', totalCount);
      console.log('  allProduct:', allProduct);
      document.querySelector('.cart__count').textContent = +totalCount;
      localStorage.setItem('totalCountCart', totalCount);
      localStorage.setItem('allProductCart', JSON.stringify(allProduct));
      CartTotal();
      emptyCartWindow();
    };

    const btnUpdate = document.querySelector('.btn__update-cart');

    const updateCartProduct = () => {
      const cartBlockItem = document.querySelectorAll('.amount');

      cartAllProduct.forEach((item, index) => {
        item.count = cartBlockItem[index].textContent;
        // console.log(item.count);
        // console.log(cartBlockItem[index].textContent);
      });
      const totalCount = cartAllProduct.reduce((sum, item) => {
        // Перетворюємо count на числове значення та додаємо до sum
        return sum + parseInt(item.count, 10);
      }, 0);

      saveCount(totalCount, cartAllProduct);
    };

    btnUpdate.addEventListener('click', updateCartProduct);

    const btnCoupon = document.querySelector('.btn__coupon');
    const inputCoupon = document.querySelector('.input__coupon');
    const popupCoupon = document.querySelector('.popup__cart-coupon');
    const couponText = document.querySelector('.popup__coupon-text');
    const priceDiscount = document.querySelector('.price__discount');

    const couponCart = [
      '2024',
      '14 лютого',
      '8 березня',
      'San Francisco',
      'dota',
      'minecraft',
    ];
    const couponAnswer = [
      'Вітаємо, ваша новорічна знижка 20%',
      'Вітаємо, тільки для закоханих знижка 25%',
      'Вітаємо підкаблучнику 😄 Твоя знижа 30%',
      'Ого як далеко тебе занесло, для таких випадків у нас максимальна знижка 90%',
      'Мужик! Вітаємо з дорослішанням :) 50%',
      'Нажаль для дітей в нас немає знижки',
    ];

    const applyCoupon = () => {
      if (inputCoupon.value) {
        console.log('inputCoupon:', inputCoupon.value);

        const res = couponCart.find(
          (item) => item === inputCoupon.value.toLowerCase()
        );
        console.log('applyCoupon  res:', res);

        switch (res) {
          case '2024':
            popupCoupon.style.display = 'grid';
            couponText.textContent = couponAnswer[0];
            CartTotal(20);
            break;
          case '14 лютого':
            popupCoupon.style.display = 'grid';
            couponText.textContent = couponAnswer[1];
            CartTotal(25);
            break;
          case '8 березня':
            popupCoupon.style.display = 'grid';
            couponText.textContent = couponAnswer[2];
            CartTotal(30);
            break;
          case 'San Francisco':
            popupCoupon.style.display = 'grid';
            couponText.textContent = couponAnswer[3];
            CartTotal(90);
            break;
          case 'dota':
            popupCoupon.style.display = 'grid';
            couponText.textContent = couponAnswer[4];
            CartTotal(10);
            break;
          case 'minecraft':
            popupCoupon.style.display = 'grid';
            couponText.textContent = couponAnswer[5];
            break;
          default:
            popupCoupon.style.display = 'grid';
            couponText.textContent = 'No coupon found';
            break;
        }
        inputCoupon.value = '';

        setTimeout(() => {
          console.log('good');
          popupCoupon.style.display = 'none';
        }, 3000);
      }
    };

    window.onclick = (e) => {
      if (e.target === popupCoupon) {
        popupCoupon.style.display = 'none';
      }
    };

    btnCoupon.addEventListener('click', applyCoupon);
    inputCoupon.addEventListener('keydown', (event) => {
      // Перевіряємо, чи клавіша Enter була натиснута
      if (event.key === 'Enter') {
        // Викликаємо функцію applyCoupon
        applyCoupon();
      }
    });
  }
});
