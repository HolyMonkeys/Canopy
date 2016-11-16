import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMaps from '../components/google_maps';
import ListingDetail from '../components/listing_details';

class ListingPage extends Component {
  componentDidUpdate() {
    this.render();
  }

  render() {
    if (!this.props.activeListing) {
      return <div>Waiting for active listing..</div>;
    }

    return (
      <div className="listing_page">
        <div className="listingMap">
          <GoogleMaps listings={[this.props.activeListing]} />
        </div>
        <ListingDetail
          activeListing={this.props.activeListing}
          activeCity={this.props.activeCity}
        />
      </div>
    );
  }
}

function mapStateToProps({ activeListing, activeCity }) {
  return {
    activeListing,
    activeCity
  };
}

export default connect(mapStateToProps)(ListingPage);
