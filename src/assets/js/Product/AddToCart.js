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
  let productName = el.querySelector('.shop-latest__name a');
  let productPrice = el.querySelector('.shop-latest__price a');
  let heart = el.querySelector('.shop-latest__heart');
  let discount = el.querySelector('.shop-latest__price').outerHTML;
  let discountLink = el.querySelector('.shop-latest__price .discount');

  // Add event listener to the image
  img.addEventListener('click', function (e) {
    updateLocalStorageAndLinks(img, productName, productPrice, heart, discount);
  });

  // Add event listener to the name
  productName.addEventListener('click', function (e) {
    updateLocalStorageAndLinks(img, productName, productPrice, heart, discount);
  });

  // Add event listener to the price
  productPrice.addEventListener('click', function (e) {
    updateLocalStorageAndLinks(img, productName, productPrice, heart, discount);
  });
  if (discountLink) {
    discountLink.addEventListener('click', function (e) {
      updateLocalStorageAndLinks(
        img,
        productName,
        productPrice,
        heart,
        discount
      );
    });
  }
});

//local storage
//llala
function updateLocalStorageAndLinks(
  img,
  productName,
  productPrice,
  heart,
  discount
) {
  const imgPath = img.src
    .replace('http://localhost:3000', '.')
    .replace('%20', ' ');
  localStorage.setItem('selectedImgPath', imgPath);
  localStorage.setItem('selectedProductName', productName.textContent);
  localStorage.setItem('selectedProductPrice', productPrice.textContent);
  localStorage.setItem('selectedHeart', heart.src);
  localStorage.setItem('selectedDiscount', discount);

  let links = [
    img.closest('.shop-latest__block').querySelector('.shop-latest__img a'),
    img.closest('.shop-latest__block').querySelector('.shop-latest__name a'),
    img.closest('.shop-latest__block').querySelector('.shop-latest__price a'),
  ];
  if (
    img
      .closest('.shop-latest__block')
      .querySelector('.shop-latest__price .discount')
  ) {
    links.push(
      img
        .closest('.shop-latest__block')
        .querySelector('.shop-latest__price .discount')
    );
  }

  links.forEach((link) => {
    link.href = 'http://localhost:3000/product.html';
  });
}

// Трансформація сторінки від вибраного продукту в Шоп

// перехід по картинках від Shop до Product
document.addEventListener('DOMContentLoaded', function () {
  // Get the stored imgPath, product name, and price from localStorage
  const imgPath = localStorage.getItem('selectedImgPath');
  const productName = localStorage.getItem('selectedProductName');
  const productPrice = localStorage.getItem('selectedProductPrice');
  const heart = localStorage.getItem('selectedHeart');
  const discount = localStorage.getItem('selectedDiscount');

  if (imgPath && productName && productPrice) {
    // Оновдення фото
    let imgChange = document.querySelectorAll(
      '.product--overview__pictures img'
    );
    imgChange.forEach((img) => {
      img.src = imgPath;
    });

    // Оновлення назви і ціни
    document.querySelector('.product--overview__view h3').textContent =
      productName;
    document.querySelector('.product--overview__view .price').textContent =
      productPrice;
    document.querySelector('.icons--row .product__heart').src = heart;
    document.querySelector('.product--overview__view .price').outerHTML =
      discount;

    // Видалення зі сховку
    localStorage.removeItem('selectedImgPath');
    localStorage.removeItem('selectedProductName');
    localStorage.removeItem('selectedProductPrice');
    localStorage.removeItem('selectedHeart');
    localStorage.removeItem('selectedDiscount');
  }
});

// Mobile
if (window.innerWidth - 83 <= 420) {
  const acc = document.querySelector('.media-mobile--view-more');

  acc.addEventListener('click', function (e) {
    let panel = document.querySelector('.panel');
    let btnArrowDown = document.querySelector('.fa-chevron-right');

    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
    if (btnArrowDown.style.rotate === '90deg') {
      btnArrowDown.style.rotate = '0deg';
    } else {
      btnArrowDown.style.rotate = '90deg';
    }
  });
}
//

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.c');
  const blocks = document.querySelector('.shop-latest-blocks');

  let isDragging = false;
  let startX;
  let translateX = 0;
  let blockWidth;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
    determineSlideDirection();
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    translateX += walk;
    blocks.style.transform = `translateX(${translateX}px)`;
  });

  // Mobile touch events
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - container.offsetLeft;
  });

  container.addEventListener('touchend', () => {
    isDragging = false;
    determineSlideDirection();
  });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = x - startX;
    translateX += walk;
    blocks.style.transform = `translateX(${translateX}px)`;
  });

  function determineSlideDirection() {
    blockWidth = document.querySelector('.shop-latest__block').offsetWidth;
    const maxTranslateX = 0;
    const minTranslateX = -(blocks.children.length - 1) * blockWidth;

    // Prevent scrolling beyond the last block
    if (translateX > maxTranslateX) {
      translateX = maxTranslateX;
    }
    // Prevent scrolling beyond the first block
    else if (translateX < minTranslateX) {
      translateX = minTranslateX;
    }

    blocks.style.transform = `translateX(${translateX}px)`;
  }
});

if (window.innerWidth - 83 <= 420) {
  const pictureContainer = document.getElementById('swiperContainer');
  const progressBarLine = document
    .getElementById('progress-bar-mob')
    .querySelector('.progress-bar__line');
  let currentIndex = 0;
  const totalImages = pictureContainer.children.length;
  let startX, currentX, delta;

  pictureContainer.addEventListener('touchstart', handleTouchStart);
  pictureContainer.addEventListener('touchmove', handleTouchMove);
  pictureContainer.addEventListener('touchend', handleTouchEnd);

  function handleTouchStart(event) {
    startX = event.touches[0].pageX;
  }

  function handleTouchMove(event) {
    currentX = event.touches[0].pageX;
    delta = currentX - startX;

    // Calculate the new translation value
    const newTranslation =
      -currentIndex * 25 + (delta / pictureContainer.offsetWidth) * 100;

    // Limit the translation to a range of -75% to 0%
    const limitedTranslation = Math.max(Math.min(newTranslation, 0), -75);

    pictureContainer.style.transition = 'none';
    pictureContainer.style.transform = `translateX(${limitedTranslation}%)`;

    updateProgressBar();
  }

  function handleTouchEnd() {
    const threshold = pictureContainer.offsetWidth / 4; // Adjust the threshold as needed

    if (delta > 0 && currentIndex > 0) {
      currentIndex--; // Swipe to the left, move to the previous slide
    } else if (delta < 0 && currentIndex < totalImages - 1) {
      currentIndex++; // Swipe to the right, move to the next slide
    }

    // Limit the translation to a maximum of 75%
    const limitedTranslation = -Math.min(currentIndex * 25, 75);
    pictureContainer.style.transition = 'transform 0.5s ease';
    pictureContainer.style.transform = `translateX(${limitedTranslation}%)`; // 25% is based on the image width

    updateProgressBar(); // Update progress bar even if no slide change
  }

  function updateProgressBar() {
    const step = 25; // The step size for each slide
    const marginLeft = -currentIndex * step;
    if (currentIndex >= 4) {
      progressBarLine.style.marginLeft = `75%`;
    } else progressBarLine.style.marginLeft = `${-marginLeft}%`;
  }

  // Additional event listener for transition end to ensure proper stopping on the next slide
} else {
  // Вибір картинок Десктоп
  const imageSelection = document.querySelector('.product--overview__pictures');

  if (imageSelection) {
    const imageSelectionArray = imageSelection.querySelectorAll('img');
    const progressBarLine = document.querySelectorAll('.progress-bar__line');
    console.log(progressBarLine);
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

        const percentage =
          ((index + 1) / (imageSelectionArray.length - 1)) * 100;
        progressBarLine.forEach((el) => {
          el.style.width = `${percentage}%`;
        });
      });
    });
  }
}
