import { fetchData } from '../API/fetch-products';
import { discount } from '../Shop/Discount';
import { LinkAddToCart } from './LinkAddToCart';

const itemsPerPage = 6;
let currentPage = 1;

const renderPage = (page, contents) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = contents.slice(startIndex, endIndex);
  const shopLatestBlocks = document.querySelector('.shop-latest-blocks') || [];
  shopLatestBlocks.innerHTML = '';

  pageItems.forEach(
    ({
      category,
      categoryClass,
      typeProduct,
      typeClass,
      imageUrl,
      name,
      price,
      productVariant,
    }) => {
      shopLatestBlocks.innerHTML += `
    <li id="hide" class="shop-latest__block">
    <div class="shop-latest__img">
      <a href="./product.html"><img src="${imageUrl}" alt="" /></a>
      <p class="productVariant">${productVariant}</p>
      <div class="shop-latest_hover">
          <div class="shop-latest_hover_container">
            <a>
              <p>ADD TO CART</p>
            </a>
          </div>
      </div>
      <div class="label-container">
          <div class="${categoryClass} category">${category}</div>
          <div class="${typeClass} category">${typeProduct}</div>
      </div>
    </div>
    <h3 class="shop-latest__name"><a href="#">${name}</a></h3>
    <h4 class="shop-latest__price">
      <a href="#">$ ${price},00</a>
    </h4>
  </li>`;
    }
  );
  discount();
};

const generateBtn = (countBlock) => {
  for (let i = 1; i <= countBlock; i++) {
    const lastPageBtn = document.querySelector('.lastPageBtn');
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.classList.add(`cards__pages`);
    div.setAttribute('data-index-Of-Btn', i);
    i === 1 ? div.classList.add('act_page') : 0;
    p.textContent = i;
    lastPageBtn.insertAdjacentElement('beforebegin', div);
    div.insertAdjacentElement('afterbegin', p);
  }
};

export const clickToInotherPage = (contents, totalPages) => {
  renderPage(currentPage, contents)
  console.log('good',contents );
  const cardsPages = document.querySelectorAll('.cards__pages');
  cardsPages.forEach((item) => {
    item.addEventListener('click', () => {
      const indexOfBtn = item.getAttribute('data-index-Of-Btn');
      const actPage = document.querySelector('.act_page');
      const nuberOfNowPage = parseFloat(
        actPage.getAttribute('data-index-Of-Btn')
      );
      const nextActPage = parseFloat(item.getAttribute('data-index-Of-Btn'));
      const arrowBack = document.querySelector('.cards__pages__arrow-back');
      if (indexOfBtn !== 'tab-btn') {
        console.log('renderPage(indexOfBtn, contents)',contents);
        renderPage(indexOfBtn, contents);
        document.querySelector('.act_page').classList.remove('act_page');
        item.classList.add('act_page');
        nextActPage !== 1
          ? (arrowBack.style.display = 'flex')
          : (arrowBack.style.display = 'none');
      } else {
        const tabTo = item.getAttribute('data-tab-to');
        if (tabTo === 'forward') {
          if (nuberOfNowPage !== totalPages) {
            renderPage(nuberOfNowPage + 1, contents);
            const nextElememt = document.querySelector(
              `[data-index-Of-Btn="${nuberOfNowPage + 1}"]`
            );
            nextElememt.classList.add('act_page');
            arrowBack.style.display = 'flex';
          } else {
            renderPage(1, contents);
            const nextElememt = document.querySelector(
              `[data-index-Of-Btn="1"]`
            );
            nextElememt.classList.add('act_page');
            arrowBack.style.display = 'none';
          }
          actPage.classList.remove('act_page');
        } else {
          renderPage(nuberOfNowPage - 1, contents);
          actPage.classList.remove('act_page');
          const nextElememt = document.querySelector(
            `[data-index-Of-Btn="${nuberOfNowPage - 1}"]`
          );
          nextElememt.classList.add('act_page');
          nuberOfNowPage - 1 !== 1
            ? (arrowBack.style.display = 'flex')
            : (arrowBack.style.display = 'none');
        }
      }
    });
  });
};

const renderProducts = async () => {
  const item = JSON.parse(localStorage.getItem('allProduct'));
  const contents = item ? item : await fetchData();

  if (contents) {
    const totalPages = Math.ceil(contents.length / itemsPerPage);

    renderPage(currentPage, contents);
    console.log('good');
    if (window.location.pathname.includes('/shop')) {
      generateBtn(totalPages);
      clickToInotherPage(contents, totalPages);
    }
  }
  LinkAddToCart(contents);
};

renderProducts();
