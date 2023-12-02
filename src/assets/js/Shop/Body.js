// Shop page Team B
const discountElements = document.querySelectorAll('.shop-latest__block');

discountElements.forEach((el) => {
  const addDiscountElement = el.firstElementChild;

  if (addDiscountElement.classList.contains('add-discount')) {
    const priceElement = el.querySelector('.shop-latest__price');
    priceElement.firstElementChild.classList.add('price-discount');

    const h1 = priceElement.textContent.trim();
    const contentValue =
      parseFloat(
        window
          .getComputedStyle(addDiscountElement, '::before')
          .getPropertyValue('content')
          .replace(/["%-]/g, '')
      ) / 100;

    const h1value = parseFloat(h1.slice(2).replace(',', '.'));
    const disc = h1value - h1value * contentValue;

    const discount = `<a href="#">$ ${disc}</a>`;
    priceElement.insertAdjacentHTML('beforeend', discount);
  }
});