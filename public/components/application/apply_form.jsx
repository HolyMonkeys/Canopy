import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import request from 'axios';

import RentalHistoryForm from './apply_rental_History';
import FormText from '../form/form_text';
import FormNumber from '../form/form_num';
import FormDate from '../form/form_date';

class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.activeUser.name,
      dob: '',
      phone: this.props.activeUser.phone,
      city: this.props.activeUser.city.name,
      state: this.props.activeUser.city.state,
      street: '611 Mission street',
      zip: 21233,
      numAdultOccupants: 2,
      numChildOccupants: 0,
      pets: 0,
      emergencyContact: 'tammy',
      emergencyNumber: 8675309,
      relationship: 'mom',
      currentEmployer: 'Hack Reactor',
      position: 'Student',
      duration: 6,
      annualIncome: 0,
      supervisorName: 'Josh',
      supervisorPhone: 5073015775,
      eSign: 'Victor Choi',
      renter_id: this.props.activeUser.id,
      rentalHistories: 0
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.addRentalHistory = this.addRentalHistory.bind(this);
    this.subRentalHistory = this.subRentalHistory.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  onFormSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    request.post('/api/application', this.state)
    .then((application) => {
      console.log('Successfullly stored this application data to DB: ', application);
      //Must have access to renterIdå
      browserHistory.push(`/content/profile/${this.state.renter_id}`);
    });
  }

  addRentalHistory() {
    this.setState({ rentalHistories: this.state.rentalHistories + 1 });
  }

  subRentalHistory() {
    this.setState({ rentalHistories: this.state.rentalHistories - 1 });
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
    const rentalHistoryForms = [];
    for (let i = 0; i < this.state.rentalHistories; i += 1) {
      rentalHistoryForms.push(
        <RentalHistoryForm subRentalHistory={this.subRentalHistory} />
      );
    }
    return (
      <div className="listingForm">
        <h1>Application to Rent </h1>
        <h3>Individual application required for each adult occupant.</h3>

        <Form inline>
          <FormText type="name" handleChange={this.handleChange} value={this.state.name} />
          <strong>D.O.B.</strong>
          <FormDate label="dob" handleChange={this.handleChange} placeholder='mm/dd/yyy' />
          <br />
           Home <FormNumber type="phone" handleChange={this.handleChange} value={this.state.phone} />
            <FormText type="state" handleChange={this.handleChange} value={this.state.state} />
          <br />
          <br />
          <div>
            <h4> Current Address </h4>
            <FormText type="street" handleChange={this.handleChange} placeholder="e.g. 1060 W. Addison" />
            <FormText type="zip" handleChange={this.handleChange} placeholder="e.g. 88888" />
            <FormText type="city" handleChange={this.handleChange} value={this.state.city} />
          </div>
          <br />
          <br />
          <div>
            <h4> Current Occupcation </h4>
            <FormText type="currentEmployer" handleChange={this.handleChange} placeholder=" eg.88888" />
            <FormText type="currentPosition" handleChange={this.handleChange} placeholder=" eg.88888" />
            <FormNumber type="duration" handleChange={this.handleChange} placeholder="12" />
            <FormNumber type="annualIncome" handleChange={this.handleChange} placeholder=" eg.88888" />
            <FormText type="supervisorName" handleChange={this.handleChange} placeholder=" eg.88888" />
            <FormNumber type="supervisorPhone" handleChange={this.handleChange} placeholder="12" />
          </div>
          <br />
          <div>
            <h4> Emergency Contact </h4>
            <FormText type="emergencyContact" handleChange={this.handleChange} placeholder=" eg.88888" />
            <FormText type="relationship" handleChange={this.handleChange} placeholder=" eg.88888" />
            <FormNumber type="emergencyNumber" handleChange={this.handleChange} placeholder="12" />
          </div>        
          <FormNumber type="numAdultOccupants" handleChange={this.handleChange} placeholder="sq. foot" />
          <FormNumber type="numChildOccupants" handleChange={this.handleChange} placeholder="2100" />
          <FormText type="pets" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          <FormText type="eSign" handleChange={this.handleChange} placeholder=" eg.88888" />
          <br />
          {rentalHistoryForms}
          <Button onClick={this.addRentalHistory} type="button">
            Add a rental history
          </Button>
          <Button onClick={this.onFormSubmit} type="submit">
            Submit application
          </Button>
        </Form>
      </div>
    );
  }
}

export default ApplyForm;
