document.addEventListener('DOMContentLoaded', () => {
   if (window.location.pathname.includes('/blog')) {

      //! search
      if (document.querySelector('#search-input') !== null) {
         document.querySelector('#search-input').oninput = function () {
            let val = this.value.trim().toLowerCase();
            let lettersItems = document.querySelectorAll('.blog__card__name');

            lettersItems.forEach(function (e) {
               const shopLatestBlock2 = e.closest('.content__cards');

               if (val == '') {
                  shopLatestBlock2.style.display = 'block';
               } else if (val !== '' && e.innerText.toLowerCase().includes(val)) {
                  shopLatestBlock2.style.display = 'block';
               } else {
                  shopLatestBlock2.style.display = 'none';
               }
            });
         };
      }


      //! page button
      const cardButtons = document.querySelectorAll('.cards__pages')
      if (cardButtons !== null) {
         cardButtons.forEach(item => {
            item.addEventListener('click', () => {
               //? у разі нажаття на кнопки з цифрами
               if (item.classList.contains('cards__pages__arrow') === false) {
                  // знаходимо елемент який був перед натисканням на кнопку
                  const lastCheckedPage = document.querySelector('.act_page')

                  // робимо display none для елемнтів
                  document.querySelector(`.${lastCheckedPage.classList[0]}__content`).style.display = 'none'
                  lastCheckedPage.classList.remove('act_page')

                  // відкриваємо новик блок
                  document.querySelector(`.${item.classList[0]}__content`).style.display = 'grid'
                  item.classList.add('act_page')
               } else {
                  //? при нажатті на стрілку

                  // знаходимо елемент який був перед натисканням на кнопку
                  const lastCheckedPage = document.querySelector('.act_page')

                  // получаємо наступну сторінку і кнопку
                  const nextPage = document.querySelector(`.page__block${parseInt(lastCheckedPage.classList[0].replace(/[^+\d]/g, '')) + 1}__content`)
                  const nextButton = document.querySelector(`.page__block${parseInt(lastCheckedPage.classList[0].replace(/[^+\d]/g, '')) + 1}`)

                  // робимо display none для попередніх елемнтів
                  document.querySelector(`.${lastCheckedPage.classList[0]}__content`).style.display = 'none'
                  lastCheckedPage.classList.remove('act_page')

                  //! search
                  if(document.title.toLowerCase().replace(/\s/g, "") === 'blog'){
                     if(document.querySelector('#search-input') !== null){
                        document.querySelector('#search-input').oninput = function () {
                           let val = this.value.trim().toLowerCase();
                           let lettersItems = document.querySelectorAll('.blog__card__name');
                        
                           lettersItems.forEach(function (e) {
                             const shopLatestBlock2 = e.closest('.content__cards');
                           
                             if (val == '') {
                               shopLatestBlock2.style.display = 'block';
                             } else if (val !== '' && e.innerText.toLowerCase().includes(val)) {
                               shopLatestBlock2.style.display = 'block';
                             } else {
                               shopLatestBlock2.style.display = 'none';
                             }
                           });
                        };
                     }
                  }
                  // знаходимо першу сторінку і кнопку, якщо наступної немає
                  const firstPage = document.querySelector('.page__block1__content')
                  const firstButton = document.querySelector('.page__block1')

                  // перевіряємо чи є наступна сторікна і кнопка а потім відкриваємо ту, яка є
                  nextPage !== null ? nextPage.style.display = 'grid' : firstPage.style.display = 'grid'
                  nextPage !== null ? nextButton.classList.add('act_page') : firstButton.classList.add('act_page')
               }
            })
         })
      }
      const categoriesFolder = document.querySelector('.mobile-blog_categories')
      const categoriesBtn = document.querySelector('.mobile-categories_button')
      categoriesBtn.addEventListener('click', ()=> {
         if(categoriesFolder.style.display === 'none'){
            categoriesFolder.style.display = 'block'
         }else{
            categoriesFolder.style.display = 'none'
         }
      })
   }
})
