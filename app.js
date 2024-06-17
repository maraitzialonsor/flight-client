document.getElementById('flight-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const flightNumber = document.getElementById('flight-number').value;

    try {
        const response = await fetch(`http://localhost:3000/api/flight/${flightNumber}/weather`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
});

function displayWeather(data) {
    const originWeatherElement = document.getElementById('origin-weather');
    const destinationWeatherElement = document.getElementById('destination-weather');

    originWeatherElement.innerHTML = `
        <li><h2> ${data.origin.origin}</h2></li>
        <li><h3> ${data.origin.origin_name}</h3></li>
        <li><h3> ${data.origin.weather.main.temp}°C<h3></li>
        <li><strong>Description:</strong> ${data.origin.weather.weather[0].description}</li>
        <li><strong>Feels Like:</strong> ${data.origin.weather.main.feels_like}°C</li>
        <li><strong>Min:</strong> ${data.origin.weather.main.temp_min}°C</li>
        <li><strong>Max:</strong> ${data.origin.weather.main.temp_max}°C</li>
    `;

    destinationWeatherElement.innerHTML = `
        <li><h2> ${data.destination.destination}</h2></li>
        <li><h3> ${data.destination.destination_name}</h3></li>
        <li><h3> ${data.destination.weather.main.temp}°C<h3></li>
        <li><strong>Description:</strong> ${data.destination.weather.weather[0].description}</li>
        <li><strong>Feels Like:</strong> ${data.destination.weather.main.feels_like}°C</li>
        <li><strong>Min:</strong> ${data.destination.weather.main.temp_min}°C</li>
        <li><strong>Max:</strong> ${data.destination.weather.main.temp_max}°C</li>
    `;
}
