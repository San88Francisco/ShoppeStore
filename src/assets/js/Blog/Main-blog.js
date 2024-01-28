import { animationDropBox } from '../Global/GlobalFunctions';

document.addEventListener('DOMContentLoaded', () => {
   if (window.location.pathname.includes('/blog')) {

      window.addEventListener('beforeunload', () => {
         localStorage.removeItem('selectCategoriesState');
       });
       
      const creatPagesOfBlock = (blockGenerate) => {
         const createdBlogPage = (cards,countBlock) => {
            const blogContents = document.querySelector(blockGenerate)
            const cardsBlock = document.createElement('div')
            countBlock !== 1 ? cardsBlock.classList.add('none') : 0
            cardsBlock.classList.add('blog__cards__content',`page__block${countBlock}__content`)
            cardsBlock.innerHTML = cards
            blogContents.insertAdjacentElement('afterend',cardsBlock)
         }
         const createdPageBtn = (countBlock) => {
            const lastBtn = document.querySelector('.cards__pages__arrow')
            const div = document.createElement('div')
            const p = document.createElement('p')
            div.classList.add(`page__block${countBlock}`,'cards__pages')
            countBlock === 1 ? div.classList.add('act_page') : 0
            p.textContent = countBlock
            lastBtn.insertAdjacentElement('beforebegin',div)
            div.insertAdjacentElement('afterbegin',p)
   
         }
         const blogCardsBlocks = document.querySelectorAll('.content__cards') 
         const blogCardsLength = blogCardsBlocks.length
         if(blogCardsLength >= 4){
            let pagesCounter = 0
            let pagesStorage = ''
            let blocksCounter = 0
            for(let i = 1; i <= blogCardsLength; i++){
               pagesStorage += blogCardsBlocks[i-1].outerHTML
               if(pagesCounter < 3 && i !== blogCardsLength){
                  pagesCounter++
               }else{
                  blocksCounter++
                  createdBlogPage(pagesStorage,blocksCounter)
                  createdPageBtn(blocksCounter)
                  pagesCounter = 0
                  pagesStorage = ''
               }
            }
         }
      }
      creatPagesOfBlock('.main-block')

      //! search
      const searchInput = document.querySelector('#search-input') 
      const searchTheItem = () => {
         const inputIsSelect = localStorage.getItem('inputIsSelect')
         if(inputIsSelect !== null){
            searchInput.focus()
            localStorage.removeItem('inputIsSelect')
         } 
         if (searchInput !== null) {
            const numberOfSelectPage = document.querySelector('.act_page').classList[0].replace(/[^+\d]/g, '')
            const cardsBlock = document.querySelectorAll('.blog__cards__content')
            const searchBlockItem = document.querySelector('.searchBlock')
            if (searchBlockItem.innerHTML === '') {
               searchBlockItem.style.marginBottom ='0px'
            }
            searchInput.oninput = function () {
            
               let val = this.value.trim().toLowerCase();
               let lettersItems = document.querySelectorAll('.blog__card__name');
   
               lettersItems.forEach(function (e) {
                  const shopLatestBlock2 = e.closest('.content__cards');
                  const categoriesOfItem = shopLatestBlock2.children[1].children[0].textContent.toLowerCase()
                  const selectCategoriesState = localStorage.getItem('selectCategoriesState')
                  
                  if (val == '') {
                     shopLatestBlock2.style.display = 'block';
   
                     const thisPage = document.querySelector(`.page__block${numberOfSelectPage}__content`)
                     thisPage.style.display = 'grid'
           
                     searchBlockItem.innerHTML = ' '
                     searchBlockItem.style.display = 'none'
                     
                     document.querySelector('.blog__cards__pages').style.display = 'flex'


                     if(selectCategoriesState !== null && categoriesOfItem !== selectCategoriesState){
                        shopLatestBlock2.style.display = 'none';
                     }  
                     
                     if(selectCategoriesState !== null && categoriesOfItem === selectCategoriesState){
                        shopLatestBlock2.style.display = 'block';
                     }

                  }  else if (val !== '' && e.innerText.toLowerCase().includes(val)) {
                     shopLatestBlock2.style.display = 'block';
                     if(selectCategoriesState !== null && categoriesOfItem !== selectCategoriesState){
                        shopLatestBlock2.style.display = 'none';
                     }
                  } else {
                     shopLatestBlock2.style.display = 'none';
                  }

                  document.querySelector('.blog__cards__pages').style.display = 'none'
               });
               searchBlockItem.innerHTML = ' '
               searchBlockItem.style.display = 'none'
   
               let searchBlock = ''
               cardsBlock.forEach(item => {
                  searchBlock += item.innerHTML
                  item.style.display = 'none'
               })
               searchBlockItem.style.display = 'grid'
               searchBlockItem.innerHTML = searchBlock

               const selectCategoriesState = localStorage.getItem('selectCategoriesState')
               if(val === '' && selectCategoriesState === null){
                  const searchBlockItem2 = document.querySelector('.searchBlock')
                  const thisPage2 = document.querySelector(`.page__block${numberOfSelectPage}__content`)
                  thisPage2.style.display = 'grid'
         
                  searchBlockItem2.innerHTML = ' '
                  searchBlockItem2.style.display = 'none'

                  document.querySelector('.blog__cards__pages').style.display = 'flex'
               }
               
            }
         }
      }
      searchTheItem()

      //! page button
      const cardButtons = document.querySelectorAll('.cards__pages')
      if (cardButtons !== null) {
         cardButtons.forEach(item => {
            item.addEventListener('click', () => {
               //? у разі нажаття на кнопки з цифрами
               const backArrowBtn = () => {
                  const arrowBack = document.querySelector('.cards__pages__arrow-back')
                  const countOfBlock = item.classList[0].replace(/\D/g, '')
                  countOfBlock !== '1' ? arrowBack.style.display = 'flex' : 0
                  countOfBlock === '1' ? arrowBack.style.display = 'none' : 0
               }
               const searchBlockItem = document.querySelector('.searchBlock')
               if (item.classList.contains('cards__pages__arrow') === false && item.classList.contains('cards__pages__arrow-back') === false) {
                  searchBlockItem.innerHTML = ' '
                  searchBlockItem.style.display = 'none'

                  // знаходимо елемент який був перед натисканням на кнопку
                  const lastCheckedPage = document.querySelector('.act_page')

                  // робимо display none для елемнтів
                  document.querySelector(`.${lastCheckedPage.classList[0]}__content`).style.display = 'none'
                  lastCheckedPage.classList.remove('act_page')

                  // відкриваємо новик блок
                  document.querySelector(`.${item.classList[0]}__content`).style.display = 'grid'
                  item.classList.add('act_page')
                  backArrowBtn()
               } else if(item.classList.contains('cards__pages__arrow') === true){
                  //? при нажатті на стрілку

                  searchBlockItem.innerHTML = ' '
                  searchBlockItem.style.display = 'none'

                  // знаходимо елемент який був перед натисканням на кнопку
                  const lastCheckedPage = document.querySelector('.act_page')

                  // получаємо наступну сторінку і кнопку
                  const nextPage = document.querySelector(`.page__block${parseInt(lastCheckedPage.classList[0].replace(/[^+\d]/g, '')) + 1}__content`)
                  const nextButton = document.querySelector(`.page__block${parseInt(lastCheckedPage.classList[0].replace(/[^+\d]/g, '')) + 1}`)

                  // робимо display none для попередніх елемнтів
                  document.querySelector(`.${lastCheckedPage.classList[0]}__content`).style.display = 'none'
                  lastCheckedPage.classList.remove('act_page')

                  // знаходимо першу сторінку і кнопку, якщо наступної немає
                  const firstPage = document.querySelector('.page__block1__content')
                  const firstButton = document.querySelector('.page__block1')

                  // перевіряємо чи є наступна сторікна і кнопка а потім відкриваємо ту, яка є
                  nextPage !== null ? nextPage.style.display = 'grid' : firstPage.style.display = 'grid'
                  nextPage !== null ? nextButton.classList.add('act_page') : firstButton.classList.add('act_page')
                  
                  backArrowBtn()
                  const arrowBack = document.querySelector('.cards__pages__arrow-back')
                  nextPage === null ? arrowBack.style.display = 'none' : 0

               }else if(item.classList.contains('cards__pages__arrow-back') === true){
                  searchBlockItem.innerHTML = ' '
                  searchBlockItem.style.display = 'none'

                  // знаходимо елемент який був перед натисканням на кнопку
                  const lastCheckedPage = document.querySelector('.act_page')

                  // получаємо наступну сторінку і кнопку
                  const nextPage = document.querySelector(`.page__block${parseInt(lastCheckedPage.classList[0].replace(/[^+\d]/g, '')) - 1}__content`)
                  const nextButton = document.querySelector(`.page__block${parseInt(lastCheckedPage.classList[0].replace(/[^+\d]/g, '')) - 1}`)

                  // робимо display none для попередніх елемнтів
                  document.querySelector(`.${lastCheckedPage.classList[0]}__content`).style.display = 'none'
                  lastCheckedPage.classList.remove('act_page')

                  // знаходимо першу сторінку і кнопку, якщо наступної немає
                  const firstPage = document.querySelector('.page__block1__content')
                  const firstButton = document.querySelector('.page__block1')

                  // перевіряємо чи є наступна сторікна і кнопка а потім відкриваємо ту, яка є
                  nextPage !== null ? nextPage.style.display = 'grid' : firstPage.style.display = 'grid'
                  nextPage !== null ? nextButton.classList.add('act_page') : firstButton.classList.add('act_page')
                  
                  backArrowBtn()
                  const arrowBack = document.querySelector('.cards__pages__arrow-back')
                  nextPage.classList[1].replace(/[^+\d]/g, '') === '1' ? arrowBack.style.display = 'none' : 0
               }
            })
         })
      }
      animationDropBox('.mobile-categories_button','.mobile-blog_categories')

      const sortByCategories = (item) => {
         if(item.classList.contains('selectCategories') === false){
            localStorage.setItem('selectCategoriesState', item.textContent.toLowerCase())
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
                  if(searchInput.value !== ''){
                     const val = searchInput.value.toLowerCase()
                     const blockValue = shopLatestBlock2.children[2].textContent.toLowerCase()
                     if(blockValue.includes(val) === false){
                        shopLatestBlock2.style.display = 'none';
                     }
                  }
               } else {
                  shopLatestBlock2.style.display = 'none';
               }
            });

            const cardsBlock = document.querySelectorAll('.blog__cards__content')
            const searchBlockItem = document.querySelector('.searchBlock')

            searchBlockItem.innerHTML = ' '
            searchBlockItem.style.display = 'none'

            let searchBlock = ''
            cardsBlock.forEach(item => {
               searchBlock += item.innerHTML
               item.style.display = 'none'
            })
            searchBlockItem.style.display = 'grid'
            searchBlockItem.innerHTML = searchBlock

            document.querySelector('.blog__cards__pages').style.display = 'none'
         }else{
            localStorage.removeItem('selectCategoriesState')

            item.style.color = 'rgb(112,112,112)'
            item.classList.remove('selectCategories')

            let lettersItems = document.querySelectorAll('#blogCategories');
            lettersItems.forEach(function (e) {
               const shopLatestBlock2 = e.closest('.content__cards');
               shopLatestBlock2.style.display = 'block';
            });
            
            const searchBlockItem = document.querySelector('.searchBlock')
            const numberOfSelectPage = document.querySelector('.act_page').classList[0].replace(/[^+\d]/g, '')
            const thisPage = document.querySelector(`.page__block${numberOfSelectPage}__content`)
            thisPage.style.display = 'grid'
   
            searchBlockItem.innerHTML = ' '
            searchBlockItem.style.display = 'none'

            if(searchInput.value !== ''){
               lettersItems.forEach(function (e) {
                  const shopLatestBlock2 = e.closest('.content__cards');
                  if(searchInput.value !== ''){
                     const val = searchInput.value.toLowerCase()
                     const blockValue = shopLatestBlock2.children[2].textContent.toLowerCase()
                     if(blockValue.includes(val) === false){
                        shopLatestBlock2.style.display = 'none';
                     }
                  }
               })
               document.querySelector('.blog__cards__pages').style.display = 'none'
            }

            if(searchInput.value === ''){
               document.querySelector('.blog__cards__pages').style.display = 'flex'
            }
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
         const selectItem = document.querySelector(`.categories__${nowSelectCategories.toLocaleLowerCase()}`)
         sortByCategories(selectItem)
         
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



