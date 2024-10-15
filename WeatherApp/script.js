const weatherImg = document.getElementById("weatherImg");
const cityName = document.getElementById("cityName");
const region = document.getElementById("region");
const country = document.getElementById("country");
const temperature_c = document.getElementById("temperature_c");
const temperature_f = document.getElementById("temperature_f");

const searchBtn = document.getElementById("searchBtn");
const last_updated = document.getElementById("last_updated");
const condition = document.getElementById("condition");

async function fetchWeather(e) {
  e.preventDefault();
  const state = document.getElementById("state").value;

  const url = `http://api.weatherapi.com/v1/current.json?key=61f1615a69674f1ba3652744241110&q=${state}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
 

    weatherImg.src = data.current.condition.icon;
    temperature_c.innerHTML = `${data.current.temp_c} °C`;
    temperature_f.innerHTML = `${data.current.temp_f} °F`;
    cityName.innerHTML = `City:${data.location.name}`;
    country.innerHTML = `Region:${data.location.country}`;
    region.innerHTML = `Country:${data.location.region}`;
    last_updated.innerHTML = `${data.current.last_updated}`;
    condition.innerHTML = `${data.current.condition.text}`;
  } catch (error) {
    console.error(error);
    cityName.innerHTML = "City not found";
  }
}

searchBtn.addEventListener("click", fetchWeather);
