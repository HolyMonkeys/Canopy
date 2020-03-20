import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

// TODO(victor): try to change the form to editable text for user profile
class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      homeBase: '',
      userType: 0,
      showAlert: false
    };
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
  }

  onHomeBaseChange(event) {
    this.setState({ homeBase: event.target.value });
  }

  onPhoneNumChange(event) {
    this.setState({ phone: event.target.value });
  }

  componentDidMount() {
    const curUserInfo = {};
    Object.assign(curUserInfo, this.props.activeUser);
    curUserInfo.homeBase = `${this.props.activeUser.city.name}, ${this.props.activeUser.city.state}`;
    delete curUserInfo.password;
    this.setState(curUserInfo);
  }

  render() {
    return (
      <div className="user-info-edit">
        <form onSubmit={() => { this.props.submitChange(this.state); }} action="javascript:void(0)">
          <table>
            <tr>
              <td><h3>Name: </h3></td>
              <td><h3><input type="text" onChange={this.onNameChange} value={this.state.name} required /></h3></td>
            </tr>
            <tr>
              <td><h3>User Type: </h3></td>
              <td><h3><select name="userType" onChange={this.onUserTypeChange} >
                <option />
                <option value="renter">Renter</option>
                <option value="host">Host</option>
                <option value="other">Other</option>
              </select></h3></td>
            </tr>
            <tr>
              <td><h3>Home City: </h3></td>
              <td><h3><input type="text" onChange={this.onHomeBaseChange} value={this.state.homeBase} required /></h3></td>
            </tr>
            <tr>
              <td><h3>Phone number: </h3></td>
              <td><h3><input type="text" onChange={this.onPhoneNumChange} value={this.state.phone} required /></h3></td>
            </tr>
            <tr>
              <td><h3><input type="submit" /></h3></td>
            </tr>
          </table>
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
