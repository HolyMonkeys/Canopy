import React, { Component } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Alert, Glyphicon } from 'react-bootstrap';

import selectUser from '../actions/select_user';
import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordflag: false

    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value,passwordflag: false});
  }

  signIn() {
    request.post('/api/signin', this.state)
    .then((res) => {
      window.localStorage.setItem('canopy', res.data.token);
      console.log('USER ', res.data.user)
      this.props.selectUser(res.data.user);
      if (!this.props.activeCity) {
        this.props.selectCity(res.data.user.city);
        return request.get(`/api/listings/${res.data.user.city.id}`)
        .then((listings) => {
          this.props.updateListings(listings.data);
          browserHistory.push('/content/listings');
        });
      }
      return browserHistory.push('/content/listings');
    })
    .catch((err) => {
      console.log('Error signing in: ', err);
      this.setState({ passwordflag: true, password: '', email: '' });
    });
  }

  render() {
    return (
      <div className="signIn">
        <h1>Sign In  <Glyphicon glyph="sunglasses" /></h1>
        <div className="signInForm">
          <form onSubmit={this.signIn}  action="javascript:void(0)">  
            <input type="text" placeholder="email" onChange={this.onEmailChange} value={this.state.email} />
            <br />
            <input type="password" placeholder="password" onChange={this.onPasswordChange} value={this.state.password} />
            <br />
            <input type="submit" />
          </form>
          {this.state.passwordflag &&
            <Alert bsStyle="warning">
               your email or password is wrong bruh.
            </Alert>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeCity }) {
  return {
    activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser, selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
