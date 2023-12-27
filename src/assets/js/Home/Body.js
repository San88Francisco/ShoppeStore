//ShopHeart

export const heartLogic = () => {
  const blocks = document.querySelectorAll(".shop-latest__block");

  blocks.forEach(function (block) {
    const imgElement = block.querySelector(".shop-latest__heart");

    let currentImage = "./assets/img/Home_img/Body/heart_bg.png";

    imgElement.addEventListener("click", function () {
      currentImage === "./assets/img/Home_img/Body/heart_bg.png"
        ? (currentImage = "./assets/img/Home_img/Body/red_heart.png")
        : (currentImage = "./assets/img/Home_img/Body/heart_bg.png");

      imgElement.src = currentImage;
    });
  });
}

heartLogic();

// Функція яка бере наші данні з бек-енду
const fetchData = async () => {
  try {
        const response = await fetch('https://650f314454d18aabfe99ec68.mockapi.io/cart');
        // Обробка отриманих даних
        const data = await response.json();
        // Записуємо данні в локальне сховище
        localStorage.setItem('allProduct', JSON.stringify(data));
        
        return data;
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

fetchData()
