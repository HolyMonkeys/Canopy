import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const FormNumber = (props) => {
  return (
    <FormGroup controlId={`formInline${props.type}`}>
      <ControlLabel>{props.type}</ControlLabel>
      <FormControl
        onChange={props.handleChange(props.type)}
        type="number"
        value={props.value}
        placeholder={props.placeholder}
      />
    </FormGroup>
  );
};

export default FormNumber;
