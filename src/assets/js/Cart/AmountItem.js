export const amountItem = () => {
  const btnDecreaseTel = document.querySelectorAll('.minus_tel');
  const btnIncreaseTel = document.querySelectorAll('.plus_tel');
  const numberOfShoppings = document.querySelectorAll('.amountCart');

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

  const btnDecreasePc = document.querySelectorAll('.minus__cart');
  const btnIncreasePc = document.querySelectorAll('.plus__cart');
  const numberOfShoppingsPc = document.querySelectorAll('.amountCart');

  if (
    btnDecreasePc.length &&
    btnIncreasePc.length &&
    numberOfShoppings.length
  ) {
    btnIncreasePc.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValuePc = +numberOfShoppingsPc[index].textContent;
        numberOfShoppingsPc[
          index
        ].textContent = `${++numberOfShoppingsValuePc}`;
      });
    });

    btnDecreasePc.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValuePc = +numberOfShoppingsPc[index].textContent;
        if (numberOfShoppingsValuePc === 1) return;
        numberOfShoppingsPc[
          index
        ].textContent = `${--numberOfShoppingsValuePc}`;
      });
    });
  }
};
