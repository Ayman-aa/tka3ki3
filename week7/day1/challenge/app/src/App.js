import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Travel Destinations Carousel</h1>
      
      <div className="carousel-container">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={true}
          interval={3000}
        >
          <div>
            <img src="https://images.unsplash.com/photo-1616394158624-a2ba9cfe2994" alt="Hong Kong" />
            <p className="legend">Hong Kong</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1556629538-fc3eba61504e" alt="Macao" />
            <p className="legend">Macao</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1601823984263-b87b59798b70" alt="Japan" />
            <p className="legend">Japan</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1634400139456-292e44ca5327" alt="Las Vegas" />
            <p className="legend">Las Vegas</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default App;