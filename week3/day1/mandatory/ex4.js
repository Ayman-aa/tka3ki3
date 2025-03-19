const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log(building.numberOfFloors); 

console.log(building.numberOfAptByFloor.firstFloor);
console.log(building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1]; 
console.log(secondTenant); 
console.log(building.numberOfRoomsAndRent.dan[0]);

const sarahRent = building.numberOfRoomsAndRent.sarah[1]; 
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];
const sarahAndDavidRent = sarahRent + davidRent; 

if (sarahAndDavidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's rent has been increased to 1200");
}

console.log(building.numberOfRoomsAndRent.dan[1]); 