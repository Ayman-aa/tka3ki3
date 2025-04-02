const { format, addDays } = require('date-fns');

function performDateOperations() {
    const currentDate = new Date();
    const newDate = addDays(currentDate, 5);
    const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss');

    console.log(`The date after adding 5 days is: ${formattedDate}`);
}

module.exports = performDateOperations;