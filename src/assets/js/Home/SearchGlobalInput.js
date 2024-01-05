document.addEventListener("DOMContentLoaded", function () {
   const iconSearchGlobal = document.getElementById('icon-search-global');
   const searchBlockGlobal = document.getElementById('container-global-search');

   iconSearchGlobal.addEventListener('click', () => {
      searchBlockGlobal.classList.toggle('active');
   });
});
