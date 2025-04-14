import React, { useState } from 'react';

export function Phone() {
    const [brand, setBrand] = useState("Samsung");
    const [model, setModel] = useState("Galaxy S20");
    const [color, setColor] = useState("black");
    const [year, setYear] = useState(2020);
    
    const changeColor = () => {
      setColor("blue");
    };
    
    return (
      <div className="p-4 mb-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Exercise 3: Phone Component</h2>
        <div className="mb-4">
          <p><strong>Brand:</strong> {brand}</p>
          <p><strong>Model:</strong> {model}</p>
          <p><strong>Color:</strong> {color}</p>
          <p><strong>Year:</strong> {year}</p>
        </div>
        <button 
          onClick={changeColor}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Color
        </button>
      </div>
    );
}

export default Phone;