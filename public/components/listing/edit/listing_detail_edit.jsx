import React from 'react';

import ListingDescEdit from './listing_desc_edit';

const ListingDetailEdit = ({ activeListing }) => {
  return (
    <div>
      <div>
        <div className="listingDesc">
          <ListingDescEdit activeListing={activeListing} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailEdit;
