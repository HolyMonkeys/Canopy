import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };

    this.goToExplore = this.goToExplore.bind(this);
  }

  goHome(){
    browserHistory.push('/');
  }

  goToExplore() {
    browserHistory.push('/content/addListing');
  }

  render() {
    return (
      <div className='navBar'>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header className='renterCity'>
            <Navbar.Brand>
              <a onClick={this.goHome}>canopy</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='links' pullRight>
              <NavItem eventKey={1} href="#">SignIn</NavItem>
              <NavItem eventKey={2} href="#">SignUp</NavItem>
              <NavItem eventKey={3} onClick={this.goToExplore}>Explore</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default NavBar;
