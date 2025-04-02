const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const read = (filePath) => {
    const fullPath = path.resolve(filePath);
    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            console.error(chalk.red('Error reading file:'), err.message);
            return;
        }
        console.log(chalk.yellow('File content:'), data);
    });
};

export default read;