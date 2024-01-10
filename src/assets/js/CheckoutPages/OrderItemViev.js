export const orderItemViev = () => {
  const blockOrderItem = document.querySelector('.block__order-item');
  const orderSubTotal = document.querySelector('.order__subtotal');
  const orderShipping = document.querySelector('.order__shipping');
  const orderTotal = document.querySelector('.order__total');

  const { info, item } = JSON.parse(localStorage.getItem('checkoutInfo'));
  // console.log("info:", ...info)

  item.map(({ name, price, count }) => {
    blockOrderItem.innerHTML += `
      <div>
        <p>${name}</p>
        <p>${count} pc.</p>
        <p>$${price.toFixed(2)}</p>
      </div>
    `;
  });
  orderSubTotal.textContent = `$${info[0].subTotal}`;
  orderShipping.textContent = `$${info[0].shipping}`;
  orderTotal.textContent = `$${info[0].totalPrice}`;
};
