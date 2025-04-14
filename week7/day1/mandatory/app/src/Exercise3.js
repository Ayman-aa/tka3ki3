import React, { Component } from 'react';
import './Exercise.css';

class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/* Part I & II - h1 with styling */}
        <h1 style={style_header}>This is a Header</h1>
        
        {/* Part III - paragraph with CSS class */}
        <p className="para">This is a paragraph styled with external CSS</p>
        
        {/* Additional HTML elements as required in Part I */}
        <a href="https://reactjs.org/">React Documentation Link</a>
        
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <button type="submit">Submit</button>
        </form>
        
        <img src="/api/placeholder/400/200" alt="Placeholder" />
        
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;