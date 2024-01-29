export const dashboard = () => {
    console.log('Працює');

    const dashboardUser = JSON.parse(localStorage.getItem('myProfile'));
    
    document.querySelector('.dashboard__user-name').textContent = dashboardUser.nameInput
    document.querySelector('.dashboard__user-name2').textContent = dashboardUser.nameInput
    
    const dashboardLogOut = document.querySelector('.dashboard__logout');
    dashboardLogOut.addEventListener('click', () => localStorage.removeItem('userSignIn'));


    const targetDashboard = document.querySelector('.myAccount__tabPage .targetOf-dashboard');


    
    const btnRecentOrders = document.querySelector('.dashboard__link-orders');
    const clickLogout = document.querySelector('.click-dashboard');

    // Перехід з Dashboard на Orders при кліку на кнопку edit address
    btnRecentOrders.addEventListener('click', () => {
      const targetOrders = document.querySelector('.targetOf-orders');
      const clickAddress = document.querySelector('.click-orders');
      clickLogout.classList.remove('act');
      clickAddress.classList.add('act');
      targetDashboard.style.display = 'none';
      targetOrders.style.display = 'flex';
    });


    // Перехід з Dashboard на Address при кліку на кнопку edit address
    const btnBillingAddress = document.querySelector('.dashboard__link-addresses');

    btnBillingAddress.addEventListener('click', () => {
      const targetAddress = document.querySelector('.targetOf-addresses');
      const clickAddress = document.querySelector('.click-addresses');
      clickLogout.classList.remove('act');
      clickAddress.classList.add('act');
      targetDashboard.style.display = 'none';
      targetAddress.style.display = 'flex';
    });


    // Перехід з Dashboard на Address при кліку на кнопку edit address
    const btnAccountDetails = document.querySelector('.dashboard__link-account');

    btnAccountDetails.addEventListener('click', () => {
        const targetAccountDetails = document.querySelector('.targetOf-accountDetails');
        const clickAddress = document.querySelector('.click-accountDetails');
        clickLogout.classList.remove('act');
        clickAddress.classList.add('act');
        targetDashboard.style.display = 'none';
        targetAccountDetails.style.display = 'flex';
    });

}