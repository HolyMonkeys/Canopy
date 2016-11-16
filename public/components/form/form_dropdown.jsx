import React from 'react';
import { DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';

const FormDropdown = (props) => {
  const menuItems = props.items.map((item) => {
    return <MenuItem key={item} eventKey={item}>{item}</MenuItem>;
  });
  return (
    <DropdownButton
      componentClass={InputGroup.Button}
      id="input-dropdown-addon"
      title={props.type || ''}
      onSelect={props.handleSelect(props.type)}
    >
      {menuItems}
    </DropdownButton>
  );
};

export default FormDropdown;
