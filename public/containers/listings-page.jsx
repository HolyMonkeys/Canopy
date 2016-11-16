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
      minRentFilter: 0,
      maxRentFilter: 100000,
      bedFilterHeader: 'Beds',
      bathFilterHeader: 'Baths',
      minRentFilterHeader: '',
      maxRentFilterHeader: '',
      sorter: 'id'
    };

    this.updateBedFilter = this.updateBedFilter.bind(this);
    this.updateBathFilter = this.updateBathFilter.bind(this);
    this.updateMinRentFilter = this.updateMinRentFilter.bind(this);
    this.updateMaxRentFilter = this.updateMaxRentFilter.bind(this);
    this.updateSorter = this.updateSorter.bind(this);
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

  updateMinRentFilter(minRent) {
    this.setState({
      minRentFilter: minRent,
      minRentFilterHeader: minRent ? `$${minRent}` : ''
    });
  }

  updateMaxRentFilter(maxRent) {
    this.setState({
      maxRentFilter: maxRent,
      maxRentFilterHeader: maxRent ? `$${maxRent}` : ''
    });
  }

  updateSorter(sorter) {
    this.setState({
      sorter
    });
  }

  render() {
    const filtered = this.props.listings.filter((listing) => {
      return listing.beds >= this.state.bedFilter &&
             listing.baths >= this.state.bathFilter &&
             listing.rent >= this.state.minRentFilter &&
             listing.rent <= this.state.maxRentFilter;
    }).sort((a, b) => {
      return a[this.state.sorter] - b[this.state.sorter];
    });

    return (
      <div className="listingsPage">
        <div>
          <CitySearch />
        </div>
        <div className="listings_list">
          <ListingsList
            listings={filtered}
            city={this.props.activeCity.name}
            state={this.props.activeCity.state}
            updateBedFilter={this.updateBedFilter}
            updateBathFilter={this.updateBathFilter}
            updateMinRentFilter={this.updateMinRentFilter}
            updateMaxRentFilter={this.updateMaxRentFilter}
            updateSorter={this.updateSorter}
            bedFilterHeader={this.state.bedFilterHeader}
            bathFilterHeader={this.state.bathFilterHeader}
            minRentFilterHeader={this.state.minRentFilterHeader}
            maxRentFilterHeader={this.state.maxRentFilterHeader}
            selectListing={this.props.selectListing}
          />
        </div>
        <div className="listings_map">
          <GoogleMaps
            listings={filtered}
            focalLat={this.props.activeCity.lat}
            focalLon={this.props.activeCity.lon}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeCity, listings }) {
  return {
    activeCity,
    listings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsPage);
