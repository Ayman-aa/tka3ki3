const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter several words separated by commas: ', (input) => {
    const words = input.split(',').map(word => word.trim());
    const longestWordLength = Math.max(...words.map(word => word.length));
    const frameWidth = longestWordLength + 4;

    console.log('*'.repeat(frameWidth));
    words.forEach(word => {
        console.log(`* ${word.padEnd(longestWordLength, ' ')} *`);
    });
    console.log('*'.repeat(frameWidth));

    rl.close();
});