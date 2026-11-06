
async function getWeather() {
    let city = document.getElementById("city").value;

    let geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    let location = await geo.json();

    if (!location.results) {
        alert("City not found!");
        return;
    }

    let lat = location.results[0].latitude;
    let lon = location.results[0].longitude;

    let response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );

    let data = await response.json();
    let weather = data.current;

    document.getElementById("temp").innerText =
        weather.temperature_2m + "°C";

    document.getElementById("condition").innerText =
        "Weather Code: " + weather.weather_code;

    document.getElementById("humidity").innerText =
        "Humidity: " + weather.relative_humidity_2m + "%";

    document.getElementById("wind").innerText =
        "Wind: " + weather.wind_speed_10m + " km/h";
}
