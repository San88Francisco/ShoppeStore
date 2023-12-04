// ---HEADER---
function setupHeader() {
  const header__underline = document.querySelector(".header__underline");
  const pageName = document.title.toLowerCase().replace(/\s/g, "");
  const headerAElement = document.querySelector(`.header_link_${pageName}`);
  headerAElement.classList.add("act");
  pageName !== "home" ? (header__underline.style.display = "block") : 0;
}

document.addEventListener("DOMContentLoaded", setupHeader);
