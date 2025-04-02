const chalk = require('chalk');

const greet = (name) => {
    console.log(chalk.green(`Hello, ${name}! Welcome to Ninja Utility.`));
};

export default greet;