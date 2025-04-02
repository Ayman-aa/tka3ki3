const axios = require('axios');
const chalk = require('chalk');

async function getWeatherData(cityName) {
    const apiKey = 'adce58e3767227a491b7b5bccb74b7e5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    
    try {
        console.log(chalk.blue(`Fetching weather data for ${chalk.bold(cityName)}...`));
        
        const response = await axios.get(url);
        const data = response.data;
        
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        
        console.log(chalk.green.bold('\n📍 Weather Information:'));
        console.log(chalk.yellow(`🌆 City: ${chalk.white.bold(data.name)}, ${data.sys.country}`));
        console.log(chalk.yellow(`🌡️ Temperature: ${chalk.white.bold(temperature)}°C (Feels like: ${feelsLike}°C)`));
        console.log(chalk.yellow(`☁️ Condition: ${chalk.white.bold(description)}`));
        console.log(chalk.yellow(`💧 Humidity: ${chalk.white.bold(humidity)}%`));
        console.log(chalk.yellow(`💨 Wind Speed: ${chalk.white.bold(windSpeed)} m/s`));
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(chalk.red.bold(`City "${cityName}" not found. Please check the spelling.`));
        } else {
            console.log(chalk.red.bold('Error fetching weather data:'), error.message);
        }
    }
}

module.exports = { getWeatherData };
