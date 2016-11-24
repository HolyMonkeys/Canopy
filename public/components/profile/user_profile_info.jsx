import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class UserProfileInfo extends Component {
  constructor(props) {
    super(props);

    this.goToSubmitApplication = this.goToSubmitApplication.bind(this);
    this.goToViewApplication = this.goToViewApplication.bind(this);
    this.goToSubmitListing = this.goToSubmitListing.bind(this);
  }

  goToSubmitApplication() {
    this.props.updateApplicationType({ type: 'form', renterId: this.props.activeUser.id });
    browserHistory.push('/content/application');
  }

  goToSubmitListing() {
    browserHistory.push('/content/addListing');
  }

  goToViewApplication() {
    this.props.updateApplicationType({ type: 'view', renterId: this.props.activeUser.id });
    browserHistory.push('/content/application');
  }

  render() {
    return (
      <div className="col-md-6" style={{ borderRight: '1px solid #000' }}>
        <div>
          <br />
          <h1>{this.props.activeUser.name}</h1>
          <h3>{this.props.activeUser.city.name}, {this.props.activeUser.city.state}</h3>
          <h4>{this.props.activeUser.email}</h4>
          <h4>({String(this.props.activeUser.phone).substring(0, 3)}) {String(this.props.activeUser.phone).substring(3, 6)}-{String(this.props.activeUser.phone).substring(6, 12)}</h4>
        </div>
        <div>
          <button onClick={this.props.editUserInfo}>Edit User Profile</button> 
          {(this.props.activeUser.userType % 2 === 0) ?
          <span>
            <button onClick={this.goToSubmitApplication}>Edit Application</button>
            <button onClick={this.goToViewApplication}>View Application</button>
          </span> : null}
          {(this.props.activeUser.userType > 0) ?
          <button onClick={this.goToSubmitListing}>Submit New Listing</button> : null}
        </div>
      </div>
    );
  }
}

export default UserProfileInfo;
