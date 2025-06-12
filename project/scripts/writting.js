let allPrompts = [];
let currentSelectedPrompt = null;
let currentScratchPrompt = null;
let savedSubmission = null;

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchJSON('data/writting.json');
    if (data && data.prompts) {
        allPrompts = data.prompts;
        renderPrompts();
    } else {
        console.error('Failed to load prompts from data/writting.json');
    }

    document.querySelectorAll('.more-prompts-arrow').forEach(arrow => {
        arrow.addEventListener('click', (event) => {
            const category = event.target.dataset.category;
            const carousel = document.querySelector(`.prompt-grid-carousel[data-category="${category}"]`);
            if (carousel) {
                carousel.classList.toggle('expanded');
                event.target.textContent = carousel.classList.contains('expanded') ? '∧' : '›';
            }
        });
    });

    document.body.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'select-prompt-button') {
            currentScratchPrompt = null;
            if (currentSelectedPrompt) {
                populateSelectedPromptCard(currentSelectedPrompt);
                closeModal(document.getElementById('universalModal'));

                const writtingAreaSection = document.getElementById('writting-area-section');
                if (writtingAreaSection) {
                    writtingAreaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                console.error('No prompt selected when "Select Prompt" was clicked.');
            }
        }
    });

    const toggleScratchButton = document.getElementById('toggle-scratch-button');
    const scratchOptionsContainer = document.getElementById('scratch-options-container');
    if (toggleScratchButton && scratchOptionsContainer) {
        toggleScratchButton.addEventListener('click', () => {
            scratchOptionsContainer.classList.toggle('expanded');
            toggleScratchButton.textContent = scratchOptionsContainer.classList.contains('expanded') ? '∧' : '›';
        });
    }

    const useScratchButton = document.getElementById('use-scratch-button');
    if (useScratchButton) {
        useScratchButton.addEventListener('click', () => {
            const scratchStoryTitle = document.getElementById('scratchStoryTitle').value.trim();
            const scratchStoryType = document.getElementById('scratchStoryType').value.trim();

            if (!scratchStoryTitle) {
                alert("Please enter a title for your story!");
                return;
            }

            currentSelectedPrompt = null;
            currentScratchPrompt = {
                title: scratchStoryTitle,
                category: scratchStoryType || "General",
                full_prompt: "You chose to start from scratch! Unleash your imagination.",
                guides: ["Write freely!", "Explore your chosen topic.", "Enjoy the creative process."]
            };

            populateSelectedPromptCard(currentScratchPrompt);

            document.getElementById('scratchStoryTitle').value = '';
            document.getElementById('scratchStoryType').value = '';

            scratchOptionsContainer.classList.remove('expanded');
            toggleScratchButton.textContent = '›';

            const writtingAreaSection = document.getElementById('writting-area-section');
            if (writtingAreaSection) {
                writtingAreaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    const submitWrittingButton = document.getElementById('submitWrittingButton');
    if (submitWrittingButton) {
        submitWrittingButton.addEventListener('click', () => {
            const userNameInput = document.getElementById('userNameInput');
            const prompterName = userNameInput.value.trim() || "Anonymous Writer";

            const writtingTextarea = document.getElementById('writtingTextarea');
            const storyText = writtingTextarea.value.trim();

            if (storyText === "") {
                alert('Please write something before submitting!');
                return;
            }

            let submissionStoryType;
            let submissionPromptUsed;
            let storySource;
            let promptId = null;

            if (currentScratchPrompt) {
                storySource = 'scratch';
                submissionStoryType = currentScratchPrompt.category;
                submissionPromptUsed = currentScratchPrompt.title + " (Started from scratch)";
            } else if (currentSelectedPrompt) {
                storySource = 'guided';
                submissionStoryType = currentSelectedPrompt.category;
                submissionPromptUsed = currentSelectedPrompt.title;
                promptId = currentSelectedPrompt.id;
            } else {
                alert('Please select a prompt or use "Start from Scratch" before submitting!');
                return;
            }

            savedSubmission = {
                prompterName: prompterName,
                storyType: submissionStoryType,
                promptUsed: submissionPromptUsed,
                storyText: storyText,
                timestamp: new Date().toLocaleString(),
                storySource: storySource,
                promptId: promptId
            };

            const thankYouModal = document.getElementById('thankYouModal');
            const thankYouContent = `
                <h3>Thank You for Your Submission!</h3>
                <p>Your story has been received. Here are the details:</p>
                <div class="submission-details">
                    <p><strong>Prompter Name:</strong> ${savedSubmission.prompterName}</p>
                    <p><strong>Story Type:</strong> ${savedSubmission.storyType}</p>
                    <p><strong>Prompt Used:</strong> ${savedSubmission.promptUsed}</p>
                    <p><strong>Your Story Preview:</strong></p>
                    <p class="submitted-story-preview">${savedSubmission.storyText.substring(0, 250)}...</p>
                    ${savedSubmission.storyText.length > 250 ? '<p>(Full story hidden for brevity, but saved)</p>' : ''}
                </div>
                <p>What would you like to do next?</p>
            `;
            openModal(thankYouModal, '', thankYouContent, '', null, false);

            writtingTextarea.value = '';
            userNameInput.value = '';
            populateSelectedPromptCard(null);
            currentSelectedPrompt = null;
            currentScratchPrompt = null;
        });
    }

    const thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
        const publishStoryButton = thankYouModal.querySelector('#publish-story-button');
        const editStoryButton = thankYouModal.querySelector('#edit-story-button');
        const doNotPublishButton = thankYouModal.querySelector('#do-not-publish-button');

        if (publishStoryButton) {
            publishStoryButton.addEventListener('click', async () => {
                if (savedSubmission) {
                    try {
                        const response = await fetch('http://localhost:3000/saveStory', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(savedSubmission)
                        });
                        const data = await response.json();
                        if (response.ok) {
                            alert(data.message + ' Redirecting...');
                            closeModal(thankYouModal);
                            window.location.href = 'community.html';
                        } else {
                            alert('Error saving story: ' + data.message + ' Story will NOT be published to community. Please ensure your backend server is running on http://localhost:3000.');
                            console.error('Backend error:', data.message);
                            closeModal(thankYouModal);
                        }
                    } catch (error) {
                        alert('Network error or backend not running. Story will NOT be published to community. Please ensure your backend server is running on http://localhost:3000.');
                        console.error('Fetch error:', error);
                        closeModal(thankYouModal);
                    }
                } else {
                    alert('No story to publish. Please write and submit a story first.');
                    closeModal(thankYouModal);
                }
            });
        }

        if (editStoryButton) {
            editStoryButton.addEventListener('click', () => {
                closeModal(thankYouModal);
                if (savedSubmission) {
                    document.getElementById('writtingTextarea').value = savedSubmission.storyText;
                    document.getElementById('userNameInput').value = savedSubmission.prompterName;

                    if (savedSubmission.storySource === 'scratch') {
                        document.getElementById('scratchStoryTitle').value = savedSubmission.promptUsed.replace(" (Started from scratch)", "");
                        document.getElementById('scratchStoryType').value = savedSubmission.storyType;
                        document.getElementById('scratch-options-container').classList.add('expanded');
                        document.getElementById('toggle-scratch-button').textContent = '∧';
                        currentScratchPrompt = {
                            title: savedSubmission.promptUsed.replace(" (Started from scratch)", ""),
                            category: savedSubmission.storyType,
                            full_prompt: "You chose to start from scratch! Unleash your imagination.",
                            guides: ["Write freely!", "Explore your chosen topic.", "Enjoy the creative process."]
                        };
                        populateSelectedPromptCard(currentScratchPrompt);
                        currentSelectedPrompt = null;
                    } else if (savedSubmission.storySource === 'guided' && savedSubmission.promptId) {
                        const originalPrompt = allPrompts.find(p => p.id === savedSubmission.promptId);
                        if (originalPrompt) {
                            currentSelectedPrompt = originalPrompt;
                            populateSelectedPromptCard(currentSelectedPrompt);
                            currentScratchPrompt = null;
                        } else {
                            populateSelectedPromptCard(null);
                            currentSelectedPrompt = null;
                            currentScratchPrompt = null;
                        }
                    } else {
                        populateSelectedPromptCard(null);
                        currentSelectedPrompt = null;
                        currentScratchPrompt = null;
                    }
                    const writtingAreaSection = document.getElementById('writting-area-section');
                    if (writtingAreaSection) {
                        writtingAreaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    alert('No story data to edit.');
                }
            });
        }

        if (doNotPublishButton) {
            doNotPublishButton.addEventListener('click', () => {
                alert('Story not published. Thank you!');
                closeModal(thankYouModal);
            });
        }
    }

    populateSelectedPromptCard(null);
});


function renderPrompts() {
    const categories = ['stories', 'poems', 'quotes'];
    categories.forEach(category => {
        const container = document.querySelector(`.prompt-grid-carousel[data-category="${category}"]`);
        if (container) {
            container.innerHTML = '';
            const filteredPrompts = allPrompts.filter(p => p.category === category);

            filteredPrompts.forEach(prompt => {
                const promptCard = createPromptCard(prompt);
                container.appendChild(promptCard);
            });
        }
    });
}

function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.classList.add('prompt-card');
    card.dataset.id = prompt.id;

    card.innerHTML = `
        <div class="card-top-row">
            <h4 class="prompt-title">${prompt.title}</h4>
            <span class="card-arrow">›</span>
        </div>
        <p class="prompt-excerpt">${prompt.excerpt}</p>
    `;

    card.addEventListener('click', () => {
        showFullPromptModal(prompt);
    });

    return card;
}

function showFullPromptModal(prompt) {
    currentSelectedPrompt = prompt;
    const modalBodyContent = `
        <div class="modal-full-prompt">
            <p class="full-prompt-text">${prompt.full_prompt}</p>
            <h4>Guidelines:</h4>
            <ul class="prompt-guides">
                ${prompt.guides.map(guide => `<li>${guide}</li>`).join('')}
            </ul>
        </div>
    `;
    openModal(
        document.getElementById('universalModal'),
        prompt.title,
        modalBodyContent,
        'Select Prompt',
        null,
        true
    );
}

function populateSelectedPromptCard(promptData) {
    const selectedPromptDisplay = document.getElementById('selectedPromptDisplay');
    if (!selectedPromptDisplay) {
        console.error('selectedPromptDisplay element not found.');
        return;
    }

    if (promptData) {
        selectedPromptDisplay.innerHTML = `
            <h4>${promptData.title}</h4>
            <p class="full-prompt-text">${promptData.full_prompt}</p>
            <h4>Guidelines:</h4>
            <ul class="selected-prompt-guides">
                ${promptData.guides.map(guide => `<li>${guide}</li>`).join('')}
            </ul>
        `;
    } else {
        selectedPromptDisplay.innerHTML = `
            <h4>No Prompt Selected</h4>
            <p>Click on a prompt above to see its details and guidelines here, then start writing!</p>
            <ul class="selected-prompt-guides">
            </ul>
        `;
    }
}