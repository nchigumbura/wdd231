const spotlightContainer = document.querySelector("#spotlight");

async function fetchSpotlights() {
    try {
        // Fetch members.json data
        const response = await fetch("data/members.json");
        const data = await response.json();

        // Filter Gold & Silver members
        const qualifiedMembers = data.members.filter(member => member.membership === 3 || member.membership === 2);

        for (let i = qualifiedMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [qualifiedMembers[i], qualifiedMembers[j]] = [qualifiedMembers[j], qualifiedMembers[i]];
        }

        // Select 2 or 3 members randomly
        const selectedSpotlights = qualifiedMembers.slice(0, Math.min(qualifiedMembers.length, Math.floor(Math.random() * 2) + 2));

        // Generate HTML for each member
        let spotlightsHtml = '';
        selectedSpotlights.forEach(member => {
            spotlightsHtml += `
                <div class="member-card">
                    <h3>${member.name}</h3>
                    <img src="${member.image}" alt="${member.name} Logo">
                    <p>📍 Address: ${member.address}</p>
                    <p>📞 Phone: ${member.phone}</p>
                    <p>🔗 Website: <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                    <p>🏅 Membership Level: ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
                </div>
            `;
        });

        // Inject generated HTML into the spotlight container
        spotlightContainer.innerHTML = spotlightsHtml;

    } catch (error) {
        spotlightContainer.innerHTML = `<p>⚠️ Error loading member spotlights.</p>`;
        console.error("Failed to fetch spotlights:", error);
    }
}

// Call the function
fetchSpotlights();

