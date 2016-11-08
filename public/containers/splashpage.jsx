import React, { Component } from 'react';
import styles from '../stylesheets/main/splash.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import selectCity from '../actions/select_city';
import updateListings from '../actions/update_listings';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''

    };
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.selectCity(this.state.term);
    this.props.updateListings(this.state.term);
  }

  render() {
    return (
      <div className='main' >
        <form onSubmit={this.onFormSubmit.bind(this)}>
          Enter your city:
          <input className='input' onChange={this.onInputChange.bind(this)} value={this.props.term} ></input>
          <Button bsStyle="primary">Primary</Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
