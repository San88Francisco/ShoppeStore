export const myAddress = () => {
    const addressFirstName = document.querySelector('.profile__address-nane');
    const addressLastName = document.querySelector('.profile__address-last');
    const addressCountry = document.querySelector('.profile__address-country');
    const addressCity = document.querySelector('.profile__address-city');
    const addressStreet = document.querySelector('.profile__address-street');
    const addressPostcode = document.querySelector('.profile__address-poscode');
    const addressPhone = document.querySelector('.profile__address-phone');
    const addressEmail = document.querySelector('.profile__address-email');
  
    const userAddressInfo =
    JSON.parse(localStorage.getItem('userAddressInfo')) || false;
    console.log('placeOrder  userAddressInfo:', userAddressInfo);
  
    if (userAddressInfo) {
      addressFirstName.textContent = userAddressInfo.name;
      addressLastName.textContent = userAddressInfo.lastName;
      addressCountry.textContent = userAddressInfo.country;
      addressCity.textContent = userAddressInfo.city;
      addressStreet.textContent = userAddressInfo.street;
      addressPostcode.textContent = userAddressInfo.postcode;
      addressPhone.textContent = userAddressInfo.phone;
      addressEmail.textContent = userAddressInfo.email;
    }


}