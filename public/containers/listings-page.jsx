import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import ListingsList from '../components/listings_list/listings_list';
import GoogleMaps from '../components/google_maps';
import OptionBox from '../components/listings_list/option_box';

import selectListing from '../actions/select_listing';
import compareListings from '../actions/compare_listings';

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
      sorter: 'id',
      focusListing: null
    };
    this.listingsCompared = [];
    this.compareButton = 'star';
    this.updateBedFilter = this.updateBedFilter.bind(this);
    this.updateBathFilter = this.updateBathFilter.bind(this);
    this.updateMinRentFilter = this.updateMinRentFilter.bind(this);
    this.updateMaxRentFilter = this.updateMaxRentFilter.bind(this);
    this.updateSorter = this.updateSorter.bind(this);
    this.compareListings = this.compareListings.bind(this);
    this.updateCompareListings = this.updateCompareListings.bind(this);

    this.focusListing = this.focusListing.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  compareListings(event) {
    event.preventDefault();
    console.log("listings to compare", this.listingsCompared);
    if (this.listingsCompared.length !== 2) {
      console.log('Must select two listings to compare');
      return;
    }
    this.props.compareListings(this.listingsCompared);
    browserHistory.push('/content/compareListings');
  }

  updateCompareListings(listing) {
    event.preventDefault();
    const index = this.listingsCompared.indexOf(listing);
    if (index >= 0) {
      this.listingsCompared.splice(index, index + 1);
    } else if (this.listingsCompared.length > 1) {
      alert('too many listings selected');
    } else if (index === -1) {
      this.listingsCompared.push(listing);
    }
  }

  focusListing(listing) {
    this.setState({ focusListing: listing });
  }

  closeModal() {
    this.setState({ focusListing: null });
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
        <OptionBox
          bedFilterHeader={this.state.bedFilterHeader}
          bathFilterHeader={this.state.bathFilterHeader}
          minRentFilterHeader={this.state.minRentFilterHeader}
          maxRentFilterHeader={(this.state.maxRentFilterHeader === '$100000') ? '' : this.state.maxRentFilterHeader}
          updateBedFilter={this.updateBedFilter}
          updateBathFilter={this.updateBathFilter}
          updateMinRentFilter={this.updateMinRentFilter}
          updateMaxRentFilter={this.updateMaxRentFilter}
          updateSorter={this.state.updateSorter}
          compareListings={this.compareListings}
        />
        <div id="listingsList-container">
          <ListingsList
            focusListing={this.state.focusListing}
            closeModal={this.closeModal}
            listings={filtered}
            city={this.props.activeCity.name}
            state={this.props.activeCity.state}
            activeUser={this.props.activeUser}
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
            updateCompareListings={this.updateCompareListings}
            compareButton={this.compareButton}
            listingsCompared={this.listingsCompared}
          />
          <div className="listings_map">
            <GoogleMaps
              listings={filtered}
              focalLat={this.props.activeCity.lat}
              focalLon={this.props.activeCity.lon}
              focusListing={this.focusListing}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeCity, listings, activeUser }) {
  return {
    activeCity,
    listings,
    activeUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, compareListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsPage);
