const addaptiveTabMenu = () => {
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
}

const addaptiveProductSliser = () => {
   let swiperWrapper = document.querySelector('.swiper-wrapper');
   let isDragging = false;
   let startPos = 0;
   let currentTranslate = 0;
   let currentIndex = 0;
   const slides = document.querySelectorAll('.swiper-slide');
   
   function handleTouchStart(e) {
     startPos = e.touches[0].clientX;
     isDragging = true;
   }
   
   function handleTouchMove(e) {
     if (!isDragging) return;
   
     const currentPos = e.touches[0].clientX;
     const diff = currentPos - startPos;
     currentTranslate += diff;
   
     swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
   
     startPos = currentPos;
   }
   
   function handleTouchEnd() {
     isDragging = false;
   
     const threshold = 100; 
     const minSwipeDistance = 50; 
   
     if (Math.abs(currentTranslate) > threshold) {
       if (currentTranslate > 0 && currentIndex > 0) {
         currentIndex--;
       } else if (currentTranslate < 0 && currentIndex < slides.length - 1) {
         currentIndex++;
       } else if (currentTranslate < 0 && currentIndex === slides.length - 1) {
         currentIndex = 0;
       }
     } else if (Math.abs(currentTranslate) > minSwipeDistance) {
       currentIndex += currentTranslate > 0 ? -1 : 1;
       currentIndex = Math.max(0, Math.min(currentIndex, slides.length - 1));
     }
   
     currentTranslate = -currentIndex * 100;
     swiperWrapper.style.transform = `translateX(${currentTranslate}%)`;
     swiperWrapper.setAttribute('data-slides-num', currentIndex + 1)
     const mobileProgresBar = document.querySelector('.progress-bar-mobile__line')
     const sectionOfProgres = [0,0,33.333,66.333]
      if(currentIndex !== 0) mobileProgresBar.style.width = `33.333%`
      if(currentIndex === 0) mobileProgresBar.style.width = `0%`
      mobileProgresBar.style.left = `${sectionOfProgres[currentIndex]}%`
   }
   
   swiperWrapper.addEventListener('touchstart', handleTouchStart);
   swiperWrapper.addEventListener('touchmove', handleTouchMove);
   swiperWrapper.addEventListener('touchend', handleTouchEnd);   
}




document.addEventListener('DOMContentLoaded',() => {
   if (window.location.pathname.includes('/product')) {
      addaptiveTabMenu()
      addaptiveProductSliser()
   }
})




