//1
const data = [
    {
      name: 'Butters',
      age: 3,
      type: 'dog'
    },
    {
      name: 'Cuty',
      age: 5,
      type: 'rabbit'
    },
    {
      name: 'Lizzy',
      age: 6,
      type: 'dog'
    },
    {
      name: 'Red',
      age: 1,
      type: 'cat'
    },
    {
      name: 'Joey',
      age: 3,
      type: 'dog'
    },
    {
      name: 'Rex',
      age: 10,
      type: 'dog'
    },
  ];
  
  // Using a loop
  let sumWithLoop = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'dog') {
      sumWithLoop += data[i].age * 7;
    }
  }
  // Using reduce method
  const sumWithReduce = data.reduce((total, animal) => {
    if (animal.type === 'dog') {
      return total + (animal.age * 7);
    }
    return total;
  }, 0);
  
  
  //2
  const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
  const cleanedEmail = userEmail3.trim();
  
  
  //3
  const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
  ];
  
  const restructuredUsers = {};
  users.forEach(user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    restructuredUsers[fullName] = user.role;
  });
  
  
  //4
  const letters = ['x', 'y', 'z', 'z'];
  
  // Using for loop
  const letterCountWithLoop = {};
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    if (letterCountWithLoop[letter]) {
      letterCountWithLoop[letter]++;
    } else {
      letterCountWithLoop[letter] = 1;
    }
  }
  // Using reduce method
  const letterCountWithReduce = letters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});