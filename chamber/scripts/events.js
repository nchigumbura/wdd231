const eventContainer = document.querySelector("#event-list");

async function fetchEvents() {
    try {
        const response = await fetch("data/events.json");
        const events = await response.json();

        eventContainer.innerHTML = "";
        
        events.forEach(event => {
            let eventCard = document.createElement("div");
            let title = document.createElement("h3");
            let date = document.createElement("p");
            let location = document.createElement("p");

            title.textContent = event.name;
            date.textContent = `📅 ${event.date}`;
            location.textContent = event.location ? `📍 ${event.location}` : "📍 Location TBD";

            eventCard.appendChild(title);
            eventCard.appendChild(date);
            eventCard.appendChild(location);
            eventCard.classList.add("event-card");

            eventContainer.appendChild(eventCard);
        });
    } catch (error) {
        eventContainer.innerHTML = `<p>⚠️ Error loading events. Please try again later.</p>`;
        console.error("Failed to fetch events:", error);
    }
}

fetchEvents();

