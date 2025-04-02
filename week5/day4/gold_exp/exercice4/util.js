const { format, addDays } = require('date-fns');
const { faker } = require('@faker-js/faker');

const users = [];

async function addFakeUser() {
    const user = {
        name: faker.person.fullName(),
        address: {
            street: faker.location.streetAddress(),
            country: faker.location.country()
        }
    };
    users.push(user);
    return user;
}

async function performDateOperations() {
    const currentDate = new Date();
    const newDate = await Promise.resolve(addDays(currentDate, 5));
    const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss');
    console.log(`The date after adding 5 days is: ${formattedDate}`);
}

module.exports = { performDateOperations, users, addFakeUser };
