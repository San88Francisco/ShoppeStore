document.addEventListener('DOMContentLoaded', function () {
    const clearIconMail = document.querySelector('.clear-icon_mail');
    const clearIconPassword = document.querySelector('.clear-icon_pass');

    const inputMail = document.querySelector('.input_mail');
    const inputPassword = document.querySelector('.input_pass');
  
    clearIconMail.addEventListener('click', function () {
      inputMail.value = '';
    
    });
    clearIconPassword.addEventListener('click', function () {
        inputPassword.value = '';
      });

}); 