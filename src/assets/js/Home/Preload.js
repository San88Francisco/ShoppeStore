document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector("[data-preload]");
  if (preloader) {
    setTimeout(function () {
      preloader.classList.add("loaded");
      document.body.classList.add("loaded");
    }, 1250);
  }
});
