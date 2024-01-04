document.addEventListener('DOMContentLoaded', () => {
   if (window.location.pathname.includes('/blog')) {

      //! search
      if (document.querySelector('#search-input') !== null) {
         document.querySelector('#search-input').oninput = function () {
            const numberOfSelectPage = document.querySelector('.act_page').classList[0].replace(/[^+\d]/g, '')
            const cardsBlock = document.querySelectorAll('.blog__cards__content')
            const searchBlockItem = document.querySelector('.searchBlock')
            let searchBlock = ''
            cardsBlock.forEach(item => {
               searchBlock += item.innerHTML
               item.style.display = 'none'
            })
            searchBlockItem.style.display = 'grid'
            searchBlockItem.innerHTML = searchBlock

            let val = this.value.trim().toLowerCase();
            let lettersItems = document.querySelectorAll('.blog__card__name');

            lettersItems.forEach(function (e) {
               const shopLatestBlock2 = e.closest('.content__cards');

               if (val == '') {
                  shopLatestBlock2.style.display = 'block';

                  const firstPage = document.querySelector(`.page__block${numberOfSelectPage}__content`)
                  firstPage.style.display = 'grid'
        
                  searchBlockItem.innerHTML = ''
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

      const sortByCategories = (item) => {
         if(item.classList.contains('selectCategories') === false){
            categoriesItem.forEach(item =>{
               item.style.color = 'rgb(112,112,112)'
               item.classList.remove('selectCategories')
            })
            item.style.color = 'black'
            item.classList.add('selectCategories')

            let val = item.textContent.trim().toLowerCase();
            let lettersItems = document.querySelectorAll('#blogCategories');
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
            
         }else{
            item.style.color = 'rgb(112,112,112)'
            item.classList.remove('selectCategories')

            let lettersItems = document.querySelectorAll('#blogCategories');
            lettersItems.forEach(function (e) {
               const shopLatestBlock2 = e.closest('.content__cards');
               shopLatestBlock2.style.display = 'block';
            });
         }
      }

      const categoriesItem = document.querySelectorAll('#categoriesBtns')
      categoriesItem.forEach(item =>{
         item.addEventListener('click',()=>{     
            sortByCategories(item)
         })
      })

      const nowSelectCategories = localStorage.getItem('nowSelectCategories')
      if(nowSelectCategories !== null){
         const selectItem = document.querySelectorAll(`.categories__${nowSelectCategories.toLocaleLowerCase()}`)
         selectItem.forEach(item => {
            item.classList.add('selectCategories')
            item.style.color = 'black'
         })
     
         let val = nowSelectCategories.trim().toLowerCase();
         let lettersItems = document.querySelectorAll('#blogCategories');
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

         setTimeout(function() {
            localStorage.removeItem('nowSelectCategories')
          }, 1000);
      }

      const clickToAddoptPage = document.querySelectorAll('#clickToAddoptPage')
      clickToAddoptPage.forEach(item => {
         item.addEventListener('click', ()=>{
            const getSelectNowPost = item.getAttribute('data-post-number')
            localStorage.setItem('selectedPostNow', getSelectNowPost)
         })
      })
   }
})



