
// weather.js
// Simple Weather App script using OpenWeatherMap API
// Usage: include this script in an HTML file with elements: 
//  - input#cityInput, button#searchBtn, div#weather
// Replace YOUR_API_KEY with your OpenWeatherMap API key.

const apiKey = "YOUR_API_KEY"; // <-- Replace with your OpenWeatherMap API key

async function getWeather(city) {
  if (!city) {
    document.getElementById("weather").innerText = "Please enter a city name.";
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found or API error");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weather").innerText = error.message;
  }
}

function displayWeather(data) {
  const el = document.getElementById("weather");
  const name = data.name || "";
  const country = (data.sys && data.sys.country) ? data.sys.country : "";
  const temp = (data.main && data.main.temp !== undefined) ? data.main.temp : "N/A";
  const desc = (data.weather && data.weather[0] && data.weather[0].description) ? data.weather[0].description : "N/A";
  const humidity = (data.main && data.main.humidity !== undefined) ? data.main.humidity : "N/A";
  const wind = (data.wind && data.wind.speed !== undefined) ? data.wind.speed : "N/A";

  el.innerHTML = `
    <h3>${name}${country ? ", " + country : ""}</h3>
    <p>🌡 Temperature: ${temp} °C</p>
    <p>☁ Condition: ${capitalize(desc)}</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🌬 Wind Speed: ${wind} m/s</p>
  `;
}

function capitalize(s) {
  if (!s) return s;
  return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Attach event listeners after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchBtn");
  const input = document.getElementById("cityInput");

  if (btn) {
    btn.addEventListener("click", () => {
      const city = input ? input.value.trim() : "";
      getWeather(city);
    });
  }
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const city = input.value.trim();
        getWeather(city);
      }
    });
  }
});
