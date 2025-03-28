
//1
function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}

//Test 1
console.log("Exercise 1 results:");
compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));

compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));


//2
function resolveAfter4Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("success");
        }, 4000);
    });
}

//Test 2
console.log("Exercise 2 started - waiting 4 seconds...");
resolveAfter4Seconds().then(result => {
    console.log("Exercise 2 result:", result);
});


//3
const promise1 = Promise.resolve(3);
const promise2 = Promise.reject("Boo!");

//Test 3
console.log("Exercise 3 results:");
promise1.then(value => {
    console.log("Resolved promise with value:", value);
});

promise2.catch(error => {
    console.log("Rejected promise with error:", error);
});