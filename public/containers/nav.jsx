import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import request from 'axios';

import selectUser from '../actions/select_user';
import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.goToExplore = this.goToExplore.bind(this);
    this.goToPostListing = this.goToPostListing.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  goHome() {
    browserHistory.push('/');
  }

  goToExplore() {
    if (!this.props.activeCity) {
      request.get('/api/cities/San Francisco, CA')
      .then((city) => {
        this.props.selectCity(city.data);
        return request.get(`/api/listings/${city.data.id}`);
      })
      .then((listings) => {
        this.props.updateListings(listings.data)
        browserHistory.push('/content/listings');
      })
      .catch((err) => {
        console.log('Error going to explore: ', err);
      });
    } else {
      browserHistory.push('/content/listings');
    }
  }

  goToPostListing() {
    if (window.localStorage.getItem('canopy') && this.props.activeUser.userType > 0) {
      browserHistory.push('/content/addListing');
    } else {
      browserHistory.push('/content/signin');
    }
  }

  goToProfile() {
    browserHistory.push('/content/profile/1');
  }

  logOut() {
    this.props.selectUser([]);
    window.localStorage.removeItem('canopy');
    browserHistory.push('/');
  }

  goToSignUp() {
    browserHistory.push('/content/signup');
  }

  goToSignIn() {
    browserHistory.push('/content/signin');
  }

  render() {
    return (
      <div className="navBar-container navBar">
        <Navbar collapseOnSelect>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="links" pullLeft>
              <NavItem eventKey={0} onClick={this.goHome} className="Canopy"><strong>canopy</strong></NavItem>
              <NavItem eventKey={1} onClick={this.goToExplore}>FIND A RENTAL</NavItem>
              <NavItem eventKey={2} onClick={this.goToPostListing}>POST A LISTING</NavItem>
            </Nav>
            <Nav className="links" pullRight>
              {!!Object.keys(this.props.activeUser).length && <NavItem eventKey={3} onClick={this.goToProfile}>Profile</NavItem>}
              {!Object.keys(this.props.activeUser).length && <NavItem eventKey={4} onClick={this.goToSignIn}>Sign In</NavItem>}
              {!Object.keys(this.props.activeUser).length && <NavItem eventKey={5} onClick={this.goToSignUp}>Register</NavItem>}
              {!!Object.keys(this.props.activeUser).length && <NavItem eventKey={6} onClick={this.logOut}>Log Out</NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}


function mapStateToProps({ activeUser, activeCity }) {
  return {
    activeUser,
    activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser, selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
