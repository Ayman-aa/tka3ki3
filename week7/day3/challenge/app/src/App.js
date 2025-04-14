import React, { useState } from 'react';
import FormComponent from './FormComponent';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    destination: '',
    nutsFree: false,
    lactoseFree: false,
    vegan: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // For checkboxes, use the checked property; otherwise use the value
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    
    // Create URL params from form data
    const params = new URLSearchParams();
    
    for (const [key, value] of Object.entries(formData)) {
      // Only add the parameter if it has a value (or is true for checkboxes)
      if (value || value === 0) {
        params.append(key, value === true ? 'on' : value);
      }
    }
    
    // Change the URL without reloading the page
    window.history.pushState({}, '', `/?${params.toString()}`);
  };

  return (
    <div>
      <div style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
        <h1>Sample form</h1>
      </div>
      
      <div style={{ backgroundColor: '#e0c599', padding: '20px' }}>
        <FormComponent 
          formData={formData} 
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {submitted && (
        <div style={{ backgroundColor: '#1a5e5e', color: 'white', padding: '20px' }}>
          <h2>Entered information:</h2>
          
          <p>Your name: {formData.firstName} {formData.lastName}</p>
          <p>Your age: {formData.age}</p>
          <p>Your gender: {formData.gender}</p>
          <p>Your destination: {formData.destination}</p>
          
          <p>Your dietary restrictions:</p>
          <p>**Nuts free : {formData.nutsFree ? 'Yes' : 'No'}</p>
          <p>**Lactose free : {formData.lactoseFree ? 'Yes' : 'No'}</p>
          <p>**Vegan meal : {formData.vegan ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default App;