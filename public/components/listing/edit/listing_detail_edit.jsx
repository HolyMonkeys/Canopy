import React from 'react';

import ListingDescEdit from './listing_desc_edit';
import ListingPicsEdit from './listing_pics_edit';

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

// <ListingPicsEdit images={activeListing.images} />
