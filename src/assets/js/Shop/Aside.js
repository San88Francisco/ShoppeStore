// myr
// const dropbtns = document.querySelectorAll(".dropdown .drop-btn");
// const myDropdowns = document.querySelectorAll(".dropdown-content");
// const rotateImg = document.querySelectorAll(".drop-btn img");

// let activeDropdown = null;
// let activeRotateImg = null;

// function closeActiveDropdown(target) {
//   if (activeDropdown && target !== activeDropdown.previousElementSibling) {
//     activeDropdown.classList.remove("show");
//     activeRotateImg.classList.remove("dropbtn-icon-rotate");
//     activeDropdown = null;
//     activeRotateImg = null;
//   }
// }

// dropbtns.forEach((dropbtn, index) => {
//   if (dropbtn) {
//     dropbtn.addEventListener("click", () => {
//       closeActiveDropdown(dropbtn);
//       myDropdowns[index].classList.toggle("show");
//       rotateImg[index].classList.toggle("dropbtn-icon-rotate");
//       activeDropdown = myDropdowns[index];
//       activeRotateImg = rotateImg[index];
//     });
//   }
// });

// window.onclick = function (event) {
//   closeActiveDropdown(event.target);
// };

// window.onblur = function (event) {
//   closeActiveDropdown(event.relatedTarget);
// };

/* ||| Filter price - input range, "Shop page" повзунок ||| */

document.addEventListener("DOMContentLoaded", function () {
  // Перевірка, чи ми на сторінці "Shop"
  if (window.location.pathname.includes("/shop")) {
    const rangeInput = document.querySelectorAll(".range-input input");
    const priceInput = document.querySelectorAll(".price-input input");
    const priceSum = document.querySelectorAll(".price-range-summ span");
    const progress = document.querySelector(".slider-progress .range-progress");
    const btnFilter = document.querySelector(".price-range-filter");

    let priceGap = 10;
    let maxRange = 180; // Змінено максимальне значення

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
            priceSum[0].innerText = `${rangeInput[0].value}`;
            progress.style.left = (rangeInput[0].value / maxRange) * 100 + "%";
          } else {
            rangeInput[1].value = minVal + priceGap;
            priceSum[1].innerText = `${rangeInput[1].value}`;
            progress.style.right =
              100 - (rangeInput[1].value / maxRange) * 100 + "%";
          }
        } else {
          priceSum[0].innerText = `${+minVal}`;
          priceSum[1].innerText = `${+maxVal}`;
          progress.style.left = (minVal / maxRange) * 100 + "%";
          progress.style.right = 100 - (maxVal / maxRange) * 100 + "%";
        }
      });

      /* ||| Filter price - logic ||| */

      btnFilter.addEventListener("click", () => {
        const filteredData = allBlockData.filter((item) => {
          const itemPrice = item.price.replace(
            /[^\d]/g,
            ""
          ); /* забираємо пробіли та лишні знаки $ з  ціни */

          return (
            /* Перевірка самогу фільтру з ціною. Там де +rangeInput[0].value це лівий повзунок, +rangeInput[1].value це правий повзунок */
            +rangeInput[0].value * 100 <= +itemPrice &&
            +rangeInput[1].value * 100 >= +itemPrice
          );
        });

        /* Запускаємо нашу функцію та передаємо туди фільтрований товар */
        myTest(filteredData);
      });

      /* Доступаємося до всіх наших карток з товарами */
      const shopLatestBlocks = document.querySelectorAll(".shop-latest__block");
      /* Доступаємося до головного блоку де всі картки */
      const shopBlocks = document.querySelector(".shop-latest-blocks");

      /* Отримуємо дані з кожного блоку в масиві */
      const allBlockData = [];

      /** Тут ми створюємо наш масив з всіма данними з карток товарів */
      shopLatestBlocks.forEach((shopLatestBlock) => {
        /** Це перевірка для виявлення карток з класом add-discount. До їхньої ціни доступаємося окремо */
        const discountPrice = shopLatestBlock.querySelector(
          ".shop-latest__price .discount"
        );
        const discountNull = discountPrice ? discountPrice : null;

        const discountFilter =
          discountNull !== null
            ? discountPrice
            : shopLatestBlock.querySelector(".shop-latest__price a");

        const blockData = {
          name: shopLatestBlock.querySelector(".shop-latest__name a").innerText,
          price: discountFilter.innerText,
          imgProduct: shopLatestBlock.querySelector(".shop-latest__img a img")
            .src,
          addStyle: shopLatestBlock.firstElementChild.classList[1],
        };

        return allBlockData.push(blockData);
      });

      const myTest = (filter) => {
        shopLatestBlocks.forEach((item) => {
          // Вертаємо всім display block, щоб всі блоки зявилися
          item.style.display = "block";

          let latestName = item.querySelector(".shop-latest__name a").innerText;

          // Перевіряємо кожен елемент в filter
          const match = filter.find(
            (filterItem) => latestName === filterItem.name
          );

          if (!match) {
            // Отримуємо той блок, який не проходить фільтрацію ціни і задаємо йому display none
            const block = item;
            block.style.display = "none";
          }
        });
      };

      // Filter price - logic, "Shop page"

      // ====Search====
      document.querySelector("#search-input").oninput = function () {
        let val = this.value.trim().toLowerCase();
        let lettersItems = document.querySelectorAll(".shop-latest__name a");

        lettersItems.forEach(function (e) {
          const shopLatestBlock2 = e.closest(".shop-latest__block");

          if (val == "") {
            shopLatestBlock2.style.display = "block";
          } else if (val !== "" && e.innerText.toLowerCase().includes(val)) {
            shopLatestBlock2.style.display = "block";
          } else {
            shopLatestBlock2.style.display = "none";
          }
        });
      };
    });
  }
});
