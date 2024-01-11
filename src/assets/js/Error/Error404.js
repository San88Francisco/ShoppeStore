import { updateAccountLinksVisibility } from "../Account/SingIn.js"; // Шлях до вашого файлу з функцією

const PAGES = [
  "index",
  "shop",
  "blog",
  "cart",
  "account",
  "contact",
  "checkout-pages",
  "help",
  "my-account",
  "our-story",
  "product",
  "reset-password",
  "blog-addopt",
  "order-confirmation",
  "",
]; // Додайте імена всіх існуючих сторінок
const PAGE_NOT_FOUND = "error404.html";

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  const is404Page = currentPage.toLowerCase() === "error404";
  const pageExists = PAGES.includes(currentPage);

  if (!pageExists && !is404Page) {
    redirectTo404();
  } else {
    updateAccountLinksVisibility(); // Тепер ви можете викликати імпортовану функцію
  }

  function redirectTo404() {
    window.location.href = PAGE_NOT_FOUND;
  }
});
