// ---HEADER---
function setupHeader() {
   const header__underline = document.querySelector(".header__underline");
   const pageName = document.title.toLowerCase().replace(/\s/g, "");
   pageName !== "home" ? (header__underline.style.display = "block") : 0;
   const headerAElement = document.querySelector(`.header_link_${pageName}`);
   headerAElement.classList.add("act");
}

document.addEventListener("DOMContentLoaded", setupHeader);
