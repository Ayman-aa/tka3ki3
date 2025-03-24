const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

const colorOrder = () => {
   colors.forEach((color, index) => {
    console.log(`The #${index+1} choice is ${color}`);
   });
   if (colors.find(color => color === "Violet")) {
    return "Yeah";
   }
    return "Nah";
}
console.log(colorOrder());
