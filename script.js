// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// User menu toggle
const userMenuButton = document.getElementById('user-menu-button');
const userMenu = userMenuButton ? userMenuButton.nextElementSibling : null;
if (userMenuButton && userMenu) {
    userMenuButton.addEventListener('click', () => {
        userMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (event) => {
        if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
    });
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const jobListings = document.getElementById('job-listings');
if (searchButton && searchInput && jobListings) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const jobCards = jobListings.getElementsByClassName('job-card');
        for (let i = 0; i < jobCards.length; i++) {
            const jobCard = jobCards[i];
            const jobText = jobCard.innerText.toLowerCase();
            if (jobText.includes(searchTerm)) {
                jobCard.style.display = '';
            } else {
                jobCard.style.display = 'none';
            }
        }
    }
}

// Navigation for Apply Now and View Profile buttons
document.querySelectorAll('.job-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'apply-job.html';
    });
});
document.querySelectorAll('.job-card a.text-indigo-600, .job-card a.text-green-600, .job-card a.text-purple-600, .job-card a.text-yellow-600').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'job-list.html';
    });
});
document.querySelectorAll('.bg-white.shadow-sm.rounded-lg.overflow-hidden.border .text-indigo-600').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'freelancer-profile.html';
    });
});