if (window.location.pathname.includes('/my-account')) {
   const tabPageClickToTarget = () => {
      const click = document.querySelectorAll('[class*="click-"]')
      let thisClickGroup = []
      let item
      if(click !== null){
         click.forEach(itemClick => {
            itemClick.addEventListener('click', () => {
               item = itemClick
               thisClickGroup = []
               const perentGroupName = itemClick.parentElement.className
               click.forEach(clearItem => clearItem.parentElement.className 
               === perentGroupName ? thisClickGroup.push(clearItem) : 0)
               const itemName = item.className.match(/\bclick-\w+\b/g).join(' ')
               const itemIndex = itemName.split('click-').join('')
               const itemTarget = document.querySelectorAll(`.targetOf-${itemIndex}`)
               const targetGroup = document.querySelectorAll('[class*="targetOf-"]')
               
               const eventClickName = item.className.match(/\baddClass-\w+\b/g).join(' ')
               const eventClickIndex = eventClickName.split('addClass-').join('')
               console.log(itemTarget);
               targetGroup.forEach(targetItem => targetItem.style.display = 'none')
               click.forEach(clearItem => clearItem.classList.remove(eventClickIndex))
               itemTarget.forEach(item => item.style.display = 'flex')
               item.classList.add(eventClickIndex)
               
            })
         })
      }
   }
   //function of tab page
   tabPageClickToTarget()

   //add bill code
   const addAddress = document.querySelector('#addAddress')
   addAddress.addEventListener('click', ()=>{
      addAddress.classList.add('none')
      document.querySelector('.bill-registr').style.display = 'block'
   })
   //folder code
   const selectYourItem = document.querySelectorAll('.selectYourItem');
   selectYourItem.forEach(itemClick => {
     itemClick.addEventListener('click', () => {
       if(itemClick.children[1].checked === false){
         itemClick.children[1].checked = true
         const input = document.querySelectorAll('.input')
         input.forEach(item => {
           if(item !== itemClick.children[1]){
             item.checked = false
           }
         })
         const optionItem = document.querySelectorAll('.optionItemElement');
         optionItem.forEach((item) => {
           item.addEventListener('click', () => {
             item.parentElement.parentElement.children[0].textContent = item.textContent;
           })
         })
       }else{
         itemClick.children[1].checked = false
       }
     })
     itemClick.children[1].checked = false
   })
}
