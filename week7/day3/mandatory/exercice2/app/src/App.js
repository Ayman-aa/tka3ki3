import React from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import BuggyCounter from './BuggyCounter';
import ColorComponent from './ColorComponent';

function App() {
  return (
    <div className="App">
      <h1>React Exercises</h1>
      
      <div className="exercise">
        <h2>Exercise 1: Error Boundary Simulation</h2>
        
        <div className="simulation">
          <h3>Simulation 1: Two counters with one error boundary</h3>
          <p>If one crashes, the error boundary will replace both</p>
          <ErrorBoundary>
            <BuggyCounter />
            <BuggyCounter />
          </ErrorBoundary>
        </div>

        <div className="simulation">
          <h3>Simulation 2: Two counters with separate error boundaries</h3>
          <p>If one crashes, the other is not affected</p>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </div>

        <div className="simulation">
          <h3>Simulation 3: Counter with no error boundary</h3>
          <p>When it crashes, it will crash the entire app</p>
          <BuggyCounter />
        </div>
      </div>
      
      <div className="exercise">
        <h2>Exercise 2: Lifecycle</h2>
        <div className="simulation">
          <ColorComponent />
        </div>
      </div>
    </div>
  );
}

export default App;