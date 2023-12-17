document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/cart')) {
    const cartBlockItem = document.querySelector('.cart__block-item');
    let cartAllProduct =
      JSON.parse(localStorage.getItem('allProductCart')) || [];

    loadCartItems(cartAllProduct, cartBlockItem); // Викликаємо функцію при завантаженні сторінки

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
          const test = document.querySelectorAll('.cart__item-title');
          console.log(test[index].textContent);
          console.log(numberOfShoppings[index].textContent);
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
    cartDelete.forEach((btnDelete, index) => {
      const cartBlockItem = document.querySelectorAll('.cart__product');

      btnDelete.addEventListener('click', () => {
        if (confirm) {
          console.log('good');
        }
        const cartItemDelete = cartBlockItem[index];

        const productName =
          cartItemDelete.querySelector('.cart__item-title').textContent;

        const productAmount =
          cartItemDelete.querySelector('.amount').textContent;

        cartItemDelete.innerHTML = '';
        deleteItem(productName, productAmount);
      });
    });

    // Перевіряємо, чи вже є продукт з такою назвою в кошику
    const deleteItem = (cartItemDelete, cartItemAmount) => {
      const totalCount = localStorage.getItem('totalCountCart');
      console.log('  totalCount:', totalCount);
      console.log('cartItemAmount:', cartItemAmount);

      const filterDelete = cartAllProduct.filter(
        (product) => product.name !== cartItemDelete
      );
      const newTotalCount = +totalCount - +cartItemAmount;
      cartAllProduct = filterDelete;

      saveCount(newTotalCount, cartAllProduct);
    };

    const saveCount = (totalCount, allProduct) => {
      document.querySelector('.cart__count').textContent = +totalCount;
      console.log(document.querySelector('.cart__count').textContent);
      console.log(document.querySelector('.cart__count').textContent);
      localStorage.setItem('totalCountCart', totalCount);
      localStorage.setItem('allProductCart', JSON.stringify(allProduct));
    };
  }
});

const loadCartItems = (cartAllProduct, cartBlockItem) => {
  console.log('cartAllProduct:', cartAllProduct);
  cartBlockItem.innerHTML = '';

  cartAllProduct.map((item) => {
    const discount = item.discountPrice || null;

    cartBlockItem.innerHTML += `
    <div class="cart__product">
      <div class="cart__item">
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
