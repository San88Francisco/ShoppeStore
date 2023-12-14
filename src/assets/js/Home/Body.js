//ShopHeart
document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.shop-latest__block');

  blocks.forEach(function (block) {
    const imgElement = block.querySelector('.shop-latest__heart');

    let currentImage = './assets/img/Home_img/Body/heart_bg.png';

    imgElement.addEventListener('click', function () {
      currentImage === './assets/img/Home_img/Body/heart_bg.png'
        ? (currentImage = './assets/img/Home_img/Body/red_heart.png')
        : (currentImage = './assets/img/Home_img/Body/heart_bg.png');

      imgElement.src = currentImage;
    });
  });
});
