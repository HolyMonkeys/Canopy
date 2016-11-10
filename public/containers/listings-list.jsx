import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OptionBox from '../components/option_box';
import selectListing from '../actions/select_listing';


class ListingsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.props.updateListings(this.props.listingData);
  }

  goToListing(listing) {
    window.location = `/#/content/listing/${listing.id}`;
  }

  renderListings() {
    if (!this.props.listingData.listings) {
      return <div>No listings in this local..</div>;
    }

    return this.props.listingData.listings.map((listing) => {
      return (
        <div className="listing" key={listing.id}
          onClick={() => {
            this.props.selectListing(listing);
            this.goToListing(listing);
          }}
        >
          <h3>${listing.rent}</h3>
          <h3>{listing.street}</h3>
          <h3> {this.props.listingData.name}, {this.props.listingData.state} </h3>

          <div className='listingDetails'>
            <h4>beds</h4>
            <h4>{listing.beds} </h4>
          </div>
          <div className='listingDetails'>
            <h4> baths </h4>
            <h4> {listing.baths}</h4>
          </div>
          <div className='listingDetails'>
            <h4> sq. foot </h4>
            <h4> {listing.sqFoot}</h4>
          </div>

        </div>
      );
    });
  }


  render() {
    return (
      <div>
        <OptionBox submitOption={() => { console.log('Submited'); }} />
        {this.renderListings()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListingsList);
