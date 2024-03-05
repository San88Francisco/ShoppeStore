// Функція яка відображає наші товари
import renderBlackThem from '../Home/Body';
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
              <button class="minus minus__cart">-</button>
             
              <span class="amountCart">${item.count}</span>
              
              <div class="change--amount change--amount_tel">
                <button class=" plus_tel">
                <img src="./assets/img/Cart_img/svg/arrow_tel.svg" alt="">
                </button>
                <button class=" minus_tel">
                <img src="./assets/img/Cart_img/svg/arrow_tel.svg" alt="">
                </button>
                
              </div>

              <button class="plus plus__cart">+</button>
            </div>
            <img
              class="cart__delete light-them"
              data-dark-src="./assets/img/dark-them/x-dark-them.svg"
              data-light-src="./assets/img/Cart_img/svg/delete.svg"
              src="./assets/img/Cart_img/svg/delete.svg"
              alt=""
            />
          </div>
          <hr class="cart__underline" />
        </div>
          `;
  });
  renderBlackThem();
};
