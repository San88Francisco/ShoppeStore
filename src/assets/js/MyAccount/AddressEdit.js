export const addressEdit = () => {
  console.log('good');

  const btnSaveChanges = document.querySelector('.btn__address-edit');
  console.log('addressEdit  btnSaveChanges:', btnSaveChanges);

  const addressFirstName = document.querySelector('.address__first-name').value;
  const addressLastName = document.querySelector('.address__last-name').value;
  const addressCountry = document.querySelector('.address__country').value;
  const addressCity = document.querySelector('.address__city').value;
  const addressStreet = document.querySelector('.address__street').value;
  const addressPostcode = document.querySelector('.address__postcode').value;
  const addressPhone = document.querySelector('.address__phone').value;
  const addressEmail = document.querySelector('.address__email').value;

  const blockData = {
    name: addressFirstName,
    lastName: addressLastName,
    country: addressCountry,
    city: addressCity,
    street: addressStreet,
    postcode: addressPostcode,
    phone: addressPhone,
    email: addressEmail,
  };

  localStorage.setItem('userOrderInfo', JSON.stringify(blockData));
};
