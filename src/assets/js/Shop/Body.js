import { discount } from './Discount';
import { heartLogic } from '../Home/Body';

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/shop')) {
    const item = JSON.parse(localStorage.getItem('allProduct'));

    const shopLatestBlocks = document.querySelector('.shop-latest-blocks');

    // Запускаємо map з масивом обєктів наших товарів та відображаємо весь товар
    // В середені map через деструктуризацію виймаємо всі ключі з нашого обєкту item
    item.map(
      ({
        category,
        categoryClass,
        typeProduct,
        typeClass,
        imageUrl,
        name,
        price,
        productVariant,
      }) => {
        shopLatestBlocks.innerHTML += `
        <div id="hide" class="shop-latest__block">
          <div class="shop-latest__img">
            <a href="./product.html"><img src="${imageUrl}" alt="" /></a>
            <p class="productVariant">${productVariant}</p>
            <div class="shop-latest_hover">
                <div class="shop-latest_hover_container">
                  <a href="">
                      <p>ADD TO CART</p>
                  </a>
                  <img class="shop-latest__heart" src="./assets/img/Home_img/Body/heart_bg.png" alt="" />
                </div>
            </div>
            <div class="label-container">
                <div class="${categoryClass} category">${category}</div>
                <div class="${typeClass} category">${typeProduct}</div>
            </div>
          </div>
          <h3 class="shop-latest__name"><a href="#">${name}</a></h3>
          <h4 class="shop-latest__price">
            <a href="#">$ ${price},00</a>
          </h4>
        </div>
    
        `;
      }
    );

    // Запускаємо функцію із знижкою
    discount();
    // Запускаємо функцію із товаром що сподобався (сердечко)
    heartLogic();
  }
});
