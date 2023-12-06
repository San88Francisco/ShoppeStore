// myr
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const radioButtons = document.querySelectorAll(
    '.radio-buttons input[type="radio"]'
  );
  let currentIndex = 0;
  let intervalId;

  if (slider) {
    radioButtons.forEach(function (radio, index) {
      if (radio) {
        radio.addEventListener("change", function () {
          changeSlide(index);
          clearInterval(intervalId);
        });
      }
    });

    slider.addEventListener("mouseenter", function () {
      clearInterval(intervalId);
    });

    slider.addEventListener("mouseleave", function () {
      intervalId = setInterval(autoSlide, 3500);
    });
  }

  function changeSlide(index) {
    const slideWidth = document.querySelector(".slide")?.offsetWidth || 0;
    if (slider) {
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
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
