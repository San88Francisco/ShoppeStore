document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll(".shop-latest__block");

    blocks.forEach(function (block) {

        const imgElement = block.querySelector(".shop-latest__heart");

        let currentImage = '../../../assets/img/Home_img/heart.png';

        imgElement.addEventListener("click", function () {
            if (currentImage === '../../../assets/img/Home_img/heart.png') {
                currentImage = '../../../assets/img/Home_img/red_heart.png'; 
            } else {
                currentImage = '../../../assets/img/Home_img/heart.png';
            }
            
            imgElement.src = currentImage;
        });
    });
});