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

//Price
document.addEventListener('DOMContentLoaded', function () {
   const blocks = document.querySelectorAll('.shop-latest__block');

   blocks.forEach(function (block) {
      const imgElement = block.querySelector('.shop-latest__heart');

      let currentImage = '../../../assets/img/Home_img/Body/heart_bg.png';

      imgElement.addEventListener('click', function () {
         currentImage === '../../../assets/img/Home_img/Body/heart_bg.png'
            ? (currentImage = '../../../assets/img/Home_img/Body/red_heart.png')
            : (currentImage = '../../../assets/img/Home_img/Body/heart_bg.png');

         imgElement.src = currentImage;
      });
   });
});

// Shop page Team B
const discountElements = document.querySelectorAll('.shop-latest__block');

discountElements.forEach((el) => {
   const addDiscountElement = el.firstElementChild;

   if (addDiscountElement.classList.contains('add-discount')) {
      const priceElement = el.querySelector('.shop-latest__price');
      priceElement.firstElementChild.classList.add('price-discount');

      const h1 = priceElement.textContent.trim();
      const contentValue =
         parseFloat(
            window
               .getComputedStyle(addDiscountElement, '::before')
               .getPropertyValue('content')
               .replace(/["%-]/g, '')
         ) / 100;

      const h1value = parseFloat(h1.slice(2).replace(',', '.'));
      const disc = h1value - h1value * contentValue;

      const discount = `<a href="#">$ ${disc}</a>`;
      priceElement.insertAdjacentHTML('beforeend', discount);
   }
});

// Shop page Team B

// Dropmenu sort, Shop page

const dropbtns = document.querySelectorAll('.dropdown .drop-btn');
const myDropdowns = document.querySelectorAll('.dropdown-content');
const rotateImg = document.querySelectorAll('.drop-btn img');
console.log('rotateImg:', rotateImg);

let activeDropdown = null;
let activeRotateImg = null;

function closeActiveDropdown(target) {
   if (activeDropdown && target !== activeDropdown.previousElementSibling) {
      activeDropdown.classList.remove('show');
      activeRotateImg.classList.remove('dropbtn-icon-rotate');
      activeDropdown = null;
      activeRotateImg = null;
   }
}

dropbtns.forEach((dropbtn, index) => {
   dropbtn.addEventListener('click', () => {
      closeActiveDropdown(dropbtn);
      myDropdowns[index].classList.toggle('show');
      rotateImg[index].classList.toggle('dropbtn-icon-rotate');
      activeDropdown = myDropdowns[index];
      activeRotateImg = rotateImg[index];
   });
});

window.onclick = function (event) {
   closeActiveDropdown(event.target);
};

window.onblur = function (event) {
   closeActiveDropdown(event.relatedTarget);
};

// Dropmenu sort, "Shop page"

// Filter input range, "Shop page"

const rangeInput = document.querySelectorAll('.range-input input');
const priceInput = document.querySelectorAll('.price-input input');
const priceSum = document.querySelectorAll('.price-range-summ span');
const progress = document.querySelector('.slider-progress .range-progress');

let priceGap = 10;
let maxRange = 180; // Змінено максимальне значення

rangeInput.forEach((input) => {
   input.addEventListener('input', (e) => {
      let minVal = parseInt(rangeInput[0].value);
      let maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
         if (e.target.className === 'range-min') {
            rangeInput[0].value = maxVal - priceGap;
            priceSum[0].innerText = `${rangeInput[0].value}`;
            progress.style.left = (rangeInput[0].value / maxRange) * 100 + '%';
         } else {
            rangeInput[1].value = minVal + priceGap;
            priceSum[1].innerText = `${rangeInput[1].value}`;
            progress.style.right =
               100 - (rangeInput[1].value / maxRange) * 100 + '%';
         }
      } else {
         priceSum[0].innerText = `${+minVal}`;
         priceSum[1].innerText = `${+maxVal}`;
         progress.style.left = (minVal / maxRange) * 100 + '%';
         progress.style.right = 100 - (maxVal / maxRange) * 100 + '%';
      }
   });
});

// Filter input range, "Shop page"

// ---HEADER---
document.addEventListener('DOMContentLoaded', () => {
   const header__underline = document.querySelector('.header__underline');
   const pageName = document.title.toLowerCase().replace(/\s/g, '');
   const headerAElement = document.querySelector(`.header_link_${pageName}`);
   headerAElement.classList.add('act');
   pageName !== 'home' ? (header__underline.style.display = 'block') : 0;
});
// ===HEADER===

// ====Search====
document.querySelector('#search-input').oninput = function () {
   let val = this.value.trim().toLowerCase();
   let lettersItems = document.querySelectorAll('.shop-latest__name a');

   lettersItems.forEach(function (e) {
      const shopLatestBlock = e.closest('.shop-latest__block');

      if (val == '') {
         shopLatestBlock.style.display = 'block';
         
      } else if (val !== '' && e.innerText.toLowerCase().includes(val)) {
         shopLatestBlock.style.display = 'block';
      } else {
         shopLatestBlock.style.display = 'none';
      }
   });
}
// ====Search====






