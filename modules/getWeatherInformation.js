const axios = require("axios");
const getdata = async (city="delhi") => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1359572c6a08638bfea6f61739d9e241&units=metric`;
    let weatherData;
    await axios.get(url)
        .then(response => {
            weatherData = response.data;
        })
    return weatherData;
}

module.exports = getdata;