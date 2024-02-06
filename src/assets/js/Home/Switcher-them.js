import  renderBlackThem from './Body'
const themSwither = document.querySelectorAll('.switcherBtn')
themSwither.forEach(btn => {
   btn.addEventListener('click',() => {
      const darkThemIs = sessionStorage.getItem('darkThemIsOn')
      if(darkThemIs === 'true'){
         sessionStorage.setItem('darkThemIsOn', 'false')
         renderBlackThem() 
      }else{
         sessionStorage.setItem('darkThemIsOn', 'true')
         renderBlackThem()
      }
   })
})
