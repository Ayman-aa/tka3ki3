const numbers = [5,0,9,1,7,4,2,6,3,8];

const numbersString = numbers.toString();

const joinWithDelimiter = numbers.join(',');

function bubbleSort(arr) {
  const result = [...arr];
  
  for (let i = 0; i < result.length; i++) {
    console.log(`Outer loop iteration ${i+1}`);
    
    for (let j = 0; j < result.length - 1 - i; j++) {
      console.log(`  Comparing ${result[j]} and ${result[j+1]}`);
      
      if (result[j] < result[j+1]) {
        const temp = result[j];
        result[j] = result[j+1];
        result[j+1] = temp;
        
        console.log(`  Swapped: ${result[j]} and ${result[j+1]}`);
        console.log(`  Current array: ${result}`);
      } else {
        console.log(`  No swap needed`);
      }
    }
    
    console.log(`After iteration ${i+1}: ${result}`);
  }
  
  return result;
}

const sortedNumbers = bubbleSort(numbers);
console.log("Original array:", numbers);
console.log("Sorted array (descending):", sortedNumbers);
