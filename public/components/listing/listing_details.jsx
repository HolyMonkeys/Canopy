import React from 'react';

import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = ({ activeListing, activeUser }) => {
  return (
    <div className="listing-container">
      <div className="listing-detail">
        <div className="listing-desc">
          <ListingDesc
            activeListing={activeListing}
            activeUser={activeUser}
          />
        </div>
      </div>
      <div className="listing-pics">
        <ListingPics images={activeListing.images} />
      </div>
    </div>
  );
};

export default ListingDetail;
