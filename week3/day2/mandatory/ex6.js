const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
}
  
let sentence = '';
  
for (let key in details) {
    sentence += key + ' ' + details[key] + ' ';
}

sentence = sentence.trim();
console.log(sentence);