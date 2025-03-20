function isOmnipresent(arr, val) {
    return arr.every(subArray => subArray.includes(val));
}