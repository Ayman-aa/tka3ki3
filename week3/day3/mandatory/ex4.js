function hotelCost(numberOfNights) {
    const costPerNight = 140;
    return numberOfNights * costPerNight;
}

function planeRideCost(destination) {
    let cost;

    switch (destination.toLowerCase()) {
        case "london":
            cost = 183;
            break;
        case "paris":
            cost = 220;
            break;
        default:
            cost = 300;
            break;
    }

    return cost;
}

function rentalCarCost(numberOfDays) {
    const costPerDay = 40;
    let totalCost = numberOfDays * costPerDay;
    if (numberOfDays > 10) {
        totalCost *= 0.95; 
    }
    return totalCost;
}

function totalVacationCost() {
    let numberOfNights, destination, numberOfDays;

    while (true) {
        numberOfNights = prompt("How many nights would you like to stay in the hotel?");
        if (numberOfNights && !isNaN(numberOfNights)) {
            numberOfNights = Number(numberOfNights);
            break;
        } else {
            alert("Please enter a valid number.");
        }
    }

    while (true) {
        destination = prompt("What is your destination?");
        if (destination) {
            break;
        } else {
            alert("Please enter a valid destination.");
        }
    }

    while (true) {
        numberOfDays = prompt("How many days would you like to rent the car?");
        if (numberOfDays && !isNaN(numberOfDays)) {
            numberOfDays = Number(numberOfDays);
            break;
        } else {
            alert("Please enter a valid number.");
        }
    }

    const carCost = rentalCarCost(numberOfDays);
    const hotelCostValue = hotelCost(numberOfNights);
    const planeCost = planeRideCost(destination);

    const totalCost = carCost + hotelCostValue + planeCost;

    console.log(`The car cost: $${carCost}, the hotel cost: $${hotelCostValue}, the plane tickets cost: $${planeCost}.`);
    console.log(`Total vacation cost: $${totalCost}.`);

    return totalCost;
}

totalVacationCost();
