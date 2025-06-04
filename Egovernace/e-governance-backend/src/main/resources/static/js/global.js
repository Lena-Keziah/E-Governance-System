// js/global.js - Global JavaScript for E-GovCameroon

document.addEventListener('DOMContentLoaded', () => {
    console.log('E-GovCameroon global scripts loaded.');

    // --- Navigation Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '' && linkHref === 'index.html') {
            // Handle case where index.html is loaded directly without filename in URL
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Access Control for Protected Pages (e.g., Services) ---
    // This script will be loaded on all pages.
    // If we are on a protected page and not logged in, redirect.
    // IMPORTANT: This is a frontend simulation. Real security is handled by the backend!
    const protectedPages = ['services.html']; // Add more protected pages here as needed

    if (protectedPages.includes(currentPath)) {
        if (localStorage.getItem('userLoggedIn') !== 'true') {
            alert('You must be logged in to access this page.');
            window.location.href = 'login.html'; // Redirect to login page
        }
    }

    // --- Logout Function (can be called from any page's navigation or button) ---
    window.logout = function() {
        localStorage.removeItem('userLoggedIn'); // Clear the login flag
        alert('You have been logged out successfully.');
        window.location.href = 'index.html'; // Redirect to home page
    };
});