const parseItems = JSON.parse(localStorage.getItem('allProduct'));
console.log('✌️parseItems --->', parseItems);


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
      container.id = 'container-items-search-burger';
      container.innerHTML = `
         <img src="${this.imageUrl}" alt="${this.name}">
         <h1>${this.name}</h1>
         <h2>${this.productVariant}</h2>
         <p>$ ${this.price}</p>
         <h5>${this.typeProduct}</h5>
      `;
      container.addEventListener('click', () => {
         const itemProduct = parseItems.find((item) => this.id === item.id);
         console.log("itemProduct:", itemProduct)

         localStorage.setItem('selectedImgPath', itemProduct.imageUrl);
         localStorage.setItem('selectedProductName', itemProduct.name);
         localStorage.setItem('selectedProductPrice', itemProduct.price);
         localStorage.setItem('selectedHeart', 'http://localhost:3000/assets/img/Home_img/Body/heart_bg.png');
         localStorage.setItem('selectedDiscount', itemProduct.category);
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
      const globalSearchInput = document.querySelector('#global-search');
      const globalSearch = document.querySelector('#global-nav-search-for-input');
      const sections = document.querySelectorAll('section');

      const thisName = this.name.toLowerCase();
      const thisTypeProduct = this.typeProduct.toLowerCase();
      const thisProductVariant = this.productVariant.toLowerCase();

      globalSearchInput.addEventListener('input', function () {
         let val = this.value.trim().toLowerCase();

         if (val == '') {
            container.style.display = 'none';
            noneAndBlockSections('block');
         } else if (thisName.includes(val) || thisTypeProduct.includes(val) || thisProductVariant.includes(val)) {
            container.style.display = 'block';
            globalSearch.style.display = 'block';
            noneAndBlockSections('none');
         } else {
            container.style.display = 'none';
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
   } else {
      console.log('немає items');
   }
}

// Виклик функції після завантаження DOM
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
