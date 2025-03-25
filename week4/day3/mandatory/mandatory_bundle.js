//1
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
// Output: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)



//2
function displayStudentInfo(objUser){
    // destructuring
    const {first, last} = objUser;
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));
// Output: Your full name is Elie Schoppik



//3
const users = { user1: 18273, user2: 92833, user3: 90315 };

const usersArray = Object.entries(users);
console.log(usersArray);
// Output: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]

const modifiedUsersArray = usersArray.map(([user, id]) => [user, id * 2]);
console.log(modifiedUsersArray);
// Output: [ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]



//4
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);
// Output: object



//5
class Dog {
  constructor(name) {
    this.name = name;
  }
}
class Labrador extends Dog {
  constructor(name, size) {
    this.size = size;
  }
};
//Missing super() call - will cause an error

//correct implementation:
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
}



//6
console.log([2] === [2]); // False
console.log({} === {}); // False


const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5 }; 

object1.number = 4;
console.log(object2.number); //object2 references object1
console.log(object3.number); //object3 references object1
console.log(object4.number); //object4 is a different object


class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(sound) {
    return `${sound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");
console.log(farmerCow.sound("Moooo"));