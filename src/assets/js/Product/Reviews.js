// ---PRODUCT INHER PAGE(description,b)---
document.addEventListener('DOMContentLoaded', () => {
   const infoTabPage = document.querySelectorAll('.info__tab-page');
   const tabButtons = document.querySelectorAll('.info__tab-page');
   const productPages = document.querySelectorAll('.product__page');
   tabButtons.forEach((item, index) => {
      item.addEventListener('click', () => {
         tabButtons.forEach(btn => btn.classList.remove('info__tab__line'));
         item.classList.add('info__tab__line');
         productPages.forEach(page => page.style.display = 'none');
         productPages[index].style.display = 'grid';
      });
   });
});