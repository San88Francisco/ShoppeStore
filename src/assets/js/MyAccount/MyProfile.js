import { addressEdit } from './AddressEdit';

export const myProfile = () => {
  //   console.log('good');
  const {
    nameInput,
    lastNameInput,
    emailInput,
    dataCreation,
    accountName,
    phone,
  } = JSON.parse(localStorage.getItem('myProfile'));
  // console.log('myProfile  profileInfo:', nameInput);

  const profileFirstName = document.querySelector('.user__first-name');
  const profileLastName = document.querySelector('.user__last-name');
  const profileEmail = document.querySelector('.user__email-name');
  const profileDateCreation = document.querySelector('.user__date-creation');
  const profileDisplayName = document.querySelector('.user__display-name');
  const profilePhone = document.querySelector('.user__phone');

  profileFirstName.textContent = nameInput;
  profileLastName.textContent = lastNameInput;
  profileEmail.textContent = emailInput;
  profileDateCreation.textContent = dataCreation;

  profileDisplayName.textContent = accountName ? accountName : 'Not specified';
  profilePhone.textContent = phone ? phone : 'Not specified';

  const btnEditAddress = document.querySelector('.profile__address-btn');

  // Перехід з MyProfile на Address при кліку на кнопку edit address
  btnEditAddress.addEventListener('click', () => {
    const targetProfile = document.querySelector('.targetOf-logout');
    const targetAddress = document.querySelector('.targetOf-addresses');
    const clickLogout = document.querySelector('.click-logout');
    const clickAddress = document.querySelector('.click-addresses');
    clickLogout.classList.remove('act');
    clickAddress.classList.add('act');
    targetProfile.style.display = 'none';
    targetAddress.style.display = 'flex';
  });
  addressEdit();
};
