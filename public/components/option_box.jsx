import React from 'react';

import {Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

// const OptionBox = (props) => {
//   return (
//     <div className="option-boxs">
//       <table className="checkbox-grid">
//         <tbody>
//           <tr><td><input type="checkbox" name="text1" value="value1" /></td><td><label htmlFor="text1">Text 1</label></td></tr>
//           <tr><td><input type="checkbox" name="text2" value="value2" /></td><td><label htmlFor="text2">Text 2</label></td></tr>
//           <tr><td><input type="checkbox" name="text3" value="value3" /></td><td><label htmlFor="text3">Text 3</label></td></tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };


const OptionBox = props => {
  return(
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={3} title="Beds" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>1</MenuItem>
          <MenuItem eventKey={3.2}>2</MenuItem>
          <MenuItem eventKey={3.3}>3</MenuItem>
          <MenuItem eventKey={3.3}>4</MenuItem>
        </NavDropdown>
        <Nav>
        <NavDropdown eventKey={3} title="Baths" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>1</MenuItem>
          <MenuItem eventKey={3.2}>2</MenuItem>
          <MenuItem eventKey={3.3}>3</MenuItem>
          <MenuItem eventKey={3.3}>4</MenuItem>
        </NavDropdown>
      </Nav>
      </Nav>
      <Nav pullRight>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default OptionBox;
