function kiloToGrams(weightInKg) {
    return weightInKg * 1000;
}
const convertKgToGrams = function(weightInKg) {
    return weightInKg * 1000;
};

// Function declarations are hoisted entirely while function expressions are not, so declarations can be called before they're defined
const kgToGr = weightInKg => weightInKg * 1000;
