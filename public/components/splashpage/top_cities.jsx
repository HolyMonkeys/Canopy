import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from 'axios';
import { browserHistory } from 'react-router';

import selectCity from '../../actions/select_city';
import updateListings from '../../actions/update_listings';

class topCities extends Component {
  constructor(props) {
    super(props);
    this.onCityClick = this.onCityClick.bind(this);
  }

  onCityClick(event, city) {
    event.preventDefault();
    request.get(`/api/cities/${city}`)
    .then((newCity) => {
      this.props.selectCity(newCity.data);
      return request.get(`/api/listings/${newCity.data.id}`);
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
      <div className="container-fluid topCities">
        <h3>Popular Cities<hr /></h3>
        <div className="row">
          <div className="col-md-6 splash-city-top chicago" onClick={(event) => { this.onCityClick(event, 'chicago, il'); }}>
            <p>Chicago<hr /></p>
          </div>
          <div className="col-md-6 splash-city-top san-francisco" onClick={(event) => { this.onCityClick(event, 'san francisco, ca'); }}>
            <p>San Francisco<hr /></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 splash-city-bottom new-york" onClick={(event) => { this.onCityClick(event, 'new york, ny'); }}>
            <p>New York<hr /></p>
          </div>
          <div className="col-md-6 splash-city-bottom los-angeles" onClick={(event) => { this.onCityClick(event, 'los angeles, ca'); }}>
            <p>Los Angeles<hr /></p>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity, updateListings }, dispatch);
}

export default connect(null, mapDispatchToProps)(topCities);
