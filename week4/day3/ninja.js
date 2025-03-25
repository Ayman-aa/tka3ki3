class Bird {
    constructor() {
      console.log("I'm a bird. 🦢");
    }
  }
  
  class Flamingo extends Bird {
    constructor() {
      console.log("I'm pink. 🌸");
      super();
    }
  }
  
  const pet = new Flamingo();
  /**
   *  Flamingo class extends Bird class and in the constructor of Flamingo class,
   *  it calls super() method which calls the constructor of the parent class Bird.
   *  So, the output will be:
   *  I'm pink. 🌸
   *  I'm a bird. 🦢
   */