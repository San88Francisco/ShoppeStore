//ShopHeart
export const heartLogic = () => {
  const blocks = document.querySelectorAll(".shop-latest__block");

  blocks.forEach(function (block) {
    const imgElement = block.querySelector(".shop-latest__heart");

    let currentImage = "./assets/img/Home_img/Body/heart_bg.png";

    imgElement.addEventListener("click", function () {
      currentImage === "./assets/img/Home_img/Body/heart_bg.png"
        ? (currentImage = "./assets/img/Home_img/Body/red_heart.png")
        : (currentImage = "./assets/img/Home_img/Body/heart_bg.png");

      imgElement.src = currentImage;
    });
  });
}

heartLogic();

// Функція яка бере наші данні з бек-енду
const fetchData = async () => {
  try {
        const response = await fetch('https://650f314454d18aabfe99ec68.mockapi.io/cart');
        // Обробка отриманих даних
        const data = await response.json();
        // Записуємо данні в локальне сховище
        localStorage.setItem('allProduct', JSON.stringify(data));
        
        return data;
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

fetchData()


export const loadProductsHome = () => {
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
}

// Запускаємо функцію із товаром що сподобався (сердечко)
heartLogic();