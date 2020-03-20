import React, { Component } from 'react';
import request from 'axios';

class ApplicationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoMounted: false,
      name: 'Victor Choi',
      dob: 1991.0301,
      phone: 5073015775,
      city: 'San Francisco',
      state: 'CA',
      street: '611 Mission Street',
      zip: 94107,
      numAdultOccupants: 2,
      numChildOccupants: 1,
      emergencyContact: 'Victor Choi',
      emergencyNumber: 5073015775,
      relationship: 'myselffffff',
      pets: 'Snails and dolphins',
      currentEmployer: 'Josh',
      position: 'intern',
      duration: 12,
      annualIncome: 3000,
      supervisorName: 'Zack',
      supervisorPhone: 5073015775,
      eSign: 'Victor Choi'
    };
  }

  componentDidMount() {
    console.log('Making get request to get application information from db: ', this.props.renterId);
    request.get(`/api/application/${this.props.renterId}`)
    .then((res) => {
      const application = res.data;
      console.log('got application back from server');
      console.log('this is what I got: ', application);
      this.setState({
        infoMounted: true,
        name: application.name,
        dob: application.dob,
        phone: application.phone,
        city: application.city,
        state: application.state,
        street: application.street,
        zip: application.zip,
        numAdultOccupants: application.numAdultOccupants,
        numChildOccupants: application.numChildOccupants,
        emergencyContact: application.emergencyContact,
        emergencyNumber: application.emergencyNumber,
        relationship: application.relationship,
        pets: application.pets,
        currentEmployer: application.currentEmployer,
        position: application.position,
        duration: application.duration,
        annualIncome: application.annualIncome,
        supervisorName: application.supervisorName,
        supervisorPhone: application.supervisorPhone,
        eSign: application.eSign
      });
    });
  }
  render() {
    if (!this.state.infoMounted) {
      return <div>Fetching application information</div>;
    }
    return (
      <div className="application_form_view">
        <div className="application_intro">
          <h1>Application to Rent </h1>
          <h3>Individual application required for each adult occupant.</h3>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h4><strong> Name:</strong></h4>
            <h5>{this.state.name} </h5>
          </div>
          <div className="col-sm-12">
            <h4><strong>Address: </strong></h4>
            <h5>{this.state.street}  {this.state.city}, {this.state.state}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <h4> <strong>Adults: </strong> </h4>
            <h5> {this.state.numAdultOccupants}</h5>
          </div>
          <div className="col-sm-4">
            <h4> <strong>Children: </strong></h4>
            <h5> {this.state.numChildOccupants}</h5>
          </div>
          <div className="col-sm-4">
            <h4><strong>Pets: </strong></h4>
            <h5>{this.state.pets}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <h4> <strong>Current Employer: </strong></h4>
            <h5> {this.state.currentEmployer}</h5>
          </div>
          <div className="col-sm-4">
            <h4><strong>Position: </strong></h4>
            <h5> {this.state.position}</h5>
          </div>
          <div className="col-sm-4">
            <h4><strong>Duration: </strong></h4>
            <h5> {this.state.duration}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h4>
              <strong>Annual Income: </strong>${this.state.annualIncome}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h5>
              <strong>Supervisor Name: </strong> {this.state.supervisorName}
              <strong> Supervisor Phone: </strong> {this.state.supervisorPhone}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <strong>eSign Signature: </strong> {this.state.eSign}
          </div>
        </div>
      </div>
    );
  }
};

export default ApplicationDisplay;
