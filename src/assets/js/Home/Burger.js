function setupHeader() {
    const pageName = document.title.toLowerCase().replace(/\s/g, "");
  
    // Виходимо, якщо сторінка "home"
    if (pageName === "home") return;
  
    const burger__underline = document.querySelector(".burger__underline");
    burger__underline.style.display = "none";
  
    const headerAElement = document.querySelector(`.burger__link_${pageName}`);
    headerAElement !== null ? headerAElement.classList.add("burg") : 0
    pageName !== "home" ? (burger__underline.style.display = "none") : 0;
  
  }
  
  
  document.addEventListener("DOMContentLoaded", setupHeader);
  
  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('.checkbox');
    const menuItems = document.querySelector('.menu-items');
    const burgerItems = document.querySelector('.burger-list');
    const burgerHeader = document.querySelector('.burger__header');
    const burgerFooter = document.querySelector('.burger__footer');
    const burgerLogout = document.querySelector('.burger__logout');
   
    checkbox.addEventListener('click', function () {
        this.classList.toggle('active');
        menuItems.classList.toggle('active');
        burgerItems.classList.toggle('active');
        burgerFooter.classList.toggle('active');
        burgerLogout.classList.toggle('active');
        burgerHeader.classList.toggle('active');
    });
});

