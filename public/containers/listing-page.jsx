import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMaps from '../components/google_maps';
import ListingDetail from '../components/listing/listing_details';

class ListingPage extends Component {
  componentDidUpdate() {
    this.render();
  }

  render() {
    if (!this.props.activeListing) {
      return <div>Waiting for active listing..</div>;
    }

    return (
      <div className="listing-page">
        <div className="listing-map">
          <GoogleMaps listings={[this.props.activeListing]} />
        </div>
        <ListingDetail
          activeListing={this.props.activeListing}
          activeUser={this.props.activeUser}
        />
      </div>
    );
  }
}

function mapStateToProps({ activeListing, activeUser }) {
  return {
    activeListing,
    activeUser

  };
}

export default connect(mapStateToProps)(ListingPage);
