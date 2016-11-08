import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';
import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';


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
    window.location = '/#/content/listings';
  }

  render() {
    return (
      <div className="main">
        <h1>renter city</h1>
        <form onSubmit={this.onFormSubmit}>
            <FormControl
              id="formControlsText"
              type="text"
              label="Text"
              placeholder="apartment search by city eg. San Francisco, Ca"
              onChange={this.onInputChange.bind(this)}
              value={this.props.term}
            />
              <Button onClick={this.onFormSubmit} bsStyle="primary">submit</Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeCity: state.activeCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity, updateListings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);
