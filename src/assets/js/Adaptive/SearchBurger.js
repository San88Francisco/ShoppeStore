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

      const container = document.createElement('div');
      container.id = 'container-items-search-burger';
      container.innerHTML = `
         <img src="${this.imageUrl}" alt="${this.name}">
         <h1>${this.name}</h1>
         <h2>${this.productVariant}</h2>
         <p>$ ${this.price}</p>
         <h5>${this.category}</h5>
      `;

      blockItem.appendChild(container);

      // Ваш скрипт тут
      const globalSearchInput = document.querySelector('#global-search');
      const thisName = this.name.toLowerCase();

      globalSearchInput.addEventListener('input', function () {
         let val = this.value.trim().toLowerCase();
         // console.log('✌️val --->', val);

         if (val == '') {
            container.style.display = 'none';
            // console.log('true');
         } else if (thisName.includes(val)) {
            container.style.display = 'block';
            // console.log('true2');
         } else {
            container.style.display = 'none';
            // console.log('true3');
         }
      });
   }
}

document.addEventListener('DOMContentLoaded', function () {
   const allProductString = localStorage.getItem('allProduct');

   if (allProductString) {
      const parseItems = JSON.parse(allProductString);
      console.log('✌️parseItems --->', parseItems);

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
});
