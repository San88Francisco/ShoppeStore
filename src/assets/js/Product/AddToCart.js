// Product page Team A
// Counter
const btnDecrease = document.querySelector('.minus');
const btnIncrease = document.querySelector('.plus');
const numberOfShoppings = document.querySelector('.amount');
let numberOfShoppingsValue = +numberOfShoppings.textContent;

btnIncrease.addEventListener('click', function () {
   numberOfShoppings.textContent = `${(numberOfShoppingsValue += 1)}`;
});
btnDecrease.addEventListener('click', function () {
   if (numberOfShoppingsValue === 1) return;
   numberOfShoppings.textContent = `${(numberOfShoppingsValue -= 1)}`;
});
// Counter

// Image selection
const imageSelection = document.querySelector('.product--overview__pictures');
const imageSelectionArray = imageSelection.querySelectorAll('img');

imageSelectionArray.forEach((img, index) => {
   let progressBarLine = document.querySelector('.progress-bar__line');
   img.addEventListener('click', function () {
      imageSelectionArray.forEach((otherImg) => {
         if (img.classList.contains('picture-big')) return;
         else {
            otherImg.style.border = 'none';
         }
      });
      if (img.classList.contains('picture-big')) return;
      else {
         img.style.border = '3px solid rgb(158, 158, 158)';
         img.style.borderRadius = '5px';
         let oldImage = document.querySelector('.picture-big');

         oldImage.src = img.src;
         img.src = oldImage.src;
      }
      const percentage = ((index + 1) / (imageSelectionArray.length - 1)) * 100;
      progressBarLine.style.width = `${percentage}%`;
   });
});

// Вкрав код вище
const imgElement = document.querySelector('.product__heart');
let currentImage = './assets/img/Home_img/Body/heart_bg.png';
imgElement.addEventListener('click', function () {
   currentImage === './assets/img/Home_img/Body/heart_bg.png'
      ? (currentImage = './assets/img/Home_img/Body/red_heart.png')
      : (currentImage = './assets/img/Home_img/Body/heart_bg.png');

   imgElement.src = currentImage;
});
//
// Image selection
// Product page Team A