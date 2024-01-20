
export const animationDropBox = (btn, dropBox) => {
   const mobileFilterButton = document.querySelector(btn)
   const asideMenu = document.querySelector(dropBox)

   mobileFilterButton.addEventListener('click', () => {
      asideMenu.classList.toggle('active-filter-shop');
   })
}

// function handleIntersection(entries) {
//    entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//          entry.target.classList.add('show');
//       } else {
//          entry.target.classList.remove('show');
//       }
//    });
// }

// const observer = new IntersectionObserver(handleIntersection);

// const scrollRight = document.querySelectorAll('.Scroll_js_right');
// scrollRight.forEach((el) => observer.observe(el));

// const scrollUp = document.querySelectorAll('.Scroll_js_up');
// scrollUp.forEach((el) => observer.observe(el));