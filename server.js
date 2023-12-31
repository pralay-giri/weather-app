"using strict"
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const axios = require("axios");
const getLiveDate = require("./modules/getDate");
const getweatherData = require("./modules/getWeatherInformation");
const app = express();
const port = process.env.PORT || 5500;

const staticFilePath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templetes/views");
const partialsPath = path.join(__dirname, "/templetes/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(staticFilePath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render("startup");
})

app.get("/showWeather", async (req, res) => {
    let city = req.query.city;
    let weatherData;
    try {
        weatherData = await getweatherData(city);
        res.render("index", {
            temperature: weatherData.main.temp,
            localtion: weatherData.name,
            country: weatherData.sys.country,
            realtime: getLiveDate(),
            cloud_status: weatherData.weather[0].main,
            min_temp: weatherData.main.temp_min,
            max_temp: weatherData.main.temp_max,
            pressure: weatherData.main.pressure,
            humidity: weatherData.main.humidity,
            visibility: weatherData.visibility,
            longitude: weatherData.coord.lon,
            latitude: weatherData.coord.lat,
            speed: weatherData.wind.speed,
            degree: weatherData.wind.deg,
        });
    }
    catch (error) {
        res.status(404).send("Error 404: enter a valid city name");
    }
});

app.get("*", (req, res) => {
    res.render("error");
})

app.listen(port, () => {
    console.log(`server live on http://localhost:${port}`);
});