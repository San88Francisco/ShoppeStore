// ||| Slider |||

// Створюємо наші зображення imgSlider
const imgSlider = document.querySelectorAll('.slide');
console.log('images:', imgSlider);

// Створюємо наші кружечки гортання
const sliderDot = document.querySelectorAll('.radio-buttons label');
console.log('sliderDot:', sliderDot);

// Лічильник для слайдера
let currentSlider = 0;

// Функція яка включає наш слайдер
function slider() {
  for (let i = 0; i < imgSlider.length; i++) {
    // тут ми проходимося по нашим зображенням та задаємо їм клас opacity0
    imgSlider[i].classList.add('opacity0');
    sliderDot[i].classList.remove('slider_dot');
  }
  // тут ми видаляємо клас opacity0 з того зображення, що вказано в currentSlider, тобто таким чином завжди буде видно одне зображення на екрані
  imgSlider[currentSlider].classList.remove('opacity0');
  sliderDot[currentSlider].classList.add('slider_dot');
  // перевірка якщо ми дійшли до останнього зображення, переходимо на перше зображення, або в else йдемо далі по зображеннях
}

slider();

const rightSlider = () => {
  // Якщо зображення останнє і я гортаю на вправо, тоді воно перегортає на перше
  if (currentSlider + 1 === imgSlider.length) {
    // якщо ця умова спрацювала, тоді ми присвоюємо currentSlider перше фото
    currentSlider = 0;
  } else {
    // в іншому випадку просто додаємо і зображення прогортує вправо
    currentSlider++;
  }
  return slider();
};

sliderDot.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    console.log('dot:', dot);
    console.log('index:', index);
    currentSlider = index;
    slider();
  });
});

function startTime() {
  // Встановлюємо інтервал на 3000 мілісекунд (3 секунда)
  setInterval(() => {
    console.log('good');
    rightSlider();
  }, 5000);
}

// Викликаємо функцію startTime, щоб розпочати інтервал
startTime();

// ||| Slider |||

//Body
document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.shop-latest__block');

  blocks.forEach(function (block) {
    const imgElement = block.querySelector('.shop-latest__heart');

    let currentImage = './assets/img/Home_img/Body/heart.png';

    imgElement.addEventListener('click', function () {
      currentImage === './assets/img/Home_img/Body/heart.png'
        ? (currentImage = './assets/img/Home_img/Body/red_heart.png')
        : (currentImage = './assets/img/Home_img/Body/heart.png');

      imgElement.src = currentImage;
    });
  });
});
//Body
