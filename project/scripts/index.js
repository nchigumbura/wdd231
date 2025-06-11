document.addEventListener('DOMContentLoaded', () => {
    // Select all elements related to the UI interactions
    const previewCards = document.querySelectorAll('.preview-card');
    // Using a more specific selector for the poetry arrow to ensure it's unique
    const poetrySectionArrow = document.querySelector('.poetry-section .card-arrow');
    const universalModal = document.getElementById('universalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody'); // This now has modal-body-content class in HTML
    const modalCtaButton = document.getElementById('modalCtaButton');
    const modalBackButton = document.querySelector('.modal-back-button');
    const closeButton = document.querySelector('.close-button');
    const poetryGrid = document.getElementById('poetry-preview-grid');

    // Array of author image URLs for poetry previews (using external images for diversity)
    const poetryAuthorImages = [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1507003211169-0a3dd782dab4?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1531891437562-4301efdf8354?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542131976-59981881882d?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1599566150163-29194d69327d?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1520409364491-b3b0d2d3e3e0?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1581404106560-61b9a95f573f?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1522075469751-3a6694fa2f61?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1546961342-ea582th825b4?q=80&w=300&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    // Main data object for all content categories for the modal
    const contentData = {
        stories: {
            title: "Short Stories Spotlight",
            ctaText: "Read More Stories",
            ctaLink: "library.html?category=stories",
            items: [
                { title: "The Whispering Woods", author: "Elara Vance", excerpt: "Deep within the ancient forest, whispers carried on the wind. It was said that the trees remembered forgotten spells and that lost travelers often found more than just a path, stumbling upon truths best left undisturbed by mortal ears." },
                { title: "City of Echoes", author: "Kaelen Thorne", excerpt: "In a sprawling metropolis now abandoned, the wind sang through skeletal skyscrapers. Every gust was an echo of a vibrant past, a haunting melody of lives once lived, now mere phantoms in the concrete canyons." },
                { title: "The Last Lighthouse Keeper", author: "Meredith Finch", excerpt: "Perched on the cliff's edge, old Thomas kept the light alive. His life was a solitary vigil against the tumultuous sea, but he guarded a secret far older and more tempestuous than any storm could ever be." },
                { title: "Beneath the Obsidian Lake", author: "Rowan Blackwood", excerpt: "Legend spoke of a sunken city, shimmering with dark magic, hidden beneath the placid surface of Obsidian Lake. Divers sought its treasures, but few returned, haunted by what they saw in its depths." },
                { title: "The Clockwork Heart", author: "Silas Automaton", excerpt: "In a world of steam and gears, a young inventor built a heart of intricate brass. It beat with perfect rhythm, yet longed for something more than mere mechanical precision. It yearned for true emotion." },
                { title: "A Taste of Stardust", author: "Luna Starfall", excerpt: "A tiny baker, with flour dusting her apron, discovered a rare ingredient – stardust, fallen from the night sky. Her pastries took on an otherworldly glow, enchanting all who tasted them with dreams of distant galaxies." },
                { title: "The Scholar's Secret Garden", author: "Professor Alistair", excerpt: "Behind the dusty library, a hidden gate led to a garden not of this world. Each plant bloomed with knowledge, and every flower whispered forgotten histories to those quiet enough to listen to its ancient tales." },
                { title: "Chronos's Apprentice", author: "Time Weaver", excerpt: "Young Elara became the apprentice to Chronos, the master of time itself. She learned to mend fractured moments and unravel tangled timelines, understanding that even the smallest choice could ripple through eternity." },
                { title: "The Whispering Library", author: "Ink Scribe", excerpt: "Books in this library didn't just contain stories; they whispered them. Each volume hummed with the voices of its characters, inviting readers into an immersive experience where imagination truly came alive." },
                { title: "Echoes of the Old World", author: "Ancient Dreamer", excerpt: "After the Great Silence, humanity clung to relics of the past. One artifact, a polished stone, pulsed with memories, allowing those who touched it to witness scenes from a bygone era, long forgotten." },
                { title: "The Cartographer's Dream", author: "Atlas Meridian", excerpt: "A cartographer, bored with known lands, began charting his dreams. His maps were filled with impossible mountains and rivers of light, leading explorers to realms beyond the waking world." },
                { title: "The Gilded Cage", author: "Songbird Lyric", "excerpt": "A beautiful bird, trapped in a cage of pure gold, sang melodies that charmed kings. Yet, its songs were filled with longing, echoing a yearning for the boundless skies it could only dream of." }
            ]
        },
        quotes: {
            title: "Inspirational Quotes",
            ctaText: "Discover More Quotes",
            ctaLink: "library.html?category=quotes",
            items: [
                { text: "“The only way to do great work is to love what you do.”", author: "- Steve Jobs" },
                { text: "“Either write something worth reading or do something worth writing.”", author: "- Benjamin Franklin" },
                { text: "“You don't start out writing good stuff. You start out writing crap and thinking it's good stuff, and then gradually you get better.”", author: "- Octavia E. Butler" },
                { text: "“Perfection is not attainable, but if we chase perfection we can catch excellence.”", author: "- Vince Lombardi" },
                { text: "“The future belongs to those who believe in the beauty of their dreams.”", author: "- Eleanor Roosevelt" },
                { text: "“It is never too late to be what you might have been.”", author: "- George Eliot" },
                { text: "“The expert in anything was once a beginner.”", author: "- Helen Hayes" },
                { text: "“Innovation distinguishes between a leader and a follower.”", author: "- Steve Jobs" },
                { text: "“Believe you can and you're halfway there.”", author: "- Theodore Roosevelt" },
                { text: "“The best way to predict the future is to create it.”", author: "- Peter Drucker" },
                { text: "“Success is not final, failure is not fatal: it is the courage to continue that counts.”", author: "- Winston S. Churchill" },
                { text: "“What you get by achieving your goals is not as important as what you become by achieving your goals.”", author: "- Zig Ziglar" }
            ]
        },
        resources: {
            title: "Writing Resources & Guides",
            ctaText: "Access All Resources",
            ctaLink: "library.html?category=resources",
            items: [
                { title: "Character Development Guide", guides: ["Build believable backstories.", "Develop unique character voices.", "Create compelling character arcs.", "Use psychological profiles effectively."] },
                { title: "Plotting Your Novel", guides: ["Outline with the three-act structure.", "Master inciting incidents and turning points.", "Handle rising action and climax effectively.", "Craft satisfying resolutions."] },
                { title: "Overcoming Writer's Block", guides: ["Try freewriting exercises.", "Change your writing environment.", "Read widely for inspiration.", "Set small, achievable goals daily."] },
                { title: "Mastering Dialogue", guides: ["Ensure dialogue sounds natural.", "Use dialogue to reveal character.", "Advance the plot through conversation.", "Avoid exposition dumps in speech."] },
                { title: "World-Building Essentials", guides: ["Design consistent magical systems.", "Develop believable cultures and societies.", "Create compelling geography.", "Incorporate history and mythology."] },
                { title: "Effective Editing Techniques", guides: ["Self-edit for clarity and conciseness.", "Identify and eliminate passive voice.", "Strengthen verbs and nouns.", "Read aloud to catch awkward phrasing."] },
                { title: "Submitting Your Manuscript", guides: ["Format your manuscript professionally.", "Write a compelling query letter.", "Research agents and publishers.", "Understand submission guidelines thoroughly."] },
                { title: "Building Your Author Platform", guides: ["Create a professional author website.", "Engage with readers on social media.", "Build an email list.", "Network with other writers."] },
                { title: "Understanding POV", guides: ["Choose the right point of view (first, third limited, omniscient).", "Maintain consistent POV.", "Avoid head-hopping.", "Use POV to control information flow."] },
                { title: "Show, Don't Tell", guides: ["Use sensory details to describe.", "Convey emotions through actions, not statements.", "Illustrate settings vividly.", "Let readers infer conclusions."] },
                { title: "Developing Conflict", guides: ["Identify internal and external conflicts.", "Raise the stakes for your characters.", "Introduce escalating obstacles.", "Ensure conflict drives the narrative."] },
                { title: "Crafting Strong Openings", guides: ["Hook your reader immediately.", "Introduce core conflict early.", "Establish tone and setting.", "Start in media res for immediate action."] }
            ]
        },
        poems: {
            title: "Poetry Collections",
            ctaText: "Explore More Poetry",
            ctaLink: "library.html?category=poetry",
            items: [
                { image: poetryAuthorImages[0], title: "Ode to the Evening Star", author: "Liam O'Connell", excerpt: "A celestial journey through twilight hues, capturing the quiet grandeur of the fading light and the first glimmer of distant constellations. A meditation on solitude and cosmic beauty." },
                { image: poetryAuthorImages[1], title: "Whispers of Autumn", author: "Seraphina Rose", excerpt: "Leaves fall, secrets stir in the crisp air. A poignant collection exploring the beauty of decay, the melancholy of change, and the hidden resilience found in the turning seasons of life." },
                { image: poetryAuthorImages[2], title: "The Silent City", author: "Alistair Finch", excerpt: "Cobblestone streets remember forgotten tales. A haunting portrayal of an abandoned metropolis, where every shadow holds a memory and silence speaks louder than any bustling crowd ever could." },
                { image: poetryAuthorImages[3], title: "Ephemeral Dreams", author: "Dr. Elysia Virtuoso", excerpt: "A dive into the fleeting nature of subconscious journeys, where logic dissolves and imagination reigns. Each verse captures the elusive magic of dreams before they vanish with the dawn's first light." },
                { image: poetryAuthorImages[4], title: "The Seeker's Compass", author: "Marcus Navigato", excerpt: "Guided by an unseen hand, a soul searches for truth. This poem charts an internal quest, exploring existential questions and the relentless human desire to find meaning and direction." },
                { image: poetryAuthorImages[5], title: "Beneath the Willow's Tears", author: "Willow Whisper", excerpt: "A collection of tender verses inspired by the weeping willow, symbolizing grief, solace, and the quiet strength found in embracing sadness. A journey through loss to acceptance." },
                { image: poetryAuthorImages[6], title: "Stanzas of Starlight", author: "Celeste Lumina", excerpt: "Inspired by the vastness of the cosmos, these poems explore the wonder of galaxies, nebulae, and the tiny human experience under an infinite sky. A cosmic dance of words." },
                { image: poetryAuthorImages[7], title: "Ink & Petals", author: "Flora Script", excerpt: "Where the artistry of words meets the delicate beauty of botanicals. A series of poems inspired by flowers, each blooming with metaphors of growth, fragility, and vibrant life cycles." },
                { image: poetryAuthorImages[8], title: "The Forgotten Melody", author: "Harmonius Chord", excerpt: "A soulful exploration of a tune lost to time, yet lingering in the heart. This poem evokes nostalgia, the power of music, and the echoes of past joys and sorrows through sound." },
                { image: poetryAuthorImages[9], title: "Chronicles of Dust", author: "Ashen Bard", excerpt: "From the remnants of empires to the specks in the sunlight, these poems contemplate transience, history, and the enduring spirit of human legacy amidst the passage of time." },
                { image: poetryAuthorImages[10], title: "The Poet's Lantern", author: "Lumiere Verse", excerpt: "A guiding light through the darkness of unspoken thoughts. This collection illuminates the hidden corners of human emotion, shining a beacon on vulnerability and profound insights." },
                { image: poetryAuthorImages[11], title: "Whispers from the Abyss", author: "Deep Sea Poet", excerpt: "Diving into the psychological depths, these verses explore the mysteries of the unconscious mind, hidden fears, and the strange beauty found in the shadows of the human psyche." }
            ]
        }
    };

    // Initial poetry cards to display on the home page (static preview)
    const initialPoetryCards = [
        {
            image: poetryAuthorImages[0],
            title: "Ode to the Evening Star",
            author: "Liam O'Connell",
            excerpt: "A celestial journey through twilight hues..."
        },
        {
            image: poetryAuthorImages[1],
            title: "Whispers of Autumn",
            author: "Seraphina Rose",
            excerpt: "Leaves fall, secrets stir in the crisp air..."
        },
        {
            image: poetryAuthorImages[2],
            title: "The Silent City",
            author: "Alistair Finch",
            excerpt: "Cobblestone streets remember forgotten tales..."
        }
    ];

    // Data for the main preview cards on the home page (Stories, Quotes, Resources sections)
    const initialPreviewContent = {
        story: {
            text: "Discover captivating tales from emerging and established voices. Dive into worlds of fantasy, mystery, and drama.",
            author: "A collection of authors"
        },
        quote: {
            text: "“Inspiration exists, but it has to find you working.”",
            author: "- Pablo Picasso"
        },
        resource: {
            text: "Unlock your full writing potential with guides on plot, character, editing, and publishing.",
            author: "Our expert team"
        }
    };

    // Function to populate the main preview cards (Stories, Quotes, Resources)
    function populatePreviewCards() {
        const storyText = document.getElementById('story-preview-text');
        const storyAuthor = document.getElementById('story-preview-author');
        if (storyText) storyText.textContent = initialPreviewContent.story.text;
        if (storyAuthor) storyAuthor.textContent = initialPreviewContent.story.author;

        const quoteText = document.getElementById('quote-preview-text');
        const quoteAuthor = document.getElementById('quote-preview-author');
        if (quoteText) quoteText.textContent = initialPreviewContent.quote.text;
        if (quoteAuthor) quoteAuthor.textContent = initialPreviewContent.quote.author;

        const resourceText = document.getElementById('resource-preview-text');
        const resourceAuthor = document.getElementById('resource-preview-author');
        if (resourceText) resourceText.textContent = initialPreviewContent.resource.text;
        if (resourceAuthor) resourceAuthor.textContent = initialPreviewContent.resource.author;
    }

    // Function to load the featured poetry cards on the home page
    function loadPoetryPreviews() {
        if (!poetryGrid) return; // Exit if the poetry grid element doesn't exist
        poetryGrid.innerHTML = ''; // Clear existing content
        initialPoetryCards.forEach(poem => {
            const card = document.createElement('div');
            card.classList.add('poetry-card'); // Use .poetry-card for individual poetry items
            card.innerHTML = `
                <img src="${poem.image}" alt="Author ${poem.author}" class="author-image">
                <p class="poem-title">${poem.title}</p>
                <p class="author-name">${poem.author}</p>
                <p class="poem-excerpt">${poem.excerpt}</p>
            `;
            poetryGrid.appendChild(card);
        });
    }

    // Function to generate the modal content based on the selected section
    function generateModalCards(section) {
        const data = contentData[section];
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
                cardsHtml += `
                    <div class="modal-card modal-poetry-card">
                        <img src="${item.image}" alt="Author ${item.author}" class="author-image">
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

    // Function to open the universal modal
    function openModal(section) {
        const data = contentData[section];
        if (data && universalModal && modalTitle && modalBody && modalCtaButton) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = generateModalCards(section);
            modalCtaButton.textContent = data.ctaText;
            modalCtaButton.onclick = () => window.location.href = data.ctaLink; // Sets CTA button link
            universalModal.classList.add('active'); // Show modal
        }
    }

    // Function to close the universal modal
    function closeModal() {
        if (universalModal && universalModal.classList.contains('active')) {
            universalModal.classList.remove('active'); // Hide modal
            // Clear modal content to prevent flash on next open
            modalTitle.textContent = '';
            modalBody.innerHTML = '';
            modalCtaButton.textContent = '';
            modalCtaButton.onclick = null;
        }
    }

    // Event listeners for opening the modal from preview cards
    previewCards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.dataset.section;
            openModal(section);
        });
    });

    // Event listener for opening the modal from the poetry section arrow
    if (poetrySectionArrow) {
        poetrySectionArrow.addEventListener('click', () => {
            openModal('poems');
        });
    }

    // Event listener for the close button inside the modal (the 'x')
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Event listener for the "Back" button inside the modal
    if (modalBackButton) {
        modalBackButton.addEventListener('click', closeModal);
    }

    // Event listener to close modal if clicking on the overlay (outside modal content)
    if (universalModal) {
        universalModal.addEventListener('click', (event) => {
            if (event.target === universalModal) {
                closeModal();
            }
        });
    }

    // Call functions to populate initial content on page load
    populatePreviewCards();
    loadPoetryPreviews();

    // Hamburger menu functionality (assuming you might add this in utilities.js or keep here)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Footer Last Modified and Current Year (assuming utilities.js might handle this better, but including here for completeness)
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});