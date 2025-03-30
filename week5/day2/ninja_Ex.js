//exercice 2
/**
 * After 1 second delay, concurrentPromise() runs
 * "==CONCURRENT START with Promise.all==" is logged
 * Both promise functions start simultaneously:
 * "starting slow promise" is logged
 * "starting fast promise" is logged
 * After 1 more second:
 * "fast promise is done" is logged
 * After 2 more seconds from start:
 * "slow promise is done" is logged
 * Both promises are resolved, so Promise.all() completes
 *  "slow" is logged  
 *  "fast" is logged
 * Promise.all() waits for the slowest promise (2 seconds) before proceeding with the .then() callback.
 */

//exercice 3
/**
 * After 5 seconds delay, parallel() runs
 * "==PARALLEL with await Promise.all==" is logged
 * Two async functions are immediately invoked, starting both promises concurrently:
 * "starting slow promise" is logged
 * "starting fast promise" is logged
 * After 1 more second:
 * "fast promise is done" is logged
 * "fast" is logged 
 * fter 2 seconds from start:
 * "slow promise is done" is logged
 * "slow" is logged
 * the console.log() for each promise's result happens as soon as that individual promise resolves, due to the await keyword.
 */

//exercice 4
/**
 * After 13 seconds delay, parallelPromise() runs
 * "==PARALLEL with Promise.then==" is logged
 * Both promises start immediately:
 * "starting slow promise" is logged
 * "starting fast promise" is logged
 * After 1 more second:
 * "fast promise is done" is logged
 * "fast" is logged
 * After 2 seconds from start:
 * slow promise is done" is logged
 * "slow" is logged"
 * Each promise operates independently with its own .then() handler, so results are logged as soon as each promise resolves, without coordination between them.
 */