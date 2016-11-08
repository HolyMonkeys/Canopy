import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  render() {
    return (
      <div>
        <div>
          <button>Explore</button>
          <button>Sign In</button>
          <button>Sign Up</button>
          <button>Log Out</button>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect()(Nav);
