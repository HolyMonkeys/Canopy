import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import request from 'axios';

import FormText from './form/form_text';
import FormNumber from './form/form_num';

class RentalHistoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'San Francisco',
      street: '611 Mission street',
      zip: 2123,
      landlordName: 'Josh',
      landlordPhone: 2131,
      rentalPayment: 2,
      reasonLeft: 'Victor Choi',
      application_id: 1
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onAddMore = this.onAddMore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    request.post('/api/rentalHistory', this.state)
    .then((rentalHistory) => {
      console.log('Successfullly stored this rental history data to DB: ', rentalHistory);
      // redirect to listings page
    });
  }

  onAddMore(event) {
    event.preventDefault();
    request.post('/api/rentalHistory', this.state)
    .then((rentalHistory) => {
      console.log('Successfullly stored this rental history data to DB: ', rentalHistory);
      // redirect to top of the page with cleared information
    });
  }

  handleClick(key) {
    return () => {
      const state = {};
      state[key] = !this.state[key];
      this.setState(state);
    };
  }

  handleSelect(key) {
    return (e) => {
      const state = {};
      state[key] = e;
      this.setState(state);
    };
  }

  handleChange(key) {
    return (e) => {
      const state = {};
      state[key] = e.target.value;
      this.setState(state);
    };
  }

  render() {
    return (
      <div className="listingForm">
        <Form inline>
          <FormText type="city" handleChange={this.handleChange} placeholder=" eg.Chicago" />
          <FormText type="street" handleChange={this.handleChange} placeholder=" eg.1060 W. Addison" />
          <FormText type="zip" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          <FormNumber type="rentalPayment" handleChange={this.handleChange} placeholder="88888" />
          <FormText type="landlordName" handleChange={this.handleChange} placeholder="Josh" />
          <FormNumber type="landlordPhone" handleChange={this.handleChange} placeholder="1231231212" />
          <br />
          <FormText type="reasonLeft" handleChange={this.handleChange} placeholder="big fight" />
          <br />
          <Button onClick={this.onAddMore} type="submit">
            Add More
          </Button>
          <Button onClick={this.onFormSubmit} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default RentalHistoryForm;
