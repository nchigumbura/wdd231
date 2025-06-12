// set the current year in the footer
function setCurrentYear() {
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// set the last modified date in the footer
function setLastModified() {
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

// handle the hamburger menu toggle
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

// Function to fetch JSON data
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null;
    }
}

/**
 * Opens a specified modal with optional content and title.
 * This function is now more generic, assuming content setup happens before calling.
 * @param {HTMLElement} modalElement The modal DOM element to open.
 * @param {string} [title=''] Optional title to set in #modalTitle if present.
 * @param {string} [content=''] Optional HTML string to insert into .modal-body-content.
 * @param {string} [ctaText=''] Optional text for the #modalCtaButton.
 * @param {function} [ctaCallback=null] Optional callback for #modalCtaButton.
 * @param {boolean} [showBackButton=true] Whether to show the back button.
 */
function openModal(modalElement, title = '', content = '', ctaText = '', ctaCallback = null, showBackButton = true) {
    if (!modalElement) {
        console.error('Modal element not found.');
        return;
    }

    // Hide all other modals first to prevent overlap
    document.querySelectorAll('.modal').forEach(m => {
        if (m !== modalElement) {
            m.classList.remove('active');
        }
    });

    const modalTitleElement = modalElement.querySelector('#modalTitle');
    const modalBodyContent = modalElement.querySelector('.modal-body-content');
    const modalCtaButton = modalElement.querySelector('.modal-cta-button'); // Use class, but ID in HTML for specific buttons
    const modalBackButton = modalElement.querySelector('.modal-back-button');

    // Reset modal state
    if (modalTitleElement) {
        modalTitleElement.textContent = title;
        modalTitleElement.style.display = title ? 'block' : 'none';
    }
    if (modalBodyContent) {
        modalBodyContent.innerHTML = content;
    }
    if (modalCtaButton) {
        modalCtaButton.textContent = ctaText;
        modalCtaButton.style.display = ctaText ? 'inline-block' : 'none';
        // Remove previous listeners before adding new one
        const newCtaButton = modalCtaButton.cloneNode(true);
        modalCtaButton.parentNode.replaceChild(newCtaButton, modalCtaButton);
        if (ctaCallback) {
            newCtaButton.addEventListener('click', ctaCallback);
        }
    }
    if (modalBackButton) {
        modalBackButton.style.display = showBackButton ? 'inline-block' : 'none';
        // Remove previous listeners before adding new one
        const newBackButton = modalBackButton.cloneNode(true);
        modalBackButton.parentNode.replaceChild(newBackButton, modalBackButton);
        newBackButton.addEventListener('click', () => closeModal(modalElement));
    }

    modalElement.classList.add('active');
}

/**
 * Closes a specified modal.
 * @param {HTMLElement} modalElement The modal DOM element to close.
 */
function closeModal(modalElement) {
    if (!modalElement) {
        console.error('Modal element not found.');
        return;
    }
    modalElement.classList.remove('active');
    // Clear content, reset state if needed (specific to each modal by writing.js)
    // For universal modal, its content will be explicitly set each time in writing.js
}


document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModified();
    setupHamburgerMenu();

    // Universal modal close button listener (for the X button and outside click)
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
});