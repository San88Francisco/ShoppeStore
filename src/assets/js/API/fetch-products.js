export const fetchData = async () => {
  try {
    console.log('1');
    
    
    const response = await fetch(
      'https://650f314454d18aabfe99ec68.mockapi.io/cart'
    );
    console.log('2');

    // Обробка отриманих даних
    const data = await response.json();
    console.log('3');
    // Записуємо данні в локальне сховище
    // localStorage.setItem('allProduct', JSON.stringify(data));
    // Записуємо данні в sessionStorage, щоб після перезаходу, змінювалися данні з бази данних
    sessionStorage.setItem('allProduct', JSON.stringify(data));
    console.log('4');

    return data;
  } catch (error) {
    alert(error.message);
  }
};
