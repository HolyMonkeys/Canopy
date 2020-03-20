import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMaps from '../../google_maps';
import ListingDetailEdit from './listing_detail_edit';

class ListingPageEdit extends Component {

  render() {
    if (!this.props.activeListing) {
      return <div>Waiting for active listing..</div>;
    }

    return (
      <div className="listing_page">
        <div className="listingMap">
          <GoogleMaps listings={[this.props.activeListing]} />
        </div>
        <ListingDetailEdit
          activeListing={this.props.activeListing}
        />
      </div>
    );
  }
}

function mapStateToProps({ activeListing }) {
  return {
    activeListing
  };
}

export default connect(mapStateToProps)(ListingPageEdit);
