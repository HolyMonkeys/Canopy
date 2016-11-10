import React from 'react';

const ListingsListItem = (props) => {
  return (
    <td className="listing">
      {props.listing.street}
    </td>
  );
};

export default ListingsListItem;
