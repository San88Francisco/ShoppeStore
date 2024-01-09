const pagesFolderCheckbox = document.querySelectorAll('.pages-folder-checkbox')
pagesFolderCheckbox.forEach(item => {
   item.addEventListener('input', ()=> {
      const numberOfContent = item.getAttribute('data-page-nuber')
      const contentFolder = document.querySelector(`.page${numberOfContent}__content`)
      const folderContent = document.querySelector(`.product__page${numberOfContent}`)
      if(item.checked === false){
         item.parentElement.children[2].style.display = 'none'
         item.checked = false
         return
      } 
      pagesFolderCheckbox.forEach(items => {
         items.checked = false
         items.parentElement.children[2].style.display = 'none'
      })

      item.checked = true
      contentFolder.innerHTML = folderContent.innerHTML
      contentFolder.style.display = 'block'
      numberOfContent === '3' ? contentFolder.children[0].style.display = 'grid' : 0
      console.log(contentFolder);
   })
})