const url = "data/members.json";
const cardsContainer = document.querySelector("#cards");
const toggleViewButton = document.querySelector("#toggleView");

let currentView = "grid"; 

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    cardsContainer.innerHTML = "";
    
    members.forEach((member) => {
        let card = document.createElement("section");
        let image = document.createElement("img");
        let details = document.createElement("div");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");

        image.src = member.image;
        image.alt = `Logo of ${member.name}`;
        name.textContent = member.name;
        address.textContent = `📍 ${member.address}`;
        phone.textContent = `📞 ${member.phone}`;
        website.href = member.website;
        website.textContent = "Visit Website";

        details.appendChild(name);
        details.appendChild(address);
        details.appendChild(phone);
        details.appendChild(website);
        card.appendChild(image);
        card.appendChild(details);

        if (currentView === "list") {
            card.style.display = "block";
            card.style.flexDirection = "column";
        } else {
            card.style.display = "flex";
            card.style.alignItems = "center";
            card.style.justifyContent = "space-between";
        }

        cardsContainer.appendChild(card);
    });
};

toggleViewButton.addEventListener("click", () => {
    currentView = currentView === "grid" ? "list" : "grid";
    toggleViewButton.textContent = currentView === "grid" ? "Switch to List View" : "Switch to Grid View";
    getMembers();
});

getMembers();

