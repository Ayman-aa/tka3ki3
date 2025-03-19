let userInput = prompt("Please enter a number:");
let number = Number(userInput);

console.log(typeof userInput); 
console.log(typeof number);    

while (number < 10) {
    userInput = prompt("Number is too small. Please enter a number 10 or greater:");
    number = Number(userInput);
}

console.log("Thank you! You entered a number that's 10 or greater:", number);