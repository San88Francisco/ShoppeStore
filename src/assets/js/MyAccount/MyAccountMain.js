if (window.location.pathname.includes('/my-account')) {
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
                  
                  targetGroup.forEach(targetItem => targetItem.style.display = 'none')
                  click.forEach(clearItem => clearItem.classList.remove(eventClickIndex))
                  itemTarget.forEach(item => item.style.display = 'flex')
                  item.classList.add(eventClickIndex)
                  
               })
            })
         }
      }
      tabPageClickToTarget()
   }
}
