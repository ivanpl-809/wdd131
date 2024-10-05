// Display current year and last modified date in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

document.addEventListener('DOMContentLoaded', () => {
    const latitude = 19.4326; // Latitude for Mexico City
    const longitude = -99.1332; // Longitude for Mexico City
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`;

    // DOM elements to update
    const temperatureElement = document.getElementById('temp');
    const windSpeedElement = document.getElementById('windSpeed');
    const windChillElement = document.getElementById('windChill');

    // Fetch the weather data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = data.current_weather.temperature;
            const windSpeed = data.current_weather.windspeed;

            // Update the DOM with real weather data
            temperatureElement.textContent = temp;
            windSpeedElement.textContent = windSpeed;

            // Calculate windchill (using a simple wind chill formula if temperature is below 10°C)
            let windChill = 'N/A';
            if (temp <= 10 && windSpeed > 4.8) {
                windChill = Math.round(
                    13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)
                );
            }
            windChillElement.textContent = windChill;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            temperatureElement.textContent = 'Error';
            windSpeedElement.textContent = 'Error';
            windChillElement.textContent = 'Error';
        });
});
