export const amountItem = () => {
  const btnDecrease = document.querySelectorAll('.minus');
  const btnIncrease = document.querySelectorAll('.plus');
  const numberOfShoppings = document.querySelectorAll('.amount');

  if (btnDecrease.length && btnIncrease.length && numberOfShoppings.length) {
    btnIncrease.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        // Якщо в кошику вибрано товара більше 99, тоді зупиняємо функцію. Таким чином максимально буде 99 товарів
        if (numberOfShoppingsValue === 99) {
          return;
        }
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
