const person1 = {
    FullName: "John Doe",
    Mass: 78,
    Height: 1.75,
    calculateBMI: function() {
        return this.Mass / (this.Height * this.Height);
    }
};

const person2 = {
    FullName: "Jane Smith",
    Mass: 65,
    Height: 1.68,
    calculateBMI: function() {
        return this.Mass / (this.Height * this.Height);
    }
};

function compareBMI(personA, personB) {
    const bmiA = personA.calculateBMI();
    const bmiB = personB.calculateBMI();

    if (bmiA > bmiB) {
        console.log(`${personA.FullName} has a larger BMI of ${bmiA.toFixed(2)}.`);
    } else if (bmiB > bmiA) {
        console.log(`${personB.FullName} has a larger BMI of ${bmiB.toFixed(2)}.`);
    } else {
        console.log("Both have the same BMI.");
    }
}

compareBMI(person1, person2);