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
  }

  submitChange(user) {
    request.post('/api/updateUser', user)
    .then((userInfo) => {
      console.log('Successfully updated user info', userInfo);
      this.props.selectUser(user);
      this.setState({ profileType: 'info' });
    })
    .catch((err) => {
      console.log('Failed to update user info', err);
    });
  }

  editUserInfo() {
    this.setState({ profileType: 'edit' });
  }

  render() {
    if (!this.props.activeUser || !this.props.activeUser.id) {
      return (
        <div>No user</div>
      );
    }

    return (
      <div className="container-fluid">
        <div className="row">
          {(this.state.profileType === 'info')?
          <UserProfileInfo
          activeUser={this.props.activeUser}
          updateApplicationType={this.props.updateApplicationType}
          editUserInfo={this.editUserInfo}/>:
          <UserProfileEdit
          submitChange={this.submitChange}
          activeUser={this.props.activeUser}
          />
          }
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
