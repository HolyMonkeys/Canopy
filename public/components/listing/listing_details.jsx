import React from 'react';

import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = ({ activeListing, activeUser }) => {
  return (
    <div className="listingContainer">
      <div className="listingDetail">
        <div className="listingDesc">
          <ListingDesc
            activeListing={activeListing}
            activeUser={activeUser}
          />
        </div>
      </div>
      <ListingPics images={activeListing.images} />
    </div>
  );
};

export default ListingDetail;
