export const orderInfo = () => {
  const checkoutInfo = JSON.parse(localStorage.getItem('userOrderInfo'));
  console.log('  checkoutInfo:', checkoutInfo);
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const dateSeconds = Math.floor(date.getTime() / 10000);

  document.querySelector('.order__number').textContent = dateSeconds;
  document.querySelector('.order__email').textContent = checkoutInfo.email;
  document.querySelector('.order__payment').textContent =
    checkoutInfo.paymentMethod;
  document.querySelector('.order__date').textContent = currentDate;
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

  // localStorage.removeItem('userOrderInfo');
};
