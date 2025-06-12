let allStories = [];

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderStories();
    setupCategoryFilters();
});

async function fetchAndRenderStories() {
    const publishedStoriesContainer = document.getElementById('publishedStoriesContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const noStoriesMessage = document.getElementById('noStoriesMessage');

    if (!publishedStoriesContainer) {
        console.error('Published stories container not found.');
        return;
    }

    publishedStoriesContainer.innerHTML = '';
    if (loadingMessage) loadingMessage.style.display = 'block';
    if (noStoriesMessage) noStoriesMessage.style.display = 'none';

    try {
        const response = await fetch('data/community.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stories = await response.json();

        allStories = stories;
        if (loadingMessage) loadingMessage.style.display = 'none';

        if (allStories && allStories.length > 0) {
            renderStories(allStories);
        } else {
            if (noStoriesMessage) noStoriesMessage.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching stories:", error);
        if (loadingMessage) loadingMessage.textContent = 'Failed to load stories. Please ensure "data/community.json" exists and is accessible.';
        if (noStoriesMessage) noStoriesMessage.style.display = 'none';
    }
}

function renderStories(storiesToRender) {
    const publishedStoriesContainer = document.getElementById('publishedStoriesContainer');
    publishedStoriesContainer.innerHTML = '';
    const noStoriesMessage = document.getElementById('noStoriesMessage');

    if (storiesToRender.length === 0) {
        if (noStoriesMessage) noStoriesMessage.style.display = 'block';
        return;
    } else {
        if (noStoriesMessage) noStoriesMessage.style.display = 'none';
    }

    storiesToRender.forEach((story, index) => {
        const storyCard = createStoryCard(story);
        publishedStoriesContainer.appendChild(storyCard);

        setTimeout(() => {
            storyCard.classList.add('fade-in-active');
        }, index * 100);
    });
}

function createStoryCard(story) {
    const card = document.createElement('div');
    card.classList.add('story-card');

    const excerptLength = 150;
    const storyExcerpt = story.storyText.length > excerptLength ?
                         story.storyText.substring(0, excerptLength) + '...' :
                         story.storyText;

    card.innerHTML = `
        <h4 class="story-card-title">${story.promptUsed.replace(" (Started from scratch)", "").trim()}</h4>
        <p class="story-card-author">By: ${story.prompterName}</p>
        <p class="story-card-excerpt">${storyExcerpt}</p>
        <button class="read-more-button button-secondary">Read More</button>
    `;

    const readMoreButton = card.querySelector('.read-more-button');
    if (readMoreButton) {
        readMoreButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showFullStoryModal(story);
        });
    }

    card.addEventListener('click', () => {
        showFullStoryModal(story);
    });

    return card;
}

function showFullStoryModal(story) {
    if (typeof openModal === 'function') {
        const modal = document.getElementById('universalModal');
        const modalTitle = story.promptUsed.replace(" (Started from scratch)", "").trim();
        const modalBodyContent = `
            <p>${story.storyText}</p>
            <div class="modal-story-meta">
                <p><strong>Prompter:</strong> ${story.prompterName}</p>
                <p><strong>Story Type:</strong> ${story.storyType.charAt(0).toUpperCase() + story.storyType.slice(1)}</p>
                <p><strong>Prompt Used:</strong> ${story.promptUsed}</p>
                <p><strong>Published On:</strong> ${story.timestamp}</p>
            </div>
        `;
        openModal(modal, modalTitle, modalBodyContent, '', null, true);
    } else {
        console.error('openModal function not found. Make sure utilities.js is loaded correctly.');
        alert('Could not open story details. Please check console for errors.');
    }
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            filterAndRenderStories(category);
        });
    });
}

function filterAndRenderStories(category) {
    let filteredStories = [];
    if (category === 'all') {
        filteredStories = allStories;
    } else {
        filteredStories = allStories.filter(story => story.storyType === category);
    }
    renderStories(filteredStories);
}