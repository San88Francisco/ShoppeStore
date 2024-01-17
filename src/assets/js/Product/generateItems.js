import { fetchData } from "../API/fetch-products";
import { discount } from "../Shop/Discount";
  
document.addEventListener('DOMContentLoaded',()=> {
  if(window.location.pathname.includes('/product')){
    const shopLatestBlocks = document.querySelector(".shop-latest-blocks");
    const BASE_URL = "../../../assets/img/Home_img/Body/heart_bg.png";
    const ACTIVE_HEART_URL = "../../../assets/img/Home_img/Body/red_heart.png";

    shopLatestBlocks &&
      shopLatestBlocks.addEventListener("click", (e) => {
        const targetHeart = e.target.closest(".shop-latest__heart");
      
        if (targetHeart) {
          targetHeart.id = targetHeart.id === "default" ? "active" : "default";
          targetHeart.src =
            targetHeart.id === "default" ? BASE_URL : ACTIVE_HEART_URL;
        }
      });
    
    const itemsPerPage = 3;
    let currentPage = 1;
    
    const renderPage = (page, contents) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
    
      const pageItems = contents.slice(startIndex, endIndex);
      const shopLatestBlocks = document.querySelector(".product-latest-blocks");
      shopLatestBlocks.innerHTML = "";
    
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
                <a href="">
                    <p>ADD TO CART</p>
                </a>
                <img src=${BASE_URL} class="shop-latest__heart" id="default"/>
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
      const item = JSON.parse(localStorage.getItem("allProduct"));
      const contents = item ? item : await fetchData();
      if (contents) {
        renderPage(currentPage, contents);
      }
    }

    renderProducts();
  }
})