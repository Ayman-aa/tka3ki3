//1
function sumArray(arr) {
    return arr.reduce((sum, current) => sum + current, 0);
  }
  
  
  //2
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  
  
  //3
  function cleanArray(arr) {
    return arr.filter(item => {
      return item !== null && 
             item !== 0 && 
             item !== "" && 
             item !== false && 
             item !== undefined && 
             !Number.isNaN(item);
    });
  }
  
  
  //4
  function repeat(str, times = 1) {
    let result = '';
    for (let i = 0; i < times; i++) {
      result += str;
    }
    return result;
  }
  
  
  //5
  const startLine = '     ||<- Start line';
  let turtle = '🐢';
  let rabbit = '🐇';
  
  // Lining up turtle and rabbit at the start line
  turtle = turtle.padStart(7);
  rabbit = rabbit.padStart(7);
  
  console.log(startLine);
  console.log(turtle);
  console.log(rabbit);
  
  // What happens when you run turtle = turtle.trim().padEnd(9, '=');?
  // This removes any whitespace from the turtle string and then adds '=' characters
  // until the total length is 9. So it becomes "🐢======="
  turtle = turtle.trim().padEnd(9, '=');
  console.log("After padEnd:", turtle); // Should output "🐢======="