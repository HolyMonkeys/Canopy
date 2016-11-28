import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMaps from '../components/google_maps';
import ListingDetail from '../components/listing/listing_details';

class CompareListings extends Component {
  componentDidUpdate() {
    this.render();
  }

  render() {
    return (
      <div>
        <div className="compare-map">
          <GoogleMaps
            listings={this.props.compareListings}
            focalLat={this.props.activeCity.lat}
            focalLon={this.props.activeCity.lon}
          />
        </div>
        <div className='compareLeft'>
          <ListingDetail
            activeListing={this.props.compareListings[0]}
            activeCity={this.props.activeCity}
            images={this.props.compareListings[0].images}
          />
        </div>
        <div className='compareRight'>
          <ListingDetail
            activeListing={this.props.compareListings[1]}
            activeCity={this.props.activeCity}
            images={this.props.compareListings[1].images}
          />
        </div>
      </div>

    );
  }
}

function mapStateToProps({ compareListings, activeCity }) {
  return {
    compareListings,
    activeCity
  };
}

export default connect(mapStateToProps)(CompareListings);
