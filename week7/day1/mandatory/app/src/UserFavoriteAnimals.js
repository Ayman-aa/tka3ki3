import React, { Component } from 'react';

class UserFavoriteAnimals extends Component {
  render() {
    return (
      <div>
        <h4>Favorite Animals:</h4>
        <ul>
          {this.props.favAnimals.map((animal, index) => (
            <li key={index}>{animal}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserFavoriteAnimals;