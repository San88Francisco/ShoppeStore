if (window.location.pathname.includes('/shop')) {
   document.addEventListener('DOMContentLoaded', function () {

      // Випадання кнопок sortBy and shopBy
      const dropbtns = document.querySelectorAll(".dropdown .drop-btn");
      const myDropdowns = document.querySelectorAll(".dropdown-content");
      const rotateImg = document.querySelectorAll(".drop-btn img");

      let activeDropdown = null;
      let activeRotateImg = null;

      function closeActiveDropdown(target) {
         if (activeDropdown && target !== activeDropdown.previousElementSibling) {
            activeDropdown.classList.remove("show");
            activeRotateImg.classList.remove("dropbtn-icon-rotate");
            activeDropdown = null;
            activeRotateImg = null;
         }
      }

      dropbtns.forEach((dropbtn, index) => {
         if (dropbtn) {
            dropbtn.addEventListener("click", () => {
               closeActiveDropdown(dropbtn);
               myDropdowns[index].classList.toggle("show");
               rotateImg[index].classList.toggle("dropbtn-icon-rotate");
               activeDropdown = myDropdowns[index];
               activeRotateImg = rotateImg[index];
            });
         }
      });

      window.onclick = function (event) {
         closeActiveDropdown(event.target);
      };

      window.onblur = function (event) {
         closeActiveDropdown(event.relatedTarget);
      };



      //* Sort By/ Shop By
      // Ваш початковий код для отримання парсерів цін
      const shopLatestBlocksSort = document.querySelector('.shop-latest-blocks');
      const btnCheapest = document.querySelector('#btn-cheapest');
      const btnExpensive = document.querySelector('#btn-expensive');
      const shopLatestPrice = document.querySelectorAll('.shop-latest__price');



      function sortExpensiveCheapest(btnSort) {
         // Створення масиву з елементів .shop-latest__block та їх цін
         const blocksArray = [...document.querySelectorAll('.shop-latest__block')];
         console.log('✌️blocksArray --->', blocksArray);
         const pricesArray = Array.from(shopLatestPrice).map((elem) => {
            const sortT = elem.textContent;
            return parseFloat(sortT.replace(/\$/g, ''));
         });

         // Сортування масиву елементів за відповідними цінами
         if (btnSort.textContent === 'Expensive') {
            blocksArray.sort((a, b) => {
               const priceA = parseFloat(a.querySelector('.shop-latest__price').textContent.replace(/\$/g, ''));
               const priceB = parseFloat(b.querySelector('.shop-latest__price').textContent.replace(/\$/g, ''));
               return priceB - priceA;
            });
         } else if (btnSort.textContent === 'Cheapest') {
            blocksArray.sort((a, b) => {
               const priceA = parseFloat(a.querySelector('.shop-latest__price').textContent.replace(/\$/g, ''));
               const priceB = parseFloat(b.querySelector('.shop-latest__price').textContent.replace(/\$/g, ''));
               return priceA - priceB;
            });
         }

         // Видалення існуючих елементів з контейнера
         while (shopLatestBlocksSort.firstChild) {
            shopLatestBlocksSort.removeChild(shopLatestBlocksSort.firstChild);
         }

         // Додавання відсортованих елементів до контейнера
         blocksArray.forEach((block) => {
            shopLatestBlocksSort.appendChild(block);
         });
      }

      btnCheapest.addEventListener('click', () => {
         sortExpensiveCheapest(btnCheapest);
      });

      btnExpensive.addEventListener('click', () => {
         sortExpensiveCheapest(btnExpensive);
      });








      //* SortBy/ShopBy
      //* пошук категорій
      function sortShopBy(btn, className) {
         btn.addEventListener('click', () => {
            const hideElements = document.querySelectorAll('#hide');

            hideElements.forEach((hideElement) => {
               const categoryName = hideElement.querySelectorAll(`.${className}`);
               hideElement.style.display = 'none';

               categoryName.forEach((earring) => {
                  console.log(earring);
                  hideElement.style.display = 'block';
               });
            });
         });
      }

      //? SortBy
      //*Earrings
      const bntEarrings = document.querySelector('#bnt-earrings');
      sortShopBy(bntEarrings, 'add-earrings');

      //*Rings
      const bntRings = document.querySelector('#btn-rings');
      sortShopBy(bntRings, 'add-rings');

      //*Bracelets
      const bntBracelsts = document.querySelector('#btn-bracelets');
      sortShopBy(bntBracelsts, 'add-bracelets');

      //*Pendants
      const bntPendants = document.querySelector('#btn-pendants');
      sortShopBy(bntPendants, 'add-pendants');


      //? ShopBy
      //*Popular
      const bntPopular = document.querySelector('#btn-popular');
      sortShopBy(bntPopular, 'add-popular');

      //*New
      const bntNew = document.querySelector('#btn-new');
      sortShopBy(bntNew, 'add-new');

      //*Discounts
      const bntDiscounts = document.querySelector('#btn-discounts');
      sortShopBy(bntDiscounts, 'add-discount');






      //* OnSale/InStock
      const shopLatestBlocks = document.querySelectorAll('.shop-latest__block');
      const checkboxes = document.querySelectorAll('.toggle-switch input[type="checkbox"]');

      const filterByDiscount = () => {
         shopLatestBlocks.forEach((item) => {
            const hasDiscount = item.querySelector('.add-discount');
            item.style.display = hasDiscount ? 'block' : 'none';
         });
      };

      const filterByStock = () => {
         shopLatestBlocks.forEach((item) => {
            const hasStock = item.querySelector('.add-sold');
            item.style.display = hasStock ? 'none' : 'block';
         });
      };

      // Додаємо обробник подій для кожного checkbox
      checkboxes.forEach((checkbox) => {
         checkbox.addEventListener('change', () => {
            checkboxes.forEach((otherCheckbox) => {
               if (otherCheckbox !== checkbox) {
                  otherCheckbox.checked = false;
               }
            });

            if (checkbox.checked) {
               if (checkbox.classList.contains('toggle-sale')) {
                  filterByDiscount();
               }
               if (checkbox.classList.contains('toggle-stock')) {
                  filterByStock();
               }
            } else {
               shopLatestBlocks.forEach((item) => (item.style.display = 'block'));
            }
         });
      });

   });

}