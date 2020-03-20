import React, { Component } from 'react';

class UserProfileInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="user-info">
        <table>
          <tr>
            <td><h3>Name: </h3></td>
            <td><h3>{this.props.activeUser.name}</h3></td>
          </tr>
          <tr>
            <td><h3>City: </h3></td>
            <td><h3>{this.props.activeUser.city.name}, {this.props.activeUser.city.state}</h3></td>
          </tr>
          <tr>
            <td><h3>e-mail: </h3></td>
            <td><h3>{this.props.activeUser.email}</h3></td>
          </tr>
          <tr>
            <td><h3>Phone number: </h3></td>
            <td><h3>({String(this.props.activeUser.phone).substring(0, 3)}) {String(this.props.activeUser.phone).substring(3, 6)}-{String(this.props.activeUser.phone).substring(6, 12)}</h3></td>
          </tr>
        </table>
      </div>
    );
  }
}


export default UserProfileInfo;
