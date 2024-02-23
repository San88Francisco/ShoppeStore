export const amountItem = () => {
  const btnDecreaseCart = document.querySelectorAll('.minus__cart');
  const btnIncreaseCart = document.querySelectorAll('.plus__cart');
  const numberOfShoppings = document.querySelectorAll('.amount');

  const btnDecreaseTel = document.querySelectorAll('.minus_tel');
  const btnIncreaseTel = document.querySelectorAll('.plus_tel');

  if (
    btnDecreaseCart.length &&
    btnIncreaseCart.length &&
    numberOfShoppings.length &&
    btnDecreaseTel &&
    btnIncreaseTel
  ) {
    btnIncreaseCart.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        // Якщо в кошику вибрано товара більше 99, тоді зупиняємо функцію. Таким чином максимально буде 99 товарів
        if (numberOfShoppingsValue === 99) {
          return;
        }
        numberOfShoppings[index].textContent = `${++numberOfShoppingsValue}`;
      });
    });
    // Кнопка плюс для телефонів
    btnIncreaseTel.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        numberOfShoppings[index].textContent = `${++numberOfShoppingsValue}`;
      });
    });

    btnDecreaseCart.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        if (numberOfShoppingsValue === 1) return;
        numberOfShoppings[index].textContent = `${--numberOfShoppingsValue}`;
      });
    });
    // Кнопка мінус для телефонів
    btnDecreaseTel.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
        if (numberOfShoppingsValue === 1) return;
        numberOfShoppings[index].textContent = `${--numberOfShoppingsValue}`;
      });
    });
  }
};
