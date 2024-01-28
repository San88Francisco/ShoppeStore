document.addEventListener('DOMContentLoaded',()=> {
   if(window.location.pathname.includes('/product')){
      const items = document.querySelectorAll('.shop-latest__block')
      items.forEach(item => {
         item.addEventListener('click', ()=> {
            const imgPath = item.children[0].children[0].children[0].getAttribute('src')
            const itemPath = item.children[1].children[0].textContent
            localStorage.setItem('selectedImgPath', imgPath)
            localStorage.setItem('selectedProductName', itemPath)
         })
      })
   }
})