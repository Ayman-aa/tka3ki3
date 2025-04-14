import React from 'react';
import UserFavoriteAnimals from './UserFavoriteAnimals';
import Exercise from './Exercise3';
import './App.css';

function App() {
  // Exercise 1
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;

  // Exercise 2
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey']
  };

  return (
    <div className="App">
      <h2>Exercise 1: JSX</h2>
      <div className="exercise-section">
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
      </div>

      <h2>Exercise 2: Object</h2>
      <div className="exercise-section">
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </div>

      <h2>Exercise 3: HTML Tags in React</h2>
      <div className="exercise-section">
        <Exercise />
      </div>
    </div>
  );
}

export default App;