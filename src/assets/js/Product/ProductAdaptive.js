const addaptiveTabMenu = () => {
  const productPage = document.querySelectorAll('.product__page')
  const pagesFolderCheckbox = document.querySelectorAll('.pages-folder-checkbox')
   pagesFolderCheckbox.forEach(item => {
    item.addEventListener('click', ()=> {
      const pageNumber = item.getAttribute('data-page-nuber')
      const pageActive = document.querySelector(`.product__page${pageNumber}`)
      const isSelect = pageActive.getAttribute('data-is-page-select')
      
      if(isSelect === 'true'){
        pageActive.setAttribute('data-is-page-select', 'false')
        item.checked = false
        pageActive.style.display = 'none'
        return
      }

      for(let i = 1; i < 4; i++){
        pagesFolderCheckbox[i - 1].checked = false
        const page = document.querySelector(`.product__page${i}`)
        page.style.display = 'none'
      }

      productPage.forEach(page => {
        page.setAttribute('data-is-page-select', 'false')
      })

      item.checked = true
      pageActive.setAttribute('data-is-page-select', 'true')
      pageActive.style.display = 'grid'

      const ReviewUserName = document.querySelector('.ReviewUserName')
      const ReviewUserMail = document.querySelector('.ReviewUserMail')

      const userData = localStorage.getItem('myProfile') !== null ? JSON.parse(localStorage.getItem('myProfile')) : null
      if(userData !== null){
         ReviewUserName.value = `${userData.nameInput} ${userData.lastNameInput}`
         ReviewUserMail.value = userData.emailInput

         const checkboxToSave = document.querySelector('.checkbox-to-save')
         checkboxToSave.style.display = 'none'
         ReviewUserName.style.display = 'none'
         ReviewUserMail.style.display = 'none'
         return
      }

      const tabButtons = document.querySelectorAll('.info__tab-page');
      tabButtons.forEach(btn => btn.classList.remove('info__tab__line'));
      tabButtons[parseFloat(pageNumber) - 1].classList.add('info__tab__line');
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




