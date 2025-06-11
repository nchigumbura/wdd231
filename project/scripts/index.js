document.addEventListener('DOMContentLoaded', () => {
    const previewCards = document.querySelectorAll('.preview-card');
    const poetrySectionArrow = document.querySelector('.poetry-section .card-arrow');
    const universalModal = document.getElementById('universalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCtaButton = document.getElementById('modalCtaButton');
    const modalBackButton = document.querySelector('.modal-back-button');
    const closeButton = document.querySelector('.close-button');
    const poetryGrid = document.getElementById('poetry-preview-grid');

    let siteData = {};

    async function fetchContentData() {
        try {
            const response = await fetch('data/content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            siteData = await response.json();
            initializePageContent();
        } catch (error) {
            console.error('Could not fetch content data:', error);
        }
    }

    function populatePreviewCards() {
        if (!siteData.initialPreviewContent) return;

        const storyText = document.getElementById('story-preview-text');
        const storyAuthor = document.getElementById('story-preview-author');
        if (storyText) storyText.textContent = siteData.initialPreviewContent.story.text;
        if (storyAuthor) storyAuthor.textContent = siteData.initialPreviewContent.story.author;

        const quoteText = document.getElementById('quote-preview-text');
        const quoteAuthor = document.getElementById('quote-preview-author');
        if (quoteText) quoteText.textContent = siteData.initialPreviewContent.quote.text;
        if (quoteAuthor) quoteAuthor.textContent = siteData.initialPreviewContent.quote.author;

        const resourceText = document.getElementById('resource-preview-text');
        const resourceAuthor = document.getElementById('resource-preview-author');
        if (resourceText) resourceText.textContent = siteData.initialPreviewContent.resource.text;
        if (resourceAuthor) resourceAuthor.textContent = siteData.initialPreviewContent.resource.author;
    }

    function loadPoetryPreviews() {
        if (!poetryGrid || !siteData.initialPoetryCards || !siteData.poetryAuthorImages) return;

        poetryGrid.innerHTML = '';
        siteData.initialPoetryCards.forEach(poem => {
            const card = document.createElement('div');
            card.classList.add('poetry-card');
            const imageUrl = siteData.poetryAuthorImages[poem.image];
            card.innerHTML = `
                <img src="${imageUrl}" alt="Author ${poem.author}" class="author-image">
                <p class="poem-title">${poem.title}</p>
                <p class="author-name">${poem.author}</p>
                <p class="poem-excerpt">${poem.excerpt}</p>
            `;
            poetryGrid.appendChild(card);
        });
    }

    function generateModalCards(section) {
        const data = siteData.contentData[section];
        if (!data) return '';

        let cardsHtml = '<div class="modal-card-grid">';

        data.items.forEach(item => {
            if (section === 'stories') {
                cardsHtml += `
                    <div class="modal-card modal-story-card">
                        <h4>${item.title}</h4>
                        <p>${item.excerpt}</p>
                        <p class="author-name">${item.author}</p>
                    </div>
                `;
            } else if (section === 'quotes') {
                cardsHtml += `
                    <div class="modal-card modal-quote-card">
                        <p>"${item.text}"</p>
                        <p class="author-name">${item.author}</p>
                    </div>
                `;
            } else if (section === 'resources') {
                const guideList = item.guides.map(guide => `<li>${guide}</li>`).join('');
                cardsHtml += `
                    <div class="modal-card modal-resource-card">
                        <h4>${item.title}</h4>
                        <ul>${guideList}</ul>
                    </div>
                `;
            } else if (section === 'poems') {
                const imageUrl = siteData.poetryAuthorImages[item.image];
                cardsHtml += `
                    <div class="modal-card modal-poetry-card">
                        <img src="${imageUrl}" alt="Author ${item.author}" class="author-image">
                        <h4>${item.title}</h4>
                        <p class="author-name">${item.author}</p>
                        <p>${item.excerpt}</p>
                    </div>
                `;
            }
        });
        cardsHtml += '</div>';
        return cardsHtml;
    }

    function openModal(section) {
        const data = siteData.contentData[section];
        if (data && universalModal && modalTitle && modalBody && modalCtaButton) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = generateModalCards(section);
            modalCtaButton.textContent = data.ctaText;
            modalCtaButton.onclick = () => window.location.href = data.ctaLink;
            universalModal.classList.add('active');
        }
    }

    function closeModal() {
        if (universalModal && universalModal.classList.contains('active')) {
            universalModal.classList.remove('active');
            modalTitle.textContent = '';
            modalBody.innerHTML = '';
            modalCtaButton.textContent = '';
            modalCtaButton.onclick = null;
        }
    }

    function initializePageContent() {
        previewCards.forEach(card => {
            card.addEventListener('click', () => {
                const section = card.dataset.section;
                openModal(section);
            });
        });

        if (poetrySectionArrow) {
            poetrySectionArrow.addEventListener('click', () => {
                openModal('poems');
            });
        }

        populatePreviewCards();
        loadPoetryPreviews();
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modalBackButton) {
        modalBackButton.addEventListener('click', closeModal);
    }

    if (universalModal) {
        universalModal.addEventListener('click', (event) => {
            if (event.target === universalModal) {
                closeModal();
            }
        });
    }

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    fetchContentData();
});