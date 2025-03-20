function calculateAverage(gradesList) {
    if (gradesList.length === 0)
        return 0;

    let sum = 0;

    for (let i = 0; i < gradesList.length; i++)
        sum += gradesList[i];
    
    return sum / gradesList.length;
}

function findAvg(gradesList) {
    const average = calculateAverage(gradesList);

    console.log(`The average grade is: ${average}`);
    
    if (average >= 65) {
        console.log("Congratulations! You passed!");
    } else {
        console.log("You failed. You must repeat the course.");
    }
}

const testGrades1 = [80, 90, 75, 65, 70];
const testGrades2 = [55, 60, 65, 50, 62]; 

console.log("Test Case 1:");
findAvg(testGrades1);

console.log("\nTest Case 2:");
findAvg(testGrades2);