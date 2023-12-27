export const discount = () => {
  // Shop page Team B
  const discountElements = document.querySelectorAll('.shop-latest__block');

  discountElements.forEach((el) => {
    const labelContainer = el.querySelector('.label-container');

    if (labelContainer && labelContainer.querySelector('.add-discount')) {
      const priceElement = el.querySelector('.shop-latest__price');

      priceElement.firstElementChild.classList.add('price-discount');

      const h1 = priceElement.textContent.trim();

      const discountValue =
        (parseInt(el.querySelector('.add-discount').textContent) * -1) / 100;

      const h1value = parseFloat(h1.slice(2).replace(',', '.'));

      const disc = h1value - h1value * discountValue;

      const discount = `<a href="#" class="discount">$ ${disc
        .toFixed(2)
        .replace('.', ',')}</a>`;

      priceElement.insertAdjacentHTML('beforeend', discount);
    }
  });
};
