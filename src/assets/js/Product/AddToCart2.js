import { reviews } from "./Reviews2"

export const addToCart2 = (product) => {
    const shopAllBlock = document.querySelectorAll('.shop-latest__block')
    console.log("addToCart2  shopAllBlock:", shopAllBlock)
    shopAllBlock.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(product[index],index);
            reviews(product[index])
        })
    })
 }

