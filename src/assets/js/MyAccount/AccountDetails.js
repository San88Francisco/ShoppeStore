export const accountDetails = () => {
  const myProfile = JSON.parse(localStorage.getItem('myProfile'));
  console.log(' myProfile:', myProfile);

  const detailsFirstName = document.querySelector(
    '.account__details-firstName'
  );
  const detailsLastName = document.querySelector('.account__details-lastName');
  const detailsDisplayName = document.querySelector(
    '.account__details-displayName'
  );
  const detailsPhone = document.querySelector('.account__details-phone');
  const detailsFirstEmail = document.querySelector('.account__details-email');

  detailsFirstName.value = myProfile.nameInput;
  detailsLastName.value = myProfile.lastNameInput;
  detailsDisplayName.value = myProfile.displayName || '';
  detailsPhone.value = myProfile.phone || '';
  detailsFirstEmail.value = myProfile.emailInput;

  const btnSaveDetails = document.querySelector('.save__account-details');
  btnSaveDetails.addEventListener('click', () => {
    myProfile.nameInput = detailsFirstName.value;
    myProfile.lastNameInput = detailsLastName.value;
    myProfile.displayName = detailsDisplayName.value;
    myProfile.phone = detailsPhone.value;
    myProfile.emailInput = detailsFirstEmail.value;

    localStorage.setItem('myProfile', JSON.stringify(myProfile));
    localStorage.setItem('userSignIn', JSON.stringify(myProfile.emailInput));
  });

  // Password logic
  const accountDetailsPass = document.querySelector('.account__details-pass');
  const accountDetailsMewPass = document.querySelector(
    '.account__details-newPass'
  );
  const accountConfirmPass = document.querySelector('.account__confirm-pass');

  const btnSavePass = document.querySelector('.save__account-password');
  btnSavePass.addEventListener('click', () => {
    myProfile.passwordInput = accountConfirmPass.value;

    localStorage.setItem('myProfile', JSON.stringify(myProfile));
  });
};
