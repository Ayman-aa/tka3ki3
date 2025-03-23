//ex1
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Random Number: ${randomNumber}`);

for (let i = 0; i <= randomNumber; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

//ex2

function capitalize(s) {
    let evenIndexCapitalized = '';
    let oddIndexCapitalized = '';

    for (let i = 0; i < s.length; i++) {
        if (i % 2 === 0) {
            evenIndexCapitalized += s[i].toUpperCase();
            oddIndexCapitalized += s[i];
        } else {
            evenIndexCapitalized += s[i];
            oddIndexCapitalized += s[i].toUpperCase();
        }
    }

    return [evenIndexCapitalized, oddIndexCapitalized];
}

//ex3

function isPalindrome(str) {
    const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    
    const reversedStr = cleanedStr.split('').reverse().join('');
    
    return cleanedStr === reversedStr;
}

//ex4

function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) {
        return null;
    }
    let maxNumber = arrayNumber[0];
    for (let i = 1; i < arrayNumber.length; i++) {
        if (arrayNumber[i] > maxNumber) {
            maxNumber = arrayNumber[i];
        }
    }
    return maxNumber;
}

//ex5

function uniqueElements(arr) {
    return [...new Set(arr)];
}

//ex6

function createCalendar(year, month) {
    let date = new Date(year, month - 1);
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    let daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    daysOfWeek.forEach(day => {
        let th = document.createElement('th');
        th.innerText = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    date.setDate(1);
    let firstDay = (date.getDay() + 6) % 7;
    let currentRow = document.createElement('tr');

    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement('td');
        currentRow.appendChild(emptyCell);
    }

    while (date.getMonth() === month - 1) {
        if (currentRow.children.length === 7) {
            table.appendChild(currentRow);
            currentRow = document.createElement('tr');
        }

        let cell = document.createElement('td');
        cell.innerText = date.getDate();
        currentRow.appendChild(cell);
        date.setDate(date.getDate() + 1);
    }

    if (currentRow.children.length > 0) {
        table.appendChild(currentRow);
    }

    document.body.appendChild(table);
}

createCalendar(2012, 9)