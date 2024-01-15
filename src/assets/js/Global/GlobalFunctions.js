
export const animationDropBox = (btn, dropBox) => {
   const mobileFilterButton = document.querySelector(btn)
   const asideMenu = document.querySelector(dropBox)

   mobileFilterButton.addEventListener('click', () => {
      asideMenu.classList.toggle('active-filter-shop');
   })
}
