import { placeOrder } from "./PlaceOrder";

document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/checkout-pages')) {

    const checkboxCreate = document.querySelectorAll(
      '.checkout__checkbox-create div'
    );
    const checkedCreate = document.querySelectorAll(
      '.checkout__checkbox-create input'
    );
    
    checkboxCreate.forEach((checked, index) => {
      checked.addEventListener('click', () => {
        // console.log(checkedCreate[index]);
        checkedCreate[index].checked = !checkedCreate[index].checked;
      });
    });
    
    const blockOrderItem = document.querySelector('.block__order-item')
    const orderSubTotal = document.querySelector('.order__subtotal')
    const orderShipping = document.querySelector('.order__shipping')
    const orderTotal = document.querySelector('.order__total')


    const {info, item}  = JSON.parse(localStorage.getItem('checkoutInfo'));
    // console.log("info:", ...info)


    item.map(({name, price, count}) => {
      blockOrderItem.innerHTML += `
      <div>
        <p>${name}</p>
        <p>${count} pc.</p>
        <p>$${price}</p>
      </div>
    `
    })
    orderSubTotal.textContent = `$${info[0].subTotal}`
    orderShipping.textContent = `$${info[0].shipping}`
    orderTotal.textContent = `$${info[0].totalPrice}`


    const checkboxPaymentDivs = document.querySelectorAll('.checkout__checkbox-payment div');
    const nuancesPayment = document.querySelectorAll('.nuances__payment');
    // console.log("nuancesPayment:", nuancesPayment)
    
    let paymentMethod = 'Direct bank transfer';

    checkboxPaymentDivs.forEach((div, index) => {
      const radioInput = div.querySelector('input[type="radio"]');
    
      radioInput.addEventListener('change', () => {

        nuancesPayment.forEach((paymentInfo) => {
          paymentInfo.style.display = 'none';
        });

        switch (index) {
          case 0:
          case 1:
          case 2:
          case 3:
            nuancesPayment[index].style.display = 'block';
            paymentMethod = radioInput.value;
            console.log("paymentMethod:", paymentMethod);
            break;
          default:
            break;
        }

      });
    });
    
    const btnPlaceOrder = document.querySelector('.btn__place-order');
    btnPlaceOrder.addEventListener('click', () => placeOrder(paymentMethod));

  }
})



















// const checkboxPayment = document.querySelectorAll('.checkout__checkbox-payment div');
// const checkedPayment = document.querySelectorAll('.checkout__checkbox-payment input');

// checkboxPayment.forEach((checked,index) => {
//     checked.addEventListener('click', () => {
//         console.log(checkedPayment[index]);
//         checkedPayment[index].checked = !checkedPayment[index].checked;
//     })
// });
