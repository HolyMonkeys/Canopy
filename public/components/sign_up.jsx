import React, { Component } from 'react';
import request from 'axios';
import { browserHistory } from 'react-router';

import selectUser from '../actions/select_user';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  signUp() {
    request.post('/api/signup', /*{ state:*/ this.state/*, token: window.localStorage.getItem('canopy') }*/)
    .then((res) => {
      window.localStorage.setItem('canopy', res.data.token);
      selectUser(res.data.user);
      browserHistory.push('/');
    })
    .catch((err) => {
      console.log('Error signing up: ', err);
      browserHistory.push('/signup');
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.signUp} action="javascript:void(0)">
          <input type="text" onChange={this.onUsernameChange} value={this.state.email}>Email</input>
          <input type="text" onChange={this.onPasswordChange} value={this.state.password}>Password</input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default SignInPage;
