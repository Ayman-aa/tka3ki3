import React, { Component } from 'react';

class ColorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red"
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 5000);
  }

  shouldComponentUpdate() {
    return true; 
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    document.getElementById("div1").innerHTML =
      "Before the update, the favorite color was " + prevState.favoriteColor;
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
    document.getElementById("div2").innerHTML =
      "The updated favorite color is " + this.state.favoriteColor;
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeColor}>Change color to blue</button>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

export default ColorComponent;