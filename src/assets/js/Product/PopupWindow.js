document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/product')) {
    //
    const btnAddtoCart = document.querySelector('.add-to-cart');
    const popupWindow = document.querySelector('.cart__window-block');
    const headerUnderline = document.querySelector('.header__underline');
    const amountAddCart = document.querySelector('.amount');
    const navCartCount = document.querySelector('.cart__count');

    let totalCountCart = localStorage.getItem('totalCountCart') || 0;
    let allProductCart =
      JSON.parse(localStorage.getItem('allProductCart')) || [];

    function handleClick() {
      btnAddtoCart.removeEventListener('click', handleClick); // Видаляємо обробник подій
      btnAddtoCart.disabled = true;
      headerUnderline.style.border = '1px solid #A18A68';
      headerUnderline.style.transition = 'border 0.3s ease-in-out';
      popupWindow.style.visibility = 'visible';
      popupWindow.style.opacity = 1;
      popupWindow.style.transition = 'opacity 0.3s ease-in-out';

      if (totalCountCart === 0) {
        totalCountCart = +amountAddCart.textContent;
        navCartCount.style.display = 'flex';
        navCartCount.textContent = +amountAddCart.textContent;
        localStorage.setItem('totalCountCart', totalCountCart);
      } else {
        totalCountCart =
          parseInt(totalCountCart) + parseInt(amountAddCart.textContent);
        navCartCount.textContent = totalCountCart;
        localStorage.setItem('totalCountCart', totalCountCart);
      }
      if (totalCountCart > 100) {
        navCartCount.textContent = 99;
      }
      productInfo(+amountAddCart.textContent);
      console.log(+amountAddCart.textContent);
      amountAddCart.textContent = 1;
      console.log(+amountAddCart.textContent);

      setTimeout(() => {
        headerUnderline.style.border = '1px solid #d8d8d8';
        popupWindow.style.opacity = '0';
        btnAddtoCart.disabled = false; // Знову включаємо кнопку
        btnAddtoCart.addEventListener('click', handleClick); // Додаємо обробник подій
      }, 3000);
    }

    btnAddtoCart.addEventListener('click', handleClick);

    const productInfo = (amount) => {
      const productName = document.querySelector(
        '.product--overview__view h3'
      ).textContent;
      console.log('productInfo  productName:', productName);
      const productPrice = document.querySelector(
        '.shop-latest__price a'
      ).textContent;
      console.log('productInfo  productPrice:', productPrice);
      const productImg = document.querySelector('.picture-big').src;
      console.log('productInfo  productImg:', productImg);

      // Перевіряємо, чи вже є продукт з такою назвою в кошику
      const existingProductIndex = allProductCart.findIndex(
        (product) => product.name === productName
      );

      if (existingProductIndex !== -1) {
        // Якщо знайдено, змінюємо amount для існуючого продукту
        allProductCart[existingProductIndex].count += amount;
      } else {
        // Якщо не знайдено, додаємо новий об'єкт до масиву
        const newProduct = {
          name: productName,
          price: productPrice,
          imgProduct: productImg,
          count: amount,
        };
        allProductCart.push(newProduct);
      }

      // Зберігаємо оновлений масив у localStorage
      localStorage.setItem('allProductCart', JSON.stringify(allProductCart));
    };
  }

  //
});
