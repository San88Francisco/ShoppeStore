// ---HEADERR---
function setupHeader() {
  const pageName = document.title.toLowerCase().replace(/\s/g, "");

  // Виходимо, якщо сторінка "home"
  if (pageName === "home") return;

  const header__underline = document.querySelector(".header__underline");
  header__underline.style.display = "block";

  const headerAElement = document.querySelector(`.header_link_${pageName}`);
  headerAElement?.classList.add("act");
}

document.addEventListener("DOMContentLoaded", setupHeader);
