import React from 'react';

const Rent = (props) => {
  return (
    <td className="rent-listings">
      {props.rent.street}
    </td>
  )
}

export default Rent;