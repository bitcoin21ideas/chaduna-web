// Tab Functionality
function showTab(tabName, event) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked tab
    if (event) {
        event.currentTarget.classList.add('active');
    }
}

// Language Dropdown Functionality
function toggleLanguage() {
    document.querySelector('.lang-dropdown').classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.closest('.lang-dropbtn')) {
        var dropdowns = document.getElementsByClassName("lang-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Dark Mode Functionality
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    const themeIcon = document.getElementById('theme-icon');
    const logo = document.querySelector('.menu-logo');
    
    // Update icon and logo
    if (isDark) {
        themeIcon.src = '/assets/img/icons/day.svg';
        if (logo) logo.src = '/assets/img/logos/chaduna-white.png';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.src = '/assets/img/icons/night.svg';
        if (logo) logo.src = '/assets/img/logos/chaduna-black.png';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize Theme on Load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').src = '/assets/img/icons/day.svg';
        const logo = document.querySelector('.menu-logo');
        if (logo) logo.src = '/assets/img/logos/chaduna-white.png';
    }
});

