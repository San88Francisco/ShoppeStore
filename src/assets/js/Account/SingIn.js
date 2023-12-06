document.addEventListener("DOMContentLoaded", function () {
  // Переконайтеся, що елементи існують перед викликом addEventListener
  const clearIconMail = document.querySelector(".clear-icon_mail");
  const clearIconPassword = document.querySelector(".clear-icon_pass");
  const inputMail = document.querySelector(".input_mail");
  const inputPassword = document.querySelector(".input_pass");

  if (clearIconMail && clearIconPassword && inputMail && inputPassword) {
    // Додайте слухачів подій тільки якщо елементи знайдені
    clearIconMail.addEventListener("click", function () {
      inputMail.value = "";
    });

    clearIconPassword.addEventListener("click", function () {
      inputPassword.value = "";
    });
  }
});