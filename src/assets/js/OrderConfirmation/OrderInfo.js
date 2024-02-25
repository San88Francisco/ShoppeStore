export const orderInfo = () => {
  let checkoutInfo = [];

  const checkoutPopupOrder = localStorage.getItem('checkoutPopupOrder');
  checkoutPopupOrder;
  if (checkoutPopupOrder == 0) {
    checkoutInfo = JSON.parse(localStorage.getItem('userOrderInfo'));
    checkoutInfo;
  } else {
    checkoutInfo = JSON.parse(localStorage.getItem('userAddressInfo'));
    checkoutInfo;
  }

  document.querySelector('.order__number').textContent =
    checkoutInfo.orderNumber;
  document.querySelector('.order__email').textContent = checkoutInfo.email;
  document.querySelector('.order__payment').textContent =
    checkoutInfo.paymentMethod;
  document.querySelector('.order__date').textContent = checkoutInfo.date;
  document.querySelector('.order__delivery').textContent = 'Standard delivery';
  document.querySelector('.order__address-country').textContent =
    checkoutInfo.country;
  document.querySelector('.order__address-city').textContent =
    checkoutInfo.city;
  document.querySelector('.order__address-street').textContent =
    checkoutInfo.street;
  document.querySelector('.order__address-postcode').textContent =
    checkoutInfo.postcode;
  document.querySelector('.order__contact-phone').textContent =
    checkoutInfo.phone;
};
