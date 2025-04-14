import React, { useState } from 'react';
import Garage from './Garage';

export function Car(props) {
  const [color, setColor] = useState("red");
  
  return (
    <div>
      <h3>This car is {color} {props.model}</h3>
      <Garage size="small" />
    </div>
  );
}

export default Car;