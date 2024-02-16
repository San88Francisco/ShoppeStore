import { fetchData } from '../API/fetch-products';
import { handleDOMContentLoaded } from '../Adaptive/SearchBurger';
import { addItemToProduct } from '../Product/AddToCart';
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
      <a href="/product.html"><img src="${imageUrl}" alt="" /></a>
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
  addItemToProduct();
};

const renderPagePlaceHolder = () => {
  const shopLatestBlocks = document.querySelector('.shop-latest-blocks') || [];

  Array(6)
    .fill(0)
    .map(() => {
      shopLatestBlocks.innerHTML += `
      <div class="card">
        <div class="image-placeholder placeholder"></div>
        <div class="title-placeholder placeholder"></div>
        <div class="text-placeholder placeholder"></div>
        <div class="text-placeholder placeholder"></div>
      </div>
    `;
    });
};
renderPagePlaceHolder();

export const generateBtn = (countBlock) => {
  const lastPageBtn = document.querySelector('.lastPageBtn');
  const paginationInfo = document.querySelector('.pagination-info');
  paginationInfo.innerHTML = '';

  Array(countBlock)
    .fill(0)
    .map((item, index) => {
      paginationInfo.innerHTML += `
      <div class='cards__pages ${
        index + 1 === 1 ? 'act_page' : ''
      }' data-index-Of-Btn=${index + 1}>
        <p>${index + 1}</p>
      </div>
    `;
    });

  // if (countBlock === 1) {
  //   lastPageBtn.style.display = 'none';
  // }

  // for (let i = 1; i <= countBlock; i++) {
  //   const lastPageBtn = document.querySelector('.lastPageBtn');
  //   const div = document.createElement('div');
  //   const p = document.createElement('p');
  //   div.classList.add(`cards__pages`);
  //   div.setAttribute('data-index-Of-Btn', i);
  //   i === 1 ? div.classList.add('act_page') : 0;
  //   p.textContent = i;
  //   lastPageBtn.insertAdjacentElement('beforebegin', div);
  //   div.insertAdjacentElement('afterbegin', p);

  // }
};

export const clickToInotherPage = (contents, totalPages) => {
  renderPage(currentPage, contents);

  if (contents.length) {
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
        const lastPageBtn = document.querySelector('.lastPageBtn');
        const goTopItems = document.querySelector('.background-block-input');

        if (indexOfBtn !== 'tab-btn') {
          renderPage(indexOfBtn, contents);
          document.querySelector('.act_page').classList.remove('act_page');
          item.classList.add('act_page');
          // nextActPage !== 1
          //   ? (arrowBack.style.display = 'flex')
          //   : (arrowBack.style.display = 'none');

          // nextActPage === totalPages
          //   ? (lastPageBtn.style.display = 'none')
          //   : (lastPageBtn.style.display = 'flex');

          goTopItems.scrollIntoView({ behavior: 'smooth' });
        } else {
          const tabTo = item.getAttribute('data-tab-to');
          goTopItems.scrollIntoView({ behavior: 'smooth' });
          lastPageBtn.style.display = 'flex';

          if (tabTo === 'forward') {
            if (nuberOfNowPage !== totalPages) {
              renderPage(nuberOfNowPage + 1, contents);
              // console.log('nextActPage2',nextActPage);

              const nextElememt = document.querySelector(
                `[data-index-Of-Btn="${nuberOfNowPage + 1}"]`
              );

              nuberOfNowPage === totalPages - 1
                ? (lastPageBtn.style.display = 'none')
                : (lastPageBtn.style.display = 'flex');

              goTopItems.scrollIntoView({ behavior: 'smooth' });

              nextElememt.classList.add('act_page');
              arrowBack.style.display = 'flex';
            } else {
              renderPage(1, contents);
              // console.log('nextActPage3',nextActPage);
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
  } else {
    console.log('Пусто');
  }
};

const renderProducts = async () => {
  const item = JSON.parse(localStorage.getItem('allProduct'));
  const contents = item ? item : await fetchData();

  if (contents) {
    const totalPages = Math.ceil(contents.length / itemsPerPage);

    renderPage(currentPage, contents);
    startFunc();

    if (window.location.pathname.includes('/shop')) {
      generateBtn(totalPages);
      clickToInotherPage(contents, totalPages);
    }
  }
  LinkAddToCart(contents);
};

renderProducts();

const renderBlackThem = () => {
  const darkThemIsOn = sessionStorage.getItem('darkThemIsOn');
  const imgLightThem = document.querySelectorAll('.light-them');
  const root = document.documentElement;

  if (darkThemIsOn === 'true') {
    root.style.setProperty('--black-color', ' rgb(256, 256,256)');
    root.style.setProperty('--white-color', 'rgb(1,1,1)');
    root.style.setProperty('--main-background', 'rgb(29 32 35)');
    root.style.setProperty(
      '--arrow-Url',
      "url('../img/dark-them/arrowSmall-dark-them.svg')"
    );
    root.style.setProperty('--account-background', 'rgb(120,120,120)');

    root.style.setProperty(
      '--stars-fill-null',
      'url(../img/dark-them/star-dark-them-none.svg) url(../img/dark-them/star-dark-them-none.svg) url(../img/dark-them/star-dark-them-none.svg) url(../img/dark-them/star-dark-them-none.svg) url(../img/dark-them/star-dark-them-none.svg)'
    );
    root.style.setProperty(
      '--star-fill-black',
      'url(../img/dark-them/star.svg)'
    );
    root.style.setProperty(
      '--star-fill-null',
      'url(../img/dark-them/star-dark-them-none.svg)'
    );

    root.style.setProperty('--white-color-rgba', 'rgba(1,1,1,0.5)');

    root.style.setProperty('--input-color', 'rgb(200,200,200)');

    root.style.setProperty('--them-swch-backround', 'rgb(60,60,60)');

    root.style.setProperty('--light-gray-color', 'rgb(58,58,58)');

    imgLightThem.forEach((item) => {
      const newSrc = item.getAttribute('data-dark-src');
      item.src = newSrc;
    });
  } else if (darkThemIsOn === 'false') {
    root.style.setProperty('--black-color', 'rgb(1,1,1)');
    root.style.setProperty('--white-color', 'rgb(256, 256,256)');
    root.style.setProperty('--main-background', 'rgb(256, 256,256)');
    root.style.setProperty(
      '--arrow-Url',
      "url('../img/Cart_img/svg/arrow_up.svg')"
    );
    root.style.setProperty('--account-background', 'rgb(239, 239, 239)');

    root.style.setProperty(
      '--stars-fill-null',
      'url(../img/Product_img/svg/Vectorstar_null_background.svg) url(../img/Product_img/svg/Vectorstar_null_background.svg) url(../img/Product_img/svg/Vectorstar_null_background.svg) url(../img/Product_img/svg/Vectorstar_null_background.svg) url(../img/Product_img/svg/Vectorstar_null_background.svg)'
    );
    root.style.setProperty(
      '--star-fill-black',
      'url(../img/Product_img/svg/Vectorstar_black_background.svg)'
    );
    root.style.setProperty(
      '--star-fill-null',
      'url(../img/Product_img/svg/Vectorstar_null_background.svg)'
    );

    root.style.setProperty('--white-color-rgba', 'rgb(256, 256,256, 0.5)');

    root.style.setProperty('--input-color', 'rgb(112,112,112)');

    root.style.setProperty('--them-swch-backround', 'rgb(239, 239, 239)');

    root.style.setProperty('--light-gray-color', 'rgb(239, 239, 239)');

    imgLightThem.forEach((item) => {
      const newSrc = item.getAttribute('data-light-src');
      item.src = newSrc;
    });
  }
};

renderBlackThem();
// #dbdbdb

export default renderBlackThem;
