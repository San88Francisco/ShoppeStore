export const amountItem = () => {
  const btnDecrease = document.querySelectorAll('.minus');
  const btnIncrease = document.querySelectorAll('.plus');
  const numberOfShoppings = document.querySelectorAll('.amount');

  const btnDecreaseTel = document.querySelectorAll('.minus_tel');
  const btnIncreaseTel = document.querySelectorAll('.plus_tel');
  

  if (btnDecrease.length && btnIncrease.length && numberOfShoppings.length && btnDecreaseTel && btnIncreaseTel) {
    btnIncrease.forEach((button, index) => {
      button.addEventListener('click', () => {
        let numberOfShoppingsValue = +numberOfShoppings[index].textContent;
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

   
    
    btnDecrease.forEach((button, index) => {
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
