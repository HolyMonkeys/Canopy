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

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  signIn() {
    request.post('/api/signin', this.state)
    .then((res) => {
      window.localStorage.setItem('canopy', res.data.token);
      selectUser(res.data.user);
      browserHistory.push('/');
    })
    .catch((err) => {
      console.log('Error signing in: ', err);
      browserHistory.push('/signin');
    });
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={this.signIn} action="javascript:void(0)">
          <input type="text" onChange={this.onEmailChange} value={this.state.email}>Email</input>
          <input type="text" onChange={this.onPasswordChange} value={this.state.password}>Password</input>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default SignInPage;
