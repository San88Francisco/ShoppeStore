document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/product')) {
    //
    const btnAddtoCart = document.querySelector('.add-to-cart');
    const popupWindow = document.querySelector('.cart__window-block');
    const headerUnderline = document.querySelector('.header__underline');
    const amountAddCart = document.querySelector('.amount');
    const navCartCount = document.querySelector('.cart__count');

    let countCart = localStorage.getItem('countCart') || 0;
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

      if (countCart === 0) {
        countCart = +amountAddCart.textContent;
        navCartCount.style.display = 'flex';
        navCartCount.textContent = +amountAddCart.textContent;
        localStorage.setItem('countCart', countCart);
      } else {
        countCart = parseInt(countCart) + parseInt(amountAddCart.textContent);
        navCartCount.textContent = countCart;
        localStorage.setItem('countCart', countCart);
      }
      if (countCart > 100) {
        navCartCount.textContent = 99;
        console.log('2');
      }
      amountAddCart.textContent = 1;
      productInfo(countCart);

      setTimeout(() => {
        headerUnderline.style.border = '1px solid #d8d8d8';
        popupWindow.style.opacity = '0';
        btnAddtoCart.disabled = false; // Знову включаємо кнопку
        btnAddtoCart.addEventListener('click', handleClick); // Додаємо обробник подій
      }, 5000);
    }

    btnAddtoCart.addEventListener('click', handleClick);

    const productInfo = (countCart) => {
      console.log('Працює 1');
      // if (allProductCart.length)
      const test = [1];
      console.log(!test.length);

      allProductCart.filter((item, index) => {
        let name = allProductCart[index].name;
        console.log('Працює 2');
        if (item.name != name) {
          console.log('good');
        }
        console.log('Працює 3');
        const blockData = {
          name: document.querySelector('.product--overview__view h3')
            .textContent,
          price: document.querySelector('.product--overview__view .price')
            .textContent,
          imgProduct: document.querySelector('.picture-big').src,
          count: countCart,
        };

        allProductCart.push(blockData);
        console.log('productInfo  blockData:', blockData);

        localStorage.setItem('allProductCart', JSON.stringify(allProductCart));
        console.log('productInfo  allProductCart:', allProductCart);
      });
    };

    //
  }
});
