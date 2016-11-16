import React from 'react';

import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';
import ListingScores from './listing_scores';

const ListingDetail = ({ activeListing, activeCity }) => {
  return (
    <div>
      <div>
        <div className="listingDesc">
          <ListingDesc activeListing={activeListing} activeCity={activeCity} />
        </div>
        <div className="listingScores">
         <ListingScores activeListing={activeListing} />
        </div>
      </div>
      <ListingPics images={activeListing.images} />
    </div>
  );
};

export default ListingDetail;
