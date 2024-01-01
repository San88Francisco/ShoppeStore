import { loadProductsHome } from './Body';
document.addEventListener('DOMContentLoaded', function () {
    // Перевірка, чи ми на сторінці "Product"
    if (window.location.pathname.includes('/index')) {
        loadProductsHome();
    }
})