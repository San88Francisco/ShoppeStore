document.addEventListener('DOMContentLoaded', function () {
  // Лічильник
const btnDecrease = document.querySelector('.minus');
const btnIncrease = document.querySelector('.plus');
const numberOfShoppings = document.querySelector('.amount');

if (btnDecrease && btnIncrease && numberOfShoppings) {
  btnIncrease.addEventListener('click', function () {
    let numberOfShoppingsValue = +numberOfShoppings.textContent;
    numberOfShoppings.textContent = `${++numberOfShoppingsValue}`;
  });

  btnDecrease.addEventListener('click', function () {
    let numberOfShoppingsValue = +numberOfShoppings.textContent;
    if (numberOfShoppingsValue === 1) return;
    numberOfShoppings.textContent = `${--numberOfShoppingsValue}`;
  });
}

// Вибір картинок
const imageSelection = document.querySelector('.product--overview__pictures');

if (imageSelection) {
  const imageSelectionArray = imageSelection.querySelectorAll('img');
  const progressBarLine = document.querySelector('.progress-bar__line');

  imageSelectionArray.forEach((img, index) => {
    img.addEventListener('click', function () {
      imageSelectionArray.forEach((otherImg) => {
        if (img.classList.contains('picture-big')) return;
        otherImg.style.border = 'none';
      });

      if (img.classList.contains('picture-big')) return;

      img.style.border = '3px solid rgb(158, 158, 158)';
      img.style.borderRadius = '5px';

      let oldImage = document.querySelector('.picture-big');
      if (oldImage) {
        oldImage.src = img.src;
      }

      const percentage = ((index + 1) / (imageSelectionArray.length - 1)) * 100;
      progressBarLine.style.width = `${percentage}%`;
    });
  });
}

// Перемикач іконки серця
const imgElement = document.querySelector('.product__heart');

if (imgElement) {
  let currentImage = './assets/img/Home_img/Body/heart_bg.png';

  imgElement.addEventListener('click', function () {
    console.log('good');
    currentImage =
      currentImage === './assets/img/Home_img/Body/heart_bg.png'
        ? './assets/img/Home_img/Body/red_heart.png'
        : './assets/img/Home_img/Body/heart_bg.png';

    imgElement.src = currentImage;
  });
}
// Перемикач іконки серця
// Перенос на сторінку Продукту


const blocksArr = Array.from(document.querySelectorAll('.shop-latest__block'));
// const blocksArr = JSON.parse(localStorage.getItem('allProduct'))


  blocksArr.forEach((el) => {
    let img = el.querySelector('.shop-latest__img img');
    let productName = el.querySelector('.shop-latest__name a');
    let productPrice = el.querySelector('.shop-latest__price a');
    let heart = el.querySelector('.shop-latest__heart');
    let discount = el.querySelector('.shop-latest__price').outerHTML;
    let discountLink = el.querySelector('.shop-latest__price .discount')
    let productVariant = el.querySelector('.productVariant')
  
    // Add event listener to the image
    img.addEventListener('click', function (e) {
      updateLocalStorageAndLinks(img, productName, productPrice,heart,discount,productVariant) ;
    });
  
    // Add event listener to the name
    productName.addEventListener('click', function (e) {
      updateLocalStorageAndLinks(img, productName, productPrice, heart, discount,productVariant);
    });
  
    // Add event listener to the price
    productPrice.addEventListener('click', function (e) {
      updateLocalStorageAndLinks(img, productName, productPrice, heart, discount,productVariant);
    });
    if (discountLink) {
      discountLink.addEventListener('click', function(e){
      updateLocalStorageAndLinks(img, productName, productPrice, heart, discount,productVariant);
    });
    }
  
  });



//local storage
function updateLocalStorageAndLinks(img, productName, productPrice, heart, discount, productVariant) {
  console.log("productVariant:", productVariant)

  const imgPath = img.src
    .replace('http://localhost:3000', '.')
    .replace('%20', ' ');
  localStorage.setItem('selectedImgPath', imgPath);
  localStorage.setItem('selectedProductName', productName.textContent);
  localStorage.setItem('selectedProductPrice', productPrice.textContent);
  localStorage.setItem('selectedHeart',heart.src);
  localStorage.setItem('selectedDiscount', discount);
  localStorage.setItem('selectVariant', productVariant.textContent);

  let links = [
    img.closest('.shop-latest__block').querySelector('.shop-latest__img a'),
    img.closest('.shop-latest__block').querySelector('.shop-latest__name a'),
    img.closest('.shop-latest__block').querySelector('.shop-latest__price a'),
  ];
  if (img.closest('.shop-latest__block').querySelector('.shop-latest__price .discount')) {
    links.push(img.closest('.shop-latest__block').querySelector('.shop-latest__price .discount'));
  }

  // links.forEach((link) => {
  //   link.href = 'http://localhost:3000/product.html';
  // });

}

// Трансформація сторінки від вибраного продукту в Шоп


// перехід по картинках від Shop до Product 
    
   // Get the stored imgPath, product name, and price from localStorage
   const imgPath = localStorage.getItem('selectedImgPath');
   const productName = localStorage.getItem('selectedProductName');
   const productPrice = localStorage.getItem('selectedProductPrice');
   const heart = localStorage.getItem('selectedHeart');
   const discount = localStorage.getItem('selectedDiscount');
   const productVariant = localStorage.getItem('selectVariant');

   if (imgPath && productName && productPrice) {
      // Оновдення фото
      let imgChange = document.querySelectorAll('.product--overview__pictures img');
      imgChange.forEach((img) => {
         img.src = imgPath;
      });

      // Оновлення назви і ціни
      if(window.location.pathname.includes('/product')){

      
      document.querySelector('.product--overview__view h3').textContent = productName;
      document.querySelector('.product--overview__view .price').textContent = productPrice;
      document.querySelector('.icons--row .product__heart').src = heart;
      document.querySelector('.product--overview__view .price').outerHTML = discount;
      document.querySelector('.productValue').textContent = productVariant;

    }
      // Видалення зі сховку
      // localStorage.removeItem('selectedImgPath');
      // localStorage.removeItem('selectedProductName');
      // localStorage.removeItem('selectedProductPrice');
      // localStorage.removeItem('selectedHeart');
      // localStorage.removeItem('selectedDiscount');
      // localStorage.removeItem('selectVariant');
   }


});



