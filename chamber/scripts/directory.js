const membersURL = "data/members.json";
const cardsContainer = document.querySelector("#cards");
const toggleViewButton = document.querySelector("#toggleView");
const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');

let isGridView = true;
let allMembers = [];

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allMembers = await response.json();
        displayMembers(allMembers);
    } catch (error) {
        console.error('Error fetching members data:', error);
        cardsContainer.innerHTML = '<p>Failed to load business directory. Please try again later.</p>';
    }
}

const displayMembers = (members) => {
    cardsContainer.innerHTML = "";

    cardsContainer.classList.remove('grid-view', 'list-view');
    cardsContainer.classList.add(isGridView ? 'grid-view' : 'list-view');

    toggleViewButton.textContent = isGridView ? "Switch to List View" : "Switch to Grid View";

    members.forEach((member) => {
        let section = document.createElement("section");
        let detailsDiv = document.createElement("div");

        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let membership = document.createElement("p");
        let otherInfo = document.createElement("p");

        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        
        website.href = member.website;
        website.textContent = member.website.replace(/(^\w+:|^)\/\//, '');
        website.target = "_blank";

        membership.textContent = `Membership Level: ${member.membership_level === 1 ? 'Member' : member.membership_level === 2 ? 'Silver' : 'Gold'}`;
        
        if (member.other_info) {
            otherInfo.textContent = member.other_info;
        }

        if (isGridView) {
            let image = document.createElement("img");
            image.src = member.image; // Corrected to use the full URL from JSON
            image.alt = `Logo of ${member.name}`;
            image.loading = "lazy";
            section.appendChild(image);
        }

        detailsDiv.appendChild(name);
        detailsDiv.appendChild(address);
        detailsDiv.appendChild(phone);
        detailsDiv.appendChild(website);
        detailsDiv.appendChild(membership);
        if (member.other_info) {
            detailsDiv.appendChild(otherInfo);
        }
        
        section.appendChild(detailsDiv);

        cardsContainer.appendChild(section);
    });
};

toggleViewButton.addEventListener("click", () => {
    isGridView = !isGridView;
    displayMembers(allMembers);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
});

getMembers();