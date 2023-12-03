
import './Home/Header'
import './Home/Slider'
import './Home/Body'

import './Shop/Body'
import './Shop/Aside'

import './Product/AddToCart'
import './Product/Reviews'



document.querySelector('#search-input').oninput = function () {
   let val = this.value.trim().toLowerCase();
   let lettersItems = document.querySelectorAll('.shop-latest__name a');

   lettersItems.forEach(function (e) {
      const shopLatestBlock = e.closest('.shop-latest__block');

      if (val === '') {
         shopLatestBlock.style.display = 'block';
      } else if (val !== '' && e.innerText.toLowerCase().includes(val)) {
         shopLatestBlock.style.display = 'block';
      } else {
         shopLatestBlock.style.display = 'none';
      }
   });
};

//! ====Search====




