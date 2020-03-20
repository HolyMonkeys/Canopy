import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import request from 'axios';

import FormText from '../form/form_text';
import FormNumber from '../form/form_num';

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
      application_id: 1,
      show: true,
      showModal: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    request.post('/api/rentalHistory', this.state)
    .then((rentalHistory) => {
      console.log('Successfully stored this rental history data to DB: ', rentalHistory);
      this.setState({ show: false, showModal: true });
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

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    if (this.state.show) {
      return (
        <div className="listingForm">
          <h3>Rental History</h3>
          <br />
          <Form inline>
            <FormText type="city" handleChange={this.handleChange} placeholder=" eg.Chicago" />
            <FormText type="street" handleChange={this.handleChange} placeholder=" eg.1060 W. Addison" />
            <FormText type="zip" handleChange={this.handleChange} placeholder=" eg.88888" />
            <br />
            <FormNumber type="rentalPayment" handleChange={this.handleChange} placeholder="1500" />
            <FormText type="landlordName" handleChange={this.handleChange} placeholder="Josh" />
            <FormNumber type="landlordPhone" handleChange={this.handleChange} placeholder="4088675309" />
            <br />
            <FormText type="reasonLeft" handleChange={this.handleChange} placeholder="big fight" />
            <br />
            <Button onClick={this.onFormSubmit} type="submit">
              Submit rental history
            </Button>
          </Form>
        </div>
      );
    }

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title> Success </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2> Successfully submitted history </h2>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RentalHistoryForm;
