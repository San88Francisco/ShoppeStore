import { animationDropBox } from '../Global/GlobalFunctions';
import { clickToInotherPage } from '../Home/Body';

if (window.location.pathname.includes('/shop')) {
   document.addEventListener('DOMContentLoaded', function () {

      const itemsPerPage = 6;
      const allProductData = JSON.parse(localStorage.getItem('allProduct'));
      const totalPages = Math.ceil(allProductData.length / itemsPerPage);

      // Масиви з відсортованими товарами
      let shopBy = [];
      let sortBy = [];
      let filterPrice = [];
      let onSale = [];
      let inStock = [];

      // Validation filter
      let isActivePrice = false;
      let isActiveSale = false;
      let isActiveStock = false;


      // clickToInotherPage(allProductData, totalPages);

      // Випадання кнопок sortBy and shopBy
      const shopByBtn = document.getElementById("shopByBtn");
      const sortByBtn = document.getElementById("sortByBtn");
      const shopByDropdown = document.getElementById("shopByDropdown");
      const sortByDropdown = document.getElementById("sortByDropdown");
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

      shopByBtn.addEventListener("click", () => {
         closeActiveDropdown(shopByBtn);
         shopByDropdown.classList.toggle("show");
         rotateImg[0].classList.toggle("dropbtn-icon-rotate");
         activeDropdown = shopByDropdown;
         activeRotateImg = rotateImg[0];
      });

      sortByBtn.addEventListener("click", () => {
         closeActiveDropdown(sortByBtn);
         sortByDropdown.classList.toggle("show");
         rotateImg[1].classList.toggle("dropbtn-icon-rotate");
         activeDropdown = sortByDropdown;
         activeRotateImg = rotateImg[1];
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
         // console.log(" blocksArray:", blocksArray)
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










      //? SortBy
      //*Earrings
      const bntEarrings = document.querySelector('#bnt-earrings');
      sortShopBy(bntEarrings, 'add-earrings');

      //*Rings
      const bntRings = document.querySelector('#btn-rings');
      sortShopBy(bntRings, 'add-brooch');

      //*Bracelets
      const bntBracelsts = document.querySelector('#btn-bracelets');
      sortShopBy(bntBracelsts, 'add-bracelets');

      //*Pendants
      const bntPendants = document.querySelector('#btn-pendants');
      sortShopBy(bntPendants, 'add-pendants');

      // <||||||||>

      //? ShopBy 
      //*Popular
      const bntPopular = document.querySelector('#btn-popular');
      sortInfoBy(bntPopular, 'add-popular');

      //*New
      const bntNew = document.querySelector('#btn-new');
      sortInfoBy(bntNew, 'add-new');



      const checkedItemShop = document.querySelector('.checked__item-shop')
      const checkedItemSort = document.querySelector('.checked__item-sort')



      //* пошук категорій
      function sortShopBy(btn, className) {
         btn.addEventListener('click', () => {
            console.log("sortShopBy  btn:", btn.textContent)

            checkedItemShop.classList.add('active__filter-checked');
            checkedItemShop.textContent = `Sort ${btn.textContent}`;

            const hideElements = allProductData;
            console.log("hideElements:", hideElements)

            const sortItemBy = hideElements.filter((item) => {
               return item.typeClass === className
            });

            shopBy = sortItemBy;

            clickToInotherPage(sortItemBy, totalPages);
            console.log(sortItemBy);
         });
      }

      //* пошук категорій
      function sortInfoBy(btn, className) {
         btn.addEventListener('click', () => {

            checkedItemSort.classList.add('active__filter-checked');
            checkedItemSort.textContent = `Sort ${btn.textContent}`;

            const hideElements = allProductData;
            console.log("hideElements:", hideElements)

            const sortInfoBy = hideElements.filter((item) => {
               return item.categoryClass === className
            });

            sortBy = sortInfoBy;
            
            clickToInotherPage(sortInfoBy, totalPages);
            console.log(sortInfoBy);
         });
      }



      //* OnSale/InStock

      const checkedItemPrice = document.querySelector('.checked__item-price')
      const checkedItemSale = document.querySelector('.checked__item-sale')
      const checkedItemStock = document.querySelector('.checked__item-stock')

      const checkboxes = document.querySelectorAll('.toggle-switch input[type="checkbox"]');


      const filterByDiscount = () => {
         let itemInSale = allProductData;
         // console.log("itemInSale:", itemInSale)

         // filterPrice.length  || filterPrice.length === 0 && 
         if (isActivePrice) {
            console.log('Масив є');
            itemInSale = filterPrice;
            console.log('itemInSale',itemInSale);
         } else {
            // console.log("Масива немає");
         }

         const filterDiscount = itemInSale.filter((item) => {
            return item.categoryClass === 'add-discount'
         });
         // console.log(filterDiscount);
         onSale = filterDiscount;
         isActiveSale = true;
         clickToInotherPage(filterDiscount, totalPages);
      };

      const filterByStock = () => {

         let itemInStock = allProductData;
         // console.log("itemInSale:", itemInStock)

         if (isActivePrice) {
            console.log('Масив є в Stock');
            itemInStock = filterPrice;
            console.log('itemInStock',itemInStock);

         } else {
            // console.log("Масива немає");
         }

         const filterInStock = itemInStock.filter((item) => {
            return item.categoryClass != 'add-sold'
         });

         inStock = filterInStock;
         isActiveStock = true;
         clickToInotherPage(filterInStock, totalPages);
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
                  inStock = [];
                  checkedItemStock.classList.remove('active__filter-checked');
                  checkedItemSale.classList.add('active__filter-checked');
               }
               if (checkbox.classList.contains('toggle-stock')) {
                  filterByStock();
                  onSale = [];
                  isActiveSale = false;
                  checkedItemSale.classList.remove('active__filter-checked');
                  checkedItemStock.classList.add('active__filter-checked');
               }
            } else {
               // Якщо не одна з кнопок не активна, перезаписуємо всі наші товари
               // clickToInotherPage(allProductData, totalPages);
               zeroingCheckboxes();
            }
         });
      });


      const zeroingCheckboxes = () => {
         checkedItemStock.classList.remove('active__filter-checked');
         checkedItemSale.classList.remove('active__filter-checked');
         onSale = [];
         inStock = [];
         isActiveSale = false;
         const selectedArray = [shopBy, sortBy, filterPrice].find(array => array.length > 0) || [];

         console.log('shopBy', shopBy);
         console.log('sortBy', sortBy);
         console.log('filterPrice', filterPrice);
         console.log('onSale', onSale);
         console.log('inStock', inStock);
         if (selectedArray.length) {
            console.log('if zeroingCheckboxes', selectedArray);
            clickToInotherPage(selectedArray, totalPages);
          } else {
            console.log('else zeroingCheckboxes', allProductData);
            clickToInotherPage(allProductData, totalPages);
            // validatItemFilter();
          }
      }


      /* ||| Filter price - logic ||| */

      const rangeInput = document.querySelectorAll('.range-input input');
      const priceSum = document.querySelectorAll('.price-range-summ span');
      const progress = document.querySelector('.slider-progress .range-progress');
  
      let priceGap = 10;
      let maxRange = 180; // Змінено максимальне значення

      const filterRangePrice = () => {
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
      
            let debounceTimer; /** В цю змінну ми вставимо setTimeout, щоб можна було його обнуляти */
      
            rangeInput.forEach((input) => {
              input.addEventListener('mouseup', () => {
                /** Обнуляємо таймер щоб, якщо вирішили перевибрати ціну раніше ніж 3 секунди */
               clearTimeout(debounceTimer);
   
               let itemFilterPrice = allProductData;
               debounceTimer = setTimeout(() => {
   
               const selectedArray = [shopBy, sortBy, onSale, inStock].find(array => array.length > 0) || [];
   
               console.log(selectedArray.length);
               // && filterPrice.length >= allProductData.length
               if (selectedArray.length) {
                  // console.log('if filteredData');
                  itemFilterPrice = selectedArray;
                  console.log("itemFilterPrice:", itemFilterPrice)
               } else {
                  // console.log('else filteredData');
                  // console.log("itemFilterPrice:", itemFilterPrice)
               }
                
               const filteredData = itemFilterPrice.filter((item) => {
                  // const itemPrice = item.price.replace( /[^\d]/g,''); /* забираємо пробіли та лишні знаки $ з  ціни */
                  const itemPrice = item.price + '00';
                  // console.log(itemPrice + '00');
   
                  return (
                     /* Перевірка самогу фільтру з ціною. Там де +rangeInput[0].value це лівий повзунок, +rangeInput[1].value це правий повзунок */
                     +rangeInput[0].value * 100 <= +itemPrice &&
                     +rangeInput[1].value * 100 >= +itemPrice
                  );
               });
               /* Запускаємо нашу функцію та передаємо туди фільтрований товар */
               // myTest(filteredData);
               filterPrice = filteredData;
               isActivePrice = true;
               checkedItemPrice.classList.add('active__filter-checked');
   
               // clickToInotherPage(filteredData, totalPages);
               console.log('Новий filterPrice',filterPrice );
               console.log('onSale',onSale);
               validatItemFilter(filterPrice, totalPages)
      
                }, 2000);
              });
            });
   
         });
      }

      filterRangePrice();

      const validatItemFilter = (filterPrice, totalPages) => {
         if(isActiveSale) {
            console.log('Good inSAle');
            console.log('filterPrice',filterPrice);
            filterByDiscount()
         } else if (isActiveStock) {
            console.log('Good inStock');
            console.log('filterPrice',filterPrice);
            filterByStock()
         } else {
            clickToInotherPage(filterPrice, totalPages);
         }
        
      }

      // анімація випадання Aside

      animationDropBox('.mobile-filter_button', 'aside')
   });
}