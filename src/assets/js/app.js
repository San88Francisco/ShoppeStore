//Slider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const radioButtons = document.querySelectorAll(
    '.radio-buttons input[type="radio"]'
  );
  let currentIndex = 0;
  let intervalId;

  radioButtons.forEach(function (radio, index) {
    radio.addEventListener("change", function () {
      changeSlide(index);
      clearInterval(intervalId);
    });
  });

  slider.addEventListener("mouseenter", function () {
    clearInterval(intervalId);
  });

  slider.addEventListener("mouseleave", function () {
    intervalId = setInterval(autoSlide, 3500);
  });

  function changeSlide(index) {
    const slideWidth = document.querySelector(".slide").offsetWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;

    radioButtons.forEach(function (radio, radioIndex) {
      radio.checked = radioIndex === currentIndex;
    });
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % radioButtons.length;
    changeSlide(currentIndex);
  }

  intervalId = setInterval(autoSlide, 3500);
});
//Slider

//Body
document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".shop-latest__block");

  blocks.forEach(function (block) {
    const imgElement = block.querySelector(".shop-latest__heart");

    let currentImage = "../../../assets/img/Home_img/Body/heart_bg.png";

    imgElement.addEventListener("click", function () {
      currentImage === "../../../assets/img/Home_img/Body/heart_bg.png"
        ? (currentImage = "../../../assets/img/Home_img/Body/red_heart.png")
        : (currentImage = "../../../assets/img/Home_img/Body/heart_bg.png");

      imgElement.src = currentImage;
    });
  });
});
//Body
