function displayNumbersDivisible(divisor) {
    var divisables = 0;
    for (let i = 0; i < 500; i++) {
        if (i % divisor == 0) {
            divisables += i;
            console.log(`The number ${i} is divisible by ${divisor}`);
        } else {
            console.log(`The number ${i} is not divisible by ${divisor}`);
        }
    }
    console.log(`The sum of all numbers divisible by ${divisor} is ${divisables}`);
}
displayNumbersDivisible(23)