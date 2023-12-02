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