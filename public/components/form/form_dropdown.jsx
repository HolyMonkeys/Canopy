import React from 'react';
import { DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';

const FormDropdown = (props) => {
  const menuItems = props.items.map((item) => {
    return <MenuItem key={item} eventKey={item}>{item}</MenuItem>;
  });
  return (
    <div className="dropdown-form">
      <DropdownButton
        componentClass={InputGroup.Button}
        id="input-dropdown-addon"
        title={props.type || ''}
        value={props.value}
        onSelect={props.handleSelect(props.header)}
      >
        {menuItems}
      </DropdownButton>
    </div>
  );
};

export default FormDropdown;
