const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
    {name: "Liam", course: "Computer Science", isPassed: false}, 
    {name: "Jenner", course: "Information Technology", isPassed: true}, 
    {name: "Marco", course: "Robotics", isPassed: true}, 
    {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
    {name: "Jamie", course: "Big Data", isPassed: false}];
  
  const passedStudents = students.filter(student => student.isPassed);
  
  const congrats = () => {
    passedStudents.forEach(student => {
      console.log(`Congratulations ${student.name}! You have passed the ${student.course} course.`);
    });
  };
  congrats()