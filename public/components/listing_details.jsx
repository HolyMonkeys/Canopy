import React from 'react';
import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const ListingDetail = (props) => {
  return (
    <div>
      <ListingDesc activeListing={props.activeListing} listingData={props.listingData} />
      {//<ListingPics images={props.activeListing.images} /> this will be our real thing
      }
      <ListingPics images={['ballRat.jpg', 'fastRat.jpg', 'kawhi.jpg', 'panTuna.jpg', 'tigar.jpg']} />
    </div>
  );
};

export default ListingDetail;
