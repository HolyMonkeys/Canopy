import React, { Component } from 'react';
import styles from '../stylesheets/main/rent-list.scss';

import { connect } from 'react-redux';

class RentList extends Component {
  renderRents(rent) {
    return (
      <li key={rent.id}>
        {rent.street}
      </li>
    );
  }

  render() {
    return (
      <div className='rentList'>
        <ul>
          {this.props.rents.map(this.renderRents)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ rents }) {
  return {
    rents
  };
}

export default connect(mapStateToProps)(RentList);
