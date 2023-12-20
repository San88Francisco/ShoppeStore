function setupHeader() {
  const pageName = document.title.toLowerCase().replace(/\s/g, "");

  // Виходимо, якщо сторінка "home"
  if (pageName === "home") return;

  const burger__underline = document.querySelector(".burger__underline");
  burger__underline.style.display = "none";

  const headerAElement = document.querySelector(`.burger__link_${pageName}`);
  headerAElement !== null ? headerAElement.classList.add("burg") : 0;
  pageName !== "home" ? (burger__underline.style.display = "none") : 0;
}

document.addEventListener("DOMContentLoaded", setupHeader);

document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".checkbox");
  const menuItems = document.querySelector(".menu-items");
  const burgerItem1 = document.querySelector(".burger-menu__item:nth-child(1)");
  const burgerItem2 = document.querySelector(".burger-menu__item:nth-child(2)");
  const burgerItem3 = document.querySelector(".burger-menu__item:nth-child(3)");
  const burgerItem4 = document.querySelector(".burger-menu__item:nth-child(4)");
  const burgerItem5 = document.querySelector(".burger-menu__item:nth-child(5)");
  const burgerItem6 = document.querySelector(".burger-menu__item:nth-child(6)");
  const burgerItem7 = document.querySelector(".burger-menu__item:nth-child(7)");

  const burgerHeader = document.querySelector(".burger__header");
  const burgerFooter = document.querySelector(".burger__footer");
  const burgerLogout = document.querySelector(".burger__logout");
  const burgerLine = document.querySelector(".burger-line");

  checkbox.addEventListener("click", function () {
    this.classList.toggle("active");
    menuItems.classList.toggle("active");
    burgerItem1.classList.toggle("active");
    burgerItem2.classList.toggle("active");
    burgerItem3.classList.toggle("active");
    burgerItem4.classList.toggle("active");
    burgerItem5.classList.toggle("active");
    burgerItem6.classList.toggle("active");
    burgerItem7.classList.toggle("active");
    burgerFooter.classList.toggle("active");
    burgerLogout.classList.toggle("active");
    burgerHeader.classList.toggle("active");
    burgerLine.classList.toggle("active");
  });
});
