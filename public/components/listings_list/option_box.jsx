import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, SplitButton } from 'react-bootstrap';

import CitySearch from '../../containers/city-search';

const OptionBox = (props) => {
  return (
    <div className="listingOptions">
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <div id="listings-filter">
        <Nav>
          <span className="city-search-listings">
            <CitySearch />
          </span>
          <NavItem
            bsStyle="primary"
            onClick={props.compareListings}
            disabled={false} >
            Compare Listings
          </NavItem>
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

          <NavDropdown eventKey={2} title="Rent" id="basic-nav-dropdown">
            <SplitButton eventKey={2.1} title={`Min: ${props.minRentFilterHeader}`} id="basic-nav-dropdown" onSelect={props.updateMinRentFilter}>
              <MenuItem eventKey={0}>No Min</MenuItem>
              <MenuItem eventKey={500}>$500</MenuItem>
              <MenuItem eventKey={1000}>$1000</MenuItem>
              <MenuItem eventKey={1500}>$1500</MenuItem>
              <MenuItem eventKey={2000}>$2000</MenuItem>
              <MenuItem eventKey={2500}>$2500</MenuItem>
              <MenuItem eventKey={3000}>$3000</MenuItem>
              <MenuItem eventKey={3500}>$3500</MenuItem>
            </SplitButton>
            <SplitButton eventKey={2.2} title={`Max: ${props.maxRentFilterHeader}`} id="basic-nav-dropdown" onSelect={props.updateMaxRentFilter}>
              <MenuItem eventKey={100000}>No Max</MenuItem>
              <MenuItem eventKey={500}>$500</MenuItem>
              <MenuItem eventKey={1000}>$1000</MenuItem>
              <MenuItem eventKey={1500}>$1500</MenuItem>
              <MenuItem eventKey={2000}>$2000</MenuItem>
              <MenuItem eventKey={2500}>$2500</MenuItem>
              <MenuItem eventKey={3000}>$3000</MenuItem>
              <MenuItem eventKey={3500}>$3500</MenuItem>
            </SplitButton>
          </NavDropdown>

          <NavDropdown eventKey={3} title="Sort by" id="basic-nav-dropdown" onSelect={props.updateSorter}>
            <MenuItem eventKey={'beds'}>Beds</MenuItem>
            <MenuItem eventKey={'baths'}>Baths</MenuItem>
            <MenuItem eventKey={'rent'}>Rent</MenuItem>
            <MenuItem eventKey={'sqFoot'}>Size</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    </Navbar>
    </div>
  );
};

export default OptionBox;
