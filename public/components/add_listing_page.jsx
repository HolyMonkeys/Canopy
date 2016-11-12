import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingForm from '../containers/add-listing-form';

export default class AddListingPage extends Component {

  render() {
    return (
      <div>
        <ListingForm />
      </div>

    );
  }
}
