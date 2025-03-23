const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const firstLetters = [];
for (let i = 0; i < names.length; i++) {
    firstLetters.push(names[i][0]);
}

firstLetters.sort();

const secretSocietyName = firstLetters.join('');

console.log(secretSocietyName);