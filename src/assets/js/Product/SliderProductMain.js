if (window.location.pathname.includes('/product')) {
   document.addEventListener('DOMContentLoaded', function () {
      const thumbnails = document.querySelectorAll('.thumbnail');
      const slides = document.querySelectorAll('.product--overview__slides img');
      const progressBarLine = document.querySelector('.progress-bar__line');

      let currentSlideIndex = 0;
      let touchStartX = 0;
      let touchEndX = 0;

      thumbnails.forEach((thumbnail, index) => {
         thumbnail.addEventListener('click', () => {
            currentSlideIndex = index;
            setActiveThumbnail();
            moveSlides();
         });
      });

      function setActiveThumbnail() {
         thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('active_icon');
         });
         thumbnails[currentSlideIndex].classList.add('active_icon');
      }

      function moveSlides() {
         const slideWidth = slides[currentSlideIndex].offsetWidth;
         slides.forEach(slide => {
            slide.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
         });

         const progressLineWidth = progressBarLine.clientWidth;
         const offsetPercentage = (currentSlideIndex / (thumbnails.length - 1)) * 100;
         const progressBarOffset = (offsetPercentage * progressLineWidth) / 100;
         progressBarLine.style.marginLeft = `${progressBarOffset * 3}px`;
      }

      slides.forEach(slide => {
         slide.addEventListener('touchstart', handleTouchStart);
         slide.addEventListener('touchmove', handleTouchMove);
         slide.addEventListener('touchend', handleTouchEnd);
      });

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
         setActiveThumbnail();
      }


      //Перенесемо Блок додавання кількості в низ секції
      const parent_original = document.querySelector('.product--overview');
      const parent = document.querySelector('.show__content');
      const itemOne = document.querySelector('.icons--row');
      const itemTwo = document.querySelector('.misc');

      //Слухаємо ширину екрану
      window.addEventListener('resize', function (event) {
         //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
         if (window.innerWidth < 468) {
            if (!itemOne.classList.contains('done')) {
               parent.insertBefore(itemOne, parent.children[1]);
               itemOne.classList.add('done');
            }
         } else {
            if (itemOne.classList.contains('done')) {
               parent_original.insertBefore(itemOne, parent_original.children[6]);
               itemOne.classList.remove('done');
            }
         }
         if (window.innerWidth < 468) {
            if (!itemTwo.classList.contains('done')) {
               parent.insertBefore(itemTwo, parent.children[2]);
               itemTwo.classList.add('done');
            }
         } else {
            if (itemTwo.classList.contains('done')) {
               parent_original.insertBefore(itemTwo, parent_original.children[7]);
               itemTwo.classList.remove('done');
            }
         }
      });

      //Функціонал View More
      // Оригінальний текст, який буде встановлено
      const originalText = document.querySelector('.product--overview__text').innerHTML;

      // Функція для зміни тексту в залежності від ширини екрану
      function changeTextContent() {
         const textContent = document.querySelector('.product--overview__text');
         if (window.innerWidth < 468) {
            textContent.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam placerat...';
         } else {
            textContent.innerHTML = originalText;
         }
      }

      // Викликаємо функцію при завантаженні сторінки та при зміні розміру вікна
      window.addEventListener('load', changeTextContent);
      window.addEventListener('resize', changeTextContent);

      window.addEventListener('load', function () {
         const buttonShow = document.querySelector('.show_content');
         const content = document.querySelector('.show__content');
         const buttonHide = document.querySelector('.hide_content')

         buttonShow.addEventListener('click', function () {
            content.classList.add('opacity');
            buttonShow.style = 'display: none';
         });

         buttonHide.addEventListener('click', function () {
            content.classList.remove('opacity');
            buttonShow.style = 'display: inline-flex';
         });
      });
   });

}


