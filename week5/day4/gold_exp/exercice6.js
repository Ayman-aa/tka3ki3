async function returnNumbers(str) {
    const regex = new RegExp('\\d', 'g');
    const numbers = str.match(regex);
    return numbers ? numbers.join('') : '';
}
