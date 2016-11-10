import React, { Component } from 'react';
import ListingsList from '../containers/listings-list';
import GoogleMaps from './google_maps';



export default class ListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      currentCityLat: 0,
      currentCityLong: 0
    };
    this.updateListings = this.updateListings.bind(this);
  }

  updateListings(listingData) {
    this.setState({
      listings: listingData.listings,
      currentCityLat: listingData.lat,
      currentCityLong: listingData.lon
    });
  }

  render() {
    if (!this.state.listings || !this.state.listings.length) {
      return (
        <div className='listingsPage'>
          <div>Waiting for data...</div>
          <ListingsList updateListings={this.updateListings} />
        </div>
      )
    }
    console.log(this.state);
    return (
      <div className='listingsPage'>
        <div className='listings_list'>
          <ListingsList updateListings={this.updateListings} />
        </div>
        <div className='listings_map'>
          <GoogleMaps
            listings={this.state.listings}
            position={{
              lat: this.state.currentCityLat,
              long: this.state.currentCityLong
            }} />
        </div>
      
      </div>
    );
  }
}
