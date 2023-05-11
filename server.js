"using strict"
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const axios = require("axios");
const getLiveDate = require("./getDate");
const { error } = require("console");
const app = express();
const port = 5500;

const staticFilePath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templetes/views");
const partialsPath = path.join(__dirname, "/templetes/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(staticFilePath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render("index");
})

app.get("/showWeather", async (req, res) => {
    let city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1359572c6a08638bfea6f61739d9e241&units=metric`;
    let weatherData;
    await axios.get(url)
        .then(response => {
            weatherData = response.data;
        })
    res.render("index", {
        temperature: weatherData.main.temp,
        localtion: weatherData.name,
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
});

app.listen(port, () => {
    console.log(`server live on http://localhost:${port}`);
});