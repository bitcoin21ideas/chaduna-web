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


