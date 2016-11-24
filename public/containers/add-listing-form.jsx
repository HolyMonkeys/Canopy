import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Form, Checkbox, Button } from 'react-bootstrap';
import request from 'axios';

import FormText from '../components/form/form_text';
import FormNumber from '../components/form/form_num';
import FormDropdown from '../components/form/form_dropdown';
import FormDate from '../components/form/form_date';
import Dropzone from '../components/add_listing_image_drop';

import selectCity from '../actions/select_city';
import selectListing from '../actions/select_listing';

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: 0,
      unitNumber: 0,
      city: '',
      state: '',
      zip: 0,
      beds: 'beds',
      baths: 'baths',
      rent: 0,
      sqFoot: 0,
      dogs: false,
      cats: false,
      term: 0,
      availableDate: '',
      host_id: this.props.activeUser.id,
      images: [],
      newListing: []
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.setImages = this.setImages.bind(this);
    this.setActiveListing = this.setActiveListing.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    request.get(`/api/cities/${this.state.city}, ${this.state.state}`)
    .then((city) => {
      const newListing = Object.assign({
        city_id: city.data.id
      }, this.state);
      this.props.selectCity(city.data);
      return request.post('/api/listings', newListing);
    })
    .then((listing) => {
      this.setState({ newListing: listing.data });
    });
  }

  setImages(files) {
    this.setState({
      images: [...this.state.images, files]
    });
  }

  setActiveListing() {
    const newActiveListing = Object.assign({
      images: this.state.images },
      this.state.newListing);
    this.props.selectListing(Object.assign({
      city: {
        name: this.state.city,
        state: this.state.state
      } }, newActiveListing));
    browserHistory.push(`/content/listing/${this.state.newListing.id}`);
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
    if (!this.state.newListing.id) {
      return (
        <div className="listingForm">
          <Form inline>
            <FormText type="city" handleChange={this.handleChange} placeholder=" eg.Chicago" />
            <FormText type="state" handleChange={this.handleChange} placeholder=" eg.Illinois" />
            <FormText type="street" handleChange={this.handleChange} placeholder=" eg.1060 W. Addison" />
            <FormText type="unit" handleChange={this.handleChange} placeholder=" eg.#1244" />
            <FormText type="zip" handleChange={this.handleChange} placeholder=" eg.88888" />
            <br />
            <FormDropdown type={this.state.beds} items={[1, 2, 3, 4, 5]} handleSelect={this.handleSelect} />
            <FormDropdown type={this.state.baths} items={[1, 2, 3, 4, 5]} handleSelect={this.handleSelect} />
            <br />
            <FormNumber type="sqFoot" handleChange={this.handleChange} placeholder="sq. foot" />
            <FormNumber type="rent" handleChange={this.handleChange} placeholder="2100" />
            <FormNumber type="term" handleChange={this.handleChange} placeholder="12" />
            <br />
            <Checkbox key="dogs" onClick={this.handleClick('dogs')} inline>
              dogs
            </Checkbox>
            <Checkbox key="cats" onClick={this.handleClick('cats')} inline>
              cats
            </Checkbox>
            <br />
            <FormDate label="availableDate" handleChange={this.handleChange} />
            <Button onClick={this.onFormSubmit} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }

    return (
      <div>
        <Form>
          <Dropzone
            setImages={this.setImages}
            setActiveListing={this.setActiveListing}
            listingId={this.state.newListing.id}
            hostId={this.state.newListing.host_id}
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ activeUser }) {
  return {
    activeUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectListing, selectCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);
