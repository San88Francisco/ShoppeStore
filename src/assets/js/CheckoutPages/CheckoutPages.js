import { placeOrder } from './placeOrder.1';
import { orderItemViev } from './OrderItemViev';

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

    orderItemViev();

    const checkboxPaymentDivs = document.querySelectorAll(
      '.checkout__checkbox-payment div'
    );
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
            // console.log('paymentMethod:', paymentMethod);
            break;
          default:
            break;
        }
      });
    });

    const btnPlaceOrder = document.querySelector('.btn__place-order');
    btnPlaceOrder.addEventListener('click', (elem) => {
      // elem.preventDefault();
      placeOrder(paymentMethod);
    });
  }
});
