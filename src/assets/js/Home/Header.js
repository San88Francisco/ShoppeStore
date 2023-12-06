// ---HEADER---
function setupHeader() {
  const header__underline = document.querySelector(".header__underline");
  const pageName = document.title.toLowerCase().replace(/\s/g, "");
  const headerAElement = document.querySelector(`.header_link_${pageName}`);
  headerAElement !== null ? headerAElement.classList.add("act") : 0
  pageName !== "home" ? (header__underline.style.display = "block") : 0;
  console.log(pageName);
}


document.addEventListener("DOMContentLoaded", setupHeader);
