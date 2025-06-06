document.addEventListener('DOMContentLoaded', () => {
    const visitMessageElement = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (lastVisit) {
        const lastVisitDate = Number(lastVisit);
        const timeDifference = now - lastVisitDate;
        const oneDay = 1000 * 60 * 60 * 24;

        if (timeDifference < oneDay) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const daysDifference = Math.floor(timeDifference / oneDay);
            if (daysDifference === 1) {
                visitMessageElement.textContent = "You last visited 1 day ago.";
            } else {
                visitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
            }
        }
    } else {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem('lastVisit', now.toString());

    const placesGrid = document.getElementById('places-grid');

    async function getPlacesData() {
        try {
            const response = await fetch('data/discover.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPlaces(data);
        } catch (error) {
            console.error('Error fetching or parsing places data:', error);
            placesGrid.textContent = 'Failed to load points of interest.';
        }
    }

    function displayPlaces(places) {
        placesGrid.innerHTML = ''; 
        places.forEach(place => {
            const card = document.createElement('div');
            card.className = 'place-card';

            const name = document.createElement('h2');
            name.textContent = place.name;

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = place.image;
            img.alt = place.name;
            img.loading = 'lazy';
            img.width = "300";
            img.height = "200";
            figure.appendChild(img);

            const address = document.createElement('address');
            address.textContent = place.address;

            const description = document.createElement('p');
            description.textContent = place.description;

            const button = document.createElement('a');
            button.href = "#";
            button.textContent = "Learn More";
            button.className = "cta-button";

            card.appendChild(name);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(button);

            placesGrid.appendChild(card);
        });
    }

    getPlacesData();
});