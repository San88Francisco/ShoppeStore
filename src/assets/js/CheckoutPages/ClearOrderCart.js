export const clearOrderCart = () => {
  localStorage.removeItem('allProductCart');
  localStorage.removeItem('totalCountCart');
};
