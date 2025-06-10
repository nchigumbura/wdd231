// Function to set the current year in the footer
function setCurrentYear() {
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Function to set the last modified date in the footer
function setLastModified() {
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

// Function to handle the hamburger menu toggle
function setupHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// Initialize global utilities when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModified();
    setupHamburgerMenu();
});