export const validationInfo = () => {
  const inputFields = document.querySelectorAll('.checkout__block-name input');
  //   console.log('validationInfo  input:', inputFields);

  inputFields.forEach((inputField, index) => {
    inputField.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        console.log(inputFields[index]);
        console.log('1');
      } else {
        console.log('2');
      }
    });
    if (inputName.value != 2) {
        
    }
  });
};
