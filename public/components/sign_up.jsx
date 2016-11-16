import React, { Component } from 'react';
import request from 'axios';
import browserHistory from 'react-router';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  signUp() {
    request.post('/api/signup', this.state)
    .then((res) => {
      console.log('SIGNUP RES: ', res);
      window.localStorage.setItem('canopy', res.data.token);
      browserHistory.push('/content/profile');
    })
    .catch((err) => {
      console.log('Error signing up: ', err);
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.signUp} action="javascript:void(0)">
          <input type="text" onChange={this.onUsernameChange} value={this.state.username}>Username</input>
          <input type="text" onChange={this.onPasswordChange} value={this.state.password}>Password</input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default SignInPage;
