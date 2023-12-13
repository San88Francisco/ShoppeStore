const optionItem = document.querySelectorAll('.optionItemElement')
optionItem.forEach(item => {
   item.addEventListener('click', ()=> {
   item.parentElement.parentElement.children[0].textContent = item.textContent
   item.parentElement.parentElement.children[1].checked = false
   })
})

const input = document.querySelectorAll('.input')
input.forEach(item => {
   item.addEventListener('change', ()=> {
      input.forEach(items => {
         if(items !== item){
            items.checked = false
         }
      })
   })
})

