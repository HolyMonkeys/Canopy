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
    .then((city) => {
      this.props.selectCity(city.data);
      return request.get(`/api/listings/${city.data.id}`);
    })
    .then((listings) => {
      console.log(listings.data)
      this.props.updateListings(listings.data);
      browserHistory.push('/content/listings');
    })
    .catch((err) => {
      console.log('Error submitting city or getting listings: ', err);
    });
  }

  render() {
    return (
      <div className="topCities">
        <div className="chicago" onClick={ (event) => { this.onCityClick(event, 'chicago, il'); } }>
          Chicago
        </div>
        <div className="sanFrancisco" onClick={ (event) => { this.onCityClick(event, 'san francisco, ca'); } }>
          San Francisco
        </div>
        <div className="newYork" onClick={ (event) => { this.onCityClick(event, 'new york, ny'); } }>
          New York
        </div>
         <div className="losAngeles" onClick={ (event) => { this.onCityClick(event, 'los angeles, ca'); } }>
          Los Angeles
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCity, updateListings }, dispatch);
}

export default connect(null, mapDispatchToProps)(topCities);

