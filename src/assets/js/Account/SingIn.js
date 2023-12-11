
// Отримуємо посилання на потрібні елементи DOM
const signInTab = document.getElementById('signInTab');
const registerTab = document.getElementById('registerTab');
const signInBlock = document.querySelector('.block-tabs--singIn');
const registerBlock = document.querySelector('.block-tabs--register');

// Функція для зміни активної вкладки та відображення блоків
function switchTabs(activeTab, inactiveTab, activeBlock, inactiveBlock) {
   activeTab.classList.add('_active');
   inactiveTab.classList.remove('_active');
   activeBlock.style.display = 'block';
   inactiveBlock.style.display = 'none';

   setTimeout(() => {
      activeBlock.classList.add('opac');
   }, 0.); // Застосувати зміни через 0.1 секунди (після з'явлення блоку)

   inactiveBlock.classList.remove('opac'); // Видалення класу 'opac' з неактивного блоку одразу
}

// Додаємо клас '_active' до елемента по замовчуванню
signInTab.classList.add('_active');

// При кліку на вкладку "Sign in"
signInTab.addEventListener('click', function (event) {
   event.preventDefault(); // Запобігаємо стандартному переходу за посиланням
   switchTabs(signInTab, registerTab, signInBlock, registerBlock);
});

// При кліку на вкладку "Register"
registerTab.addEventListener('click', function (event) {
   event.preventDefault(); // Запобігаємо стандартному переходу за посиланням
   switchTabs(registerTab, signInTab, registerBlock, signInBlock);
});
