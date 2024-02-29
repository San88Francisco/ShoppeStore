const addaptiveTabMenu = () => {
   const productPage = document.querySelectorAll('.product__page')
   window.addEventListener('resize',()=> {
      const nowScreenWidth = window.innerWidth
      if(nowScreenWidth <= 425){
         productPage.forEach(item => {
            item.style.display = 'none'
         })
      } 
      if(nowScreenWidth > 425){
         productPage.forEach(item => {
            const isPageSelect = item.getAttribute('data-is-page-select')
            if(isPageSelect === 'true'){
               item.style.display = 'grid'
            }
         })
      }
   })

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
      })
   })
}

// const addaptiveProductSliser = () => {
//    let swiperWrapper = document.querySelector('.swiper-wrapper');
//    let isDragging = false;
//    let startPos = 0;
//    let currentTranslate = 0;
//    let currentIndex = 0;
//    const slides = document.querySelectorAll('.swiper-slide');
   
//    function handleTouchStart(e) {
//      startPos = e.touches[0].clientX;
//      isDragging = true;
//    }
   
//    function handleTouchMove(e) {
//      if (!isDragging) return;
   
//      const currentPos = e.touches[0].clientX;
//      const diff = currentPos - startPos;
//      currentTranslate += diff;
   
//      swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
   
//      startPos = currentPos;
//    }
   
//    function handleTouchEnd() {
//      isDragging = false;
   
//      const threshold = 100; 
//      const minSwipeDistance = 50; 
   
//      if (Math.abs(currentTranslate) > threshold) {
//        if (currentTranslate > 0 && currentIndex > 0) {
//          currentIndex--;
//        } else if (currentTranslate < 0 && currentIndex < slides.length - 1) {
//          currentIndex++;
//        } else if (currentTranslate < 0 && currentIndex === slides.length - 1) {
//          currentIndex = 0;
//        }
//      } else if (Math.abs(currentTranslate) > minSwipeDistance) {
//        currentIndex += currentTranslate > 0 ? -1 : 1;
//        currentIndex = Math.max(0, Math.min(currentIndex, slides.length - 1));
//      }
   
//      currentTranslate = -currentIndex * 104;
//      swiperWrapper.style.transform = `translateX(${currentTranslate}%)`;
//      swiperWrapper.setAttribute('data-slides-num', currentIndex + 1)
//      const mobileProgresBar = document.querySelector('.progress-bar-mobile__line')
//      const sectionOfProgres = [0,25,50,75]
//       mobileProgresBar.style.left = `${sectionOfProgres[currentIndex]}%`
//    }
   
//    swiperWrapper.addEventListener('touchstart', handleTouchStart);
//    swiperWrapper.addEventListener('touchmove', handleTouchMove);
//    swiperWrapper.addEventListener('touchend', handleTouchEnd);   
// }

const addaptiveProductSlider = () => {
      const slider = document.querySelector(".sliderProduct");
      const radioButtons = document.querySelectorAll(
        '.radio-buttons input[type="radio"]'
      );
      const imgPath = localStorage.getItem('selectedImgPath');

      let imgChange = document.querySelectorAll(
         '.sliderProduct img'
       );
       imgChange.forEach((img) => {
         img.src = imgPath;
       });
      let currentIndex = 0;
      let intervalId;
      let isDragging = false;
      let touchStartX = 0;
      let touchMoveX = 0;
      let currentTranslate = 0;
    
      if (slider) {
        radioButtons.forEach(function (radio, index) {
          if (radio) {
            radio.addEventListener("change", function () {
              changeSlide(index);
              clearInterval(intervalId);
            });
          }
        });
    
        slider.addEventListener("touchstart", touchStartHandler);
        slider.addEventListener("touchmove", touchMoveHandler);
        slider.addEventListener("touchend", touchEndHandler);
    
        slider.addEventListener("mousedown", pointerDownHandler);
        slider.addEventListener("mousemove", pointerMoveHandler);
        slider.addEventListener("mouseup", pointerUpHandler);
      }
    
      function touchStartHandler(event) {
        if (window.innerWidth >= 768) return;
    
        isDragging = true;
        touchStartX = event.touches[0].clientX;
      }
    
      function touchMoveHandler(event) {
        if (!isDragging || window.innerWidth >= 768) return;
    
        touchMoveX = event.touches[0].clientX;
        const diff = touchMoveX - touchStartX;
        const newPosition = currentTranslate + diff;
    
        // Заборонити перетягування слайдера за межі 768px
        if (newPosition <= 0 && newPosition >= -768) {
          currentTranslate = newPosition;
          setPositionX(slider, currentTranslate);
        }
      }
    
      function touchEndHandler() {
        if (!isDragging || window.innerWidth >= 768) return;
    
        isDragging = false;
        const diff = touchMoveX - touchStartX;
        const threshold = slider.offsetWidth * 0.2;
    
        if (Math.abs(diff) > threshold) {
          currentIndex =
            diff > 0
              ? Math.max(0, currentIndex - 1)
              : Math.min(radioButtons.length - 1, currentIndex + 1);
        }
    
        changeSlide(currentIndex);
        lastSwipeTime = Date.now();
      }
    
      function pointerDownHandler(event) {
        if (window.innerWidth >= 768) return;
    
        isDragging = true;
        touchStartX = event.clientX;
      }
    
      function pointerMoveHandler(event) {
        if (!isDragging || window.innerWidth >= 768) return;
    
        touchMoveX = event.clientX;
        const diff = touchMoveX - touchStartX;
        currentTranslate += diff;
        setPositionX(slider, currentTranslate);
      }
    
      function pointerUpHandler() {
        if (!isDragging || window.innerWidth >= 768) return;
    
        isDragging = false;
        const diff = touchMoveX - touchStartX;
        const threshold = slider.offsetWidth * 0.2;
    
        if (Math.abs(diff) > threshold) {
          currentIndex =
            diff > 0
              ? Math.max(0, currentIndex - 1)
              : Math.min(radioButtons.length - 1, currentIndex + 1);
        }
    
        changeSlide(currentIndex);
        lastSwipeTime = Date.now();
      }
    
      function setPositionX(element, position) {
        element.style.transform = "translateX(" + position + "px)";
      }
    
      function changeSlide(index) {
        const slideWidth = document.querySelector(".slide__product")?.offsetWidth || 0;
        if (slider) {
          currentTranslate = -index * slideWidth;
          slider.style.transform = `translateX(${currentTranslate}px)`;
          currentIndex = index;
    
          radioButtons.forEach(function (radio, radioIndex) {
            if (radio) {
              radio.checked = radioIndex === currentIndex;
            }
          });
        }
        console.log(currentIndex);
         const mobileProgresBar = document.querySelector('.progress-bar-mobile__line')
         const sectionOfProgres = [0,25,50,75]
         mobileProgresBar.style.left = `${sectionOfProgres[currentIndex]}%`
      }



   //!!!!!!
         // const slider = document.querySelector(".slider");
         // const radioButtons = document.querySelectorAll(
         //   '.radio-buttons input[type="radio"]'
         // );

         // const imgPath = localStorage.getItem('selectedImgPath');

         // let imgChange = document.querySelectorAll(
         //    '.slider img'
         //  );
         //  imgChange.forEach((img) => {
         //    img.src = imgPath;
         //  });
         // let currentIndex = 0;
         // let intervalId;
         // let isDragging = false;
         // let touchStartX = 0;
         // let touchMoveX = 0;
         // let currentTranslate = 0;
         // let lastSwipeTime = Date.now();
       
         // if (slider) {
         //   radioButtons.forEach(function (radio, index) {
         //     if (radio) {
         //       radio.addEventListener("change", function () {
         //         changeSlide(index);
         //         clearInterval(intervalId);
         //       });
         //     }
         //   });
       
         //   slider.addEventListener("mouseenter", function () {
         //     clearInterval(intervalId);
         //   });
       
         //   slider.addEventListener("mouseleave", function () {
         //     startAutoSlide();
         //   });
       
         //   slider.addEventListener("touchstart", touchStartHandler);
         //   slider.addEventListener("touchmove", touchMoveHandler);
         //   slider.addEventListener("touchend", touchEndHandler);
       
         //   slider.addEventListener("mousedown", pointerDownHandler);
         //   slider.addEventListener("mousemove", pointerMoveHandler);
         //   slider.addEventListener("mouseup", pointerUpHandler);
         // }
       
         // function touchStartHandler(event) {
         //   if (window.innerWidth >= 768) return;
       
         //   isDragging = true;
         //   touchStartX = event.touches[0].clientX;
         // }
       
         // function touchMoveHandler(event) {
         //   if (!isDragging || window.innerWidth >= 768) return;
       
         //   touchMoveX = event.touches[0].clientX;
         //   const diff = touchMoveX - touchStartX;
         //   const newPosition = currentTranslate + diff;
       
         //   // Заборонити перетягування слайдера за межі 768px
         //   if (newPosition <= 0 && newPosition >= -768) {
         //     currentTranslate = newPosition;
         //     setPositionX(slider, currentTranslate);
         //   }
         // }
       
         // function touchEndHandler() {
         //   if (!isDragging || window.innerWidth >= 768) return;
       
         //   isDragging = false;
         //   const diff = touchMoveX - touchStartX;
         //   const threshold = slider.offsetWidth * 0.2;
       
         //   if (Math.abs(diff) > threshold) {
         //     currentIndex =
         //       diff > 0
         //         ? Math.max(0, currentIndex - 1)
         //         : Math.min(radioButtons.length - 1, currentIndex + 1);
         //   }
       
         //   changeSlide(currentIndex);
         //   lastSwipeTime = Date.now();
         // }
       
         // function pointerDownHandler(event) {
         //   if (window.innerWidth >= 768) return;
       
         //   isDragging = true;
         //   touchStartX = event.clientX;
         // }
       
         // function pointerMoveHandler(event) {
         //   if (!isDragging || window.innerWidth >= 768) return;
       
         //   touchMoveX = event.clientX;
         //   const diff = touchMoveX - touchStartX;
         //   currentTranslate += diff;
         //   setPositionX(slider, currentTranslate);
         // }
       
         // function pointerUpHandler() {
         //   if (!isDragging || window.innerWidth >= 768) return;
       
         //   isDragging = false;
         //   const diff = touchMoveX - touchStartX;
         //   const threshold = slider.offsetWidth * 0.2;
       
         //   if (Math.abs(diff) > threshold) {
         //     currentIndex =
         //       diff > 0
         //         ? Math.max(0, currentIndex - 1)
         //         : Math.min(radioButtons.length - 1, currentIndex + 1);
         //   }
       
         //   changeSlide(currentIndex);
         //   lastSwipeTime = Date.now();
         // }
       
         // function setPositionX(element, position) {
         //   element.style.transform = "translateX(" + position + "px)";
         // }
       
         // function changeSlide(index) {
         //   const slideWidth = document.querySelector(".slide")?.offsetWidth || 0;
         //   if (slider) {
         //     currentTranslate = -index * slideWidth;
         //     slider.style.transform = `translateX(${currentTranslate}px)`;
         //     currentIndex = index;
       
         //     radioButtons.forEach(function (radio, radioIndex) {
         //       if (radio) {
         //         radio.checked = radioIndex === currentIndex;
         //       }
         //     });
         //   }
         // }
       
         // function autoSlide() {
         //   currentIndex = (currentIndex + 1) % radioButtons.length;
         //   changeSlide(currentIndex);
         // }
       
         // function startAutoSlide() {
         //   intervalId = setInterval(function () {
         //     const now = Date.now();
         //     if (now - lastSwipeTime > 3000) {
         //       autoSlide();
         //     }
         //   }, 3500);
         // }
       
         // if (slider) {
         //   startAutoSlide();
         // }
   
       
}

document.addEventListener('DOMContentLoaded',() => {
   if (window.location.pathname.includes('/product')) {
      addaptiveTabMenu()
      addaptiveProductSlider()
   }
})




