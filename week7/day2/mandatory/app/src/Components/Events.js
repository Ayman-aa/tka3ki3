import React, { useState } from 'react';

export function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [inputText, setInputText] = useState("");
  
  const clickMe = () => {
    alert('I was clicked');
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(inputText);
    }
  };
  
  const toggleButton = () => {
    setIsToggleOn(!isToggleOn);
  };
  
  return (
    <div>
      <h2>Exercise 2: Events</h2>
      
      <div>
        <h3>Part I: Click Event</h3>
        <button onClick={clickMe}>Click Me</button>
      </div>
      
      <div>
        <h3>Part II: KeyDown Event</h3>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
        />
      </div>
      
      <div>
        <h3>Part III: Toggle State</h3>
        <button onClick={toggleButton}>
          {isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}

export default Events;