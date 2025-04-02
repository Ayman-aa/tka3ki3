const readline = require('readline');
const { getWeatherData } = require('./weather');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question(query, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

async function promptForWeather() {
    const cityName = await askQuestion('Enter a city name to get weather information: ');
    if (cityName.trim() === '') {
        console.log('City name cannot be empty. Please try again.');
        return promptForWeather();
    }
    await getWeatherData(cityName);
    const answer = await askQuestion('Would you like to check another city? (y/n): ');
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        return promptForWeather();
    }
    console.log('Thank you for using the weather app!');
}

export default promptForWeather;
