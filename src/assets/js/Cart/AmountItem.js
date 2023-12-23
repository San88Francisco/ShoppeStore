export const amountItem = () => {
  const btnDecrease = document.querySelectorAll('.minus');
  const btnIncrease = document.querySelectorAll('.plus');
  const numberOfShoppings = document.querySelectorAll('.amount');

  if (btnDecrease.length && btnIncrease.length && numberOfShoppings.length) {
    btnIncrease.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        numberOfShoppings[index].textContent = `${++numberOfShoppingsValue}`;
      });
    });

    btnDecrease.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        if (numberOfShoppingsValue === 1) return;
        numberOfShoppings[index].textContent = `${--numberOfShoppingsValue}`;
      });
    });
  }
};
