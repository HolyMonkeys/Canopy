import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormControl, Form } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import request from 'axios';

import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';

class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.term)
    request.get(`/api/cities/${this.state.term}`)
    .then((city) => {
      // console.log('city got it');
      this.props.selectCity(city.data);
      return request.get(`/api/listings/${city.data.id}`);
    })
    .then((listings) => {
      this.props.updateListings(listings.data);
      browserHistory.push('/content/listings');
    })
    .catch((err) => {
      console.log('Error submitting city or getting listings: ', err);
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit} inline>
          <FormControl
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="search by city e.g. San Francisco, Ca"
            onChange={this.onInputChange}
            value={this.state.term}
          />
          <Button
            className="citySelect"
            onClick={this.onFormSubmit}
            bsStyle="primary">
            submit
          </Button>
        </Form>
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
