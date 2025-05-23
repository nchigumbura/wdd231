const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=06e73e901e0f8d40c8e535e933955735';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Testing output
            displayResults(data); // Send data to UI
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayResults(data) {
    const currentTemp = document.querySelector("#current-temp");
    const weatherIcon = document.querySelector("#weather-icon");
    const captionDesc = document.querySelector("figcaption");

    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = `${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
}

apiFetch();

