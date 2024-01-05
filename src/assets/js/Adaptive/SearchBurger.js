// Клас для представлення продуктів
class Items {
   constructor(imageUrl, name, category, categoryClass, price, productVariant, typeClass, typeProduct) {
      this.imageUrl = imageUrl;
      this.name = name;
      this.category = category;
      this.categoryClass = categoryClass;
      this.price = price;
      this.productVariant = productVariant;
      this.typeClass = typeClass;
      this.typeProduct = typeProduct;
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
         console.log('Клік на container-items-search-burger');
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
   const allProductString = localStorage.getItem('allProduct');

   if (allProductString) {
      const parseItems = JSON.parse(allProductString);

      parseItems.forEach(item => {
         const itemsInstance = new Items(
            item.imageUrl,
            item.name,
            item.category,
            item.categoryClass,
            item.price,
            item.productVariant,
            item.typeClass,
            item.typeProduct
         );

         itemsInstance.addClassInNav();
      });
   } else {
      console.log('немає items');
   }
}

// Виклик функції після завантаження DOM
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
