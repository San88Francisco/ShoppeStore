export const deleteAccount = () => {
  const btnDeleteUser = document.querySelector('.profile__delete-btn');
  btnDeleteUser.addEventListener('click', () => {
    ('Працює');
    popupWindowQuick();
  });

  const popupDelete = document.querySelector('.popup__profile-delete');
  const btnPopupYes = document.querySelector('.btn__popup-yes');
  const btnPopupNo = document.querySelector('.btn__popup-no');

  // Відслідковуємо подію чи користувач нажме Yes(Видалити) чи No (Не видаляти)
  const popupWindowQuick = () => {
    popupDelete.style.display = 'grid';
    btnPopupYes.addEventListener('click', onBtnPopupYesClick);
    btnPopupNo.addEventListener('click', onBtnPopupNoClick);
  };

  const onBtnPopupYesClick = () => {
    popupDelete.style.display = 'none';

    setTimeout(function () {
      localStorage.removeItem('myProfile');
      localStorage.removeItem('userSignIn');
      localStorage.removeItem('user');

      window.location.href = '/index.html';
    }, 1000);
  };

  const onBtnPopupNoClick = () => {
    popupDelete.style.display = 'none';
  };

  // Якщо користувач нажме будь де на сторінці,окрім вікна з попередженяням видаленн, то вікно закриється
  window.onclick = (e) => {
    if (e.target === popupDelete) {
      popupDelete.style.display = 'none';
      ('window.onclick');
    }
  };
};
