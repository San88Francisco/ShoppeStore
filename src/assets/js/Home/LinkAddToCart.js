export const LinkAddToCart = (contents) => {
  let priceIndex = 0;

  if (contents.length === 3) {
    priceIndex += 1;
  }

  let allProductCart = JSON.parse(localStorage.getItem('allProductCart')) || [];
  let totalCountCart = localStorage.getItem('totalCountCart') || 0;

  const navCartCount = document.querySelector('.cart__count');

  const popupWindow = document.querySelector('.item__window-block');
  const headerUnderline = document.querySelector('header');

  const addProductToCart = (itemPrice, productName) => {
    headerUnderline.style.borderBottom = '1.5px solid #A18A68';
    headerUnderline.style.transition = 'border 0.3s ease-in-out';
    popupWindow.style.visibility = 'visible';
    popupWindow.style.opacity = 1;
    popupWindow.style.transition = 'opacity 0.3s ease-in-out';

    setTimeout(() => {
      headerUnderline.style.borderBottom = '1.5px solid #d8d8d8';
      popupWindow.style.opacity = '0';
    }, 3000);

    const foundProduct = contents.find((item) => {
      return item.name === productName;
    });
    'foundProduct:', foundProduct.amount;

    if (totalCountCart === '0' || !totalCountCart) {
      // Якщо в кошику пусто, це означає що перше значення буде яке ми виберемо в amount
      totalCountCart = foundProduct.amount;
      navCartCount.style.display = 'flex';
      navCartCount.textContent = foundProduct.amount;
      // Записуємо перше значення totalCountCart в localStorage
      localStorage.setItem('totalCountCart', totalCountCart);
    } else {
      // Якщо в localStorage вже є якась кількість, тоді ми просто додаємо amount і totalCountCart
      totalCountCart = parseInt(totalCountCart) + foundProduct.amount;
      navCartCount.textContent = totalCountCart;
      localStorage.setItem('totalCountCart', totalCountCart);
    }

    // Отримати текст з першого елементу <a>
    const firstPrice =
      itemPrice.querySelector('.price-discount') ||
      itemPrice.querySelector('a');

    // Отримати текст з другого елементу <a>
    const secondPrice = itemPrice.querySelector('.discount');

    const existingProductIndex = allProductCart.findIndex(
      (product) => product.name === productName
    );

    if (existingProductIndex !== -1) {
      allProductCart[existingProductIndex].count += foundProduct.amount;
    } else {
      const newProduct = {
        name: foundProduct.name,
        /** Перевірка чи товар має знижку, якщо ні, то присвоюємо просто ціну */
        price: firstPrice.textContent,
        /** Перевірка чи це знижка, якщо ні то записуємо пусту строку */
        discountPrice: secondPrice ? secondPrice.textContent : '',
        imgProduct: foundProduct.imageUrl,
        count: foundProduct.amount,
      };
      allProductCart.push(newProduct);
    }

    localStorage.setItem('allProductCart', JSON.stringify(allProductCart));
  };
  const shopLatestHoverContainer = document.querySelectorAll(
    '.shop-latest_hover_container'
  );
  const shopLatestPrice = document.querySelectorAll('.shop-latest__price');
  const shopLatestName = document.querySelectorAll('.shop-latest__name');

  shopLatestHoverContainer.forEach((link, index) => {
    link.addEventListener('click', () => {
      addProductToCart(
        shopLatestPrice[index + priceIndex],
        shopLatestName[index].textContent
      );
    });
  });
};
