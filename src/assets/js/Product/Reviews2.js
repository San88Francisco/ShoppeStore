const productBlock = document.querySelector('.a')

const reviesProduct = (item) => {
    console.log(item);
    productBlock.innerHTML = `
    <div class="product--overview">
        <div class="product--overview__pictures">
            <img src="./assets/img/Product_img/Img 01 copy.png" alt="" />
            <img src="./assets/img/Product_img/Img 01 copy.png" alt="" />
            <img src="./assets/img/Product_img/Img 01 copy.png" alt="" />
            <img src="./assets/img/Product_img/Img 01 copy.png" alt="" />
            <img src="../../../assets/img/Product_img/Img 01 copy.png" alt="" class="picture-big" />
            <div class="progress-bar" id="progress-bar">
            <div class="progress-bar__line"></div>
            </div>
        </div>
        <div class="product--overview__view">
            <h3>Lira Earrings</h3>
            <div class="price">$ 20,00</div>
            <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
            fugit ab pariatur eum hic nulla, nemo vero impedit! Sit illum impedit
            cupiditate sequi aliquam odit voluptatum exercitationem! Ipsam,
            voluptatum corrupti?
            </p>
            <div class="btn--row">
            <div class="change--amount">
                <button class="minus">-</button>
                <span class="amount">1</span>
                <button class="plus">+</button>
            </div>
            <div class="add-to-cart">
                <button>ADD TO CART</button>
            </div>
            </div>
            <div class="icons--row">
            <img class="product__heart" src="../../../assets/img/Home_img/Body/heart_bg.png" alt="" />
            <div class="messengers">
                <ul>
                    <li>
                        <a href="#"><i class="fa fa-envelope" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </div>
            </div>
            <div class="misc">
            <p>
                <font color="#000">SKU:</font> 12
            </p>
            <p>
                <font color="#000">Category:</font> Fashion, Style
            </p>
            </div>
        </div>
    </div>
`
}
        
export const reviews = (item) => {
    setTimeout(() => {
        reviesProduct(item)
        console.log(item);
    }, 2000)
}



