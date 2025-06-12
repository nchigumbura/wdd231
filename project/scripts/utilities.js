function setCurrentYear() {
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

function setLastModified() {
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

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

function openModal(modalElement, title = '', content = '', ctaText = '', ctaCallback = null, showBackButton = true) {
    if (!modalElement) {
        console.error('Modal element not found.');
        return;
    }

    document.querySelectorAll('.modal').forEach(m => {
        if (m !== modalElement) {
            m.classList.remove('active');
        }
    });

    const modalTitleElement = modalElement.querySelector('#modalTitle');
    const modalBodyContent = modalElement.querySelector('.modal-body-content');
    const modalBackButton = modalElement.querySelector('.modal-back-button');

    if (modalTitleElement) {
        modalTitleElement.textContent = title;
        modalTitleElement.style.display = title ? 'block' : 'none';
    }
    if (modalBodyContent) {
        modalBodyContent.innerHTML = content;
    }

    if (modalBackButton) {
        modalBackButton.style.display = showBackButton ? 'inline-block' : 'none';
        const newBackButton = modalBackButton.cloneNode(true);
        modalBackButton.parentNode.replaceChild(newBackButton, modalBackButton);
        newBackButton.addEventListener('click', () => closeModal(modalElement));
    }

    const selectPromptButton = modalElement.querySelector('#select-prompt-button');
    if (selectPromptButton) {
        selectPromptButton.textContent = ctaText;
        selectPromptButton.style.display = ctaText ? 'inline-block' : 'none';
        const newSelectPromptButton = selectPromptButton.cloneNode(true);
        selectPromptButton.parentNode.replaceChild(newSelectPromptButton, selectPromptButton);
        if (ctaCallback) {
            newSelectPromptButton.addEventListener('click', ctaCallback);
        }
    }

    modalElement.classList.add('active');
}

function closeModal(modalElement) {
    if (!modalElement) {
        console.error('Modal element not found.');
        return;
    }
    modalElement.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModified();
    setupHamburgerMenu();

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