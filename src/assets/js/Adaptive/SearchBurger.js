const PAGES = ["index", "shop", "contact", "index", "shop", "contact"]; // Додайте імена всіх існуючих сторінок
const PAGE_NOT_FOUND = "error404.html";

document.addEventListener("DOMContentLoaded", function () {
   const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
   // Перевірка, чи поточна сторінка належить до списку існуючих сторінок
   const pageExists = PAGES.includes(currentPage);

   // Перевірка, чи сторінка 404 вже відображається
   const is404Page = currentPage.toLowerCase() === "error404";


   if (!pageExists && !is404Page) {
      redirectTo404();
   }

   function redirectTo404() {
      window.location.href = PAGE_NOT_FOUND;
   }
});