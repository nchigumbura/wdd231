document.addEventListener('DOMContentLoaded', () => {
    const previewCards = document.querySelectorAll('.preview-card');
    const poetrySectionArrow = document.querySelector('.poetry-header .card-arrow');
    const universalModal = document.getElementById('universalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCtaButton = document.getElementById('modalCtaButton');
    const closeButton = document.querySelector('.close-button');
    const poetryGrid = document.getElementById('poetry-preview-grid');

    const contentData = {
        stories: {
            title: "Dive into Short Stories",
            content: [
                { title: "The Last Lighthouse Keeper", excerpt: "Old Elias watched the perpetual storm, the only constant in a world swallowed by mist and echoes. His lighthouse beam, once a guide for ships, now cut through nothing but the swirling oblivion, a lonely testament to a bygone era. He wondered if anyone else was left to see it.", author: "Anya Sharma" },
                { title: "City of Echoes", excerpt: "In the sprawling metropolis of Veridia, where skyscrapers touched the clouds, a haunting silence had fallen. The bustling streets were empty, and the only sounds were the faint echoes of a life that once was. A lone scavenger sought remnants of a forgotten time.", author: "Kaelen Thorne" },
                { title: "Whispers in the Library", excerpt: "Elara found solace among dusty tomes, each book a window to another soul. But tonight, the whispers weren't from turning pages; they were ancient, beckoning, leading her deeper into the labyrinthine shelves where secrets slumbered.", author: "Lena Vance" },
                { title: "The Chronos Bloom", excerpt: "A rare flower that bloomed once a century, the Chronos Bloom held the key to time itself. When it finally unfurled, a young botanist discovered its petals could rewind moments, but every temporal shift had unforeseen consequences.", author: "Dr. Aris Finch" },
                { title: "Beneath the Obsidian Lake", excerpt: "Legends spoke of a lost city submerged under the dark, glassy surface of Lake Obsidian. A team of daring aquanauts descended into its depths, hoping to uncover its secrets, but found more than just ruins beneath the murky waters.", author: "Marcus Rivers" },
                { title: "The Inventor's Last Wish", excerpt: "An eccentric inventor, on his deathbed, left behind a peculiar will: his vast fortune would go to whoever could activate his final, most ambitious creation—a device rumored to grant any desire, but at a hidden cost.", author: "Sophia Grey" },
                { title: "Starfall Desert", excerpt: "On a planet where stars occasionally fell from the sky, embedding themselves as shimmering jewels in the sand, a nomad embarked on a perilous journey across the vast Starfall Desert, seeking a star large enough to power his dying village.", author: "Zara Khan" },
                { title: "The Puppet Master's Encore", excerpt: "After years of silence, the renowned but reclusive puppet master announced one final show. His puppets were uncannily lifelike, their movements fluid and expressive, leading many to wonder if they were truly just wood and string.", author: "Victor Moreau" },
                { title: "Echoes of the Old World", excerpt: "After the Great Collapse, humanity clung to remnants of the past. A young archivist discovered a hidden data chip containing vivid memories of a world before, prompting her to question everything she knew about her dystopian reality.", author: "Cassandra Bell" },
                { title: "The Dream Weaver's Loom", excerpt: "Every night, the Dream Weaver spun intricate realities for the sleeping. One night, a thread snapped, weaving a nightmare into the collective consciousness, and the Weaver had to enter the dreamscape to mend it.", author: "Orion Starr" },
                { title: "The Solstice Stone", excerpt: "Found only during the shortest day of the year, the Solstice Stone was said to reveal one's true path. A reluctant hero sought it, hoping it would absolve him of his destiny, but found it instead illuminated a new, more challenging one.", author: "Rory McCann" },
                { title: "Chronicles of the Whispering Wind", excerpt: "Across the vast plains, the Whispering Wind carried tales from distant lands. A young cartographer, guided only by its murmurs, began to draw a map of stories, piecing together the fragmented history of the world.", author: "Fiona Gale" }
            ],
            ctaText: "Explore Full Story Library",
            ctaLink: "library.html?category=stories"
        },
        quotes: {
            title: "Words of Wisdom & Inspiration",
            content: [
                { quote: "\"The only way to do great work is to love what you do.\"", author: "- Steve Jobs" },
                { quote: "\"Either write something worth reading or do something worth writing.\"", author: "- Benjamin Franklin" },
                { quote: "\"You don't start out writing good stuff. You start out writing crap and thinking it's good stuff, and then gradually you get better.\"", author: "- Octavia E. Butler" },
                { quote: "\"I have rewritten – often several times – every word I have ever published. My pencils outlast their erasers.\"", author: "- Vladimir Nabokov" },
                { quote: "\"Write. Finish things. Worry about perfection later.\"", author: "- Neil Gaiman" },
                { quote: "\"The first draft is just you telling yourself the story.\"", author: "- Terry Pratchett" },
                { quote: "\"Don't tell me the moon is shining; show me the glint of light on broken glass.\"", author: "- Anton Chekhov" },
                { quote: "\"Words are our most inexhaustible source of magic.\"", author: "- J.K. Rowling" },
                { quote: "\"If you want to be a writer, you must do two things above all others: read a lot and write a lot.\"", author: "- Stephen King" },
                { quote: "\"Write what disturbs you, what you fear, what you have not been willing to speak about. Be willing to be split open.\"", author: "- Natalie Goldberg" },
                { quote: "\"It is by writing that I can find what I am thinking about.\"", author: "- Philip Pullman" },
                { quote: "\"You can always edit a bad page. You can’t edit a blank page.\"", author: "- Jodi Picoult" }
            ],
            ctaText: "Browse All Quotes",
            ctaLink: "library.html?category=quotes"
        },
        resources: {
            title: "Essential Writing Resources",
            content: [
                { title: "Character Development Guide", guide: ["Create compelling backstories.", "Develop unique character voices.", "Show, don't tell, personality traits.", "Use internal monologue effectively."] },
                { title: "Plotting Your Novel", guide: ["Outline major plot points.", "Understand story arcs (e.g., Freytag's Pyramid).", "Utilize subplots to enrich the main narrative.", "Pacing strategies for tension and release."] },
                { title: "Overcoming Writer's Block", guide: ["Try free writing exercises.", "Change your writing environment.", "Read inspiring works.", "Break down your task into smaller steps."] },
                { title: "Effective Worldbuilding", guide: ["Establish consistent rules and lore.", "Integrate culture and history.", "Consider geography and climate's impact.", "Show, don't just explain, your world."] },
                { title: "Mastering Dialogue", guide: ["Use natural speech patterns.", "Reveal character through speech.", "Avoid 'telling' through dialogue.", "Keep exchanges concise and impactful."] },
                { title: "Show, Don't Tell", guide: ["Use sensory details to convey emotions.", "Describe actions instead of stating feelings.", "Let readers infer character traits.", "Evoke rather than explain scenes."] },
                { title: "Self-Editing Checklist", guide: ["Check for plot holes and inconsistencies.", "Refine sentence structure and flow.", "Eliminate unnecessary words and clichés.", "Ensure strong opening and closing paragraphs."] },
                { title: "Punctuation Perfection", guide: ["Master comma usage.", "Understand semicolon and colon roles.", "Proper apostrophe placement.", "Use dashes and parentheses effectively."] },
                { title: "Genre Specific Tropes", guide: ["Learn common tropes for your genre.", "Subvert or embrace tropes intentionally.", "Avoid clichés that detract from originality.", "Use tropes to connect with genre readers."] },
                { title: "Marketing Your Manuscript", guide: ["Build an author platform.", "Understand query letter essentials.", "Research literary agents and publishers.", "Utilize social media for outreach."] },
                { title: "Copyright & Intellectual Property", guide: ["Understand basic copyright laws.", "Protect your literary work.", "Learn about public domain works.", "Consider professional legal advice when needed."] },
                { title: "Creative Writing Prompts", guide: ["Use images as inspiration.", "Explore 'what if' scenarios.", "Write from an unusual perspective.", "Set a timer and just write."] }
            ],
            ctaText: "View All Resources",
            ctaLink: "library.html?category=resources"
        },
        poems: {
            title: "Our Curated Poetry Collection",
            content: [
                { image: "images/authors/author1.webp", title: "Ode to the Evening Star", author: "Liam O'Connell" },
                { image: "images/authors/author2.webp", title: "Whispers of Autumn", author: "Seraphina Rose" },
                { image: "images/authors/author3.webp", title: "The Silent City", author: "Alistair Finch" },
                { image: "images/authors/author4.webp", title: "Ephemeral Dreams", author: "Dr. Elysia Virtuoso" },
                { image: "images/authors/author5.webp", title: "The Ocean's Embrace", author: "Marina Azure" },
                { image: "images/authors/author6.webp", title: "Forest Heartbeat", author: "Rowan Woods" },
                { image: "images/authors/author7.webp", title: "Urban Echoes", author: "Caleb Stone" },
                { image: "images/authors/author8.webp", title: "Desert Bloom", author: "Zahra Sands" },
                { image: "images/authors/author9.webp", title: "Mountain Serenade", author: "Skye Everest" },
                { image: "images/authors/author10.webp", title: "River's Song", author: "Willow Brook" },
                { image: "images/authors/author11.webp", title: "Winter's Veil", author: "Frostina Clove" },
                { image: "images/authors/author12.webp", title: "Summer's Glow", author: "Sunny Daye" }
            ],
            ctaText: "Explore More Poetry",
            ctaLink: "library.html?category=poetry"
        }
    };

    const initialPoetryCards = [
        {
            image: "images/authors/author1.webp",
            title: "Ode to the Evening Star",
            author: "Liam O'Connell",
            excerpt: "A celestial journey through twilight hues..."
        },
        {
            image: "images/authors/author2.webp",
            title: "Whispers of Autumn",
            author: "Seraphina Rose",
            excerpt: "Leaves fall, secrets stir in the crisp air..."
        },
        {
            image: "images/authors/author3.webp",
            title: "The Silent City",
            author: "Alistair Finch",
            excerpt: "Cobblestone streets remember forgotten tales..."
        }
    ];

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

    function populatePreviewCards() {
        document.getElementById('story-preview-text').textContent = initialPreviewContent.story.text;
        document.getElementById('story-preview-author').textContent = initialPreviewContent.story.author;

        document.getElementById('quote-preview-text').textContent = initialPreviewContent.quote.text;
        document.getElementById('quote-preview-author').textContent = initialPreviewContent.quote.author;

        document.getElementById('resource-preview-text').textContent = initialPreviewContent.resource.text;
        document.getElementById('resource-preview-author').textContent = initialPreviewContent.resource.author;
    }

    function loadPoetryPreviews() {
        poetryGrid.innerHTML = '';
        initialPoetryCards.forEach(poem => {
            const card = document.createElement('div');
            card.classList.add('poetry-card');
            card.innerHTML = `
                <img src="${poem.image}" alt="${poem.author}" class="author-image">
                <p class="poem-title">${poem.title}</p>
                <p class="author-name">${poem.author}</p>
                <p class="poem-excerpt">${poem.excerpt}</p>
            `;
            poetryGrid.appendChild(card);
        });
    }

    function generateModalContent(section) {
        let html = '';
        const data = contentData[section];

        if (!data || !data.content) return '';

        html += '<div class="modal-content-grid">';
        data.content.forEach(item => {
            html += '<div class="modal-item-card">';
            if (section === 'stories') {
                html += `<h5>${item.title}</h5>`;
                html += `<p>${item.excerpt}</p>`;
                html += `<p class="author-name">${item.author}</p>`;
            } else if (section === 'quotes') {
                html += `<h5>${item.quote}</h5>`;
                html += `<p class="author-name">${item.author}</p>`;
            } else if (section === 'resources') {
                html += `<h5>${item.title}</h5>`;
                html += '<ul>';
                item.guide.forEach(point => {
                    html += `<li>${point}</li>`;
                });
                html += '</ul>';
            } else if (section === 'poems') {
                html += `<img src="${item.image}" alt="${item.author}" class="author-image">`;
                html += `<h5>${item.title}</h5>`;
                html += `<p class="author-name">${item.author}</p>`;
            }
            html += '</div>';
        });
        html += '</div>';
        return html;
    }

    function openModal(section) {
        const data = contentData[section];
        if (data) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = generateModalContent(section); // Generate grid content
            modalCtaButton.textContent = data.ctaText;
            modalCtaButton.onclick = () => window.location.href = data.ctaLink;
            universalModal.classList.add('active');
        }
    }

    function closeModal() {
        universalModal.classList.remove('active');
        modalTitle.textContent = '';
        modalBody.innerHTML = '';
        modalCtaButton.textContent = '';
        modalCtaButton.onclick = null;
    }

    previewCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const section = card.dataset.section;
            openModal(section);
        });
    });

    poetrySectionArrow.addEventListener('click', () => {
        openModal('poems');
    });

    closeButton.addEventListener('click', closeModal);

    universalModal.addEventListener('click', (event) => {
        if (event.target === universalModal) {
            closeModal();
        }
    });

    populatePreviewCards();
    loadPoetryPreviews();
});