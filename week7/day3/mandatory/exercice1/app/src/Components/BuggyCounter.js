import React, { Component } from 'react';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }
    return (
      <div onClick={this.handleClick}>
        {this.state.counter}
      </div>
    );
  }
}

export default BuggyCounter;