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
    item.addEventListener('click', ()=> {
      const pageNumber = item.getAttribute('data-page-nuber')
      const isSelect = item.getAttribute('data-is-page-select')
      const pageActive = document.querySelector(`.product__page${pageNumber}`)
      
      if(isSelect === 'true'){
        item.setAttribute('data-is-page-select', 'false')
        item.checked = false
        pageActive.style.display = 'none'
        return
      }

      for(let i = 1; i <= 3; i++){
        pagesFolderCheckbox[i].checked = false
        const page = document.querySelector(`.product__page${i}`)
        page.style.display = 'none'
      }

      pagesFolderCheckbox.forEach(checkbox => {
        checkbox.setAttribute('data-is-page-select', 'false')
      })

      item.checked = true
      item.setAttribute('data-is-page-select', 'true')
      pageActive.style.display = 'grid'

    })
   })
}


const addaptiveProductSlider = () => {
  const slider = document.querySelector(".sliderProduct");
  const radioButtons = document.querySelectorAll(
    '.radio-buttons input[type="radio"]'
  );
  const imgPath = localStorage.getItem('selectedImgPath')
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
}

document.addEventListener('DOMContentLoaded',() => {
   if (window.location.pathname.includes('/product')) {
      addaptiveTabMenu()
      addaptiveProductSlider()
   }
})




