// myr
const dropbtns = document.querySelectorAll(".dropdown .drop-btn");
const myDropdowns = document.querySelectorAll(".dropdown-content");
const rotateImg = document.querySelectorAll(".drop-btn img");

let activeDropdown = null;
let activeRotateImg = null;

function closeActiveDropdown(target) {
  if (activeDropdown && target !== activeDropdown.previousElementSibling) {
    activeDropdown.classList.remove("show");
    activeRotateImg.classList.remove("dropbtn-icon-rotate");
    activeDropdown = null;
    activeRotateImg = null;
  }
}

dropbtns.forEach((dropbtn, index) => {
  if (dropbtn) {
    dropbtn.addEventListener("click", () => {
      closeActiveDropdown(dropbtn);
      myDropdowns[index].classList.toggle("show");
      rotateImg[index].classList.toggle("dropbtn-icon-rotate");
      activeDropdown = myDropdowns[index];
      activeRotateImg = rotateImg[index];
    });
  }
});

window.onclick = function (event) {
  closeActiveDropdown(event.target);
};

window.onblur = function (event) {
  closeActiveDropdown(event.relatedTarget);
};


// Sort By