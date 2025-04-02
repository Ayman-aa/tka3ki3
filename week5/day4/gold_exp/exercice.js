const readline = require('readline');
const XRegExp = require('xregexp');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function validateFullName(fullName) {
    const nameRegex = XRegExp('^[A-Z][a-z]+ [A-Z][a-z]+$');
    return XRegExp.test(fullName, nameRegex);
}

async function getInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function main() {
    const fullName = await getInput('Please enter your full name (e.g., "John Doe"): ');
    if (await validateFullName(fullName)) {
        console.log(`Hello, ${fullName}! Your name is valid.`);
    } else {
        console.log("Invalid name format. Please ensure your input:");
        console.log("- Contains only letters");
        console.log("- Has exactly one space between first and last name");
        console.log("- Has first letter of each name capitalized");
    }
    rl.close();
}

main();
