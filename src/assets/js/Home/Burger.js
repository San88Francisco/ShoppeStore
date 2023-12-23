function setupHeader() {
   const pageName = document.title.toLowerCase().replace(/\s/g, "");
   if (pageName === "home") return;

   const burger__underline = document.querySelector(".burger__underline");
   burger__underline.style.display = "none";

   const headerAElement = document.querySelector(`.burger__link_${pageName}`);
   headerAElement?.classList.add("burg");
   pageName !== "home" && (burger__underline.style.display = "none");
}

document.addEventListener("DOMContentLoaded", setupHeader);

document.addEventListener("DOMContentLoaded", function () {
   const checkbox = document.querySelector(".checkbox");
   const menuItems = document.querySelector(".menu-items");
   const burgerItems = document.querySelectorAll(".burger-menu__item");
   const burgerHeader = document.querySelector(".burger__header");
   const burgerFooter = document.querySelector(".burger__footer");
   const burgerLogout = document.querySelector(".burger__logout");
   const burgerLine = document.querySelector(".burger-line");

   checkbox.addEventListener("click", function () {
      this.classList.toggle("active");
      menuItems.classList.toggle("active");

      burgerItems.forEach((item) => {
         item.classList.toggle("active");
      });

      burgerFooter.classList.toggle("active");
      burgerLogout.classList.toggle("active");
      burgerHeader.classList.toggle("active");
      burgerLine.classList.toggle("active");
   });
});
