const people = ["Greg", "Mary", "Devon", "James"];

people.shift()

people[2] = "Jason"

people.push("Ayman")

console.log(people.indexOf('Mary'))

let str1 = people.slice(1,3)

console.log(people.indexOf("Foo")) //yes it does

let last = people[people.length - 1]

for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
}

for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
    if (people[i] === "Devon") {
        break;
    }
}