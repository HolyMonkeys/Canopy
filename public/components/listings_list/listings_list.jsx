import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import request from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ListingsListItem from './listings_list_item';
import CompareFavoriteButtons from './compareListingButton';

class ListingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    };

    this.goToListing = this.goToListing.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  goToListing(listing) {
    browserHistory.push(`/content/listing/${listing.id}`);
  }

  addToFavorites(listing_id) {
    if (this.props.activeUser.length === 0) {
      return alert('must be logged in to add favorite');
    }
    return request.post('/api/addfavorite', {
      listing_id,
      renter_id: this.props.activeUser.id
    })
    .catch((err) => {
      console.log('Error favoriting listing', err);
    });
  }

  renderListings() {
    if (!this.props.listings || !this.props.listings.length) {
      return <div>No listings in this local..</div>;
    }

    return this.props.listings.map((listing) => {
      const divStyle = {
        backgroundImage: 'url(' + listing.images[0].ref + ')'

      };
      return (
        <div className="listing" style={divStyle}>
          <div className="listingItemContainer"> 
            <ListingsListItem
              key={listing.id}
              listing={listing}
              city={listing.city.name}
              state={listing.city.state}
              selectListing={this.props.selectListing}
              goToListing={this.goToListing}
            />
            <CompareFavoriteButtons
              addToFavorites={this.addToFavorites}
              updateCompareListings={this.props.updateCompareListings}
              activeUser={this.props.activeUser}
              listing={listing}
              listingsCompared={this.props.listingsCompared}
            />
          </div>
          <div className="listingOverlay" />
          <div className="listingPlaceholder" />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="modal-container">
        <Modal
          show={this.props.focusListing}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body>
            <div className="listing">
              {this.props.focusListing && <ListingsListItem
                key={this.props.focusListing.id}
                listing={this.props.focusListing}
                city={this.props.focusListing.city.name}
                state={this.props.focusListing.city.state}
                selectListing={this.props.selectListing}
                goToListing={this.goToListing}
              />}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.props.closeModal(); }}>Close</Button>
            <Button onClick={() => {
                this.goToListing(this.props.focusListing);
                this.props.selectListing(this.props.focusListing); }}
            >
              View Listing
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="listings_list">
          {this.renderListings()}
        </div>
      </div>
    );
  }
}

export default ListingsList;
