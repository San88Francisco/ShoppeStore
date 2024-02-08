import { animationDropBox } from '../Global/GlobalFunctions';
import { clickToInotherPage, generateBtn } from '../Home/Body';

if (window.location.pathname.includes('/shop')) {
  document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 6;
    const allProductData = JSON.parse(sessionStorage.getItem('allProduct'));
    console.log("allProductData:", allProductData)
    // let totalPages = Math.ceil(allProductData.length / itemsPerPage);
    let totalPages = 0;

    // Випадання кнопок sortBy and shopBy
    const shopByBtn = document.getElementById('shopByBtn');
    const sortByBtn = document.getElementById('sortByBtn');
    const shopByDropdown = document.getElementById('shopByDropdown');
    const sortByDropdown = document.getElementById('sortByDropdown');
    const rotateImg = document.querySelectorAll('.drop-btn img');
    const containerSearch = document.querySelector('.container__search');

    let activeDropdown = null;
    let activeRotateImg = null;


    document.querySelector('#search-input').oninput = function () {
      let val = this.value.trim().toLowerCase();
    
      if (this.debounceTimerSearch) {
        clearTimeout(this.debounceTimerSearch);
      }
    
      this.debounceTimerSearch = setTimeout(() => {
        deleteCheckedItem();
        zeroingCheckboxes();

        let searchFilter = allProductData.filter(product => product.name.toLowerCase().includes(val));
        console.log("searchFilter:", searchFilter)

        totalPages = Math.ceil(searchFilter.length / itemsPerPage);

        console.log(totalPages);

        generateBtn(totalPages);
        clickToInotherPage(searchFilter, totalPages);
        console.log(searchFilter);
    
        if (!searchFilter.length) {
          console.log('Пустий масив');
          containerSearch.style.display = 'flex';
        } else {
          console.log(' Ne Пустий масив');
          containerSearch.style.display = 'none'
        }
      }, 1500); 
    };


    function closeActiveDropdown(target) {
      if (activeDropdown && target !== activeDropdown.previousElementSibling) {
        activeDropdown.classList.remove('show');
        activeRotateImg.classList.remove('dropbtn-icon-rotate');
        activeDropdown = null;
        activeRotateImg = null;
      }
    }

    shopByBtn.addEventListener('click', () => {
      closeActiveDropdown(shopByBtn);
      shopByDropdown.classList.toggle('show');
      rotateImg[0].classList.toggle('dropbtn-icon-rotate');
      activeDropdown = shopByDropdown;
      activeRotateImg = rotateImg[0];
    });

    sortByBtn.addEventListener('click', () => {
      closeActiveDropdown(sortByBtn);
      sortByDropdown.classList.toggle('show');
      rotateImg[1].classList.toggle('dropbtn-icon-rotate');
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
    const btnCheapest = document.querySelector('#btn-cheapest');
    const btnExpensive = document.querySelector('#btn-expensive');

    function sortExpensiveCheapest(btnSort) {
      // Сортування масиву елементів за відповідними цінами
      if (btnSort.textContent === 'Expensive') {
        deleteCheckedItem();
        zeroingCheckboxes();
        checkedItemSort.classList.add('active__filter-checked');
        checkedItemSort.textContent = `Sort ${btnSort.textContent}`;

        const sortExpensive = allProductData.sort((a, b) => {
          return b.price - a.price;
        });
        clickToInotherPage(sortExpensive, totalPages);
      } else if (btnSort.textContent === 'Cheapest') {
        deleteCheckedItem();
        zeroingCheckboxes();
        checkedItemSort.classList.add('active__filter-checked');
        checkedItemSort.textContent = `Sort ${btnSort.textContent}`;

        const sortCheapest = allProductData.sort((a, b) => {
          return a.price - b.price;
        });
        clickToInotherPage(sortCheapest, totalPages);
      }
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

    const checkedItemShop = document.querySelector('.checked__item-shop');
    const checkedItemSort = document.querySelector('.checked__item-sort');

    checkedItemShop.addEventListener('click', () => {
      checkedItemShop.classList.remove('active__filter-checked');
      clickToInotherPage(allProductData, totalPages);
    });

    checkedItemSort.addEventListener('click', () => {
      checkedItemSort.classList.remove('active__filter-checked');
      clickToInotherPage(allProductData, totalPages);
    });

    //* пошук категорій
    function sortShopBy(btn, className) {
      btn.addEventListener('click', () => {
        deleteCheckedItem();
        zeroingCheckboxes();
        checkedItemShop.classList.add('active__filter-checked');
        checkedItemShop.textContent = `Sort ${btn.textContent}`;
        const sortItemBy = allProductData.filter((item) => {
          return item.typeClass === className;
        });
        clickToInotherPage(sortItemBy, totalPages);
      });
    }

    //* пошук категорій
    function sortInfoBy(btn, className) {
      btn.addEventListener('click', () => {
        deleteCheckedItem();
        zeroingCheckboxes();
        checkedItemSort.classList.add('active__filter-checked');
        checkedItemSort.textContent = `Sort ${btn.textContent}`;
        const sortInfoBy = allProductData.filter((item) => {
          return item.categoryClass === className;
        });
        clickToInotherPage(sortInfoBy, totalPages);
      });
    }

    //* OnSale/InStock

    const checkedItemPrice = document.querySelector('.checked__item-price');
    const checkedItemSale = document.querySelector('.checked__item-sale');
    const checkedItemStock = document.querySelector('.checked__item-stock');

    checkedItemPrice.addEventListener('click', () => {
      progress.style.right = '0%';
      rangeInput[0].value = 0;
      rangeInput[1].value = 180;
      priceSum[1].textContent = 180;
      checkedItemPrice.classList.remove('active__filter-checked');
      clickToInotherPage(allProductData, totalPages);
    });

    checkedItemSale.addEventListener('click', () => {
      checkboxes[0].checked = false;
      zeroingCheckboxes();
    });

    checkedItemStock.addEventListener('click', () => {
      checkboxes[1].checked = false;
      zeroingCheckboxes();
    });

    const checkboxes = document.querySelectorAll(
      '.toggle-switch input[type="checkbox"]'
    );

    const filterByDiscount = () => {
      const filterDiscount = allProductData.filter((item) => {
        return item.categoryClass === 'add-discount';
      });
      clickToInotherPage(filterDiscount, totalPages);
    };

    const filterByStock = () => {
      const filterInStock = allProductData.filter((item) => {
        return item.categoryClass != 'add-sold';
      });
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
            deleteCheckedItem();
            checkedItemStock.classList.remove('active__filter-checked');
            checkedItemSale.classList.add('active__filter-checked');
            filterByDiscount();
          }
          if (checkbox.classList.contains('toggle-stock')) {
            deleteCheckedItem();
            checkedItemSale.classList.remove('active__filter-checked');
            checkedItemStock.classList.add('active__filter-checked');
            filterByStock();
          }
        } else {
          // Якщо не одна з кнопок не активна, перезаписуємо всі наші товари
          zeroingCheckboxes();
          clickToInotherPage(allProductData, totalPages);
        }
      });
    });

    const deleteCheckedItem = () => {
      checkedItemShop.classList.remove('active__filter-checked');
      checkedItemSort.classList.remove('active__filter-checked');
      checkedItemPrice.classList.remove('active__filter-checked');

    };

    const zeroingCheckboxes = () => {
      checkedItemStock.classList.remove('active__filter-checked');
      checkedItemSale.classList.remove('active__filter-checked');
      checkboxes[0].checked = false;
      checkboxes[1].checked = false;
    };

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
              progress.style.left =
                (rangeInput[0].value / maxRange) * 100 + '%';
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
      let debounceTimer; /** В цю змінну ми вставимо setTimeout, щоб можна було його обнуляти */

      rangeInput.forEach((input) => {
        input.addEventListener('input', () => {
          /** Обнуляємо таймер щоб, якщо вирішили перевибрати ціну раніше ніж 2 секунди */
          clearTimeout(debounceTimer);

          debounceTimer = setTimeout(() => {
            const filteredData = allProductData.filter((item) => {
              // const itemPrice = item.price.replace( /[^\d]/g,''); /* забираємо пробіли та лишні знаки $ з  ціни */
              const itemPrice = item.price + '00';
              // console.log(itemPrice + '00');

              return (
                /* Перевірка самогу фільтру з ціною. Там де +rangeInput[0].value це лівий повзунок, +rangeInput[1].value це правий повзунок */
                +rangeInput[0].value * 100 <= +itemPrice &&
                +rangeInput[1].value * 100 >= +itemPrice
              );
            });
            deleteCheckedItem();
            zeroingCheckboxes();
            checkedItemPrice.classList.add('active__filter-checked');
            clickToInotherPage(filteredData, totalPages);
          }, 2000);
        });
      });
    };

    filterRangePrice();

    // анімація випадання Aside

    animationDropBox('.mobile-filter_button', 'aside');
  });
}
