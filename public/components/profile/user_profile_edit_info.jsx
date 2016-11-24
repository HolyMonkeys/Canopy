import React, { Component } from 'react';
import request from 'axios';
import { browserHistory } from 'react-router';
import { Alert } from 'react-bootstrap';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      homeBase: '',
      userType: 0,
      showAlert: false
    };
    console.log(this.state);
    this.onNameChange = this.onNameChange.bind(this);
    this.onUserTypeChange = this.onUserTypeChange.bind(this);
    this.onHomeBaseChange = this.onHomeBaseChange.bind(this);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onUserTypeChange(event) {
      if (event.target.value === 'renter') {
      this.setState({ userType: 0 });
    } else if (event.target.value === 'host') {
      this.setState({ userType: 1 });
    } else {
      this.setState({ userType: 2 });
    }
    console.log(this.state);
  }

  onHomeBaseChange(event) {
    this.setState({ homeBase: event.target.value });
  }

  componentDidMount() {
    this.setState(this.props.activeUser);
  }

  render() {
    return (
      <div>
        <form onSubmit={() => { this.props.submitChange(this.state) }} action="javascript:void(0)">
          <p>
            Name:
            <input type="text" onChange={this.onNameChange} value={this.state.name} required />
          </p>
          <p>
            User Type:
             <select name="userType" onChange={this.onUserTypeChange} >
                <option> </option>
                <option value="renter">Renter</option>
                <option value="host">host</option>
                <option value="other">Other</option>
              </select>
          </p>
          <p>
            Home City:
            <input type="text" onChange={this.onHomeBaseChange} value={this.state.homeBase} required />
          </p>
          <input type="submit" />
        </form>
        {this.state.showAlert &&
          <Alert bsStyle="warning">
             User already exists with that email address.
          </Alert>
        }
      </div>
    );
  }
}

export default ProfileEdit;
