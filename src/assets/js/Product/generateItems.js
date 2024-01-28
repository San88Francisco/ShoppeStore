import { fetchData } from '../API/fetch-products';
import { LinkAddToCart } from '../Home/LinkAddToCart';
import { discount } from '../Shop/Discount';

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('/product')) {
    const itemsPerPage = 3;

    const renderPage = (pageItems) => {
      const shopLatestBlocks = document.querySelector('.product-latest-blocks');
      shopLatestBlocks.innerHTML = '';

      pageItems.forEach(
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
                <a>
                  <p>ADD TO CART</p>
                </a>
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
      </div>`;
        }
      );
      discount();
    };

    const renderProducts = async () => {
      const item = JSON.parse(localStorage.getItem('allProduct'));
      const contents = item ? item : await fetchData();

      if (contents) {

        const shuffledContents = contents.sort(() => Math.random() - 0.5);
        const pageItems = shuffledContents.slice(0, itemsPerPage);

        renderPage(pageItems);
        LinkAddToCart(pageItems);
      }
    };

    renderProducts();
  }
});
