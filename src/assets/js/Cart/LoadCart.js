// Функція яка створює наші

export const loadCartItems = (cartAllProduct, cartBlockItem) => {
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
