let landscape = function() {

    let result = "";
   
    let flat = function(x) {
      for(let count = 0; count<x; count++){
        result = result + "_";
      }
    }
   
    let mountain = function(x) {
      result = result + "/"
      for(let counter = 0; counter<x; counter++){
        result = result + "'"
      }
      result = result + "\\"
    }
   
    flat(4);
    mountain(4);
    flat(4)
   
    return result;
   }
   
   landscape()
  
   /**
    * the output of the code could be : "____/''''\\____"
    */
  
   const landscape = () => {
    let result = "";
   
    const flat = (x) => {
      for(let count = 0; count < x; count++) {
        result = result + "_";
      }
    };
   
    const mountain = (x) => {
      result = result + "/";
      for(let counter = 0; counter < x; counter++) {
        result = result + "'";
      }
      result = result + "\\";
    };
   
    flat(4);
    mountain(4);
    flat(4);
   
    return result;
  };