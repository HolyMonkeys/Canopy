import React from 'react';

const ListingsListItem = (props) => {
  return (
    <div
      key={props.listing.id}
      onClick={() => {
        props.selectListing(props.listing);
        props.goToListing(props.listing);
      }}
    >
      <div className="listingListDetails">
        <h2>${props.listing.rent}</h2>
        <h3>{props.listing.street}</h3>
        <h3>{props.city}, {props.state}</h3>

        <div className="listingDetails">
          <h4>beds</h4>
          <h4>{props.listing.beds}</h4>
        </div>
        <div className="listingDetails">
          <h1>|</h1>
        </div>
        <div className="listingDetails">
          <h4>baths</h4>
          <h4>{props.listing.baths}</h4>
        </div>
        <div className="listingDetails">
          <h1>|</h1>
        </div>
        <div className="listingDetails">
          <h4>sq. foot</h4>
          <h4>{props.listing.sqFoot}</h4>
        </div>
      </div>
    </div>
  );
};

export default ListingsListItem;
