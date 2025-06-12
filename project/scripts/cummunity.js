document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderStories();
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
        const response = await fetch('http://localhost:3000/stories');
        const stories = await response.json();

        if (loadingMessage) loadingMessage.style.display = 'none';

        if (stories && stories.length > 0) {
            stories.forEach(story => {
                const storyCard = createStoryCard(story);
                publishedStoriesContainer.appendChild(storyCard);
            });
        } else {
            if (noStoriesMessage) noStoriesMessage.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching stories:", error);
        if (loadingMessage) loadingMessage.textContent = 'Failed to load stories. Please ensure the backend server is running.';
        if (noStoriesMessage) noStoriesMessage.style.display = 'none';
    }
}

function createStoryCard(story) {
    const card = document.createElement('div');
    card.classList.add('story-card');

    const storyContentPreview = story.storyText.length > 250 ? story.storyText.substring(0, 250) + '...' : story.storyText;

    card.innerHTML = `
        <div class="story-card-header">
            <h4>${story.promptUsed.replace(" (Started from scratch)", "")}</h4>
            <span class="story-type">${story.storyType}</span>
        </div>
        <p class="story-author">By: ${story.prompterName}</p>
        <p class="story-prompt">Prompt: ${story.promptUsed}</p>
        <p class="story-content-preview">${storyContentPreview}</p>
        <p class="story-timestamp">${story.timestamp}</p>
    `;

    card.addEventListener('click', () => {
        showFullStoryModal(story);
    });

    return card;
}

function showFullStoryModal(story) {
    const modal = document.getElementById('universalModal');
    const modalTitle = story.promptUsed.replace(" (Started from scratch)", "");
    const modalBodyContent = `
        <p>${story.storyText}</p>
        <div class="modal-story-meta">
            <p><strong>Prompter:</strong> ${story.prompterName}</p>
            <p><strong>Story Type:</strong> ${story.storyType}</p>
            <p><strong>Prompt Used:</strong> ${story.promptUsed}</p>
            <p><strong>Published On:</strong> ${story.timestamp}</p>
        </div>
    `;
    openModal(modal, modalTitle, modalBodyContent, '', null, true);
}