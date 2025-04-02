function timeUntilNewYear() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const timeDiff = newYear - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until January 1st.`;
}

module.exports = timeUntilNewYear;