// Лічильник
const btnDecrease = document.querySelector('.minus');
const btnIncrease = document.querySelector('.plus');
const numberOfShoppings = document.querySelector('.amount');

if (btnDecrease && btnIncrease && numberOfShoppings) {
  let numberOfShoppingsValue = +numberOfShoppings.textContent;

  btnIncrease.addEventListener('click', function () {
    numberOfShoppings.textContent = `${++numberOfShoppingsValue}`;
  });

  btnDecrease.addEventListener('click', function () {
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
    currentImage =
      currentImage === './assets/img/Home_img/Body/heart_bg.png'
        ? './assets/img/Home_img/Body/red_heart.png'
        : './assets/img/Home_img/Body/heart_bg.png';

    imgElement.src = currentImage;
  });
}
// Перемикач іконки серця
// Перенос на сторінку Продукту

const blocksArr = document.querySelectorAll('.shop-latest__block');

blocksArr.forEach((el) => {
  let img = el.querySelector('.shop-latest__img img');
  let productName = el.querySelector('.shop-latest__name a').textContent;
  let productPrice = el.querySelector('.shop-latest__price a').textContent;

  img.addEventListener('click', function (e) {
    const imgPath = img.src
      .replace('http://localhost:3000', '.')
      .replace('%20', ' ');
    localStorage.setItem('selectedImgPath', imgPath);
    localStorage.setItem('selectedProductName', productName);
    localStorage.setItem('selectedProductPrice', productPrice);
    let link = el.querySelector('.shop-latest__img a');
    link.href = 'http://localhost:3000/product.html';
  });
});

// Трансформація сторінки від вибраного продукту в Шоп


// перехід по картинках від Shop до Product 
document.addEventListener('DOMContentLoaded', function () {
   // Get the stored imgPath, product name, and price from localStorage
   const imgPath = localStorage.getItem('selectedImgPath');
   const productName = localStorage.getItem('selectedProductName');
   const productPrice = localStorage.getItem('selectedProductPrice');

   console.log('Stored Image Path:', imgPath);
   console.log('Stored Product Name:', productName);
   console.log('Stored Product Price:', productPrice);

   if (imgPath && productName && productPrice) {
      // Оновдення фото
      let imgChange = document.querySelectorAll('.product--overview__pictures img');
      imgChange.forEach((img) => {
         img.src = imgPath;
      });

      // Оновлення назви і ціни
      document.querySelector('.product--overview__view h3').textContent = productName;
      document.querySelector('.product--overview__view .price').textContent = productPrice;

      // Видалення зі сховку
      localStorage.removeItem('selectedImgPath');
      localStorage.removeItem('selectedProductName');
      localStorage.removeItem('selectedProductPrice');
   }
});