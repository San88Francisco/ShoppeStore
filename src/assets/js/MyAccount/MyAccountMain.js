import { downloadView } from './DownloadViev';
import { myProfile } from './MyProfile';
import { orderViev } from './OrderViev';

const signInUser = localStorage.getItem('userSignIn') || false;

if (window.location.pathname.includes('/my-account') && signInUser) {
  orderViev();
  downloadView();
  myProfile();

  const click = document.querySelectorAll('[class*="click-"]');
  let thisClickGroup = [];
  let item;

  click.forEach((itemClick) => {
    itemClick.addEventListener('click', () => {
      // Розрахунок половини ширини вікна перегляду
      const halfViewportWidth = window.innerWidth / 2;

      // Розрахунок половини ширини об'єкта
      const halfItemWidth = itemClick.clientWidth / 2;

      // Розрахунок відстані, яку потрібно прокрутити, щоб об'єкт був по центру
      const scrollDistance = itemClick.offsetLeft - halfViewportWidth + halfItemWidth;

      // Прокрутка контейнера, щоб об'єкт був по центру
      sliderContainer.scrollTo({
        left: scrollDistance,
        behavior: 'smooth',
      });

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

  const addAddress = document.querySelector('#addAddress');
  addAddress.addEventListener('click', () => {
    addAddress.classList.add('none');
    document.querySelector('.bill-registr').style.display = 'block';
  });

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
}
