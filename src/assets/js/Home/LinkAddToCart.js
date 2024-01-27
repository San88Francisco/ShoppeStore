export const LinkAddToCart = (contents) => {
  console.log('contents:', contents);
  let allProductCart = JSON.parse(localStorage.getItem('allProductCart')) || [];

  const addProductToCart = (itemBlock, productName) => {
    console.log('product:', productName);
    const foundProduct = contents.find((item) => {
      return item.name === productName;
    });
    console.log(foundProduct);

    console.log(itemBlock);

    const newProduct = {
      name: foundProduct.name,
      /** Перевірка чи товар має знижку, якщо ні, то присвоюємо просто ціну */
      //   price: foundProduct.discountPrice ? foundProduct.textContent : productPrice,
      /** Перевірка чи це знижка, якщо ні то записуємо пусту строку */
      //   discountPrice: discount ? discount.textContent : '',
      imgProduct: foundProduct.imageUrl,
      count: foundProduct.amount,
    };
    allProductCart.push(newProduct);

    localStorage.setItem('allProductCart', JSON.stringify(allProductCart));
  };

  const shopLatestHoverContainer = document.querySelectorAll(
    '.shop-latest_hover_container'
  );
  //   const discountPrice = document.querySelectorAll(
  //     '.shop-latest__price .price-discount'
  //   );
  //   console.log('  discountPrice:', discountPrice);
  //   // Створюємо змінну із знижкою
  //   const discount = document.querySelectorAll('.shop-latest__price .discount');
  //   console.log('  discount:', discount);
  //   const productPrice = document.querySelectorAll('.shop-latest__price a');
  //   console.log(productPrice);

  const shopLatestBlock = document.querySelectorAll('.shop-latest__block');

  const shopLatestName = document.querySelectorAll('.shop-latest__name');

  shopLatestHoverContainer.forEach((link, index) => {
    link.addEventListener('click', () => {
      addProductToCart(
        shopLatestBlock[index],
        shopLatestName[index].textContent
      );
    });
  });
};
