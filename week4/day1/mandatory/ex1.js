// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
  }
  
  // #1.1 - run in the console:
  funcOne()
  // #1.2 What will happen if the variable is declared 
  // with const instead of let ?
  //Answer: The code will not run because the value of a is changed in the if block and const variables cannot be reassigned.
  
  //#2
  let a = 0;
  function funcTwo() {
    a = 5;
  }
  
  function funcThree() {
    alert(`inside the funcThree function ${a}`);
  }
  
  // #2.1 - run in the console:
  funcThree()
  funcTwo()
  funcThree()
  // #2.2 What will happen if the variable is declared 
  // with const instead of let ?
  //Answer: The code will not run because the value of a is changed in the funcTwo function and const variables cannot be reassigned.
  
  //#3
  function funcFour() {
    window.a = "hello";
  }
  
  
  function funcFive() {
    alert(`inside the funcFive function ${a}`);
  }
  
  // #3.1 - run in the console:
  funcFour()
  funcFive()
  
  //#4
  let a = 1;
  function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
  }
  
  
  // #4.1 - run in the console:
  funcSix()
  // #4.2 What will happen if the variable is declared 
  // with const instead of let ?
  //Answer: If both declarations of a (global and inside funcSix) are changed from let to const, there would be no error. This is because the a inside funcSix is a different variable in a different scope from the global a. Both can be constants without conflict since no reassignment is happening to either of them.
  //#5
  let a = 2;
  if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
  }
  alert(`outside of the if block ${a}`);
  
  // #5.1 - run the code in the console
  // #5.2 What will happen if the variable is declared 
  // with const instead of let ?
  //Answer: If both declarations of a are changed from let to const, there would be no error. Similar to question #4.2, the a inside the if block is in a different scope from the outer a. Both can be constants since they're not being reassigned within their respective scopes.
  