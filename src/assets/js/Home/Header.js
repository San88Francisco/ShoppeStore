// // ---HEADER---
// function setupHeader() {

//   const userSignIn = localStorage.getItem('userSignIn')
//   if(userSignIn !== null){
//     document.querySelector('.account__href').setAttribute('href','./my-account.html')
//   }

//   const pageName = document.title.toLowerCase().replace(/\s/g, "");

//   // Виходимо, якщо сторінка "home"
//   if (pageName === "home") return;

//   const header__underline = document.querySelector(".header__underline");
//   header__underline.style.display = "block";

//   const headerAElement = document.querySelector(`.header_link_${pageName}`);
//   headerAElement !== null ? headerAElement.classList.add("act") : 0
//   pageName === 'account' &&  headerAElement !== null ? headerAElement.classList.add("act__last") : 0
//   pageName === 'myaccount' &&  headerAElement !== null ? headerAElement.classList.add("act__last") : 0

//   pageName !== "home" ? (header__underline.style.display = "block") : 0;
// }

// document.addEventListener("DOMContentLoaded", setupHeader);

// /** Count Icon Header */

// const navCartCount = document.querySelector(".cart__count");

// // Оновлення navCartCount на основі значення в localStorage
// function updateNavCartCount() {
//   let navCartValid = localStorage.getItem("totalCountCart") || 0;

//   if (+navCartValid > 0) {
//     navCartCount.style.display = "flex";
//     navCartCount.textContent = localStorage.getItem("totalCountCart");
//   } else {
//     navCartCount.style.display = "none";
//   }
// }

// // Спробуйте оновити на початку для початкового стану
// updateNavCartCount();

// // Додайте подію 'storage', яка буде викликатися при зміні localStorage
// window.addEventListener("storage", updateNavCartCount);



// const burger = document.querySelector('.burger');

// burger.addEventListener('click', () => {
//   burger.classList.toggle('active');
// });



 