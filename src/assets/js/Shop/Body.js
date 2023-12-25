const startProduct = (data) => {
  console.log(" data:", data);
  const shopLatestBlocks = document.querySelector('.shop-latest-blocks')
  
  shopLatestBlocks.innerHTML = ""

  data.map(({id, amount, category, categoryName, composition, imageUrl, name, price, priceDiscount, typeProduct, typeClass}) => {

    shopLatestBlocks.innerHTML += `
    <div id="hide" class="shop-latest__block">
      <div class="shop-latest__img">
        <a href="./product.html"><img src="${imageUrl}" alt="" /></a>

        <div class="shop-latest_hover">
            <div class="shop-latest_hover_container">
              <a href="">
                  <p>ADD TO CART</p>
              </a>
              <img class="shop-latest__heart" src="./assets/img/Home_img/Body/heart_bg.png" alt="" />
            </div>
        </div>
        <div class="label-container">
            <div class="${category}">${categoryName}</div>
            <div class="${typeClass}">${typeProduct}</div>
        </div>
      </div>
      <h3 class="shop-latest__name"><a href="#">Lira Earrings</a></h3>
      <h4 class="shop-latest__price">
        <a href="#">$ 20,00</a>
      </h4>
    </div>

    `
  })
}

const fetchData = () => {
  fetch('https://650f314454d18aabfe99ec68.mockapi.io/cart')
    .then(response => {

      return response.json();
    })
    .then(data => {
      // Обробка отриманих даних
      startProduct(data)
      console.log(data);
    })
    
    .catch(error => {
      alert(error.message);
      console.error(error);
    });

    
}

fetchData();


