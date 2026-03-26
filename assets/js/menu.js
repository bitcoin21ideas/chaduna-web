// Language Dropdown Functionality
function toggleLanguage() {
    document.querySelector('.lang-dropdown').classList.toggle('show');
}

function switchLanguage() {
    const currentPath = window.location.pathname;
    
    // Define the pairs for switching
    const mappings = {
        '/index.html': '/index_ru.html',
        '/index_ru.html': '/index.html',
        '/': '/index_ru.html',
        '/wine-tasting.html': '/wine-tasting_ru.html',
        '/wine-tasting_ru.html': '/wine-tasting.html'
    };

    // If exact match found
    if (mappings[currentPath]) {
        window.location.href = mappings[currentPath];
        return;
    }

    // Default fallback: toggle _ru suffix
    if (currentPath.endsWith('_ru.html')) {
        window.location.href = currentPath.replace('_ru.html', '.html');
    } else if (currentPath.endsWith('.html')) {
        window.location.href = currentPath.replace('.html', '_ru.html');
    } else {
        // Fallback for root
        window.location.href = '/index_ru.html';
    }
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
