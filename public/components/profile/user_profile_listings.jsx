import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import ListingsListItem from '../listings_list/listings_list_item';
import selectListing from '../../actions/select_listing';
import updateApplicationType from '../../actions/typeToAppView';

class UserProfileListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renterListings: [],
      hostListings: [],
      newApps: [],
      favs: true,
      applied: false,
      allHost: false,
      newAppsFlag: false,
      data: false,
      userType: this.props.activeUser.userType,
      showEmailBox: false,
      emailRenterId: 0,
      emailAddress: '611 Mission Street',
      emailText: `I am getting back on you about your application.
  Contact me through e-mail ${this.props.activeUser.email},
  Best, ${this.props.activeUser.name}`
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.updateEmailText = this.updateEmailText.bind(this);

    this.goToListing = this.goToListing.bind(this);
    this.editListing = this.editListing.bind(this);

    this.renderAllRenterListings = this.renderAllRenterListings.bind(this);
    this.renderFavoriteRenterListings = this.renderFavoriteRenterListings.bind(this);
    this.renderAppliedRenterListings = this.renderAppliedRenterListings.bind(this);

    this.renderAllHostListings = this.renderAllHostListings.bind(this);
    this.renderNewApplications = this.renderNewApplications.bind(this);
  }

  editListing(hostListing) {
    this.props.selectListing(hostListing);
    browserHistory.push(`/content/editListing/${hostListing.id}`);
  }

  goToListing(listing) {
    browserHistory.push(`/content/listing/${listing.id}`);
  }

  updateEmailText(e) {
    this.setState({
      emailText: e.target.value
    });
  }

  showApplication(renterId) {
    const context = this;
    return () => {
      context.props.updateApplicationType({ type: 'view', renterId });
      browserHistory.push('/content/application');
    };
  }

  showEmailBox(renterId, listingAddress) {
    this.setState({
      showEmailBox: true,
      emailRenterId: renterId,
      emailAddress: listingAddress
    });
  }

  sendEmail(event) {
    event.preventDefault();
    console.log('Send Email invoked', this.state.emailText);
    const reqBody = {
      renterId: this.state.emailRenterId,
      mailOptions: {
        subject: `Your application for ${this.state.emailAddress}`
      },
      text: this.state.emailText
    };
    request.post('/api/sendMail', reqBody)
    .end((err, result) => {
      console.log('this works', result);
      this.setState({ showEmailBox: false });
    });
  }

  renderAllRenterListings() {
    return this.state.renterListings.map(({ listing }) => {
      const divStyle = { backgroundImage: 'url(' + listing.images[0].ref + ')' };
      return (
        <div className="listing" style={divStyle}>
          <div className="listingItemContainer">
            <ListingsListItem
              listing={listing}
              city={listing.city.name}
              state={listing.city.state}
              selectListing={this.props.selectListing}
              goToListing={this.goToListing}
            />
          </div>
          <div className="listingOverlay" />
          <div className="listingPlaceholder" />
        </div>
      );
    });
  }

  renderFavoriteRenterListings() {
    return this.state.renterListings.filter((renterListing) => {
      return !renterListing.hasApplied;
    }).map(({ listing }) => {
      const divStyle = { backgroundImage: 'url(' + listing.images[0].ref + ')' };
      return (
        <div className="listing" style={divStyle}>
          <div className="listingItemContainer">
            <ListingsListItem
              listing={listing}
              city={listing.city.name}
              state={listing.city.state}
              selectListing={this.props.selectListing}
              goToListing={this.goToListing}
            />
          </div>
          <div className="listingOverlay" />
          <div className="listingPlaceholder" />
        </div>
      );
    });
  }

  renderAppliedRenterListings() {
    return this.state.renterListings.filter((renterListing) => {
      return renterListing.hasApplied;
    }).map(({ listing }) => {
      const divStyle = { backgroundImage: 'url(' + listing.images[0].ref + ')' };
      return (
        <div className="listing" style={divStyle}>
          <div className="listingItemContainer">
            <ListingsListItem
              listing={listing}
              city={listing.city.name}
              state={listing.city.state}
              selectListing={this.props.selectListing}
              goToListing={this.goToListing}
            />
          </div>
          <div className="listingOverlay" />
          <div className="listingPlaceholder" />
        </div>
      );
    });
  }

  renderAllHostListings() {
    return this.state.hostListings.map((hostListing) => {
      const divStyle = { backgroundImage: 'url(' + hostListing.images[0].ref + ')' };
      return (
        <div className="listing" style={divStyle}>
          <div className="listingItemContainer">
            <ListingsListItem
              listing={hostListing}
              city={hostListing.city.name}
              state={hostListing.city.state}
              selectListing={this.props.selectListing}
              goToListing={this.goToListing}
            />
          </div>
          <div className="listingOverlay" />
          <div className="listingPlaceholder" />
          <Button bsStyle="primary" onClick={() => { this.editListing(hostListing); }}>EDIT</Button>
        </div>
      );
    });
  }

  renderNewApplications() {
    return this.state.newApps.map((newApp) => {
      const divStyle = { backgroundImage: 'url(' + newApp[0].images[0].ref + ')' };
      return (
        <div>
          <div>Credit Checked: {newApp[1].creditChecked ? 'YES' : 'NO'}</div>
          <div>Background Checked: {newApp[1].backgroundChecked ? 'YES' : 'NO'}</div>
          <div>Rental History: {newApp[1].hasRentalHistory ? 'YES' : 'NO'}</div>
          <div className="listing" style={divStyle}>
            <div className="listingItemContainer">
              <ListingsListItem
                listing={newApp[0]}
                city={newApp[0].city.name}
                state={newApp[0].city.state}
                selectListing={this.props.selectListing}
                goToListing={this.goToListing}
              />
            </div>
            <div className="listingOverlay" />
            <div className="listingPlaceholder" />
          </div>
          <button onClick={this.showApplication(newApp[1]['renter_id'])}>View application</button>
          <button onClick={() => { this.showEmailBox(newApp[1]['renter_id'], newApp[0].street); }}>Send e-mail</button>
        </div>
      );
    });
  }

  componentDidMount() {
    // api call to get user host and renter Listings for this.activeUser.id
    const getUserRenterListings = request.get(`/api/userRenterListings/${this.props.activeUser.id}`);
    const getUserHostListings = request.get(`/api/userHostListings/${this.props.activeUser.id}`);

    getUserRenterListings.end((err, res) => {
      this.setState({
        renterListings: res.body,
        data: true
      });
    });

    getUserHostListings.end((err, res) => {
      const newApps = [];
      res.body.forEach((listing) => {
        listing.renterlistings.forEach((rl) => {
          if (!rl.hostSeen) {
            newApps.push([listing, rl]);
          }
        });
      });
      this.setState({
        hostListings: res.body,
        data: true,
        newApps
      });
    });
  }

  render() {
    if (!this.state.data) {
      return (
        <div>Waiting for user listings</div>
      );
    }

    return (
      <div className="profile_listings">
        <div className="usersthings col-md-2">
          <div className="btn-group-vertical" data-toggle="buttons">
            { this.props.activeUser.userType === 2 &&
              <label className="btn btn-info active" onClick={() => { this.setState({ newAppsFlag: false, allHost: false, favs: true, applied: false }); }}>
                <input type="radio" name="options" id="option1" autoComplete="off" checked> RENTER </input>
              </label>
            }
            { this.props.activeUser.userType === 2 &&
              <label className="btn btn-info active" onClick={() => { this.setState({ newAppsFlag: false, allHost: true, applied: false, favs: false }); }}>
                <input type="radio" name="options" id="option1" autoComplete="off" > HOST </input>
              </label>
            }
            { this.state.userType % 2 === 0 &&
              <label className="btn btn-info active" onClick={() => { this.setState({ newAppsFlag: false, allHost: false, favs: true, applied: false }); }}>
                <input type="radio" name="options" id="option1" autoComplete="off" > FAVS </input>
              </label>
            }
            { this.state.userType % 2 === 0 &&
              <label className="btn btn-info active" onClick={() => { this.setState({ newAppsFlag: false, allHost: false, applied: true, favs: false }); }}>
                <input type="radio" name="options" id="option1" autoComplete="off" > APPLIED </input>
              </label>
            }
            { this.state.userType > 0 &&
              <label className="btn btn-info active" onClick={() => { this.setState({ newAppsFlag: false, allHost: true, applied: false, favs: false }); }}>
                <input type="radio" name="options" id="option1" autoComplete="off" > MY LISTINGS </input>
              </label>
            }
            { this.state.userType > 0 &&
              <label className="btn btn-info active" onClick={() => { this.setState({ newAppsFlag: true, allHost: false, applied: false, favs: false }); }}>
                <input type="radio" name="options" id="option1" autoComplete="off" > NEW APPLICATIONS </input>
              </label>
            }
          </div>
        </div>
        <div className="col-md-4">
          <div className="listingsPage">
            <div className="listings_list">
              {this.state.favs && this.renderFavoriteRenterListings()}
              {this.state.applied && this.renderAppliedRenterListings()}
              {this.state.allHost && this.renderAllHostListings()}
              {this.state.newAppsFlag && this.renderNewApplications()}
            </div>
          </div>
          {(!this.state.showEmailBox) ? '' :
          <div className="emailBox">
            <form onSubmit={this.sendEmail} id="emailForm">
              <button type="submit" value="submit" > Submit </button>
            </form>
            <textarea form="emailForm" rows="8" cols="50" name="emailcontent" value={this.state.emailText} onChange={this.updateEmailText} />
          </div>}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, updateApplicationType }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserProfileListings);
