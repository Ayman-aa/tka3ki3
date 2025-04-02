const inquirer = require('inquirer');
const { users } = require('./file.js');

async function promptForUserData() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter user name:',
            validate: input => input.trim() !== '' ? true : 'Name is required'
        },
        {
            type: 'input',
            name: 'street',
            message: 'Enter street address:',
            validate: input => input.trim() !== '' ? true : 'Street address is required'
        },
        {
            type: 'input',
            name: 'country',
            message: 'Enter country:',
            validate: input => input.trim() !== '' ? true : 'Country is required'
        }
    ]);

    const newUser = {
        name: answers.name,
        address: {
            street: answers.street,
            country: answers.country
        }
    };

    users.push(newUser);
    console.log('User added successfully!');
    console.log('Current users:', users);
    
    return newUser;
}
promptForUserData().catch(error => console.error('Error:', error));

module.exports = { promptForUserData };