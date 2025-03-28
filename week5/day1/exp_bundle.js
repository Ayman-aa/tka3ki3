//1
// Promise.all takes an array of promises and returns a new promise that fulfills when
// all of the promises in the array fulfill, or rejects if any of the promises reject.
// When successful, it returns an array containing the resolved values of all the input promises,
// in the same order as the original array.

const promise1 = Promise.resolve(3);
const promise2 = 42;                 
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');  
});

// Using Promise.all to handle all three promises together
Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log('Exercise 1 result:', values);
    // Output: [3, 42, "foo"]
    // We get this output because:
    // - promise1 resolves to 3
    // - promise2 is not a promise but automatically wrapped as Promise.resolve(42)
    // - promise3 resolves to 'foo' after 3 seconds
    // Promise.all waits for all promises to resolve and returns their values in an array
    })
  .catch(error => {
    console.error('Exercise 1 error:', error);
  });



//2

function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
  .then(result => {
    console.log('Exercise 2 result:', result);
    // Expected output: [2, 4, 6]
    // This is because:
    // 1. The map creates an array of promises [Promise(2), Promise(4), Promise(6)]
    // 2. Each promise resolves with the value of the array element multiplied by 2
    // 3. Promise.all waits for all promises to resolve and returns their values in an array
  });