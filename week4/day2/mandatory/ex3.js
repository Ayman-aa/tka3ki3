------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
/**
 * Output: ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']
 * Explanation: The spread operator is used to expand the elements of the array.
 * In this case, the elements of the vegetables and fruits arrays are expanded and added to the result array.
 */
------2------
const country = "USA";
console.log([...country]);
/**
 * Output: ['U', 'S', 'A']
 * Explanation: The spread operator is used to expand the characters of the string into an array.
 * In this case, the characters of the "USA" string are expanded and added to the array.
 */
------Bonus------
let newArray = [...[,,]];
console.log(newArray);
/**
 * Output: [undefined, undefined]
 * Explanation: The spread operator is used to expand the elements of the array.
 * In this case, the array [,,] has two empty slots, which are expanded into undefined values in the newArray.
 */
