import { downloadView } from './DownloadViev';
import { orderViev } from './OrderViev';

if (window.location.pathname.includes('/my-account')) {
  orderViev();
  downloadView();

  const tabPageClickToTarget = () => {
    const click = document.querySelectorAll('[class*="click-"]');
    let thisClickGroup = [];
    let item;
    if (click !== null) {
      click.forEach((itemClick) => {
        itemClick.addEventListener('click', () => {
          item = itemClick;
          thisClickGroup = [];
          const perentGroupName = itemClick.parentElement.className;
          click.forEach((clearItem) =>
            clearItem.parentElement.className === perentGroupName
              ? thisClickGroup.push(clearItem)
              : 0
          );
          const itemName = item.className.match(/\bclick-\w+\b/g).join(' ');
          const itemIndex = itemName.split('click-').join('');
          const itemTarget = document.querySelectorAll(
            `.targetOf-${itemIndex}`
          );
          const targetGroup = document.querySelectorAll('[class*="targetOf-"]');

          const eventClickName = item.className
            .match(/\baddClass-\w+\b/g)
            .join(' ');
          const eventClickIndex = eventClickName.split('addClass-').join('');
          //  console.log(itemTarget);
          targetGroup.forEach(
            (targetItem) => (targetItem.style.display = 'none')
          );
          click.forEach((clearItem) =>
            clearItem.classList.remove(eventClickIndex)
          );
          itemTarget.forEach((item) => (item.style.display = 'flex'));
          item.classList.add(eventClickIndex);
        });
      });
    }
  };
  //function of tab page
  tabPageClickToTarget();

  //add bill code
  const addAddress = document.querySelector('#addAddress');
  addAddress.addEventListener('click', () => {
    addAddress.classList.add('none');
    document.querySelector('.bill-registr').style.display = 'block';
  });
  //folder code
  const selectYourItem = document.querySelectorAll('.selectYourItem');
  selectYourItem.forEach((itemClick) => {
    itemClick.addEventListener('click', () => {
      if (itemClick.children[1].checked === false) {
        itemClick.children[1].checked = true;
        const input = document.querySelectorAll('.input');
        input.forEach((item) => {
          if (item !== itemClick.children[1]) {
            item.checked = false;
          }
        });
        const optionItem = document.querySelectorAll('.optionItemElement');
        optionItem.forEach((item) => {
          item.addEventListener('click', () => {
            item.parentElement.parentElement.children[0].textContent =
              item.textContent;
          });
        });
      } else {
        itemClick.children[1].checked = false;
      }
    });
    itemClick.children[1].checked = false;
  });

  // add to underline for element
  /*  const underlineLine = document.querySelector('.underline-header__line');
     const navLinks = document.querySelectorAll('.myAccount__navigation ul li a');
  
     function updateLineOnSliderScroll() {
        const activeLink = document.querySelector('.myAccount__navigation ul li a.act');
        // const underlineLine = document.querySelector('.underline-header__line');
        const screenWidth = window.innerWidth;
  
        if (activeLink && underlineLine) {
           const activeLinkWidth = activeLink.getBoundingClientRect().width;
           const activeLinkOffsetLeft = activeLink.getBoundingClientRect().left - document.querySelector('.myAccount__navigation').getBoundingClientRect().left;
  
           underlineLine.style.width = `${activeLinkWidth}px`;
  
           if (screenWidth > 700) {
              underlineLine.style.transform = `translateX(${activeLinkOffsetLeft}px)`;
           } else {
              underlineLine.style.transform = `translateX(${activeLinkOffsetLeft - 13.59}px)`;
           }
        }
     }
     function updateLinePosition(activeLink) {
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
  
     navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
           event.preventDefault();
  
           // Помітити активний елемент
           navLinks.forEach(link => link.classList.remove('act'));
           link.classList.add('act');
  
           updateLinePosition(this);
        });
     });
  
     window.addEventListener('resize', function () {
        const activeLink = document.querySelector('.myAccount__navigation ul li a.act');
        if (activeLink) {
           updateLinePosition(activeLink);
        }
     });
  
     const sliderContainer = document.querySelector('.slider-container');
     sliderContainer.addEventListener('scroll', () => {
        updateLineOnSliderScroll();
     });*/

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const sliderContainer = document.querySelector('.slider-container');

  prevButton.addEventListener('click', () => {
    const currentScroll = sliderContainer.scrollLeft;
    const slideWidth = sliderContainer.clientWidth;

    sliderContainer.scrollTo({
      left: Math.max(currentScroll - slideWidth, 0),
      behavior: 'smooth',
    });
  });

  nextButton.addEventListener('click', () => {
    const currentScroll = sliderContainer.scrollLeft;
    const slideWidth = sliderContainer.clientWidth;

    sliderContainer.scrollTo({
      left: currentScroll + slideWidth,
      behavior: 'smooth',
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
          behavior: 'smooth',
        });
      } else {
        sliderContainer.scrollBy({
          left: -slideWidth,
          behavior: 'smooth',
        });
      }
    }
  });

  function updateButtons() {
    const isScrollEnd =
      sliderContainer.scrollLeft ===
      sliderContainer.scrollWidth - sliderContainer.clientWidth;
    const isNotScrolled = sliderContainer.scrollLeft === 0;

    if (isNotScrolled) {
      prevButton.classList.remove('go');
      nextButton.classList.add('go');
    } else if (isScrollEnd) {
      nextButton.classList.remove('go');
    } else {
      nextButton.classList.add('go');
      prevButton.classList.add('go');
    }
  }

  sliderContainer.addEventListener('scroll', updateButtons);
  //  Отримуємо данні з таблиці, і поміщаємо їх в блок
  /*   document.addEventListener("DOMContentLoaded", function () {
         const tableRows = document.querySelectorAll(".targetOf-orders tbody tr");
   
         const accountOrder = document.querySelector(".account__order"); // Знаходимо блок account__order
   
         tableRows.forEach(row => {
            if (!row.querySelector("th")) { // Ігноруємо рядок з тегом <th>
               const [orderNumber, date, status, total, actions] = row.querySelectorAll("td");
   
               const miniOrder = document.createElement("div");
               miniOrder.classList.add("account__order-mini", "mini-order");
   
               const bodyDiv = document.createElement("div");
               bodyDiv.classList.add("mini-order__body");
   
               const column1 = document.createElement("div");
               column1.classList.add("mini-order__column");
               const column2 = document.createElement("div");
               column2.classList.add("mini-order__column");
   
               const item1 = document.createElement("div");
               item1.classList.add("mini-order__item");
               item1.textContent = orderNumber.textContent;
   
               const item2 = document.createElement("div");
               item2.classList.add("mini-order__item");
               item2.textContent = date.textContent;
   
               const item3 = document.createElement("div");
               item3.classList.add("mini-order__item");
               item3.textContent = status.textContent;
   
               const item4 = document.createElement("div");
               item4.classList.add("mini-order__item");
               item4.textContent = total.textContent;
   
               // ... Додаєте необхідні дані в блоки column1 і column2 для інших елементів таблиці
   
               column1.appendChild(item1);
               column1.appendChild(item2);
               column1.appendChild(item3);
               column1.appendChild(item4);
   
               // Тут можна додати дані в column2 для інших елементів таблиці, якщо потрібно
   
               bodyDiv.appendChild(column1);
               bodyDiv.appendChild(column2);
   
               miniOrder.appendChild(bodyDiv);
               accountOrder.appendChild(miniOrder);
            }
         });
      });
   
   */
}
