document.addEventListener('DOMContentLoaded', function () {
  // Перевірка, чи ми на сторінці "Product"
  if (window.location.pathname.includes('/cart')) {
    const shippingContentFolder = document.querySelector('.shipping__content__folder');
    shippingContentFolder.children[0].addEventListener('click', () => {
      if(shippingContentFolder.children[0].parentElement.children[1].checked === false){
        shippingContentFolder.children[0].parentElement.children[1].checked = true
      }else {
        shippingContentFolder.children[0].parentElement.children[1].checked = false
      }
    })

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
});
