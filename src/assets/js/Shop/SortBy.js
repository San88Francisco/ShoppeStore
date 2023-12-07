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
if (window.location.pathname.includes("/shop")) {
   // передаємо дані для 'Нове'
   // const newBtn = document.querySelector('#new-btn')
   // const addNew = document.querySelectorAll('.add-new')
   // BtnAaddEventListener(newBtn, addNew)

   // // передаємо дані для 'Знижка'
   // const discountsBnt = document.querySelector('#discounts-bnt')
   // const addDiscount = document.querySelectorAll('.add-discount')
   // BtnAaddEventListener(discountsBnt, addDiscount)


   const expensiveBtn = document.querySelector('#expensive-btn')
   const shopLatestPrice = document.querySelectorAll('.shop-latest__price a')
   console.log('✌️shopLatestPrice --->', shopLatestPrice);


   expensiveBtn.addEventListener('click', () => {
      const shopLatestBlocks = document.querySelectorAll('.shop-latest__block');
      const sortedBlocks = Array.from(shopLatestBlocks).sort((a, b) => {
         const priceA = parseFloat(a.querySelector('.shop-latest__price a').textContent.replace('$', '').trim());
         console.log('✌️priceA --->', priceA);
         const priceB = parseFloat(b.querySelector('.shop-latest__price a').textContent.replace('$', '').trim());
         console.log('✌️priceB --->', priceB);
         return priceB - priceA;
      });

      const shopLatestContainer = document.querySelector('.shop-latest-blocks');

      // Очищення контейнера перед додаванням відсортованих блоків
      shopLatestContainer.innerHTML = '';

      // Додавання відсортованих блоків назад до контейнера
      sortedBlocks.forEach((block) => {
         shopLatestContainer.appendChild(block);
      });


   })


};

// фун кнопки
// function BtnAaddEventListener(btn, classHtmlFirst) {
//    btn.addEventListener('click', () => {
//       addCategoryForEach(classHtmlFirst)
//    })
// }


// фун сортування категорії (яка вміщає BtnAaddEventListener())
// function addCategoryForEach(classHtmlTwith) {
//    classHtmlTwith.forEach((event) => {
//       const shopLatestBlockEvent = event.closest('.shop-latest__block')
//       const hide = document.querySelectorAll('#hide')
//       hide.forEach((item) => (item.style.display = 'none'));

//       // перевірка чи клас який сортуємо є в нас
//       if (shopLatestBlockEvent !== null) {
//          console.log('✌️hide --->', hide);
//          console.log('✌️shopLatestBlockEvent --->', shopLatestBlockEvent);
//          shopLatestBlockEvent.style.display = 'block'
//       }
//    })
// }





