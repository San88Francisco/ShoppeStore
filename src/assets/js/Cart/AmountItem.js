export const amountItem = () => {
  const btnDecreaseTel = document.querySelectorAll('.minus_tel');
  const btnIncreaseTel = document.querySelectorAll('.plus_tel');
  const numberOfShoppings = document.querySelectorAll('.amount');

  if (
    btnDecreaseTel.length &&
    btnIncreaseTel.length &&
    numberOfShoppings.length
  ) {
    btnIncreaseTel.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        numberOfShoppings[index].textContent = `${++numberOfShoppingsValue}`;
      });
    });

    btnDecreaseTel.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        if (numberOfShoppingsValue === 1) return;
        numberOfShoppings[index].textContent = `${--numberOfShoppingsValue}`;
      });
    });
  }
};
