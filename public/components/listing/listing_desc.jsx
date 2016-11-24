import React, { Component } from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import request from 'axios';

import ListingScores from './listing_scores';

// activeListing, activeUser
class ListingDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: 'heart-empty',
      applySuccess: false,
      applyFail: false,
      noUser: false
    };
    this.applyToListing = this.applyToListing.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  applyToListing() {
    if (this.props.activeUser.length === 0) {
      this.setState({ noUser : true });
      return;
    }
    request.post('/api/applyToListing', {
      renterId: this.props.activeUser.id,
      listingId: this.props.activeListing.id
    })
    .then(() => {
      this.setState({ applySuccess: true });
    })
    .catch((err) => {
      this.setState({ applyFail: true });
    });
  }

  addToFavorites(listing_id) {
    if (this.props.activeUser.length === 0) {
      this.setState({ noUser : true });
    }
    return request.post('/api/addfavorite', {
      listing_id,
      renter_id: this.props.activeUser.id
    })
    .then(() => {
      this.setState({ heart: 'heart' });
    })
    .catch((err) => {
      console.log('Error favoriting listing', err);
    });
  }

  closeModal() {
    this.setState({ applyFail: false, applySuccess: false, noUser: false });
  }

  render() {
    return (
      <div className="listingInfo">
        <h2>{this.props.activeListing.street}</h2>
        <h3>{this.props.activeListing.city.name}, {this.props.activeListing.city.state} {this.props.activeListing.zip}</h3><br />
        <div>
          <div className="details">
            <h4> Unit: {this.props.activeListing.unit} </h4>
            <h4> Beds: {this.props.activeListing.beds}</h4>
            <h4> Baths: {this.props.activeListing.baths}</h4>
          </div>
          <div className="details">
            <h4>Rent: ${this.props.activeListing.rent}</h4>
            <h4>SqFoot: {this.props.activeListing.sqFoot}</h4>
            <h4>Available: {this.props.activeListing.availableDate.slice(0, 10)}</h4>
          </div>
          <div className="listingScores">
            <ListingScores activeListing={this.props.activeListing} />
          </div>
          <Button
            className="favorite"
            bsSize="small"
            bsStyle="info"
            onClick={() => {
              this.addToFavorites(this.props.activeListing.id);
            }}
          >
            <Glyphicon glyph={this.state.heart} />
          </Button>

          {(this.props.activeUser && this.props.activeUser.userType !== 1) &&
            <button onClick={this.applyToListing}> Apply </button>
          }
        </div>
        <Modal show={this.state.applySuccess} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Application Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Your application has Been Successfully Submitted</h4>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.applyFail} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Application Failure!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please fill out an application before applying!</h4>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.noUser} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>You must sign in to apply to a listing</h4>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default ListingDesc;
