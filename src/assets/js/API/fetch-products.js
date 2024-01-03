export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://650f314454d18aabfe99ec68.mockapi.io/cart"
    );
    // Обробка отриманих даних
    const data = await response.json();
    // Записуємо данні в локальне сховище
    localStorage.setItem("allProduct", JSON.stringify(data));

    return data;
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};
