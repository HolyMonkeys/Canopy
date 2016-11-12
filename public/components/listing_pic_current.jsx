import React from 'react';
import ListingDesc from './listing_desc';
import ListingPics from './listing_pics';

const CurrentPicture = (props) => {
  return (
    <div>
      <img className="curPic" src={props.image} />
    </div>
  );
};

export default CurrentPicture;
