import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import request from 'axios';

import ApplicationForm from '../components/application/apply_form';
import ApplicationView from '../components/application/apply_display';

import selectCity from '../actions/select_city';

class ApplicationPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.applicationType.type === 'form') {
      return <ApplicationForm activeUser={this.props.activeUser}/>;
    } else if (this.props.applicationType.type === 'view') {
      return <ApplicationView renterId={this.props.applicationType.renterId} />;
    }
    return <div> What have you done?</div>
  }
}

function mapStateToProps({ activeUser, applicationType }) {
  return {
    activeUser,
    applicationType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
