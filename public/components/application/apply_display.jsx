import React, { Component } from 'react';
import request from 'axios';

class ApplicationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoMounted: false,
      city: 'San Francisco',
      street: '611 Mission Street',
      zip: 94107,
      numAdultOccupants: 2,
      numChildOccupants: 1,
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
        city: application.city,
        street: application.street,
        zip: application.zip,
        numAdultOccupants: application.numAdultOccupants,
        numChildOccupants: application.numChildOccupants,
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
      <div className="container">
        Application Page
        <div>Address: {this.state.street} {this.state.city}, zip:{this.state.zip} </div>
        <div>adults: {this.state.numAdultOccupants}, children: {this.state.numChildOccupants}</div>
        <div>pets: {this.state.pets}</div>
        <div>Current Employer: {this.state.currentEmployer}, position: {this.state.position}, duration: {this.state.duration}</div>
        <div>Annual Income: {this.state.annualIncome}</div>
        <div>Supervisor Name: {this.state.supervisorName}, Supervisor Phone: {this.state.supervisorPhone}</div>
        <div>eSign: {this.state.eSign}</div>
      </div>
    );
  }
};

export default ApplicationDisplay;
