import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import request from 'axios';

import RentalHistoryForm from './apply_rental_History';
import FormText from '../form/form_text';
import FormNumber from '../form/form_num';
import FormDate from '../form/form_date';

// TODO(victor):try to change the form to editable text for APPLICATION FORM
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
      applicationSubmitted: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  onFormSubmit(event) {
    event.preventDefault();
    request.post('/api/application', this.state)
    .then((application) => {
      console.log('Successfullly stored this application data to DB: ', application);
      //Must have access to renterId
      this.setState({ applicationSubmitted: true });
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
    if (!this.state.applicationSubmitted) {
      return (
        <div className="application_form">
          <div className="application_intro">
            <h1>Application to Rent </h1>
            <h3>Individual application required for each adult occupant.</h3>
          </div>
          <Form inline>
            <div className="application_namedate">
              <FormText className="col-md-6" type="name" handleChange={this.handleChange} value={this.state.name} />        
              <strong>D.O.B.</strong>
              <FormDate className="col-md-6" label="dob" handleChange={this.handleChange} placeholder='mm/dd/yyy' />
            </div>
            <div className="apply_phone_city_state">
               Home <FormNumber type="phone" handleChange={this.handleChange} value={this.state.phone} />
                <FormText type="state" handleChange={this.handleChange} value={this.state.state} />
            </div>
            <div>

              <h4> Current Address </h4>
              <FormText type="street" handleChange={this.handleChange} placeholder="e.g. 1060 W. Addison" />{ }
              <FormText type="zip" handleChange={this.handleChange} placeholder="e.g. 94108" />
              <FormText type="city" handleChange={this.handleChange} value={this.state.city} />
            </div>
            <br />
            <br />
            <div className="employmentHistory">
              <h4> Current Occupcation </h4>
              <FormText type="currentEmployer" handleChange={this.handleChange} placeholder=" .MakerSquare" />
              <FormText type="currentPosition" handleChange={this.handleChange} placeholder=" . BigBoss" />
              <FormNumber type="duration" handleChange={this.handleChange} placeholder="12" />
              <br />
              <FormNumber type="annualIncome" handleChange={this.handleChange} placeholder=" .75000" />
              <FormText type="supervisorName" handleChange={this.handleChange} placeholder=" .Josh VanBlake" />
              <FormNumber type="supervisorPhone" handleChange={this.handleChange} placeholder="408 867 5309" />
            </div>
            <br />
            <div className="EmergencyContact">
              <h4> Emergency Contact </h4>
              <FormText type="emergencyContact" handleChange={this.handleChange} placeholder="  Allen Price" />
              <FormText type="relationship" handleChange={this.handleChange} placeholder="Uncle" />
              <FormNumber type="emergencyNumber" handleChange={this.handleChange} placeholder="4085555555" />
            </div>        
            <FormNumber type="numAdultOccupants" handleChange={this.handleChange} placeholder="1" />
            <FormNumber type="numChildOccupants" handleChange={this.handleChange} placeholder="1" />
            <FormText type="pets" handleChange={this.handleChange} placeholder=" 4" />
            <br />
            <FormText type="eSign" handleChange={this.handleChange} placeholder="Signiture" />
            <br />
            <Button onClick={this.onFormSubmit} type="submit">
              Submit application
            </Button>
          </Form>
        </div>
      )
    }

     return (
        <div>
        <RentalHistoryForm />
        <RentalHistoryForm />
        <RentalHistoryForm />
        </div>
     )
  }
}

export default ApplyForm;
