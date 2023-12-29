
document.addEventListener('DOMContentLoaded', function () {

   const item = JSON.parse(localStorage.getItem('allProduct'));
   console.log('✌️item --->', item);


   document.querySelector('#burber-search').oninput = function () {
      if (val == '') {
         shopLatestBlock2.style.display = 'block';
      } else if (val !== '' && e.innerText.toLowerCase().includes(val)) {
         shopLatestBlock2.style.display = 'block';
      } else {
         shopLatestBlock2.style.display = 'none';
      }
      let val = this.value.trim().toLowerCase();
      console.log('✌️val --->', val);
      // let lettersItems = document.querySelectorAll('.shop-latest__name a');
      let burgerList = document.querySelector('.burger-list');

      lettersItems.forEach(function (e) {
         const shopLatestBlock2 = e.closest('.shop-latest__block');

      });
   };
})