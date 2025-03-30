//exercice 2
/**
 * When sequentialStart() is called, it prints "==SEQUENTIAL START==" to the console.
 * It calls resolveAfter2Seconds() which prints "starting slow promise" and returns a promise that resolves after 2 seconds.
 * The await keyword pauses execution until this promise resolves (2 seconds).
 * After 2 seconds, the promise resolves with value "slow", and "slow promise is done" is printed.
 * The resolved value "slow" is stored in the variable slow and then printed.
 * Next, it calls resolveAfter1Second() which prints "starting fast promise" and returns a promise that resolves after 1 second.
 * The await keyword pauses execution until this promise resolves (1 second).
 * After 1 second, the promise resolves with value "fast", and "fast promise is done" is printed.
 * The resolved value "fast" is stored in the variable fast and then printed.
 * output : 
 *      ==SEQUENTIAL START==
 *      starting slow promise
 *      slow promise is done
 *      slow
 *      starting fast promise
 *      fast promise is done
 *      fast
 */


//exercice 3
/**
 * his function is scheduled to run after 4 seconds due to the setTimeout(concurrentStart, 4000).
 * After 4 seconds, it prints "==CONCURRENT START with await==".
 * It calls resolveAfter2Seconds() which prints "starting slow promise" and starts its 2-second timer, but the execution continues (no await yet).
 * It then calls resolveAfter1Second() which prints "starting fast promise" and starts its 1-second timer.
 * Both promises are now running concurrently.
 * When console.log(await slow) is reached, execution pauses until the slow promise resolves.
 * After 2 seconds (from when the promise started), the slow promise resolves with "slow", prints "slow promise is done", and then "slow" is printed by the console.log.
 * When console.log(await fast) is reached, the fast promise has already resolved (after 1 second) and printed "fast promise is done", so it immediately prints "fast".
 * 
 * output :
 *      (4 seconds pass)
 *      ==CONCURRENT START with await==
 *      starting slow promise
 *      starting fast promise
 *      (After 1 second)
 *      fast promise is done
 *      (After 1 more second)
 *      slow promise is done
 *      slow
 *      fast
 */



//exercice 4
const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function() {
    try {
        const requests = urls.map(async url => {
        const resp = await fetch(url);
        return await resp.json();
        });

        const [ users, posts, albums ] = await Promise.all(requests);
        console.log('users', users);
        console.log('posta', posts);
        console.log('albums', albums);
    } catch (error) {
        console.log('ooooooops');
    }
}

getData();