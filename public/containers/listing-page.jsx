import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingDetail from '../components/listing_details';

class ListingPage extends Component {

  componentDidUpdate() {
    this.render();
  }

  render() {
    if (!this.props.activeListing || !this.props.listingData) {
      return <div>Waiting for active listing..</div>;
    }

    return (
      <div>
        Google Map
        <ListingDetail activeListing={this.props.activeListing} listingData={this.props.listingData} />
      </div>
    );
  }
}

function mapStateToProps({ activeListing, listingData }) {
  return {
    activeListing,
    listingData
  };
}

export default connect(mapStateToProps)(ListingPage);
