function calculateMinutesLived() {
    const birthDate = new Date('1990-01-01'); 
    const now = new Date();
    const minutesLived = Math.floor((now - birthDate) / (1000 * 60));
    
    console.log(`You have lived for approximately ${minutesLived} minutes since your birthdate.`);
    return minutesLived;
}

module.exports = calculateMinutesLived;