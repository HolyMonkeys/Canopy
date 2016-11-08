import React from 'react';

import Rent from './rent';

const RentList = (props) => {
  const renderRents = () => {
    return props.rents.map((rent) => {
      return (
        <tr key={rent.id}>
          <Rent rent={rent} />
        </tr>
      );
    });
  }
  return (
    <div className="rent-listings">
      <table>
        <tbody>
          {renderRents()}
        </tbody>
      </table>
    </div>
  )
}

export default RentList;