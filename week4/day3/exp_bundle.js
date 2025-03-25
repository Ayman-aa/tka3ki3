//1
const printFullName = ({first, last}) => {
    return `Your full name is ${first} ${last}`;
  };
  
  
  //2
  keysAndValues({ a: 1, b: 2, c: 3 })
  keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" })
  keysAndValues({ key1: true, key2: false, key3: undefined })
  
  const keysAndValues = (obj) => {
    const keys = Object.keys(obj).sort();
    const values = keys.map(key => obj[key]);
    
    return [keys, values];
  };
  
  
  
  //3
  class Counter {
    constructor() {
      this.count = 0;
    }
  
    increment() {
      this.count++;
    }
  }
  
  const counterOne = new Counter();
  counterOne.increment();
  counterOne.increment();
  
  const counterTwo = counterOne;
  counterTwo.increment();
  
  console.log(counterOne.count);
  /**
   * counterOne is instantiated with count = 0
   * counterOne.increment() is called twice, so counterOne.count becomes 2
   * counterTwo is assigned to the same object reference as counterOne (not a new instance)
   * counterTwo.increment() increments the count of the shared object
   * counterOne.count is logged
   * The output will be 3 because both variables point to the same Counter object in memory, and the count was incremented a total of 3 times.
   */