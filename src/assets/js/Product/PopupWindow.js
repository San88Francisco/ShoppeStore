document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/product')) {
    //
    const btnAddtoCart = document.querySelector('.add-to-cart');
    const popupWindow = document.querySelector('.cart__window-block');
    const headerUnderline = document.querySelector('.header__underline');
    const amountAddCart = document.querySelector('.amount');
    const navCartCount = document.querySelector('.cart__count');

    // Створюємо змінну яка приймає в себе кількість товарів в кошику, якщо в localStorage пусто, буде 0
    let totalCountCart = localStorage.getItem('totalCountCart') || 0;

    // Створюємо змінну яка приймає в себе кількість продуктів в кошику, якщо в localStorage пусто, буде пустий масив
    let allProductCart =
      JSON.parse(localStorage.getItem('allProductCart')) || [];

    function handleClick() {
      // Видаляємо обробник подій, кнопка стає не активна, щоб поки не закінчиться функція ми не могли знову додавати товари в кошик
      btnAddtoCart.removeEventListener('click', handleClick);
      btnAddtoCart.disabled = true;
      // Задаємо стилі для popupWindow і headerUnderline
      headerUnderline.style.border = '1px solid #A18A68';
      headerUnderline.style.transition = 'border 0.3s ease-in-out';
      popupWindow.style.visibility = 'visible';
      popupWindow.style.opacity = 1;
      popupWindow.style.transition = 'opacity 0.3s ease-in-out';

      // Перевірка для правильного відображення загальної кількості товарів в кошику
      if (totalCountCart === 0) {
        // Якщо в кошику пусто, це означає що перше значення буде яке ми виберемо в amount
        totalCountCart = +amountAddCart.textContent;
        navCartCount.style.display = 'flex';
        navCartCount.textContent = +amountAddCart.textContent;
        // Записуємо перше значення totalCountCart в localStorage
        localStorage.setItem('totalCountCart', totalCountCart);
      } else {
        // Якщо в localStorage вже є якась кількість, тоді ми просто додаємо amount і totalCountCart
        totalCountCart =
          parseInt(totalCountCart) + parseInt(amountAddCart.textContent);
        navCartCount.textContent = totalCountCart;
        localStorage.setItem('totalCountCart', totalCountCart);
      }
      // Якщо в кошику більше 99 товарів, ми завжди будемо відображати 99
      if (totalCountCart > 100) {
        navCartCount.textContent = 99;
      }

      // Функція яка створює обєкт з товаром. Тут ми передаємо кількість вибраного товару amountAddCart
      productInfo(+amountAddCart.textContent);
      // Перезаписуємо amount на 1
      amountAddCart.textContent = 1;

      // Функція яка через 5 секунд приховає popupWindow та підправить стилі з headerUnderline
      setTimeout(() => {
        headerUnderline.style.border = '1px solid #d8d8d8';
        popupWindow.style.opacity = '0';
        btnAddtoCart.disabled = false; // Знову включаємо кнопку

        // Додаємо обробник подій, аби кнопка стала активна і можна було додати знову товар
        btnAddtoCart.addEventListener('click', handleClick);
      }, 3000);
    }

    // Подія що запускає додавання товару в кошик
    btnAddtoCart.addEventListener('click', handleClick);

    // Тут ми створюємо наший обєкт та відправляємо його в localStorage
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

      // Якщо знайдено, змінюємо amount для існуючого продукту
      if (existingProductIndex !== -1) {
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
