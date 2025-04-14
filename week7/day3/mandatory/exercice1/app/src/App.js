import React from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import BuggyCounter from './BuggyCounter';

function App() {
  return (
    <div className="App">
      <h1>Error Boundary Exercise</h1>
      
      <div className="simulation">
        <h2>Simulation 1: Two counters with one error boundary</h2>
        <p>If one crashes, the error boundary will replace both</p>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
      </div>

      <div className="simulation">
        <h2>Simulation 2: Two counters with separate error boundaries</h2>
        <p>If one crashes, the other is not affected</p>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </div>

      <div className="simulation">
        <h2>Simulation 3: Counter with no error boundary</h2>
        <p>When it crashes, it will crash the entire app</p>
        <BuggyCounter />
      </div>
    </div>
  );
}

export default App;