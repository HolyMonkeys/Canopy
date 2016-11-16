import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
  
const FormDate = (props) => {
  return (
    <FormGroup controlId="date">
      <ControlLabel>{props.label}</ControlLabel>
      <FormControl onChange={props.handleChange(props.label)} type="date" placeholder="yyy-mm-dd" />
    </FormGroup>
  )
}

export default FormDate;
