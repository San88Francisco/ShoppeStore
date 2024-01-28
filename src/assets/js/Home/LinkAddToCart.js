export const LinkAddToCart = (contents) => {
  // console.log('contents:', contents);
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
    console.log('foundProduct:', foundProduct.amount);

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

    // console.log(foundProduct);

    // Отримати текст з першого елементу <a>
    const firstPrice =
      itemPrice.querySelector('.price-discount') ||
      itemPrice.querySelector('a');

    // // Отримати текст з другого елементу <a>
    const secondPrice = itemPrice.querySelector('.discount');

    // console.log('First Price:', firstPrice);
    // console.log('Second Price:', secondPrice);

    const existingProductIndex = allProductCart.findIndex(
      (product) => product.name === productName
    );
    // console.log('existingProductIndex:', existingProductIndex);

    if (existingProductIndex !== -1) {
      allProductCart[existingProductIndex].count += foundProduct.amount;
      console.log(allProductCart);
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
      // console.log(newProduct);
      allProductCart.push(newProduct);
      console.log(allProductCart);
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
        shopLatestPrice[index],
        shopLatestName[index].textContent
      );
    });
  });
};
