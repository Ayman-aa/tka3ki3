import React, { Component } from 'react';

class Child extends Component {
  componentWillUnmount() {
    alert("Component is about to be unmounted!");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

class LifecycleUnmounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  deleteHeader = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {this.state.show ? <Child /> : null}
        <button onClick={this.deleteHeader}>Delete Header</button>
      </div>
    );
  }
}

export default LifecycleUnmounting;