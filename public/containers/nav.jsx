import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  render() {
    return (
        <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">renter city</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">SignIn</NavItem>
              <NavItem eventKey={2} href="#">SignUp</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
          {this.props.children}
        </div>

    );
  }
}

export default NavBar;

