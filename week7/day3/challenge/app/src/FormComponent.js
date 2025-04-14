import React from 'react';

function FormComponent({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={{ width: '100%', maxWidth: '700px', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={{ width: '100%', maxWidth: '700px', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={{ width: '100%', maxWidth: '700px', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          <label htmlFor="male"> Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
          <label htmlFor="female"> Female</label>
        </div>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <div><strong>Select your destination</strong></div>
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          style={{ width: '240px', padding: '5px' }}
        >
          <option value="">-- Please Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="Australia">Australia</option>
          <option value="Brazil">Brazil</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <div><strong>Dietary restrictions:</strong></div>
        <div>
          <input
            type="checkbox"
            id="nutsFree"
            name="nutsFree"
            checked={formData.nutsFree}
            onChange={handleChange}
          />
          <label htmlFor="nutsFree"> Nuts free</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="lactoseFree"
            name="lactoseFree"
            checked={formData.lactoseFree}
            onChange={handleChange}
          />
          <label htmlFor="lactoseFree"> Lactose free</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="vegan"
            name="vegan"
            checked={formData.vegan}
            onChange={handleChange}
          />
          <label htmlFor="vegan"> Vegan</label>
        </div>
      </div>
      
      <button 
        type="submit" 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: 'white', 
          border: '1px solid gray',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default FormComponent;