import React, { Component } from 'react';
import { connect } from 'react-redux';

import RentList from '../components/rent_list';
import OptionBox from '../components/option_box';

class Listings extends Component {
  render() {
    console.log('listings rendering');
    return (
      <div>
        <div>asdfadsfdasfdsa</div>
        <OptionBox submitOption={()=>{console.log('Submited'); }} />
        <RentList rents={this.props.rents} />
      </div> 
    );
  }
}

function mapStateToProps({ rents }) {
  return {
    rents
  };
}

export default connect(mapStateToProps)(Listings);
