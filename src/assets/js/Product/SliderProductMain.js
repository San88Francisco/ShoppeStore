if (window.location.pathname.includes('/product')) {
   const thumbnails = document.querySelectorAll('.thumbnail');
   const bigPicture = document.querySelector('.picture-big');
   const progressBarLine = document.querySelector('.progress-bar__line');

   let currentSlideIndex = 0;
   let touchStartX = 0;

   thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
         currentSlideIndex = index;
         moveSlides();
      });

      thumbnail.addEventListener('touchstart', (e) => {
         touchStartX = e.touches[0].clientX;
      });

      thumbnail.addEventListener('touchmove', (e) => {
         const touchEndX = e.touches[0].clientX;
         handleSwipe(touchEndX);
      });

      thumbnail.addEventListener('touchend', (e) => {
         const touchEndX = e.changedTouches[0].clientX;
         handleSwipe(touchEndX);
      });
   });

   function handleSwipe(touchEndX) {
      const swipeThreshold = 50; // Мінімальна відстань для визначення свайпу

      const deltaX = touchEndX - touchStartX;
      if (deltaX > swipeThreshold && currentSlideIndex > 0) {
         currentSlideIndex--; // Перехід до попереднього слайду
         moveSlides();
      } else if (deltaX < -swipeThreshold && currentSlideIndex < thumbnails.length - 1) {
         currentSlideIndex++; // Перехід до наступного слайду
         moveSlides();
      }
   }

   function moveSlides() {
      const thumbnailsArray = Array.from(thumbnails);
      const clickedThumbnail = thumbnailsArray[currentSlideIndex];

      const clickedImageSrc = clickedThumbnail.src;
      bigPicture.src = clickedImageSrc;

      const progressLineWidth = progressBarLine.clientWidth;
      const offsetPercentage = (currentSlideIndex / (thumbnails.length - 1)) * 100;
      const progressBarOffset = (offsetPercentage * progressLineWidth) / 100;
      progressBarLine.style.paddingLeft = `${progressBarOffset}px`;
   }

}