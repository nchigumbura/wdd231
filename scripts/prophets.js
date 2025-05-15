const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthInfo = document.createElement('p');

        //prophet info
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthInfo.textContent = `Born: ${prophet.birthdate}, ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add info to card
        card.appendChild(fullName);
        card.appendChild(birthInfo);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

getProphetData();

