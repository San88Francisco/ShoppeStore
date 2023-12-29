const PAGES = [, "shop", "contact", "index", "shop", "contact", "index", "shop", "contact"]; // Додайте імена всіх існуючих сторінок
const PAGE_NOT_FOUND = "error404.html";


document.addEventListener('DOMContentLoaded', function () {

   // Перевірка, чи сторінка 404 вже відображається
   const pageExists = currentPage.toLowerCase() === "error404";

   // Перевірка, чи поточна сторінка належить до списку існуючих сторінок
   const is404Page = PAGES.includes(currentPage);

   // if (!pageExists && !is404Page) {
   //    redirectTo404();
   // }
   if (!is404Pagef && !pageExists) {
      redirectTo404();
   }

   function redirectTo404() {
      window.location.href = PAGE_NOT_FOUND;
   }
});


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