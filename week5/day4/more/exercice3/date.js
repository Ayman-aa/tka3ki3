const Holidays = require('date-holidays');

const hd = new Holidays('US'); 

function getNextHoliday() {
    const today = new Date();
    const nextHoliday = hd.getNextHoliday(today);
    
    if (!nextHoliday) {
        return 'No upcoming holiday found.';
    }

    const holidayDate = new Date(nextHoliday.date);

    const timeDiff = holidayDate - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `Next holiday is ${nextHoliday.name} on ${holidayDate.toDateString()}. Time left: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

console.log(getNextHoliday());

module.exports = getNextHoliday;