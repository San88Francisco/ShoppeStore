const PAGES = [, "shop", "contact", "index", "shop", "contact", "index", "shop", "contact"]; // Додайте імена всіх існуючих сторінок
const PAGE_NOT_FOUND = "error404.html";

document.addEventListener("DOMContentLoaded", function () {
   const currentPage = window.location.pathname.split("/").pop().replace(".html", "");

   // Перевірка, чи сторінка 404 вже відображається
   const pageExists = currentPage.toLowerCase() === "error404";

   // Перевірка, чи поточна сторінка належить до списку існуючих сторінок
   const is404Page = PAGES.includes(currentPage);

   // if (!pageExists && !is404Page) {
   //    redirectTo404();
   // }
   if (!is404Pagef && !pageExists) {
      redirectTo404();
   }

   function redirectTo404() {
      window.location.href = PAGE_NOT_FOUND;
   }
});


