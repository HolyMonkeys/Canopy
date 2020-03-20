import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import request from 'axios';

import UserProfileInfo from '../components/profile/user_profile_info';
import UserProfileListings from '../components/profile/user_profile_listings';
import UserProfileEdit from '../components/profile/user_profile_edit_info';
import selectListing from '../actions/select_listing';
import updateApplicationType from '../actions/update_application_type';
import selectUser from '../actions/select_user';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileType: 'info'
    };
    this.submitChange = this.submitChange.bind(this);
    this.editUserInfo = this.editUserInfo.bind(this);
    this.goToSubmitApplication = this.goToSubmitApplication.bind(this);
    this.goToViewApplication = this.goToViewApplication.bind(this);
    this.goToSubmitListing = this.goToSubmitListing.bind(this);
  }

  submitChange(user) {
    request.post('/api/updateUser', user)
    .then((userInfo) => {
      this.props.selectUser(userInfo.data);
      this.setState({ profileType: 'info' });
    })
    .catch((err) => {
      console.log('Failed to update user info', err);
    });
  }

  editUserInfo() {
    console.log('editUserInfo Button Works');
    this.setState({ profileType: 'edit' });
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
    if (!this.props.activeUser || !this.props.activeUser.id) {
      return (
        <div>No user</div>
      );
    }

    return (
      <div className="user-profile row">
        <div className="user-profile-header col-md-8" >
          {(this.state.profileType === 'info') ?
            <UserProfileInfo
              activeUser={this.props.activeUser}
              updateApplicationType={this.props.updateApplicationType}
              editUserInfo={this.editUserInfo}
            /> :
            <UserProfileEdit
              submitChange={this.submitChange}
              activeUser={this.props.activeUser}
            />
          }
        </div>
        { (this.props.activeUser.userType === 0) &&
        <div className="btn-group-vertical col-md-4">
          <button type="button" className="btn btn-info" onClick={this.editUserInfo}>Edit User Profile</button>
          <button className="btn btn-info" onClick={this.goToSubmitApplication}>Edit Application</button>
          <button className="btn btn-info" onClick={this.goToViewApplication}>View Application</button>
        </div>
        }
        { (this.props.activeUser.userType === 1) &&
        <div className="btn-group-vertical col-md-4">
          <button type="button" className="btn btn-info" onClick={this.editUserInfo}>Edit User Profile</button>
          <button className="btn btn-info" onClick={this.goToSubmitListing}>Submit New Listing</button>
        </div>
        }
        { (this.props.activeUser.userType === 2) &&
        <div className="btn-group-vertical col-md-4">
          <button type="button" className="btn btn-info" onClick={this.editUserInfo}>Edit User Profile</button>
          <button className="btn btn-info" onClick={this.goToSubmitApplication}>Edit Application</button>
          <button className="btn btn-info" onClick={this.goToViewApplication}>View Application</button>
          <button className="btn btn-info" onClick={this.goToSubmitListing}>Submit New Listing</button>
        </div>
        }
        <div>
          <UserProfileListings
            activeUser={this.props.activeUser}
            selectListing={this.props.selectListing}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeUser }) {
  return {
    activeUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, updateApplicationType, selectUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
