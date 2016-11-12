import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListingsList from '../components/listings_list';
import GoogleMaps from '../components/google_maps';
import CitySearch from './city-search';
import selectListing from '../actions/select_listing';


class ListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedFilter: 0,
      bathFilter: 0,
      bedFilterHeader: 'Beds',
      bathFilterHeader: 'Baths',
      selectListing
    };

    this.updateBedFilter = this.updateBedFilter.bind(this);
    this.updateBathFilter = this.updateBathFilter.bind(this);
  }

  updateBedFilter(numBeds) {
    this.setState({
      bedFilter: numBeds,
      bedFilterHeader: numBeds ? `${numBeds}+` : 'Beds'
    });
  }

  updateBathFilter(numBaths) {
    this.setState({
      bathFilter: numBaths,
      bathFilterHeader: numBaths ? `${numBaths}+` : 'Baths'
    });
  }

  render() {
    if (this.props.listingData.length === 0) {
      return (
        <div className="listingsPage">
          <div>Waiting for data...</div>
        </div>
      );
    }

    const filtered = this.props.listingData.filter((listing) => {
      return listing.beds >= this.state.bedFilter && listing.baths >= this.state.bathFilter;
    });

    return (
      <div className="listingsPage">
        <div className="listings_list">
          {// include citySearch here
          }
          <ListingsList
            listings={filtered}
            city={this.props.listingData[0].city.name}
            state={this.props.listingData[0].city.state}
            updateBedFilter={this.updateBedFilter}
            updateBathFilter={this.updateBathFilter}
            bedFilterHeader={this.state.bedFilterHeader}
            bathFilterHeader={this.state.bathFilterHeader}
            selectListing={this.props.selectListing}
          />
        </div>
        <div className="listings_map">
          <GoogleMaps
            listings={filtered}
            focalLat={this.props.listingData[0].city.lat}
            focalLon={this.props.listingData[0].city.lon}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ listingData }) {
  return {
    listingData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsPage);
