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
  