// ---HEADER---
function setupHeader() {
  const pageName = document.title.toLowerCase().replace(/\s/g, "");

  // Виходимо, якщо сторінка "home"
  if (pageName === "home") return;

  const header__underline = document.querySelector(".header__underline");
  header__underline.style.display = "block";

  const headerAElement = document.querySelector(`.header_link_${pageName}`);
  headerAElement !== null ? headerAElement.classList.add("act") : 0
  pageName !== "home" ? (header__underline.style.display = "block") : 0;

}


document.addEventListener("DOMContentLoaded", setupHeader);
