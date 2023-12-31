document.addEventListener('DOMContentLoaded', function () {
   // Ваш скрипт тут
   const globalSearchInput = document.querySelector('#global-search');

   globalSearchInput.addEventListener('input', function () {
      let val = this.value.trim().toLowerCase();
      console.log('✌️val --->', val);

      const sections = document.querySelectorAll('section')

      sections.forEach(section => {
         section.style.display = val === '' ? 'block' : 'none';
      });
   });

   // шукаємо в localStorage наші items
   const allProductString = localStorage.getItem('allProduct');

   //перевірка чи є items
   if (allProductString) {
      // розпаковуємо 
      const parseItems = JSON.parse(allProductString);
      console.log('✌️parseItems --->', parseItems);

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

         addClassInNav() {
            const blockItem = document.querySelector('#block-item');
            console.log('✌️blockItem --->', blockItem);

            blockItem.insertAdjacentHTML(
               'beforeend', // Додавання HTML в кінець #block-item
               String.raw`
               <div>
                  <img src="${this.imageUrl}" alt="${this.name}">
                  <h1>${this.name}</h1>
                  <h2>${this.productVariant}</h2>
                  <p>$ ${this.price}</p>
                  <h5>${this.category}</h5>
               </div>`
            );
         }
      }

      // Ітеруємося по масиву parseItems та створюємо екземпляри Items
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
      // Вставити вміст або створити новий елемент для виведення повідомлення
      console.log('немає items');
   }
});
