if (window.location.pathname.includes('/product')) {
   const thumbnails = document.querySelectorAll('.thumbnail');
   const slides = document.querySelectorAll('.product--overview__slides img');
   const progressBarLine = document.querySelector('.progress-bar__line');

   let currentSlideIndex = 0;
   let touchStartX = 0;
   let touchEndX = 0;

   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
         currentSlideIndex = index;
         moveSlides();
      });
   });

   slides.forEach(slide => {
      slide.addEventListener('touchstart', handleTouchStart);
      slide.addEventListener('touchmove', handleTouchMove);
      slide.addEventListener('touchend', handleTouchEnd);
   });

   function moveSlides() {
      const slideWidth = slides[currentSlideIndex].offsetWidth;
      slides.forEach(slide => {
         slide.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
      });

      /*   const progressLineWidth = progressBarLine.clientWidth;
         const offsetPercentage = (currentSlideIndex / (thumbnails.length - 1)) * 100;
         const progressBarOffset = (offsetPercentage * progressLineWidth) / 100;
         progressBarLine.style.width = `${progressBarOffset}px`;*/
   }

   function handleTouchStart(event) {
      touchStartX = event.touches[0].clientX;
   }

   function handleTouchMove(event) {
      touchEndX = event.touches[0].clientX;
   }

   function handleTouchEnd() {
      if (touchEndX < touchStartX) {
         currentSlideIndex = (currentSlideIndex < slides.length - 1) ? currentSlideIndex + 1 : currentSlideIndex;
      } else if (touchEndX > touchStartX) {
         currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : currentSlideIndex;
      }
      moveSlides();
   }


}