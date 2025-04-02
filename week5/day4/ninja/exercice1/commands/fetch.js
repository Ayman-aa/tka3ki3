const chalk = require('chalk');
const axios = require('axios');

const fetch = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(chalk.blue('Data fetched successfully:'), response.data);
    } catch (error) {
        console.error(chalk.red('Error fetching data:'), error.message);
    }
};

export default fetch;