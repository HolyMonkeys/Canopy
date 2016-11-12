import request from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormControl } from 'react-bootstrap';
import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';
import { browserHistory } from 'react-router';


class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.selectCity(this.state.term);
    this.props.updateListings(this.state.term);
    browserHistory.push('/content/listings');
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      request.get(`/api/position?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
      .then((data) => {
        this.setState({ term: data.data });
      });
    });
  }

  render() {
    return (
      <div className="main">
        <h1>canopy</h1>
        <form onSubmit={this.onFormSubmit}>
          <FormControl
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="apartment search by city eg. San Francisco, Ca"
            onChange={this.onInputChange}
            value={this.state.term}
          />
          <Button onClick={this.onFormSubmit} bsStyle="primary">submit</Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ activeCity }) {
  return {
    activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);
