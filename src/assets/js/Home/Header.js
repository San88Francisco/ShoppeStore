document.addEventListener("DOMContentLoaded", function () {
  function isElementVisible(element) {
    return window.getComputedStyle(element).display !== "none";
  }

  const accountDropdownWrapper = document.getElementById(
    "accountDropdownWrapper"
  );
  const accountToggle = document.getElementById("accountToggle");
  const accountDropdown = document.getElementById("accountDropdown");
  const logoutButton = document.getElementById("logout");

  accountToggle.addEventListener("click", function (event) {
    event.preventDefault();
    accountDropdownWrapper.classList.toggle("active");
  });

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Додайте код для виходу з акаунта
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest("#accountDropdownWrapper")) {
      accountDropdownWrapper.classList.remove("active");
    }
  });
});
