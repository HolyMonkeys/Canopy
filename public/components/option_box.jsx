import React from 'react';
import { Nav, Navbar, MenuItem, NavDropdown } from 'react-bootstrap';

const OptionBox = (props) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={0} title={props.bedFilterHeader} id="basic-nav-dropdown" onSelect={props.updateBedFilter}>
            <MenuItem eventKey={0}>any</MenuItem>
            <MenuItem eventKey={2}>2+</MenuItem>
            <MenuItem eventKey={3}>3+</MenuItem>
            <MenuItem eventKey={4}>4+</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={1} title={props.bathFilterHeader} id="basic-nav-dropdown" onSelect={props.updateBathFilter}>
            <MenuItem eventKey={0}>any</MenuItem>
            <MenuItem eventKey={2}>2+</MenuItem>
            <MenuItem eventKey={3}>3+</MenuItem>
            <MenuItem eventKey={4}>4+</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default OptionBox;
