const apiKey = '408e224aa237a96f16800dbfd57490dc';
const daysToShow = 5;
let cityName = "Kharkiv";

const forecastElement = document.getElementById('forecast');
const cityElement = document.getElementById('city-name');

function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeatherForecast(data))
        .catch((error) => console.error(error));
}
function displayWeatherForecast(weatherData) {
    const days = weatherData.list.slice(0, daysToShow);
    const forecastHTML = days
        .map(
            (day) => `
    <div class="day">
      <h2>${new Date(day.dt * 1000).toLocaleDateString()}</h2>
      <img
        src="${(() => {
                    if (day.weather[0].description.includes("sky")) {
                        return "assets/images/sunny.png";
                    } else if (day.weather[0].description.includes("cloud")) {
                        return "assets/images/cloudy.png";
                    } else if (day.weather[0].description.includes("rain")) {
                        return "assets/images/rainy.png";
                    }
                    return "assets/images/default.png";
                })()}"
        alt="${day.weather[0].description}"
      />
      <p>${day.main.temp}°C</p>
    </div>
  `
        )
        .join('');
    forecastElement.innerHTML = forecastHTML;
    cityElement.innerHTML = `<h2>${cityName}</h2>`;
}
function findWeather() {
    cityName = document.getElementById("city-input").value;
    getWeatherForecast(cityName);
}

getWeatherForecast(cityName);
