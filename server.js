"using strict"
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 5500;

const staticFilePath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templetes/views");
const partialsPath = path.join(__dirname, "/templetes/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(staticFilePath));
hbs.registerPartials(partialsPath);


app.get("/", (req, res)=>{
    let weatherData = getWeatherData();
    res.render("index", {
        temperature : 20,
        localtion : "howrah",
        realtime : new Date().getDate(),
        cloud_status : "suny"
    });
})
app.listen(port, ()=>{
    console.log(`server live on http://localhost:${port}`);
});