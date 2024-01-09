if (window.location.pathname.includes('/my-account')) {
   const tabPageClickToTarget = () => {
      const click = document.querySelectorAll('[class*="click-"]')
      let thisClickGroup = []
      let item
      if (click !== null) {
         click.forEach(itemClick => {
            itemClick.addEventListener('click', () => {
               item = itemClick
               thisClickGroup = []
               const perentGroupName = itemClick.parentElement.className
               click.forEach(clearItem => clearItem.parentElement.className
                  === perentGroupName ? thisClickGroup.push(clearItem) : 0)
               const itemName = item.className.match(/\bclick-\w+\b/g).join(' ')
               const itemIndex = itemName.split('click-').join('')
               const itemTarget = document.querySelectorAll(`.targetOf-${itemIndex}`)
               const targetGroup = document.querySelectorAll('[class*="targetOf-"]')

               const eventClickName = item.className.match(/\baddClass-\w+\b/g).join(' ')
               const eventClickIndex = eventClickName.split('addClass-').join('')
               console.log(itemTarget);
               targetGroup.forEach(targetItem => targetItem.style.display = 'none')
               click.forEach(clearItem => clearItem.classList.remove(eventClickIndex))
               itemTarget.forEach(item => item.style.display = 'flex')
               item.classList.add(eventClickIndex)

            })
         })
      }
   }
   //function of tab page
   tabPageClickToTarget()

   //add bill code
   const addAddress = document.querySelector('#addAddress')
   addAddress.addEventListener('click', () => {
      addAddress.classList.add('none')
      document.querySelector('.bill-registr').style.display = 'block'
   })
   //folder code
   const selectYourItem = document.querySelectorAll('.selectYourItem');
   selectYourItem.forEach(itemClick => {
      itemClick.addEventListener('click', () => {
         if (itemClick.children[1].checked === false) {
            itemClick.children[1].checked = true
            const input = document.querySelectorAll('.input')
            input.forEach(item => {
               if (item !== itemClick.children[1]) {
                  item.checked = false
               }
            })
            const optionItem = document.querySelectorAll('.optionItemElement');
            optionItem.forEach((item) => {
               item.addEventListener('click', () => {
                  item.parentElement.parentElement.children[0].textContent = item.textContent;
               })
            })
         } else {
            itemClick.children[1].checked = false
         }
      })
      itemClick.children[1].checked = false
   })

   // add to underline for element
   const underlineLine = document.querySelector('.underline-header__line');
   const navLinks = document.querySelectorAll('.myAccount__navigation ul li a');

   function updateLinePosition() {
      const activeLink = document.querySelector('.myAccount__navigation ul li a.act');

      if (activeLink) {
         const activeLinkWidth = activeLink.getBoundingClientRect().width;
         const activeLinkOffsetLeft = activeLink.getBoundingClientRect().left - document.querySelector('.myAccount__navigation').getBoundingClientRect().left;

         underlineLine.style.width = `${activeLinkWidth}px`;
         const screenWidth = window.innerWidth;
         if (screenWidth > 700) {
            underlineLine.style.transform = `translateX(${activeLinkOffsetLeft}px)`;
         } else {
            underlineLine.style.transform = `translateX(${activeLinkOffsetLeft - 13.59}px)`;

         }
      }
   }

   navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
         event.preventDefault(); // Уникнення переходу за посиланням

         updateLinePosition();
      });
   });

   window.addEventListener('resize', function () {
      updateLinePosition();
   });


   const prevButton = document.querySelector('.prev');
   const nextButton = document.querySelector('.next');
   const sliderContainer = document.querySelector('.slider-container');

   prevButton.addEventListener('click', () => {
      const currentScroll = sliderContainer.scrollLeft;
      const slideWidth = sliderContainer.clientWidth;

      sliderContainer.scrollTo({
         left: Math.max(currentScroll - slideWidth, 0),
         behavior: 'smooth'
      });
   });

   nextButton.addEventListener('click', () => {
      const currentScroll = sliderContainer.scrollLeft;
      const slideWidth = sliderContainer.clientWidth;

      sliderContainer.scrollTo({
         left: currentScroll + slideWidth,
         behavior: 'smooth'
      });
   });

   let touchStartX = 0;
   let touchEndX = 0;

   sliderContainer.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
   });

   sliderContainer.addEventListener('touchmove', (event) => {
      touchEndX = event.touches[0].clientX;
   });

   sliderContainer.addEventListener('touchend', () => {
      const threshold = Math.abs(touchStartX - touchEndX);
      const slideWidth = sliderContainer.clientWidth;

      if (threshold > 50) {
         if (touchStartX > touchEndX) {
            sliderContainer.scrollBy({
               left: slideWidth,
               behavior: 'smooth'
            });
         } else {
            sliderContainer.scrollBy({
               left: -slideWidth,
               behavior: 'smooth'
            });
         }
      }
   });
}
