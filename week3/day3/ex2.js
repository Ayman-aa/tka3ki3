function abbrevName(name) {
    let nameArray = name.split(" ");
    if (nameArray.length > 1) {
        return `${nameArray[0]} ${nameArray[1].charAt(0)}.`;
    }
    return name;
}