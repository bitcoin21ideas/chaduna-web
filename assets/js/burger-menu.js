// Burger Menu Sidebar

function openBurgerMenu() {
    document.getElementById('burgerSidebar').classList.add('is-open');
    document.getElementById('burgerOverlay').classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeBurgerMenu() {
    document.getElementById('burgerSidebar').classList.remove('is-open');
    document.getElementById('burgerOverlay').classList.remove('is-open');
    document.body.style.overflow = '';
}

// Mark the current page link as greyed out
(function () {
    var page = document.body.dataset.page;
    if (!page) return;
    var activeLink = document.querySelector('.burger-nav-links [data-nav="' + page + '"]');
    if (activeLink) activeLink.classList.add('burger-nav--current');
})();
