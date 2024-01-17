const parseItems = JSON.parse(localStorage.getItem('allProduct'));
const globalSearch = document.querySelector('#global-nav-search-for-input');
const backgroundBlockInput = document.querySelector('.background-block-input');

// Клас для представлення продуктів
class Items {
   constructor(imageUrl, name, category, categoryClass, price, productVariant, typeClass, typeProduct, id) {
      this.imageUrl = imageUrl;
      this.name = name;
      this.category = category;
      this.categoryClass = categoryClass;
      this.price = price;
      this.productVariant = productVariant;
      this.typeClass = typeClass;
      this.typeProduct = typeProduct;
      this.id = id;
   }

   // Створення HTML-контейнера для продукту
   createContainer() {
      const container = document.createElement('div');


      const discontThis = this.category;
      const parsedDiscount = Math.abs(parseFloat(discontThis));
      let priceDiscount

      if (!isNaN(parsedDiscount)) {
         const priceMath = (this.price * parsedDiscount) / 100;
         priceDiscount = this.price - priceMath;
         const priceItem = document.querySelector('#priceItem')
      }

      container.id = 'container-items-search-burger';
      container.innerHTML = `
         <img src="${this.imageUrl}" alt="${this.name}">
         <h1>${this.name}</h1>
         <h2>${this.productVariant}</h2>
         <p id='priceItem' class='${priceDiscount !== undefined ? 'discounted' : 'regular'}'>$ ${this.price}</p>
         <span>${priceDiscount ? '$ ' : ''}${priceDiscount || ''}</span>
         `;

      container.addEventListener('click', () => {
         const itemProduct = parseItems.find((item) => this.id === item.id);


         localStorage.setItem('selectedImgPath', itemProduct.imageUrl);
         localStorage.setItem('selectedProductName', itemProduct.name);
         localStorage.setItem('selectedProductPrice', itemProduct.priceDiscount);
         localStorage.setItem('selectedHeart', 'http://localhost:3000/assets/img/Home_img/Body/heart_bg.png');
         localStorage.setItem('selectedDiscount', `
         <h4 class="shop-latest__price">
         <a href="#"id='priceItem' class="${priceDiscount !== undefined ? 'discounted' : 'regular'}">$ ${this.price}</a>
         <a href="#" class="discount">${priceDiscount ? '$ ' : ''}${priceDiscount || ''}</a></h4>`);
         localStorage.setItem('selectVariant', itemProduct.productVariant);
         window.location.href = 'http://localhost:3000/product.html';
      });
      return container;
   }

   // Додавання продукту до навігації
   addClassInNav() {
      const blockItem = document.querySelector('#block-item');
      const container = this.createContainer();
      blockItem.appendChild(container);

      // Налаштування обробників подій
      this.setupEventListeners(container);
   }

   // Налаштування обробників подій
   setupEventListeners(container) {
      const blockItem = document.querySelector('#block-item');

      const globalSearchInput = document.querySelector('#global-search');
      const sections = document.querySelectorAll('section');

      const thisName = this.name.toLowerCase();
      const thisTypeProduct = this.typeProduct.toLowerCase();
      const thisProductVariant = this.productVariant.toLowerCase();

      globalSearchInput.addEventListener('input', function () {
         let val = this.value.trim().toLowerCase();
         const notFound = document.querySelector('.container-not-found-search');
         const itemsContainers = document.querySelectorAll('#container-items-search-burger');

         let foundItems = false;

         itemsContainers.forEach(container => {
            const thisName = container.querySelector('h1').textContent.toLowerCase();
            const thisTypeProduct = container.querySelector('h2').textContent.toLowerCase();
            const thisProductVariant = container.querySelector('#priceItem').textContent.toLowerCase();
            if (val == '') {
               notFound.style.display = 'none';
               container.style.display = 'none';
               return
            }
            if (thisName.includes(val) || thisTypeProduct.includes(val) || thisProductVariant.includes(val)) {
               container.style.display = 'block';
               foundItems = true;
            } else {
               container.style.display = 'none';
            }
         });

         if (foundItems) {
            globalSearch.style.display = 'block';
            noneAndBlockSections('none');
            notFound.style.display = 'none';
         } else {
            globalSearch.style.display = 'none';
            noneAndBlockSections('none');
            notFound.style.display = 'flex';
         }
         if (val === '') {
            container.style.display = 'none';
            noneAndBlockSections('block');
            notFound.style.display = 'none';
         }
      });

      // Показ або ховання секцій
      function noneAndBlockSections(type) {
         Array.from(sections).forEach(elem => {
            elem.style.display = type;
         });
      }
   }
}

// Функція для обробки подій DOMContentLoaded
function handleDOMContentLoaded() {
   if (parseItems) {
      parseItems.forEach(item => {
         const itemsInstance = new Items(
            item.imageUrl,
            item.name,
            item.category,
            item.categoryClass,
            item.price,
            item.productVariant,
            item.typeClass,
            item.typeProduct,
            item.id
         );
         itemsInstance.addClassInNav();
      });

   } 
   productDisplayNone()
   listenerSearchIDa()

}

// Виклик функції після завантаження DOM
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

//Прибираємо дефолтну поведінку а (#)
function listenerSearchIDa() {
   document.getElementById('search-link').addEventListener('click', function (event) {
      event.preventDefault();
   });
}

function productDisplayNone() {
   // Отримуємо поточну URL сторінки
   const currentURL = window.location.href;

   // Перевіряємо, чи знаходимося на сторінці "product" і розмір екрану менше 700
   if (currentURL.includes("product") && window.innerWidth < 700) {
      backgroundBlockInput.style.display = 'none';
   }
}