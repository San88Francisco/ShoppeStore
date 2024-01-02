import { loadProductsHome, heartLogic } from './Body';
document.addEventListener('DOMContentLoaded', function () {
    // Перевірка, чи ми на сторінці "Product"
    if (window.location.pathname.includes('/')) {
        loadProductsHome();
        heartLogic();
    }
})