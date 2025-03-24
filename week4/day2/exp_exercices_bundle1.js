//1
[1, 2, 3].map(num => {
    if (typeof num === 'number') return num * 2;
    return;
  });
  // output: [2, 4, 6]
  
  //2
  [[0, 1], [2, 3]].reduce(
    (acc, cur) => {
      return acc.concat(cur);
    },
    [1, 2],
  );
  // output: [1, 2, 0, 1, 2, 3]
  
  
  //3
  const arrayNum = [1, 2, 4, 5, 8, 9];
  const newArray = arrayNum.map((num, i) => {
      console.log(num, i);
      alert(num);
      return num * 2;
  })
  /**
   * The value of i represents the index of the current element being processed in the array. For the given array:
   * It will take values 0, 1, 2, 3, 4, 5 as the map iterates through the array
   * The i parameter is the second parameter of the callback function in the map method
   */
  
  
  //4
  // 4-1
  const array = [[1],[2],[3],[[[4]]],[[[5]]]];
  const modified = array.map(item => item.flat(2));
  
  //bonus
  const oneLine = [[1],[2],[3],[[[4]]],[[[5]]]].map(item => Array.isArray(item[0]) ? item[0][0] || item[0] : item[0]);
  
  // 4-2
  const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
  const joinedGreeting = greeting.map(item => item.join(" "));
  
  // 4-3
  const greetingString = greeting.map(item => item.join(" ")).join(" ");
  
  // 4-4
  const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
  const freed = trapped.flat(Infinity);
  