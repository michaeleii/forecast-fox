require("dotenv").config(); // Load .env file
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

const { WEATHER_API_KEY } = process.env;

app.get("/", (req, res) => res.render("index"));

app.get("/api/weather/:city", async (req, res, next) => {
	try {
		const city = req.params.city;
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
		);
		const weatherData = await response.json();
		res.json(weatherData);
	} catch (err) {
		next(err);
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
