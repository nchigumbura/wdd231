const weatherContainer = document.querySelector("#weather-info");

async function fetchWeather() {
    try {
        const response = await fetch("data/weather.json");
        const data = await response.json();

        weatherContainer.innerHTML = `
            <h3>${data.location}</h3>
            <p>🌡 Temperature: ${data.current.temperature}</p>
            <p>⛅ Condition: ${data.current.condition}</p>
            <p>🌧 Precipitation Chance: ${data.current.precipitation}</p>
            <h4>📅 Tomorrow’s Forecast</h4>
            <p>☀ High: ${data.forecast.tomorrow.high}</p>
            <p>🌙 Low: ${data.forecast.tomorrow.low}</p>
            <p>⛅ Condition: ${data.forecast.tomorrow.condition}</p>
        `;
    } catch (error) {
        weatherContainer.innerHTML = `<p>⚠️ Error loading weather data. Please try again later.</p>`;
        console.error("Failed to fetch weather:", error);
    }
}

fetchWeather();

