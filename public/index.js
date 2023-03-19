const btnGetWeather = document.getElementById("btnGetWeather");
const inputCity = document.getElementById("city");
const weatherInfo = document.getElementById("weatherInfo");

const titleCase = (str) => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => {
			return word.replace(word[0], word[0].toUpperCase());
		})
		.join(" ");
};

btnGetWeather.addEventListener("click", async (e) => {
	try {
		const userCity = inputCity.value;
		const response = await fetch(`/api/weather/${userCity}`);
		const weatherData = await response.json();
		if (weatherData.cod === "404") {
			throw new Error(`${userCity} is not a valid city.`);
		}
		console.log(weatherData);
		const city = weatherData.name;
		const country = weatherData.sys.country;
		const temp = Math.floor(weatherData.main.temp);
		const feelsLike = Math.floor(weatherData.main.feels_like);
		const humidity = weatherData.main.humidity;
		const description = weatherData.weather[0].description;
		const icon = weatherData.weather[0].icon;
		const iconURL = `http://openweathermap.org/img/wn/${icon}.png`;
		weatherInfo.innerHTML = `
		<div>
			<h6>${city}, ${country}</h6>
			<h3>${titleCase(description)}</p>
			<img src="${iconURL}" alt="${description}">
			<h2>${temp} °C</h2>
		</div>
		<div>
			<p>Feels like: ${feelsLike} °C</p>
			<p>Humidity: ${humidity}%</p>
		</div>
		`;
	} catch (err) {
		weatherInfo.innerHTML = `<h2 class="text-center">${err.message}</h2>`;
	}
});
