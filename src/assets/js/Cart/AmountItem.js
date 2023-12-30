export const amountItem = () => {
  const btnDecrease = document.querySelector('.minus');
  const btnIncrease = document.querySelector('.plus');
  const numberOfShoppings = document.querySelector('.amount');

  if (btnDecrease && btnIncrease && numberOfShoppings) {
    btnIncrease.addEventListener('click', function () {
      let numberOfShoppingsValue = +numberOfShoppings.textContent;
      numberOfShoppings.textContent = `${++numberOfShoppingsValue}`;
      if (numberOfShoppingsValue === 100) {
        return numberOfShoppings.textContent = `${--numberOfShoppingsValue}`;
      }
    });

    btnDecrease.addEventListener('click', function () {
      let numberOfShoppingsValue = +numberOfShoppings.textContent;
      if (numberOfShoppingsValue === 1) return;
      numberOfShoppings.textContent = `${--numberOfShoppingsValue}`;
    });
  }
};
