function setupHeader() {
  const userSignIn = localStorage.getItem("userSignIn");
  if (userSignIn !== null) {
    const accountLink = document.querySelector(".account__href");
    if (accountLink) {
      accountLink.setAttribute("href", "./my-account.html");
    }
  }

  const pageName = document.title.toLowerCase().replace(/\s/g, "");

  // Виходимо, якщо сторінка "home"
  if (pageName === "home") return;

  const header__underline = document.querySelector(".header__underline");
  header__underline.style.display = "block";

  const headerAElement = document.querySelector(`.header_link_${pageName}`);
  headerAElement !== null ? headerAElement.classList.add("act") : 0;
  pageName === "account" && headerAElement !== null
    ? headerAElement.classList.add("act__last")
    : 0;
  pageName === "myaccount" && headerAElement !== null
    ? headerAElement.classList.add("act__last")
    : 0;

  pageName !== "home" ? (header__underline.style.display = "block") : 0;
}

document.addEventListener("DOMContentLoaded", function () {
  setupHeader();

  const navCartCount = document.querySelector(".cart__count");

  function updateNavCartCount() {
    let navCartValid = localStorage.getItem("totalCountCart") || 0;

    if (+navCartValid > 0) {
      navCartCount.style.display = "flex";
      navCartCount.textContent = localStorage.getItem("totalCountCart");
    } else {
      navCartCount.style.display = "none";
    }
  }

  updateNavCartCount();

  window.addEventListener("storage", updateNavCartCount);

  function isElementVisible(element) {
    return window.getComputedStyle(element).display !== "none";
  }

  const accountToggle = document.getElementById("accountToggle");
  const accountDropdown = document.getElementById("accountDropdown");
  const logoutButton = document.getElementById("logout");

  accountToggle.addEventListener("click", function (event) {
    event.preventDefault();
    if (isElementVisible(accountDropdown)) {
      accountDropdown.style.display = "none";
    } else {
      accountDropdown.style.display = "block";
    }
  });

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Додайте код для виходу з акаунта
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".account__href") &&
      !event.target.closest(".account-dropdown")
    ) {
      accountDropdown.style.display = "none";
    }
  });
});
