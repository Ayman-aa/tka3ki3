const family = {
    father: "John",
    mother: "Sarah",
    son: "Michael",
    daughter: "Emma",
    dog: "Max",
    address: "123 Family Street"
  };

console.log("Keys in the family object:");
for (let key in family) {
    console.log(key);
}
  
console.log("\nValues in the family object:");
for (let key in family) {
    console.log(family[key]);
}