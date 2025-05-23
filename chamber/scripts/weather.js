const weatherContainer = document.querySelector("#weather-info");
const apiKey = "06e73e901e0f8d40c8e535e933955735";
const city = "Harare"; 

async function fetchWeather() {
    try {
        // Fetch Current Weather
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch 5-Day Forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Extract Current Weather Details
        const currentTemp = currentWeatherData.main.temp;
        const currentDescription = currentWeatherData.weather[0].description;

        // Process & Display 3-Day Forecast
        let forecastHtml = '<h4>📅 3-Day Forecast</h4>';
        const dailyForecasts = [];
        const today = new Date();

        for (let i = 0; i < forecastData.list.length && dailyForecasts.length < 3; i++) {
            const forecastItem = forecastData.list[i];
            const forecastDate = new Date(forecastItem.dt * 1000);

            if (forecastDate.getDate() !== today.getDate() &&
                !dailyForecasts.some(f => new Date(f.dt * 1000).getDate() === forecastDate.getDate())) {
                dailyForecasts.push(forecastItem);
            }
        }

        dailyForecasts.slice(0, 3).forEach((day, index) => {
            forecastHtml += `
                <p>☀ Day ${index + 1} High: ${day.main.temp_max}°C</p>
                <p>🌙 Day ${index + 1} Low: ${day.main.temp_min}°C</p>
                <p>⛅ Day ${index + 1} Condition: ${day.weather[0].description}</p>
            `;
        });

        // Render Data in HTML
        weatherContainer.innerHTML = `
            <h3>Weather in ${city}</h3>
            <p>🌡 Temperature: ${currentTemp}°C</p>
            <p>⛅ Condition: ${currentDescription}</p>
            ${forecastHtml}
        `;

    } catch (error) {
        weatherContainer.innerHTML = `<p>⚠️ Error loading weather data. Please try again later.</p>`;
        console.error("Failed to fetch weather from OpenWeatherMap:", error);
    }
}

// Run the function
fetchWeather();

