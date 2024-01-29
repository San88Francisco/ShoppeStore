import { accountDetails } from './AccountDetails';
import { addressEdit } from './AddressEdit';
import { deleteAccount } from './DeleteAccount';
import { myAddress } from './MyProfileAddress';

export const myProfile = () => {
  addressEdit();
  myAddress();
  accountDetails();
  deleteAccount();

  const {
    nameInput,
    lastNameInput,
    emailInput,
    dataCreation,
    displayName,
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

  profileDisplayName.textContent = displayName ? displayName : 'Need to enter';
  profilePhone.textContent = phone ? phone : 'Need to enter';

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

  const btnEditProfile = document.querySelector('.profile__edit-btn');
  // Перехід з MyProfile на Account details при кліку на кнопку edit profile
  btnEditProfile.addEventListener('click', () => {
    const targetProfile = document.querySelector('.targetOf-logout');
    const targetAddress = document.querySelector('.targetOf-accountDetails');
    const clickLogout = document.querySelector('.click-logout');
    const clickAddress = document.querySelector('.click-accountDetails');
    clickLogout.classList.remove('act');
    clickAddress.classList.add('act');
    targetProfile.style.display = 'none';
    targetAddress.style.display = 'flex';
  });
};
