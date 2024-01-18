export const addressEdit = () => {

  const btnSaveChanges = document.querySelector('.btn__address-edit');
  console.log('addressEdit  btnSaveChanges:', btnSaveChanges);

  const addressFirstName = document.querySelector('.address__first-name');
  const addressLastName = document.querySelector('.address__last-name');
  const addressCountry = document.querySelector('.address__country');
  const addressCity = document.querySelector('.address__city');
  const addressStreet = document.querySelector('.address__street');
  const addressPostcode = document.querySelector('.address__postcode');
  const addressPhone = document.querySelector('.address__phone');
  const addressEmail = document.querySelector('.address__email');

  const userAddressInfo =
  JSON.parse(localStorage.getItem('userAddressInfo')) || false;
  console.log('placeOrder  userAddressInfo:', userAddressInfo);

  if (userAddressInfo) {
    addressFirstName.value = userAddressInfo.name;
    addressLastName.value = userAddressInfo.lastName;
    addressCountry.value = userAddressInfo.country;
    addressCity.value = userAddressInfo.city;
    addressStreet.value = userAddressInfo.street;
    addressPostcode.value = userAddressInfo.postcode;
    addressPhone.value = userAddressInfo.phone;
    addressEmail.value = userAddressInfo.email;
  }

  btnSaveChanges.addEventListener('click' , ()=> {
    const blockData = {
      name: addressFirstName.value,
      lastName: addressLastName.value,
      country: addressCountry.value,
      city: addressCity.value,
      street: addressStreet.value,
      postcode: addressPostcode.value,
      phone: addressPhone.value,
      email: addressEmail.value,
    };
  
    localStorage.setItem('userAddressInfo', JSON.stringify(blockData));
  })



};
