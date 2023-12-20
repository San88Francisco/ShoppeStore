document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const radioButtons = document.querySelectorAll(
    '.radio-buttons input[type="radio"]'
  );
  let currentIndex = 0;
  let intervalId;

  if (slider) {
    radioButtons.forEach(function (radio, index) {
      if (radio) {
        radio.addEventListener('change', function () {
          changeSlide(index);
          clearInterval(intervalId);
        });
      }
    });

    slider.addEventListener('mouseenter', function () {
      clearInterval(intervalId);
    });

    slider.addEventListener('mouseleave', function () {
      intervalId = setInterval(autoSlide, 3500);
    });
  }

  function changeSlide(index) {
    const slideWidth = document.querySelector('.slide')?.offsetWidth || 0;
    if (slider) {
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
      currentIndex = index;

      radioButtons.forEach(function (radio, radioIndex) {
        if (radio) {
          radio.checked = radioIndex === currentIndex;
        }

      });

      slider.addEventListener("pointerdown", pointerDownHandler);
   }

   function pointerDownHandler(event) {
      isDragging = true;
      touchStartX = event.clientX || event.touches[0].clientX;
      document.addEventListener("pointermove", pointerMoveHandler);
      document.addEventListener("pointerup", pointerUpHandler);
   }

   function pointerMoveHandler(event) {
      if (isDragging) {
         touchMoveX = event.clientX || event.touches[0].clientX;
         const diff = touchMoveX - touchStartX;
         currentTranslate += diff;
         setPositionX(slider, currentTranslate);
      }
   }

   function pointerUpHandler() {
      isDragging = false;
      document.removeEventListener("pointermove", pointerMoveHandler);
      document.removeEventListener("pointerup", pointerUpHandler);
      const diff = touchMoveX - touchStartX;
      const threshold = slider.offsetWidth * 0.2;
      if (Math.abs(diff) > threshold) {
         currentIndex = (diff > 0) ? Math.max(0, currentIndex - 1) : Math.min(radioButtons.length - 1, currentIndex + 1);
      }
      changeSlide(currentIndex);
   }


   function setPositionX(element, position) {
      element.style.transform = 'translateX(' + position + 'px)';
   }

   function changeSlide(index) {
      const slideWidth = document.querySelector(".slide")?.offsetWidth || 0;
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
   }

   function autoSlide() {
      currentIndex = (currentIndex + 1) % radioButtons.length;
      changeSlide(currentIndex);
   }

   if (slider) {
      intervalId = setInterval(autoSlide, 3500);
   }
});
