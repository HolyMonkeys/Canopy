import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMaps from '../components/google_maps';


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
      <div className='listing_page'>
        <div className='listingMap'>
          <GoogleMaps listings={[this.props.activeListing]} />
        </div>
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
