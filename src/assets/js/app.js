//Slider
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const radioButtons = document.querySelectorAll(
    '.radio-buttons input[type="radio"]'
  );
  let currentIndex = 0;
  let intervalId;

  radioButtons.forEach(function (radio, index) {
    radio.addEventListener('change', function () {
      changeSlide(index);
      clearInterval(intervalId);
    });
  });

  slider.addEventListener('mouseenter', function () {
    clearInterval(intervalId);
  });

  slider.addEventListener('mouseleave', function () {
    intervalId = setInterval(autoSlide, 3500);
  });

  function changeSlide(index) {
    const slideWidth = document.querySelector('.slide').offsetWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;

    radioButtons.forEach(function (radio, radioIndex) {
      radio.checked = radioIndex === currentIndex;
    });
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % radioButtons.length;
    changeSlide(currentIndex);
  }

  intervalId = setInterval(autoSlide, 3500);
});
//Slider

//Body
document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.shop-latest__block');

  blocks.forEach(function (block) {
    const imgElement = block.querySelector('.shop-latest__heart');

    let currentImage = './assets/img/Home_img/Body/heart.png';

    imgElement.addEventListener('click', function () {
      currentImage === './assets/img/Home_img/Body/heart.png'
        ? (currentImage = './assets/img/Home_img/Body/red_heart.png')
        : (currentImage = './assets/img/Home_img/Body/heart.png');

      imgElement.src = currentImage;
    });
  });
});

// Shop page Team B
const discountElements = document.querySelectorAll('.shop-latest__block');

discountElements.forEach((el) => {
  let h1;
  if (el.firstElementChild.classList.contains('add-discount')) {
    let h = el.querySelector('.shop-latest__price');
    h.firstElementChild.classList.add('price-discount');
    h1 = h.textContent.trim();

    const element = el.querySelector('.add-discount');
    const blockDiscount = window.getComputedStyle(element, '::before');
    const contentValue =
      blockDiscount
        .getPropertyValue('content')
        .replace('%', '')
        .replace('-', '')
        .slice(1)
        .replace('"', '') / 100;

    const h1value = parseFloat(h1.slice(2).replace(',', '.'));

    const disc = h1value - h1value * contentValue;
    const discount = `<a href="#">$ ${disc}</a>`;
    h.insertAdjacentHTML('beforeend', discount);
  }
});

// let priceWithDiscount = document.querySelector('.price-with-discount');
// let priceWithDiscountValue = priceWithDiscount.textContent;

// console.log(priceWithDiscountValue);
// function getNumberPrice(str) {
//   let numberPrice = parseFloat(str.slice(2).replace(',', '.'));
//   const res = (numberPrice - numberPrice * contentValue)
//     .toString()
//     .replace('.', ',');
//   return res;
// }
// console.log(getNumberPrice(priceWithDiscountValue));
// priceWithDiscount.textContent = `$ ${getNumberPrice(priceWithDiscountValue)}`;

//

//Body
