document.addEventListener('DOMContentLoaded', () => {
  if (
    (pageName = document.title.toLowerCase().replace(/\s/g, '') === 'product')
  ) {
    document.querySelector('.amount-reviews').innerHTML =
      document.querySelector('.reviews').children.length / 2;
    document.querySelector('.amount-reviews2').innerHTML =
      document.querySelector('.reviews').children.length / 2;
    let reviewsAmountADD =
      document.querySelector('.reviews').children.length / 2;
    const info_item3 = document.querySelector('.info_item3');
    const tabButtons = document.querySelectorAll('.info__tab-page');
    const productPages = document.querySelectorAll('.product__page');
    tabButtons.forEach((item, index) => {
      item.addEventListener('click', () => {
        tabButtons.forEach((btn) => btn.classList.remove('info__tab__line'));
        item.classList.add('info__tab__line');
        productPages.forEach((page) => (page.style.display = 'none'));
        productPages[index].style.display = 'grid';
      });
    });
    // console.log(localStorage.getItem(`items`));
    if (localStorage.getItem(`items`) !== null) {
      const reviews = document.querySelector('.reviews');
      reviews.innerHTML = localStorage.getItem(`items`);
      console.log(reviewsAmountADD);
      document.querySelector('.amount-reviews').innerHTML =
        document.querySelector('.reviews').children.length / 2;
      document.querySelector('.amount-reviews2').innerHTML =
        document.querySelector('.reviews').children.length / 2;
    }

    const submitReviews = document.querySelector('#submitReviews');
    const saveUserData = document.querySelector('#saveUserData');
    saveUserData.addEventListener('click', () =>
      saveUserData.classList.toggle('checked')
    );
    const addReviewBlock = (
      ReviewUserComment,
      ReviewUserName,
      ReviewUserMail,
      formObject
    ) => {
      const hr = document.createElement('hr');
      hr.classList.add('header__underline');

      const h3 = document.createElement('h3');
      h3.textContent = ReviewUserName;

      const span = document.createElement('span');
      span.classList.add('review__date');
      const d = new Date();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const month = months[d.getMonth()];
      const day = d.getDate();
      const year = d.getFullYear();
      span.textContent = day + ' ' + month + ', ' + year;

      const div = document.createElement('div');
      div.classList.add(
        'review__block',
        `review__block_item${reviewsAmountADD + 1}`
      );

      const starsRatingD = document.createElement('div');
      starsRatingD.classList.add('stars-ratingD', 'stars__amount');

      const starsRatingItemsD = document.createElement('div');
      starsRatingItemsD.classList.add('stars-rating__itemsD');

      const p = document.createElement('p');
      p.textContent = `${ReviewUserComment}`;

      //created stars

      document
        .querySelector(`.review__block_item${reviewsAmountADD}`)
        .insertAdjacentElement('afterend', hr);
      hr.insertAdjacentElement('afterend', div);
      div.insertAdjacentElement('beforeend', h3);
      h3.insertAdjacentElement('beforeend', span);
      h3.insertAdjacentElement('afterend', starsRatingD);
      starsRatingD.insertAdjacentElement('beforeend', starsRatingItemsD);
      starsRatingD.insertAdjacentElement('afterend', p);

      if (formObject.starsRating == '1') {
        starsRatingD.innerHTML =
          '<img src="./assets/img/Product_img/svg/starSvgFillone.svg" alt="star">';
      } else if (formObject.starsRating == '2') {
        starsRatingItemsD.innerHTML =
          '<img src="./assets/img/Product_img/svg/starSvgFilltwo.svg" alt="star">';
      } else if (formObject.starsRating == '3') {
        starsRatingItemsD.innerHTML =
          '<img src="./assets/img/Product_img/svg/starSvgFillthree.svg" alt="star">';
      } else if (formObject.starsRating == '4') {
        starsRatingItemsD.innerHTML =
          '<img src="./assets/img/Product_img/svg/starSvgFillfore.svg" alt="star">';
      } else if (formObject.starsRating == '5') {
        starsRatingItemsD.innerHTML =
          '<img src="./assets/img/Product_img/svg/starSvgFillfive.svg" alt="star">';
      }
    };
    document
      .getElementById('form')
      .addEventListener('submit', function (event) {
        event.preventDefault();
        let formObject = {};
        let formData = new FormData(event.target);
        formData.forEach(function (value, key) {
          formObject[key] = value;
        });

        console.log(formObject.starsRating);
        const ReviewUserComment =
          document.querySelector('#ReviewUserComment').value;
        const ReviewUserName = document.querySelector('#ReviewUserName').value;
        const ReviewUserMail = document.querySelector('#ReviewUserMail').value;

        const userSaveDatas = {
          userName: ReviewUserName,
          userMail: ReviewUserMail,
        };
        saveUserData.className === 'checked'
          ? localStorage.setItem(
              'UserReviewData',
              JSON.stringify(userSaveDatas)
            )
          : 0;

        if (
          ReviewUserComment &&
          ReviewUserName &&
          ReviewUserMail &&
          formObject.starsRating
        ) {
          addReviewBlock(
            ReviewUserComment,
            ReviewUserName,
            ReviewUserMail,
            formObject
          );
          localStorage.setItem(
            `items`,
            document.querySelector(`.reviews`).innerHTML
          );
        } else {
          alert('Please enter a rating');
        }
      });

    info_item3.addEventListener('click', () => {
      const userSaveDatas =
        localStorage.getItem('UserReviewData') !== null
          ? JSON.parse(localStorage.getItem('UserReviewData'))
          : null;
      if (userSaveDatas !== null) {
        ReviewUserName.value = userSaveDatas.userName;
        ReviewUserMail.value = userSaveDatas.userMail;
      }
    });
    if (document.querySelector('.reviews').children.length / 2 > 4) {
      document.querySelector('.reviews').style.overflowY = 'scroll';
    } else {
      document.querySelector('.reviews').style.overflow = 'none';
    }
  }
});
